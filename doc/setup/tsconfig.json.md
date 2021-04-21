# tsconfig.jsonについての説明

## compilerOptions

- target
  - TypeScriptがコンパイル（トランスパイル）されて出力されるECMSScriptのバージョン。
- module
  - プログラム分割してモジュールという単位で扱うことができる。
  - コンパイル後にモジュールをどのパターンで出力するかを指定している。
  - import、export でモジュールの読み込み、外部で使えるようにしている。
  - commonjs, amd, system, umd, es6, es2015, es2020, esnext, none 等がある。
- moduleResolution
  - モジュール解決方針の指定。
  - モジュールの解決方法には Node 方式と Classic 方式の 2 通りの方法が存在
- lib
  - コンパイルする際に使用する組み込みライブラリ。
  - target に指定している物を使う。
- allowJs
  - JavaScriptフェアを許容する。
- checkJs
  - JavaScriptファイルも型チェックをしてくれるようにする。
- jsx
  - jsxファイルをどうコンパイルするか。
- outDir
  - 出力ディレクトリの指定。
- strict
  - 以下を `true` にすると有効になる設定。
    ```
    --noImplicitAny
    --noImplicitThis
    --alwaysStrict
    --strictBindCallApply
    --strictNullChecks
    --strictFunctionTypes
    --strictPropertyInitialization
    ```
- noImplicitAny
  - 型を何も書かない場合は暗黙的にanyになるが、型を指定しなければならない。
- alwaysStrict
  - "use strict";を必ず全てのファイルの先頭行に付与する。
- noUnusedLocals
  - 宣言されたが使用されていない変数が存在する場合にコンパイルエラーにする。
- noUnusedParameters
  - 関数の作成時、定義しているのに中身のコードで使用されない場合にコンパイルエラーにする。
- noEmit
  - コンパイル結果を出力しなくなる
- noFallthroughCasesInSwitch
  - fallthrough: switch文のcase内でbreakが無い場合に、その下のcaseの処理も実行される仕様。
  - fallthroughなcaseのうち、1行以上処理が存在しているにも関わらず脱出処理（breakやreturn）が無いものにエラー。
- baseUrl
  - importにおいて、相対的なカレントディレクトリをどこにするか指定する。
- path(使用していない)
  - import パスを独自で作る事が出来る
- allowSyntheticDefaultImports
  - デフォルトのエクスポートがないモジュールからのデフォルトのインポートを許可します。
- esModuleInterop
  - import を使って読み込めるようにする。
- skipLibCheck
  - `*.d.ts` ファイルに対する型チェックがスキップされる。
- forceConsistentCasingInFileNames
  - ファイルの大文字小文字を区別する
- resolveJsonModule
  - jsonファイルから型解決した状態で値を取得でき、わざわざjson用のinterfaceを作成しなくてもよくなった。
- isolatedModules
  - コンパイル対象のファイル間の関係性を一切無視して、全てのファイルを単一のモジュールとしてコンパイルする。 その場合の安全でない記法についてコンパイル時にエラーを出すようにする。
- types(使用していない)
  - 一覧に指定されたパッケージのみが含まれる
    - `["node", "lodash", "express"]` が指定された場合、以下のパッケージが含まれる。
      ```
      ./node_modules/@types/node
      ./node_modules/@types/lodash
      ./node_modules/@types/express
      ```
      その他のパッケージの `node_modules/@types/*` は含まれない。
- removeComments(使用していない)
  - コメントを削除する。
- sourceMap(使用していない)
  - ソースマップを生成(.map)。

## include / exclude

コンパイルする対象ファイルを指定する。ワイルドカードなどが使える。
