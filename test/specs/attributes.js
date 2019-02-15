import { expect } from 'chai';
import parse from '../../src/css-selector-parser';

describe('css-selector-parser/attributes', () => {
    it('should tokenize "[attr]" attribute selector', () => {
        expect(parse('[foo]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '',
                                value: ''
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr=value]" attribute selector', () => {
        expect(parse('[foo=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr~=value]" attribute selector', () => {
        expect(parse('[foo~=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '~=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr|=value]" attribute selector', () => {
        expect(parse('[foo|=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '|=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr^=value]" attribute selector', () => {
        expect(parse('[foo^=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '^=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr$=value]" attribute selector', () => {
        expect(parse('[foo$=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '$=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr*=value]" attribute selector', () => {
        expect(parse('[foo*=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '*=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle quotes in an attribute selector', () => {
        expect(parse('[foo="bar"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );

        expect(parse('[foo$=\'bar\']')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '$=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle spaces in an attribute selector', () => {
        expect(parse('[foo $=  bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '$=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle quoted attributes with spaces', () => {
        expect(parse('[foo *=  "bar"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '*=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle reserved selector characters within an attribute value', () => {
        expect(parse('[foo="[]()~=> ,\':.#"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: '[]()~=> ,\':.#'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle attribute values containing a newline character', () => {
        expect(parse('[foo="\nsome text\n"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: '\nsome text\n'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle attributes with escaped characters', () => {
        expect(parse('[foo=bar\\[baz\\]]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar[baz]'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });
});
