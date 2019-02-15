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

    it('should handle quotes within a pseudo value', () => {
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

    it('should handle reserved selector characters within an attribute value', () => {
        expect(parse(':foo([]()~=> ,\':.#)')).to.deep.equal(
            [
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'foo',
                                value: '[]()~=> ,\':.#'
                            }
                        ]
                    }
                ]
            ]
        );
    });

    it('should handle pseudo value with escaped characters', () => {
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

    it('should handle pseudo value containing a selector string', () => {
        expect(parse(':not(div#foo.bar.baz[foo=bar][foo $= "bar"]:foo:bar("baz"))')).to.deep.equal(
            [
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'not',
                                value: 'div#foo.bar.baz[foo=bar][foo $= "bar"]:foo:bar("baz")'
                            }
                        ]
                    }
                ]
            ]
        );
    });
});
