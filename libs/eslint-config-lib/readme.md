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

支持 Vue2.x：

> 当前不支持 Vue3.x

```js
module.exports = {
  root: true,
  extends: ['@lfire/eslint-config-lib/vue'],
};
```
