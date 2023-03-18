import { expect } from 'chai';
import parselector from '../../src/parselector.js';

describe('combinators', () => {
    it('should tokenize a descendant combinator', () => {
        expect(parselector('div span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    ' ',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a child combinator', () => {
        expect(parselector('div > span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    '>',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize an adjacent sibling combinator', () => {
        expect(parselector('div + span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    '+',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a general sibling combinator', () => {
        expect(parselector('div ~ span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    '~',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a parent combinator', () => {
        expect(parselector('div < span')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    '<',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading child combinator', () => {
        expect(parselector('> div')).to.deep.equal(
            [
                [
                    '>',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading parent combinator', () => {
        expect(parselector('< div')).to.deep.equal(
            [
                [
                    '<',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading adjacent sibling combinator', () => {
        expect(parselector('+ div')).to.deep.equal(
            [
                [
                    '+',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a leading general sibling combinator', () => {
        expect(parselector('~ div')).to.deep.equal(
            [
                [
                    '~',
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a descendant combinator with whitespace', () => {
        expect(parselector('div\t \n \tspan')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    ' ',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize combinators with no whitespace', () => {
        expect(parselector('div+span~em>i')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    '+',
                    {
                        nodeName: 'span',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    '~',
                    {
                        nodeName: 'em',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    },
                    '>',
                    {
                        nodeName: 'i',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });
});
