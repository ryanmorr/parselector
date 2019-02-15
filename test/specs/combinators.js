import { expect } from 'chai';
import parse from '../../src/parse';

describe('parse/combinators', () => {
    it('should tokenize a descendant combinator', () => {
        expect(parse('div span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    },
                    ' ',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a child combinator', () => {
        expect(parse('div > span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    },
                    '>',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize an adjacent sibling combinator', () => {
        expect(parse('div + span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    },
                    '+',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a general sibling combinator', () => {
        expect(parse('div ~ span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    },
                    '~',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a parent combinator', () => {
        expect(parse('div < span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    },
                    '<',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading child combinator', () => {
        expect(parse('> div')).to.deep.equal(
            [
                [
                    '>',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading parent combinator', () => {
        expect(parse('< div')).to.deep.equal(
            [
                [
                    '<',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading adjacent sibling combinator', () => {
        expect(parse('+ div')).to.deep.equal(
            [
                [
                    '+',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading general sibling combinator', () => {
        expect(parse('~ div')).to.deep.equal(
            [
                [
                    '~',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize a descendant combinator with whitespace', () => {
        expect(parse('div\t \n \tspan')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    },
                    ' ',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should tokenize combinators with no whitespace', () => {
        expect(parse('div+span~em>i')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
                    },
                    '+',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudos: []
                    },
                    '~',
                    {
                        nodeName: 'em',
                        attributes: [],
                        pseudos: []
                    },
                    '>',
                    {
                        nodeName: 'i',
                        attributes: [],
                        pseudos: []
                    }
                ]
            ]
        );
    });
});
