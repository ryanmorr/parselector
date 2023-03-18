import { expect } from 'chai';
import parselector from '../../src/parselector.js';

describe('pseudoClasses', () => {
    it('should tokenize pseudo-class selectors', () => {
        expect(parselector(':checked')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'checked',
                                value: ''
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize pseudo-class selectors with a value', () => {
        expect(parselector(':nth-child(even)')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'nth-child',
                                value: 'even'
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support quoted pseudo values', () => {
        expect(parselector(':contains("foo")')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'contains',
                                value: 'foo'
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );

        expect(parselector(':contains(\'foo\')')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'contains',
                                value: 'foo'
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support reserved selector characters within a pseudo value', () => {
        expect(parselector(':foo([(])~=>+"" ,\':.#)')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'foo',
                                value: '[(])~=>+"" ,\':.#'
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support pseudo values with escaped characters', () => {
        expect(parselector(':foo(\\(bar\\))')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'foo',
                                value: '(bar)'
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should support pseudo values containing a selector string', () => {
        expect(parselector(':not(div#foo.bar.baz[foo=bar][foo $= "bar"]:foo(bar):baz("qux"))')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'not',
                                value: 'div#foo.bar.baz[foo=bar][foo $= "bar"]:foo(bar):baz("qux")'
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize pseudo-element selectors', () => {
        expect(parselector('::before')).to.deep.equal(
            [
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: 'before'
                    }
                ]
            ]
        );
    });
});
