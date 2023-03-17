import { expect } from 'chai';
import parse from '../../src/parse.js';

describe('parse/attributes', () => {
    it('should tokenize "[attr]" attribute selector', () => {
        expect(parse('[foo]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '',
                                value: '',
                                ignoreCase: false
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

    it('should tokenize "[attr~=value]" attribute selector', () => {
        expect(parse('[foo~=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
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

    it('should tokenize "[attr|=value]" attribute selector', () => {
        expect(parse('[foo|=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '|=',
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

    it('should tokenize "[attr^=value]" attribute selector', () => {
        expect(parse('[foo^=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '^=',
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

    it('should tokenize "[attr$=value]" attribute selector', () => {
        expect(parse('[foo$=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '$=',
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

    it('should tokenize "[attr*=value]" attribute selector', () => {
        expect(parse('[foo*=bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '*=',
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

    it('should support quotes in an attribute selector', () => {
        expect(parse('[foo="bar"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar',
                                ignoreCase: false
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

    it('should support case-insensitive attribute selectors', () => {
        expect(parse('[foo="bar" i]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar',
                                ignoreCase: true
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should support spaces in an attribute selector', () => {
        expect(parse('[foo $=  bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '$=',
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

    it('should support quoted attributes with spaces', () => {
        expect(parse('[foo *=  "bar"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '*=',
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

    it('should support reserved selector characters within an attribute value', () => {
        expect(parse('[foo="[(])~=>+"" ,\':.#"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: '[(])~=>+"" ,\':.#',
                                ignoreCase: false
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should support attribute values containing a newline character', () => {
        expect(parse('[foo="\nsome text\n"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: '\nsome text\n',
                                ignoreCase: false
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should support attributes with escaped characters', () => {
        expect(parse('[foo=bar\\[baz\\]]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar[baz]',
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
