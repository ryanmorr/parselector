import { expect } from 'chai';
import parselector from '../../src/parselector.js';

describe('simple', () => {
    it('should tokenize the universal selector', () => {
        expect(parselector('*')).to.deep.equal(
            [
                [
                    {
                        nodeName: '*',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });

    it('should tokenize a tag selector', () => {
        expect(parselector('div')).to.deep.equal(
            [
                [
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

    it('should tokenize an ID selector', () => {
        expect(parselector('#foo')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'id',
                                operator: '=',
                                value: 'foo',
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

    it('should tokenize a single class selector', () => {
        expect(parselector('.foo')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'foo',
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

    it('should tokenize a multiple class selector', () => {
        expect(parselector('.foo.bar.baz')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'foo',
                                ignoreCase: false
                            },
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'bar',
                                ignoreCase: false
                            },
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'baz',
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
