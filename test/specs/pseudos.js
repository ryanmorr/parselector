import { expect } from 'chai';
import parse from '../../src/css-selector-parser';

describe('css-selector-parser/pseudos', () => {
    it('should tokenize pseudo-class selectors', () => {
        expect(parse(':checked')).to.deep.equal(
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
        expect(parse(':nth-child(even)')).to.deep.equal(
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
        expect(parse(':contains("foo")')).to.deep.equal(
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

        expect(parse(':contains(\'foo\')')).to.deep.equal(
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
        expect(parse(':foo([(])~=> ,\':.#)')).to.deep.equal(
            [
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'foo',
                                value: '[(])~=> ,\':.#'
                            }
                        ]
                    }
                ]
            ]
        );
    });

    it('should support pseudo values with escaped characters', () => {
        expect(parse(':foo(\\(bar\\))')).to.deep.equal(
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
        expect(parse(':not(div#foo.bar.baz[foo=bar][foo $= "bar"]:foo(bar):baz("qux"))')).to.deep.equal(
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
