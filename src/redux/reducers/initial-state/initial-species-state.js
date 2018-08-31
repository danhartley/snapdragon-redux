import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { kitchenGarden, rhsTrees, commonBirds, rhsWeeds1 } from 'snapdragon/species-lessons';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { familyProps } from 'redux/reducers/initial-state/species-state/species-taxa';

const collections = [ kitchenGarden, rhsTrees, commonBirds, rhsWeeds1 ];

const initCollection = (selectedCollection = collections[0]) => {

    const moduleSize = selectedCollection.moduleSize || config.moduleSize;

    let prepCollection = selectedCollection.type === 'skill'
        ? R.pipe(utils.shuffleArray)
        : R.pipe(helpers.extractScientificNames);
    const items = utils.sortBy(prepCollection(selectedCollection.items), 'snapIndex');
    const rounds = items.length / moduleSize;

    const families = familyProps.getFamilyNames(items);
    const familyStats = familyProps.getFamilyStats(items);
    const speciesNames = items.map(item => item.name);
    const speciesVernacularNames = items.map(i => i.names.filter(name => name.language === config.language)[0].vernacularName);

    const collection = {
        id: selectedCollection.id,
        name: selectedCollection.name,
        items : items,
        itemIndex: 0,
        currentRound: 1,
        moduleSize: moduleSize,
        rounds : items.length % moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1,
        families: families,
        familyStats: familyStats,
        speciesNames: speciesNames,
        speciesVernacularNames: speciesVernacularNames
     };

     collections.forEach(c => {
        if(c.id === collection.id) {
            c = collection;
        }
    });

     return collection;
};

export const speciesState = {
    collections,    
    initCollection
}