import * as R from 'ramda';

import { utils } from 'utils/utils';
import { getTraits } from 'api/traits/traits';
import * as SD from 'api/traits/trait-types';

export const getTypedTraitsForSpecies = (enums, item) => {

    const traitsToIgnore = [ 'song', 'look-alikes' ]; // add flag so that this does not need to be updated e.g. ignore: true in the trait data

    let itemTraits = getTraits(enums).find(trait => trait.name === item.name);

    if(!itemTraits) return {};

        itemTraits = itemTraits.traits.filter(trait => !R.contains(trait.name, traitsToIgnore));
        itemTraits = { name: item.name, traits: itemTraits };

    if(!itemTraits) return {};

    const typedItemTraits = SD.typedSpecies(enums, itemTraits);

    if(!typedItemTraits.length) return {};

    const trait = R.take(1, utils.shuffleArray(typedItemTraits))[0];

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

    const overrides = { question: 'Match the trait', help, trait };

    return { question, answers, overrides, traits };
};  