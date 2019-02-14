import { expect } from 'chai';
import parse from '../../src/css-selector-parser';

describe('css-selector-parser/complex', () => {
    it('should tokenize complicated selectors', () => {
        expect(parse('#foo.bar:first-child:not(:empty) ~ div[foo*=abc][bar="123"] + span i, section>.baz~[attr]+:disabled')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'id',
                                operator: '=',
                                value: 'foo'
                            },
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'bar'
                            }
                        ],
                        pseudos: [
                            {
                                name: 'first-child',
                                value: ''
                            },
                            {
                                name: 'not',
                                value: ':empty'
                            }
                        ]
                    },
                    '~',
                    {
                        nodeName: 'div',
                        attributes: [
                            {
                                name: 'foo',
                                operator: '*=',
                                value: 'abc'
                            },
                            {
                                name: 'bar',
                                operator: '=',
                                value: '123'
                            }
                        ],
                        pseudos: []
                    },
                    '+',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    },
                    ' ',
                    {
                        nodeName: 'i',
                        attributes: [],
                        pseudos: []
                    }
                ],
                [
                    {
                        nodeName: 'section',
                        attributes: [],
                        pseudos: []
                    },
                    '>',
                    {
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'baz'
                            }
                        ],
                        pseudos: []
                    },
                    '~',
                    {
                        attributes: [
                            {
                                name: 'attr',
                                operator: '',
                                value: ''
                            }
                        ],
                        pseudos: []
                    },
                    '+',
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'disabled',
                                value: ''
                            }
                        ]
                    }
                ]
            ]
        );
    });
});
