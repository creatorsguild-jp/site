# Setup memo

## Next テンプレートから作成

```shell
npx create-next-app --example with-typescript site
```

## .npmrc 追加

yarn のデフォルトパラメーターの設定

```.npmrc
engine-strict=true
save-exact=true
```

- engine-strict
  - nodeバージョンを固定
  ```package.json
    :
    "engines": {
      "node": "14.x"
    }
    :
  ```

- save-exact
  - 明示的なバージョン固定

## TypeScript/ESLint/Prettier追加

```shell
yarn add -D typescript @types/node @types/react @types/react-dom
yarn add -D eslint eslint-plugin-react eslint-plugin-react-hooks
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
yarn add -D @typescript-eslint/{parser,eslint-plugin}
```

### tsconfig.json/.eslintrc 追加

※設定内容については DevelopSettings.md を参考。

## husky / lint-staged

`husky` は git コマンドを実行したときに合わせてコマンドを実行するためのツール。
`lint-staged` は、Gitのステージに上がっているファイルを対象に `eslint` を実行する為のツール。

```sh
yarn add -D husky lint-staged
```



