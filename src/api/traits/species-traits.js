import * as R from 'ramda';
import { utils } from 'utils/utils';

export const getTrait = (traits, traitsToIgnore) => {    

    const allowedTraits = {};

    for (let [key, value] of Object.entries(traits)) {
        if(!R.contains(key, traitsToIgnore)) {
            allowedTraits[key] = value;
        }
    }

    const trait = utils.getRandomObjectProperty(allowedTraits);
    return trait;
};

export const getTraitsPoolForUnits = trait => {
    // create set of numeric answers based on the value

    const traitsPool = [1,2,3,4,5,6,7,8,9];

    if(trait.value.unit === 'MM'){
        // months
        // find distance between first and second and add answers with similar gap
        // e.g. jan-feb produces aug-sep, nov-dec, etc.
    }

    return { traitsPool, help: 'Pick the best range'};
};

export const getTraitsPoolForRoles = trait => {    
    enumKey = trait.value.role; // e.g. name of role, but role of predator; (and possibly need to apply logic as below)
    const traitsPool = ['role1', 'role2', 'role3', 'role4', 'role5', 'role6', 'role7', 'role8', 'role9', 'role10'];
    return { traitsPool, help: 'symbiosis'};
};

export const getTraitValues = (trait, traits) => {

    let traitKeyParts = trait.key.split(' ');
    let enumKey; // e.g map 'leaf variation' to leafVariation
    
    traitKeyParts.forEach((part, index) => {
        if(index === 0) {
            enumKey = part.toLowerCase();
        } else {
            enumKey += utils.capitaliseFirst(part);
        }
    });

    const traitValues = traits[enumKey];

    return traitValues;
};

export const getTraitsPool = (trait, traits) => {

    let traitsPool = [];

    const traitValues = getTraitValues(trait, traits);

    if(traitValues) {
        for (let [key, value] of Object.entries(traitValues)) {
            if(!R.contains(key, [ 'type', 'name', 'help'])) {
                if(key !== trait.key) {
                    traitsPool.push(value);
                }
            }
        }
    }

    let help = traitValues 
            ? traitValues.help || traitValues.name
            : '(no help)';

    return { traitsPool, help };
};