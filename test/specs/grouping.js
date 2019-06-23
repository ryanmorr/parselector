import { expect } from 'chai';
import parse from '../../src/parse';

describe('parse/grouping', () => {
    it('should tokenize selector groups', () => {
        expect(parse('div, #foo, .bar, [attr], :pseudo')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
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
                        pseudos: []
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
                        pseudos: []
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
                        pseudos: []
                    }
                ],
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'pseudo',
                                value: ''
                            }
                        ]
                    }
                ]
            ]
        );
    });
    
    it('should tokenize selector groups with no whitespace', () => {
        expect(parse('div,#foo,.bar,[attr],:pseudo')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
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
                        pseudos: []
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
                        pseudos: []
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
                        pseudos: []
                    }
                ],
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'pseudo',
                                value: ''
                            }
                        ]
                    }
                ]
            ]
        );
    });
    
    it('should tokenize selector groups with different whitespace', () => {
        expect(parse('div, #foo , .bar      ,[attr],   :pseudo')).to.deep.equal(
            [
                [
                    {
                        nodeName: 'div',
                        attributes: [],
                        pseudos: []
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
                        pseudos: []
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
                        pseudos: []
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
                        pseudos: []
                    }
                ],
                [
                    {
                        attributes: [],
                        pseudos: [
                            {
                                name: 'pseudo',
                                value: ''
                            }
                        ]
                    }
                ]
            ]
        );
    });
});
