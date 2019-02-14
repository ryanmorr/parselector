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
});
