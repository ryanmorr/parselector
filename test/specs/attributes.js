import { expect } from 'chai';
import parselector from '../../src/parselector.js';

describe('attributes', () => {
    it('should tokenize "[attr]" attribute selector', () => {
        expect(parselector('[foo]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr=value]" attribute selector', () => {
        expect(parselector('[foo=bar]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr~=value]" attribute selector', () => {
        expect(parselector('[foo~=bar]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr|=value]" attribute selector', () => {
        expect(parselector('[foo|=bar]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr^=value]" attribute selector', () => {
        expect(parselector('[foo^=bar]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr$=value]" attribute selector', () => {
        expect(parselector('[foo$=bar]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize "[attr*=value]" attribute selector', () => {
        expect(parselector('[foo*=bar]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support quotes in an attribute selector', () => {
        expect(parselector('[foo="bar"]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );

        expect(parselector('[foo$=\'bar\']')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support case-insensitive attribute selectors', () => {
        expect(parselector('[foo="bar" i]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support spaces in an attribute selector', () => {
        expect(parselector('[foo $=  bar]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support quoted attributes with spaces', () => {
        expect(parselector('[foo *=  "bar"]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support reserved selector characters within an attribute value', () => {
        expect(parselector('[foo="[(])~=>+"" ,\':.#"]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support attribute values containing a newline character', () => {
        expect(parselector('[foo="\nsome text\n"]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support attributes with escaped characters', () => {
        expect(parselector('[foo=bar\\[baz\\]]')).to.deep.equal(
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
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });
});
