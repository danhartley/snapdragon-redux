import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { getTraits } from 'api/traits/traits';
import * as SD from 'api/traits/trait-types';

export const getTraitTests = (collection, itemsInThisRound) => {

    if(itemsInThisRound === undefined) return [];

    // But for now…

    const tests = itemsInThisRound.map(item => {

        const { question, answers, overrides } = getTraitTest(collection, item);

        if(!question) return {};

        return {
            item,
            question,
            answers,
            overrides
        }
    });

    return tests;
}

const getTraitTest = (collection, item) => {

    const { enums } = store.getState();

    const speciesTraits = getTraits(enums, item).find(trait => trait.name === item.name);

    if(!speciesTraits) return {};

    const typedSpeciesTraits = SD.typedSpecies(enums, speciesTraits);

    if(!typedSpeciesTraits.length) return {};

    const trait = R.take(1, utils.shuffleArray(typedSpeciesTraits))[0];

    const help =  trait.help ? `(${trait.help})` : `(${trait.name})`;

    let traits = [ ];
    let propsToIgnore = [ 'type', 'name', 'help'];

    if(trait.type) {
        Object.keys(SD.enums[trait.type]).forEach(key => {
            let value = SD.enums[trait.type][key];
            if(!R.contains(key, propsToIgnore)) {
                traits.push(value);
            }            
        });
    }

    const question = trait.value.value 
                        ? trait.value.value
                        : trait.value.key
                            ? trait.value.key
                            : trait.value;
                           
    const variables = question.split(',').length;                                
    const number = variables * 5;

    traits = R.take(number, traits.filter(t => t !== trait.value));
    traits = [ ...traits, trait.value ];

    const pool = traits.map(trait => {
        let t = trait.value 
                    ? trait.value 
                    : trait.key
                        ? trait.value 
                        : trait;
        
        if(trait.indexOf(',') > -1) {
            t = null;
        }

        return t;
    }).filter(item => item);

    const answers = utils.getSetOfAnswers(variables, pool, trait);

    const overrides = { question: 'Match the trait', help };

    return { question, answers, overrides };
};