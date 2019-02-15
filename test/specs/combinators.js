import { expect } from 'chai';
import parse from '../../src/css-selector-parser';

describe('css-selector-parser/combinators', () => {
    it('should tokenize a decendent combinator', () => {
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

    it('should tokenize a decendent combinator with whitespace', () => {
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
});
