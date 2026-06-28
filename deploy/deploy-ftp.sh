#!/usr/bin/env bash
# creatorsguild.info 本番反映:
#   Next.js 静的エクスポート(out/) を XServer の公開 docroot へ FTP 同期する。
#
# Usage:
#   ./deploy/deploy-ftp.sh                       # dry-run（既定・サーバには一切書き込まない）
#   ./deploy/deploy-ftp.sh --apply               # 実際に反映
#   ./deploy/deploy-ftp.sh --apply --skip-build  # ビルドを省略して既存 out/ を反映
#
# 認証情報は Git 追跡外の .env.ftp から読み込む（スクリプトへの直書き禁止）。
#   必要変数: FTP_HOST / FTP_USER / FTP_PASS / FTP_REMOTE_DIR
# サーバ構成: master@creatorsguild.info は creatorsguild.info/ に chroot される。
#   FTP_REMOTE_DIR=public_html（= 公開 docroot, FTP ログイン直下）

set -euo pipefail
cd "$(dirname "$0")/.."

ENV_FTP="${ENV_FTP:-.env.ftp}"
if [[ ! -f "$ENV_FTP" ]]; then
    echo "ERROR: $ENV_FTP が見つかりません。" >&2
    echo "  cp .env.ftp.example .env.ftp して FTP 認証情報を記入してください。" >&2
    exit 1
fi
# shellcheck disable=SC1090
source "$ENV_FTP"

FTP_HOST="${FTP_HOST:?FTP_HOST が .env.ftp に未設定です}"
FTP_USER="${FTP_USER:?FTP_USER が .env.ftp に未設定です}"
FTP_PASS="${FTP_PASS:?FTP_PASS が .env.ftp に未設定です}"
FTP_REMOTE_DIR="${FTP_REMOTE_DIR:?FTP_REMOTE_DIR が .env.ftp に未設定です}"

APPLY=0
SKIP_BUILD=0
for arg in "$@"; do
    case "$arg" in
        --apply)      APPLY=1 ;;
        --skip-build) SKIP_BUILD=1 ;;
        *) echo "未知の引数: $arg" >&2; exit 2 ;;
    esac
done

# 1) 静的エクスポート生成（next.config.js の output:'export' により out/ に出力）
if [[ "$SKIP_BUILD" -eq 0 ]]; then
    echo "==> [1/2] next build（静的エクスポート → out/）"
    npm run build
else
    echo "==> [1/2] ビルド省略（--skip-build）。既存 out/ を使用"
fi

# 生成物の健全性チェック（空の out/ で本番を消さないための安全装置）
if [[ ! -f out/index.html ]]; then
    echo "ERROR: out/index.html が見つかりません。ビルド失敗の可能性。中止します。" >&2
    exit 1
fi

# 2) FTP 同期（mirror -R: ローカル→リモート, --delete: out/ に無い旧ファイルを掃除）
#    contact.config.php（SMTP/reCAPTCHA 認証, git 追跡外）は mirror から除外する:
#    - 自動デプロイで秘匿設定を上書き/--delete 掃除しない（事故防止）
#    - 初回のみ手動で public_html/api/contact.config.php を FTP アップロードすること
#      （テンプレ: public/api/contact.config.example.php）
DRY="--dry-run"
[[ "$APPLY" -eq 1 ]] && DRY=""
if [[ "$APPLY" -eq 0 ]]; then
    echo "==> [2/2] DRY RUN（--apply で実反映）: out/ → ${FTP_REMOTE_DIR}/"
else
    echo "==> [2/2] 反映: out/ → ${FTP_REMOTE_DIR}/ （--delete で旧ファイル掃除）"
fi

lftp -u "$FTP_USER,$FTP_PASS" "ftp://$FTP_HOST" <<EOF
set ssl:verify-certificate no
set ftp:ssl-protect-data yes
set mirror:no-empty-dirs yes
mirror -R $DRY --delete --verbose --parallel=4 \
    --exclude-glob .DS_Store \
    --exclude-glob contact.config.php \
    out/ \
    ${FTP_REMOTE_DIR}/
quit
EOF

echo "==> done.$([[ "$APPLY" -eq 0 ]] && echo ' (dry-run / サーバ未変更)')"
