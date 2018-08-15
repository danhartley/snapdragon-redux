import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';

export const getSpeciesEpithets = items => {
    
    let epithets = items.map( (item, index) => {
        const genus = itemProperties.genusName(item.name);
        const species = itemProperties.speciesName(item.name);
        const latin = itemProperties.latin(genus);
        const latin2 = itemProperties.latin(species);
        const binomial = item.name;        
        return { ...latin, ...latin2, binomial, index };
    });

    epithets = epithets.filter(epithet => epithet.latin);
    epithets = R.uniqBy(epithet => epithet.latin, epithets);

    return { name: 'epithets', items: epithets};
};