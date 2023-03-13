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
import { RenderMourningPage } from "mourning-page";
RenderMourningPage.render({
  selector: "html",
  mode: "CSS_FILTER",
  filterScale: 100,
  callback: () => {
    console.log("Mourning page applied successfully!");
  },
});
```

#### 配置选项
MourningPage 构造函数接受一个配置对象，该对象包含以下属性：

- `selector` (string) - 选择要应用悼念页面样式的 DOM 元素选择器，默认为 "html"。
- `mode` (MourningPageMode) - 表示要使用的悼念页面模式的枚举值。可以是 "DEFAULT"、"CSS_FILTER"、"CSS_MIX_BLEND_MODE"、"CSS_BACKDROP_FILTER" 中的一个。
- `filterScale` (number) - 一个介于 0 和 100 之间的数字，表示要应用的滤镜程度，默认为 100。
- `callback` (Function) - 可选的回调函数，当悼念页面应用完成或发生错误时会被调用。


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
import { RenderMourningPage } from "mourning-page";
RenderMourningPage.render({
  selector: "html",
  mode: "CSS_BACKDROP_FILTER",
  filterScale: 100,
  callback: () => {
    console.log("Mourning page applied successfully!");
  },
});
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
import { RenderMourningPage } from "mourning-page";
RenderMourningPage.render({
  selector: "html",
  mode: "CSS_MIX_BLEND_MODE",
  filterScale: 100,
  callback: () => {
    console.log("Mourning page applied successfully!");
  },
});
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
