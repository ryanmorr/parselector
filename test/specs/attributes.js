import { expect } from 'chai';
import parse from '../../src/css-selector-parser';

describe('css-selector-parser/attributes', () => {
    it('should tokenize "[attr]" attribute selector', () => {
        expect(parse('[foo]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '',
                                value: ''
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
                                value: 'bar'
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
                                value: 'bar'
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
                                value: 'bar'
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
                                value: 'bar'
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
                                value: 'bar'
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
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle quotes in an attribute selector', () => {
        expect(parse('[foo="bar"]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar'
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
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });

    it('should handle spaces in an attribute selector', () => {
        expect(parse('[foo =  bar]')).to.deep.equal(
            [
                [
                    {
                        attributes: [
                            {
                                name: 'foo',
                                operator: '=',
                                value: 'bar'
                            }
                        ],
                        pseudos: []
                    }
                ]
            ]
        );
    });
});
