import { expect } from 'chai';
import parselector from '../../src/parselector.js';

describe('grouping', () => {
    it('should tokenize selector groups', () => {
        expect(parselector('div, #foo, .bar, [attr], :pseudo, ::first-letter')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
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
                ],
                [
                    {
                        nodeName: null,
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'bar',
                                ignoreCase: false
                            }
                        ],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
                        attributes: [
                            {
                                name: 'attr',
                                operator: '',
                                value: '',
                                ignoreCase: false
                            }
                        ],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'pseudo',
                                value: ''
                            }
                        ],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: 'first-letter'
                    }
                ]
            ]
        );
    });
    
    it('should tokenize selector groups with no whitespace', () => {
        expect(parselector('div,#foo,.bar,[attr],:pseudo')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
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
                ],
                [
                    {
                        nodeName: null,
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'bar',
                                ignoreCase: false
                            }
                        ],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
                        attributes: [
                            {
                                name: 'attr',
                                operator: '',
                                value: '',
                                ignoreCase: false
                            }
                        ],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'pseudo',
                                value: ''
                            }
                        ],
                        pseudoElement: null
                    }
                ]
            ]
        );
    });
    
    it('should tokenize selector groups with different whitespace', () => {
        const selector = `
            div, #foo , .bar      ,[attr],   :pseudo,
            ::before
        `;
        expect(parselector(selector)).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
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
                ],
                [
                    {
                        nodeName: null,
                        attributes: [
                            {
                                name: 'class',
                                operator: '~=',
                                value: 'bar',
                                ignoreCase: false
                            }
                        ],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
                        attributes: [
                            {
                                name: 'attr',
                                operator: '',
                                value: '',
                                ignoreCase: false
                            }
                        ],
                        pseudoClasses: [],
                        pseudoElement: null
                    }
                ],
                [
                    {
                        nodeName: null,
                        attributes: [],
                        pseudoClasses: [
                            {
                                name: 'pseudo',
                                value: ''
                            }
                        ],
                        pseudoElement: null
                    }
                ],
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
