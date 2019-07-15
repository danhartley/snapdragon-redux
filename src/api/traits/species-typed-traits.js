import * as R from 'ramda';

import { getRandomTrait, getTraitsPoolForUnits, getTraitsPoolForRoles, getTraitsPool, getSetOfTraitAnswers, getTraitsToExclude } from 'ui/helpers/traits-handler';

export const getTypedTraitsForSpecies = (enums, item) => {

    if(item.traits === undefined || (Object.keys(item.traits).length === 0 && item.traits.constructor === Object)) return {};

    const trait = getRandomTrait(item.traits, getTraitsToExclude());

    if((Object.keys(trait).length === 0 && trait.constructor === Object)) return {};
 
    let { traitsPool, help } = 
        trait.unit 
            ? getTraitsPoolForUnits(trait)
            : trait.role
                ? getTraitsPoolForRoles(trait)
                : getTraitsPool(trait, enums);

    const question = trait.unit
                        ? trait.value.join('-')
                        : trait.value.join(',');
                           
    const variables = trait.value.length; 

    const number = variables * 5;

    traitsPool = R.take(number, traitsPool);
    traitsPool = [ ...traitsPool, trait.value.join(',') ];    

    const answers = getSetOfTraitAnswers(variables, traitsPool, trait);

    const overrides = { question: 'Match the trait', help, trait };

    return { question, answers, overrides, typedItemTraits: item.traits };
};  