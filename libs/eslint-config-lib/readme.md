# @lfire/eslint-config-lib

```bash
npm i -D @lfire/eslint-config-lib
```

依赖于 eslint-config-alloy

配置：.eslintrc.js

```js
module.exports = {
  root: true,
  extends: ['@lfire/eslint-config-lib'],
};
```

默认 JS 项目配置

支持 TS：

```js
module.exports = {
  root: true,
  extends: ['@lfire/eslint-config-lib/ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```

支持 Vue：

> 当前支持 Vue3.x，如若要支持 Vue2.x，请安装 `@lfire/eslint-config-lib@1`。

```js
module.exports = {
  root: true,
  extends: ['@lfire/eslint-config-lib/vue'],
};
```

支持 Vue TS 版：

```js
module.exports = {
  root: true,
  extends: ['@lfire/eslint-config-lib/vue-ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```

支持 React：

```js
module.exports = {
  root: true,
  extends: ['@lfire/eslint-config-lib/react'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```

支持 React TS 版：

```js
module.exports = {
  root: true,
  extends: ['@lfire/eslint-config-lib/react-ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
```
