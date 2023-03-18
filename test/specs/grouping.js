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
        expect(parselector('div, #foo , .bar      ,[attr],   :pseudo')).to.deep.equal(
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
});
