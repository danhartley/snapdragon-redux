import { itemProperties } from 'ui/helpers/data-checking';

export const getSpeciesEpithets = items => {
    
    const epithets = items.map( (item, index) => {
        const species = itemProperties.speciesName(item.name);
        const latin = itemProperties.latin(species);
        const binomial = item.name;        
        return { ...latin, binomial, index };
    });

    return { name: 'epithets', items: epithets.filter(epithet => epithet.latin)};
};