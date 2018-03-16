# react-centpn

[![npm](https://img.shields.io/npm/v/react-centpn.svg?style=flat-square)](https://www.npmjs.com/package/react-centpn)
[![npm](https://img.shields.io/npm/dm/react-centpn.svg?style=flat-square)](https://www.npmjs.com/package/react-centpn)
[![Travis](https://img.shields.io/travis/kthjm/react-centpn.svg?style=flat-square)](https://travis-ci.org/kthjm/react-centpn)
[![Codecov](https://img.shields.io/codecov/c/github/kthjm/react-centpn.svg?style=flat-square)](https://codecov.io/gh/kthjm/react-centpn)
[![cdn](https://img.shields.io/badge/jsdelivr-latest-e84d3c.svg?style=flat-square)](https://cdn.jsdelivr.net/npm/react-centpn/min.js)

Simple react component to center children vertically.

## Installation
```shell
yarn add react-centpn
```

## Usage
```js
import Center from 'react-centpn'

export default () =>
  <div {...{ style: { position: 'relative', height: '100%' } }}>
    <Center {...{ top: -20 }}>
      <div {...{ style: { height: 100 } }}></div>
    </Center>
  </div>
```

## Props
#### `top: number | string`

Used as `calc(50% - ${contentHeight / 2} + (props.top))`.

`props.top` as number will be processed `${props.top}px`.

## License
MIT (http://opensource.org/licenses/MIT)