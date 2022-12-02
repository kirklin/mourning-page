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

## Usage

### Way one
```javascript
import renderGrayPage from "mourning-page"
renderGrayPage();
```
```javascript
import renderGrayPage from "mourning-page"
renderGrayPage(null,"CSS_FILTER",100);
```
### Way two
```javascript
import renderGrayPage from "mourning-page"
renderGrayPage(null,"CSS_MIX_BLEND_MODE")
```

### Way three
```javascript
import renderGrayPage from "mourning-page"
renderGrayPage(null,"CSS_BACKDROP_FILTER")
```

### Install

#### pnpm
```bash
pnpm i mourning-page
```

#### npm
```bash
npm i mourning-page
```

## License

[MIT](./LICENSE) License &copy; 2022-PRESENT [Kirk Lin](https://github.com/kirklin)
