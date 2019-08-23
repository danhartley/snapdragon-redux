import * as R from 'ramda';

import { utils } from 'utils/utils';
import { getRandomTrait, getTraitsPoolForUnits, getTraitsPoolForRoles, getTraitsPool, getSetOfTraitAnswers, getTraitsToExclude } from 'ui/helpers/traits-handler';

export const getTraitsForTests = (enums, item, alreadyTestedTraits = []) => {

    if(item.traits === undefined || (Object.keys(item.traits).length === 0 && item.traits.constructor === Object)) return {};

    const excludedTraits = [ ...getTraitsToExclude(), ...alreadyTestedTraits ];

    const trait = getRandomTrait(item.traits, excludedTraits);

    if((Object.keys(trait).length === 0 && trait.constructor === Object)) return {};
 
    let { traitsPool, help } = 
        trait.unit 
            ? getTraitsPoolForUnits(trait)
            : trait.role
                ? getTraitsPoolForRoles(trait)
                : getTraitsPool(trait, enums);

    const question = trait.unit
                        ? trait.value.join('-')
                        : trait.value.join(', ');
                           
    const variables = trait.value.length; 

    trait.value = trait.value.map(t => utils.capitaliseFirst(t));

    const number = variables * 5;

    traitsPool = R.take(number, traitsPool.filter(t => t.toLowerCase() !== trait.value.join(', ').toLowerCase()));
    traitsPool = [ ...traitsPool, trait.value.join(', ') ];    

    const answers = getSetOfTraitAnswers(variables, traitsPool, trait);

    help = help || trait.key;

    const overrides = { question: 'Match the trait', help, trait };

    return { question, answers, overrides, typedItemTraits: item.traits };
};  