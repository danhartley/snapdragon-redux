import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { utils } from 'utils/utils';

export const getSpeciesEpithets = items => {
    
    let epithets = items.map( (item, index) => {
        const species = itemProperties.speciesName(item.name);
        const latin = itemProperties.latin(species);
        const binomial = item.name;        
        return { ...latin, binomial, index };
    });

    epithets = epithets.filter(epithet => epithet.latin);
    epithets = R.uniqBy(e=>e.latin, epithets);

    epithets = new Set(utils.shuffleArray(epithets));

    return { name: 'epithets', items: epithets};
};