# mourning-page
哀悼日网页变灰

[![CI][ci-image]][ci-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript_code style][code-style-image]][code-style-url]

[ci-image]: https://github.com/kirklin/mourning-page/actions/workflows/release.yml/badge.svg?branch=master
[ci-url]: https://github.com/kirklin/mourning-page/actions/workflows/release.yml
[npm-image]: https://img.shields.io/npm/v/mourning-page.svg
[npm-url]: https://npmjs.org/package/mourning-page
[downloads-image]: https://img.shields.io/npm/dm/mourning-page.svg
[downloads-url]: https://npmjs.org/package/mourning-page
[code-style-image]: https://img.shields.io/badge/code__style-%40kirklin%2Feslint--config-brightgreen
[code-style-url]: https://github.com/kirklin/eslint-config/

在悼念日下，所有互联网项目能置灰的要跟随置灰处理。全站置灰是非常简单的事情，仅仅需要使用一行 CSS，就能实现全站置灰的方式。而JS支持网页变灰的方式也很简单，就是DOM操作，继续使用样式做处理即可。

本人收集网上常用方案，封装了一个网页一键变灰库

## 安装方式

#### pnpm

```bash
pnpm i mourning-page
```

#### npm

```bash
npm i mourning-page
```

## 使用方式

### 方式一：CSS网页滤镜

```js
import renderGrayPage from "mourning-page"
// CSS_FILTER方式一键变灰
renderGrayPage();
// 一键变灰支持灰度等级（0-100）
renderGrayPage(null, "CSS_FILTER", 95);
// 一键变灰还原1
renderGrayPage(null, "DEFAULT");
// 一键变灰还原方式2
renderGrayPage(null, "CSS_FILTER", 0);
```

#### 参数说明

```
第一个参数EL : 输入一个DOM元素
第二个参数 mourningPageMode:  值为 "CSS_FILTER" 时使用CSS_FILTER滤镜，值为"DEFAULT"时恢复默认色彩,
第三个参数 Filter_Scale = 100 支持（0-100）灰度等级,值为0
```

#### 封装原理

```css
html {
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
    -webkit-filter: grayscale(1);
}

```

### 方式二：`backdrop-filter`

```js
import renderGrayPage from "mourning-page"
renderGrayPage(null,"CSS_BACKDROP_FILTER")
```

#### 封装原理

```css
html {
    position: relative;
}
html::before {
    content: "";
    position: absolute;
    inset: 0;
    backdrop-filter: grayscale(95%);
 	pointer-events: none; //保证页面交互
    z-index: 9999;
}
```

### 方式三：`mix-blend-mode`


```js
import renderGrayPage from "mourning-page"
renderGrayPage(null,"CSS_BACKDROP_FILTER")
```

#### 封装原理

```css
html {
    position: relative;
    background: #fff;
}
html::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 1);
    mix-blend-mode: color;
    pointer-events: none;
    z-index: 9999;
}

```



## License

[MIT](./LICENSE) License &copy; 2022-PRESENT [Kirk Lin](https://github.com/kirklin)
