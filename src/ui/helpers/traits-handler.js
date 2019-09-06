import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { utils } from 'utils/utils';

export const getRandomTrait = (traits, traitsToIgnore) => {    

    const allowedTraits = {};

    for (let [key, obj] of Object.entries(traits)) {
        if(!R.contains(key.toLowerCase(), traitsToIgnore)) {
            allowedTraits[key] = obj.unit ? [`${obj.value}${obj.unit}`] : obj.value;
        }
    }

    let trait = utils.getRandomObjectProperty(allowedTraits);
    return trait;
};

export const getTraitsPoolForUnits = trait => {
    // create set of numeric answers based on the value

    const traitsPool = [1,2,3,4,5,6,7,8,9];

    if(trait.unit === 'MM'){
        // months
        // find distance between first and second and add answers with similar gap
        // e.g. jan-feb produces aug-sep, nov-dec, etc.
    }

    return { traitsPool, help: 'Pick the best range'};
};

export const getTraitsPoolForRoles = trait => {    
    enumKey = trait.role; // e.g. name of role, but role of predator; (and possibly need to apply logic as below)
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

    let traitValues = getTraitValues(trait, traits);

    if(!traitValues) {
        traitValues = traits[itemProperties.getRootTraitValue(utils.toCamelCase(trait.key))];
        if(traitValues) traitValues.help = trait.key;
    }

    if(traitValues) {        
        for (let [key, obj] of Object.entries(traitValues)) {
            if(!R.contains(key, [ 'type', 'name', 'help'])) {
                if(key !== trait.key) {
                    traitsPool.push(obj);
                }
            }
        }
    }

    let help = traitValues 
            ? traitValues.help || traitValues.name
            : trait.key;

    return { traitsPool, help };
};

export const getSetOfTraitAnswers = (pool, trait) => {

    let traitSet = trait.value;
        traitSet = traitSet.map(t => t.trim());
        traitSet = utils.shuffleArray(traitSet);

    // take maximum of 2 values from the trait values array

    let traitValues = R.take(2, traitSet);

    let sets = [];
  
    if(traitValues.length === 1) {
        
        sets = [ ...R.take(5, pool.filter(value => value !== trait.value[0])), trait.value[0] ];

    } else {

        // create a 'set' of all possible unique 2-value combinations
        
        pool.forEach(a => {
            pool.forEach( b => {
                if(a !== b) {
                    const exists = sets.filter(s => s === [a,b] || s === [b,a]).length > 0;
                    console.log(exists);
                    if(!exists) { 
                        sets.push([a,b]);
                    }
                }
            })
        });

        sets = R.take(6, utils.shuffleArray(sets));

        // remove any combination that matches the trait value set (in either order) 

        sets = sets.map(set => {
            if(set[0] !== traitSet[0] && set[1] !== traitSet[1] || set[0] !== traitSet[1] && set[1] !== traitSet[0]) {
                return set;
            }
        }).filter(s => s);

        sets = R.take(5, sets);
        sets = [ ...sets, traitSet ];

        if(sets.length === 0) {
            sets = ['a', 'b', trait.value];
        }

        console.log(sets);
    }
  
    return utils.shuffleArray(sets);
};

export const getTraitByKey = (traits, traitKey) => {
    return traits[Object.keys(traits).find(key => key === traitKey)];
}

export const getTraitValueByKey = (traits, traitKey) => {
    const trait = getTraitByKey(traits, traitKey);
    if(trait) return trait.value;
}

export const hasTraitPropeties = traits => {
    for(var prop in traits) {
        if (traits.hasOwnProperty(prop)) {
            return true;
        }
    }
};

export const getLinkedTaxaTraits = traits => {
    
    const taxaTraits = [];

    for (let [key, obj] of Object.entries(traits)) {
        if(obj.type) {
            taxaTraits.push({ name: key, value: obj.value, type: obj.type });
        } else if(key === 'lookalikes') {
            taxaTraits.push({ name: key, value: obj.value, type: 'lookalike' });
        } else if(key === 'symbionts') {
            taxaTraits.push({ name: key, value: obj.value, type: 'symbionts' });
        }
    }

    return taxaTraits;
};

export const getTraitsToExclude = () => {
    return [ 
        'symbionts', 'voice', 'pollination', 'name', 
        'units', 'song', 'uk rank',
        'colour', 'bark colour', 'height',
        'physiology', 'characteristic', 'description',
        'usage', 'habitat'
    ];
};
export const handleUnit = unit => {

    unit = unit || '';

    switch(unit) {
        case 'DD':
            return ' days';
        case 'MM':
            return '';
        case 'YY':
            return ' years';
     default:
        return unit;   
    }    
};

export const convertTraitsToNameValuePairsArray = (traits, traitsToExclude, item) => {

    if(!hasTraitPropeties(traits)) return {};
    
    const includedTraits = [];

    for (let [key, obj] of Object.entries(traits)) {
        if(!R.contains(key, traitsToExclude)) {
            if(key === 'lookalikes') {
                obj.forEach(species => {
                    includedTraits.push({
                        name: key, 
                        value: [species.lookalike.name],
                        description: species.description, lookalike: { name: species.lookalike.name, description: species.lookalike.description } 
                    }); 
                });
            } else if(key === 'relationships') {
                obj.forEach(species => {
                    includedTraits.push({ 
                        name: key, value: [species.symbiont.name],
                    }); 
                });
            } else {
                includedTraits.push({ name: key, value: obj.value, unit: handleUnit(obj.unit), type: obj.type || '' });
            }
        }
    }
    
    return includedTraits;
};