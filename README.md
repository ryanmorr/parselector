# css-selector-parser

[![Version Badge][version-image]][project-url]
[![Build Status][build-image]][build-url]
[![License][license-image]][license-url]

> Tokenize a CSS selector string

## Install

Download the [development](http://github.com/ryanmorr/css-selector-parser/raw/master/dist/parse.js) or [minified](http://github.com/ryanmorr/css-selector-parser/raw/master/dist/parse.min.js) version, or install via NPM:

``` sh
npm install @ryanmorr/css-selector-parser
```

## Usage

``` javascript
import parse from '@ryanmorr/css-selector-parser';

parse('#foo[attr=value] > div:empty, .foo.bar + [attr $= "value" i]:not(.baz[qux])');
```

Generates the following structure:

``` javascript
[
    [
        {
            attributes: [
                {
                    name: 'id',
                    operator: '=',
                    value: 'foo',
                    ignoreCase: false
                },
                {
                    name: 'attr',
                    operator: '=',
                    value: 'value',
                    ignoreCase: false
                }
            ],
            pseudos: []
        },
        '>',
        {
            nodeName: 'div',
            attributes: [],
            pseudos: [
                {
                    name: 'empty',
                    value: ''
                }
            ]
        }
    ],
    [
        {
            attributes: [
                {
                    name: 'class',
                    operator: '~=',
                    value: 'foo',
                    ignoreCase: false
                },
                {
                    name: 'class',
                    operator: '~=',
                    value: 'bar',
                    ignoreCase: false
                }
            ],
            pseudos: []
        },
        '+',
        {
            attributes: [
                {
                    name: 'attr',
                    operator: '$=',
                    value: 'value',
                    ignoreCase: true
                }
            ],
            pseudos: [
                {
                    name: 'not',
                    value: '.baz[qux]'
                }
            ]
        }
    ]
]
```

## License

This project is dedicated to the public domain as described by the [Unlicense](http://unlicense.org/).

[project-url]: https://github.com/ryanmorr/css-selector-parser
[version-image]: https://badge.fury.io/gh/ryanmorr%2Fcss-selector-parser.svg
[build-url]: https://travis-ci.org/ryanmorr/css-selector-parser
[build-image]: https://travis-ci.org/ryanmorr/css-selector-parser.svg
[license-image]: https://img.shields.io/badge/license-Unlicense-blue.svg
[license-url]: UNLICENSE