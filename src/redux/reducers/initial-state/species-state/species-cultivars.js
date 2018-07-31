import * as R from 'ramda';

import { infraspecifics } from 'api/snapdragon/infraspecifics';

export const getSpeciesCultivars = items => {
    
    const names = infraspecifics.map(species => species.name);

    const cultivars = items.map( (item, i) => {
        if(R.contains(item.name, names)) {
            return {
                item: item,
                cultivars: infraspecifics.find(i => i.name === item.name),
                index: i
            };
        }
    }).filter(c => c);

    return cultivars;
};