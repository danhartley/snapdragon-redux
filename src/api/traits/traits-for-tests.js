import { utils } from 'utils/utils';
import { traitsHandler } from 'ui/helpers/traits-handler';

export const getTraitsForTests = (units, item, alreadyTestedTraits = []) => {

    if(item.traits === undefined || (Object.keys(item.traits).length === 0 && item.traits.constructor === Object)) return {};

    const excludedTraits = [ ...traitsHandler.getTraitsToExclude(), ...alreadyTestedTraits, 'lookalikes', 'relationships' ].filter(et => et);

    const trait = traitsHandler.getRandomTrait(item.traits, excludedTraits);

    if((Object.keys(trait).length === 0 && trait.constructor === Object)) return {};
 
    let { traitsPool, help } = 
        trait.unit 
            ? traitsHandler.getTraitsPoolForUnits(trait)
            : trait.role
                ? traitsHandler.getTraitsPoolForRoles(trait)
                : traitsHandler.getTraitsPool(trait, units);

    const question = trait.unit
                        ? trait.value.join('-')
                        : trait.value.join(',');
                           
    trait.value = trait.value.map(t => utils.capitaliseFirst(t));

    const answers = traitsHandler.getSetOfTraitAnswers(traitsPool, trait);        

    help = help || trait.key;

    const overrides = { question: 'Match the trait', help, trait };

    return { question, answers, overrides, typedItemTraits: item.traits };
};  