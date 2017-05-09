# react-formform

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Dynamic forms with React.

## Why FormForm?

- Create forms that are controlled by a single state object
- Dynamic forms
- Inline forms that can represent related model

##### FormForm properties

| Property | Type | Description
:---|:---|:---
| `values` | object | Object that holds the state of all form-values `{[name: string]: any}` |
| `errors` | object | Object that holds validation error messages `{[name: string]: any}` |
| `id` | string | Unique identifier for the form-tag (optional) |
| `className` | string | Class name for the form-tag (optional) |
| `onValuesChange` | function | Update function that is called when the form-values-state should change. Expected signature: `({[name: string]: any}) => void` |
| `onErrorsChange` | function | Update function that is called when the form-errors-state should change. Expected signature: `({[name: string]: any}) => void` |
| `isHorizontal` | bool | Render an horizontal form |
| `col1` | number | Grid with for the label column (used when isHorizontal is true) |
| `col2` | number | Grid with for the input column (used when isHorizontal is true) |
| `namePrefix` | string | Name prefix for the state objects (optional) |


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
