import { expect } from 'chai';
import parse from '../../src/css-selector-parser';

describe('css-selector-parser/simple', () => {
    it('should tokenize the universal selector', () => {
        expect(parse('*')).to.deep.equal(
            [
                [
                    {
                        nodeName: '*',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a tag selector', () => {
        expect(parse('div')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize an ID selector', () => {
        expect(parse('#foo')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'id',
                                operator: '=',
                                value: 'foo',
                                ignoreCase: false
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a single class selector', () => {
        expect(parse('.foo')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'foo',
                                ignoreCase: false
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a multiple class selector', () => {
        expect(parse('.foo.bar.baz')).to.deep.equal(
            [
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
                            },
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'baz',
                                ignoreCase: false
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize selector groups', () => {
        expect(parse('div, #foo, .bar')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    }
                ],
                [
                    {
                        attributes: [
                            {
                                name: 'id',
                                operator: '=',
                                value: 'foo',
                                ignoreCase: false
                            }
                        ],
                        pseudos: []
                    }
                ],
                [
                    {
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'bar',
                                ignoreCase: false
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });
});
