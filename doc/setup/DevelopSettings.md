# 開発環境についての設定

## TypeScript 設定

tsconfig.json にて設定

### コンパイルの実行

```shell
yarn tsc
```

## ESLint

`ESLint` は JavaScript のエラーチェックをしてくれるツール。以下のコードはTypeScript用のESLintをしてくれるようにプラグインを追加しています。

### .eslintrc

[Configuring ESLint](https://eslint.org/docs/user-guide/configuring/)

- root
  - rootプロパティを設定すると親階層の設定を検索しなくなる
- env
  - browser
    -
  - es6
    - ECMAScript 2015 (ES6) で書かれたコードを静的検証する
    - ただし、`parserOptions.sourceType` に `module` を有効にする事で、ES Modules機能が使える
  - node
    - Node.js で実行されるコードの静的検証を指定
- parser
  - TypeScript用を指定 (`@typescript-eslint/parser`)
- parserOptions
  - project
    - tsconfig.eslint.json を指定
  - sourceType
    - `env.es6`で触れたとおり。import/exportが使えるようになる
  - ecmaVersion
    - 構文解析に関するオプション
    - ES2016 以降の構文を有効化。ここでは `2019` を指定。
    - env.es6 と関連がある
  - tsconfigRootDir
- plugins
  - プラグイン指定
  - ここではESLintのTypeScriptプラグインを指定している。
- extends
  - `eslint:recommended`
    - ESLintのJavaScriptルールセット
  - `plugin:@typescript-eslint/recommended`
    - 型チェックが不要なルールを適用
  - `plugin:@typescript-eslint/recommended-requiring-type-checking`
    - 型チェックが必要なルールを適用
- rules
  - ルールは特にこだわりがない限り空でよさそう。

※ eslint にもコードフォーマッターがついているが、Prettier に任せている。

### Prettier

`Prettier` は コードフォーマッターです。

```shell
yarn add -D prettier eslint-config-prettier
```

#### Prettierの設定

```.pretterrc.json
{
  "singleQuote": true,
  "jsxBracketSameLine": true
}
```

整形対象外に設定は `.prettierignore` に追記。

### husky / lint-staged

`husky` は git コマンドを実行したときに合わせてコマンドを実行するためのツール。
`lint-staged` は、Gitのステージに上がっているファイルを対象に `eslint` を実行する為のツール。

```shell
yarn add -D husky lint-staged
```

`pre-commit` で `list-staged` を実行する設定

`lint-staged` では、`js,ts` ファイルに対して、エラーチェックとフォーマットを整えている。

設定ファイルを追加

```.huskyrc
{
  "hooks": {
    "pre-commit": "lint-staged",
  }
}
```

```.lintstagerc.js
module.exports = {
  '*.{js,ts,tsx,json,*rc,graphql,yml}': ['prettier --write'],
  '*.{ts,tsx}': ['eslint --cache --fix'],
}
```
