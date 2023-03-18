import { expect } from 'chai';
import parselector from '../../src/parselector.js';

describe('pseudos', () => {
    it('should tokenize pseudo-class selectors', () => {
        expect(parselector(':checked')).to.deep.equal(
            [
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'checked',
                                value: ''
                            }
                        ]
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
                        attributes: [],
                        pseudos: [
                            {
                                name: 'nth-child',
                                value: 'even'
                            }
                        ]
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
                        attributes: [],
                        pseudos: [
                            {
                                name: 'contains',
                                value: 'foo'
                            }
                        ]
                    }
                ]
            ]
        );

        expect(parselector(':contains(\'foo\')')).to.deep.equal(
            [
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'contains',
                                value: 'foo'
                            }
                        ]
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
                        attributes: [],
                        pseudos: [
                            {
                                name: 'foo',
                                value: '[(])~=>+"" ,\':.#'
                            }
                        ]
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
                        attributes: [],
                        pseudos: [
                            {
                                name: 'foo',
                                value: '(bar)'
                            }
                        ]
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
                        attributes: [],
                        pseudos: [
                            {
                                name: 'not',
                                value: 'div#foo.bar.baz[foo=bar][foo $= "bar"]:foo(bar):baz("qux")'
                            }
                        ]
                    }
                ]
            ]
        );
    });
});
