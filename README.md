# parselector

[![Version Badge][version-image]][project-url]
[![License][license-image]][license-url]
[![Build Status][build-image]][build-url]

> Parse a CSS selector string

## Install

Download the [CJS](https://github.com/ryanmorr/parselector/raw/master/dist/cjs/parselector.js), [ESM](https://github.com/ryanmorr/parselector/raw/master/dist/esm/parselector.js), [UMD](https://github.com/ryanmorr/parselector/raw/master/dist/umd/parselector.js) versions or install via NPM:

``` sh
npm install @ryanmorr/parselector
```

## Usage

Provide a selector string and get a two-dimensional array composed of each selector group in the first array and the tokens for a selector sequence in the second array.

``` javascript
import parselector from '@ryanmorr/parselector';

parselector('#foo[attr$="value" i] > div:not(.bar), .baz span::before');
```

Generates the following AST structure:

``` javascript
[
    [
        {
            nodeName: null,
            attributes: [
                {
                    name: 'id',
                    operator: '=',
                    value: 'foo',
                    ignoreCase: false
                },
                {
                    name: 'attr',
                    operator: '$=',
                    value: 'value',
                    ignoreCase: true
                }
            ],
            pseudoClasses: []
        },
        '>',
        {
            nodeName: 'div',
            attributes: [],
            pseudoClasses: [
                {
                    name: 'not',
                    value: '.bar'
                }
            ]
        }
    ],
    [
        {
            nodeName: null,
            attributes: [
                {
                    name: 'class',
                    operator: '~=',
                    value: 'baz',
                    ignoreCase: false
                }
            ],
            pseudoClasses: []
        },
        ' ',
        {
            nodeName: 'span',
            attributes: [],
            pseudoClasses: [],
            pseudoElement: 'before'
        }
    ]
]
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/parselector
[version-image]: https://img.shields.io/github/package-json/v/ryanmorr/parselector?color=blue&style=flat-square
[build-url]: https://github.com/ryanmorr/parselector/actions
[build-image]: https://img.shields.io/github/actions/workflow/status/ryanmorr/parselector/node.js.yml?style=flat-square
[license-image]: https://img.shields.io/github/license/ryanmorr/parselector?color=blue&style=flat-square
[license-url]: UNLICENSE