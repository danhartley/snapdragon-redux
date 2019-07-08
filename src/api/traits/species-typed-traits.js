import * as R from 'ramda';

import { utils } from 'utils/utils';
import { getTrait, getTraitsPoolForUnits, getTraitsPoolForRoles, getTraitsPool } from 'api/traits/species-traits';
import * as SD from 'api/traits/trait-types';

export const getTypedTraitsForSpecies = (enums, item) => {

    if(item.traits === undefined || item.traits === {} || item.traits.length === 0) return {};

    const traitsToIgnore = [ 'song', 'look-alikes', 'symbionts', 'voice', 'pollination', 'name' ];

    const trait = getTrait(item.traits, traitsToIgnore);
 
    let { traitsPool, help } = 
        trait.value.unit 
            ? getTraitsPoolForUnits(trait)
            : trait.value.role
                ? getTraitsPoolForRoles(trait)
                : getTraitsPool(trait, enums);

    const question = trait.value.unit
                        ? trait.value.value.join('-')
                        : trait.value.value.join(',');
                           
    const variables = trait.value.value.length; 

    const number = variables * 5;

    traitsPool = R.take(number, traitsPool);
    traitsPool = [ ...traitsPool, trait.value.value.join(',') ];    

    const answers = utils.getSetOfAnswers(variables, traitsPool, trait);

    const overrides = { question: 'Match the trait', help, trait };

    return { question, answers, overrides, typedItemTraits: item.traits };
};  