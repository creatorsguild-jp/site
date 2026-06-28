<?php
/**
 * お問い合わせフォーム受信エンドポイント — creatorsguild.info
 *
 * 役割:
 *   /contact/ のフォーム（fetch + JSON POST）を受け、サーバ側で検証してメール送信する。
 *   静的サイト（Next.js export）と同一ドメイン配下に PHP として配置され、CORS 不要で動く。
 *
 * 防御:
 *   - honeypot（website 欄）に入力があれば spam とみなし、成功を装って黙って破棄
 *   - reCAPTCHA v3 スコア検証（設定時のみ）
 *   - 必須項目 / メール形式のサーバ側バリデーション
 *   - ヘッダインジェクション対策（CR/LF 除去 + PHPMailer 経由送信）
 *   - 同一オリジン以外の POST を拒否（設定時）
 *   - 同一 IP の連投フラッド抑制（設定時・best-effort）
 *
 * 応答: 常に JSON。{ ok: true } | { ok: false, error, errors? }
 *
 * 設定: 同階層の contact.config.php（git 追跡外）。無ければ example をフォールバックに使う。
 */

declare(strict_types=1);

require __DIR__ . '/vendor/PHPMailer/src/Exception.php';
require __DIR__ . '/vendor/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/vendor/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// --- 出力を JSON に固定し、PHP 警告がレスポンスへ混ざらないようにする -------------
mb_internal_encoding('UTF-8');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
ini_set('display_errors', '0'); // エラー詳細を返さない（情報漏洩防止）

/** JSON レスポンスを返して終了する。 */
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/** ヘッダインジェクション対策: 改行類を除去する。 */
function clean_header(string $v): string
{
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $v));
}

/**
 * URL へ POST する。cURL を優先し、無ければ allow_url_fopen にフォールバックする。
 * 失敗時は null。
 */
function http_post(string $url, array $params, int $timeout = 10): ?string
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_POSTFIELDS     => http_build_query($params),
            CURLOPT_TIMEOUT        => $timeout,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);
        $res = curl_exec($ch);
        curl_close($ch);
        return is_string($res) ? $res : null;
    }
    $res = @file_get_contents($url, false, stream_context_create([
        'http' => [
            'method'  => 'POST',
            'header'  => 'Content-Type: application/x-www-form-urlencoded',
            'content' => http_build_query($params),
            'timeout' => $timeout,
        ],
    ]));
    return is_string($res) ? $res : null;
}

// --- 設定読み込み（実値は git 外の contact.config.php）-----------------------------
$configPath = __DIR__ . '/contact.config.php';
if (!is_file($configPath)) {
    $configPath = __DIR__ . '/contact.config.example.php';
}
/** @var array $config */
$config = require $configPath;

// --- メソッド/オリジン検証 ---------------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method Not Allowed']);
}

$allowed = $config['allowed_origins'] ?? [];
if (!empty($allowed)) {
    // fetch は同一オリジンだと Origin を送らない場合があるため、Referer も補助的に見る。
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '' && isset($_SERVER['HTTP_REFERER'])) {
        $parts = parse_url($_SERVER['HTTP_REFERER']);
        if ($parts !== false && isset($parts['scheme'], $parts['host'])) {
            $origin = $parts['scheme'] . '://' . $parts['host'];
        }
    }
    if ($origin !== '' && !in_array($origin, $allowed, true)) {
        respond(403, ['ok' => false, 'error' => 'Forbidden']);
    }
}

// --- 入力取得（JSON ボディ優先、フォームエンコードもフォールバック）---------------
$raw = file_get_contents('php://input') ?: '';
$input = json_decode($raw, true);
if (!is_array($input)) {
    $input = $_POST;
}
$field = static function (string $key) use ($input): string {
    $v = $input[$key] ?? '';
    return is_string($v) ? trim($v) : '';
};

// --- honeypot: 入力があれば spam。成功を装って黙って破棄（bot に気づかせない）------
if ($field('website') !== '') {
    respond(200, ['ok' => true]);
}

// --- フラッド抑制（同一 IP の連投）best-effort、失敗しても通常処理は止めない -------
$interval = (int) ($config['min_interval_sec'] ?? 0);
if ($interval > 0) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $stamp = sys_get_temp_dir() . '/cg_contact_' . md5($ip);
    $now = time();
    $last = is_file($stamp) ? (int) @file_get_contents($stamp) : 0;
    if ($last > 0 && ($now - $last) < $interval) {
        respond(429, ['ok' => false, 'error' => '送信間隔が短すぎます。しばらくしてからお試しください。']);
    }
    @file_put_contents($stamp, (string) $now);
}

// --- バリデーション ----------------------------------------------------------------
$name    = $field('name');
$email   = $field('email');
$message = $field('message');

$errors = [];
if ($name === '') {
    $errors['name'] = 'お名前を入力してください。';
} elseif (mb_strlen($name) > 100) {
    $errors['name'] = 'お名前が長すぎます。';
}
if ($email === '') {
    $errors['email'] = 'メールアドレスを入力してください。';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 254) {
    $errors['email'] = 'メールアドレスの形式が正しくありません。';
}
if ($message === '') {
    $errors['message'] = 'お問い合わせ内容を入力してください。';
} elseif (mb_strlen($message) > 5000) {
    $errors['message'] = 'お問い合わせ内容が長すぎます（5000 文字以内）。';
}
if (!empty($errors)) {
    respond(422, ['ok' => false, 'error' => '入力内容を確認してください。', 'errors' => $errors]);
}

// --- reCAPTCHA v3 検証（secret 設定時のみ）-----------------------------------------
$rc = $config['recaptcha'] ?? [];
$secret = (string) ($rc['secret'] ?? '');
if ($secret !== '') {
    $token = $field('recaptcha_token');
    if ($token === '') {
        respond(400, ['ok' => false, 'error' => '認証トークンがありません。ページを再読み込みしてください。']);
    }
    $verify = http_post('https://www.google.com/recaptcha/api/siteverify', [
        'secret'   => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);
    $result = is_string($verify) ? json_decode($verify, true) : null;
    $minScore = (float) ($rc['min_score'] ?? 0.5);
    if (!is_array($result) || empty($result['success']) || (float) ($result['score'] ?? 0) < $minScore) {
        respond(400, ['ok' => false, 'error' => '送信が拒否されました（自動判定）。お手数ですが時間をおいて再度お試しください。']);
    }
}

// --- メール送信（PHPMailer / SMTP）------------------------------------------------
$smtp = $config['smtp'] ?? [];
$mail = new PHPMailer(true);
try {
    if (!empty($smtp['enabled'])) {
        $mail->isSMTP();
        $mail->Host       = (string) ($smtp['host'] ?? '');
        $mail->Port       = (int) ($smtp['port'] ?? 587);
        $mail->SMTPAuth   = (bool) ($smtp['auth'] ?? true);
        $mail->Username   = (string) ($smtp['username'] ?? '');
        $mail->Password   = (string) ($smtp['password'] ?? '');
        $secure = (string) ($smtp['secure'] ?? 'tls');
        if ($secure === 'ssl') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        } elseif ($secure === 'tls') {
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        }
    }
    $mail->CharSet = PHPMailer::CHARSET_UTF8;

    $mail->setFrom(
        clean_header((string) ($config['from_email'] ?? 'no-reply@creatorsguild.info')),
        (string) ($config['from_name'] ?? "Creator's Guild")
    );
    $mail->addAddress(
        clean_header((string) ($config['to_email'] ?? '')),
        (string) ($config['to_name'] ?? '')
    );
    // 返信は送信者へ。氏名・メールは検証済みだが念のため改行除去。
    $mail->addReplyTo(clean_header($email), clean_header($name));

    $mail->Subject = clean_header((string) ($config['subject_prefix'] ?? '') . $name . ' 様より');
    $mail->Body = implode("\n", [
        'creatorsguild.info のお問い合わせフォームから送信されました。',
        '',
        '【お名前】',
        $name,
        '',
        '【メールアドレス】',
        $email,
        '',
        '【お問い合わせ内容】',
        $message,
        '',
        '----',
        '送信元IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '-'),
        '日時: ' . date('Y-m-d H:i:s'),
    ]);

    $mail->send();
} catch (PHPMailerException $e) {
    // 詳細はサーバログにのみ残し、利用者には汎用メッセージを返す。
    error_log('[contact.php] mail send failed: ' . $mail->ErrorInfo);
    respond(500, ['ok' => false, 'error' => '送信処理に失敗しました。時間をおいて再度お試しください。']);
}

respond(200, ['ok' => true]);
