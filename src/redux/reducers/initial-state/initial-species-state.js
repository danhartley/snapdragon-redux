import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { snapdragonCollections } from 'snapdragon/snapdragon-collections';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { itemProperties } from 'ui/helpers/data-checking';
import { familyProps } from 'redux/reducers/initial-state/species-state/species-taxa';

const collections = snapdragonCollections;

// const extendCollection = selectedCollection => {

//     const { config } = store.getState();

//     const moduleSize = selectedCollection.moduleSize || config.moduleSize;

//     let prepCollection = selectedCollection.type === 'skill'
//         ? R.pipe(utils.shuffleArray)
//         : R.pipe(helpers.extractScientificNames);

//     const items = utils.sortBy(prepCollection(selectedCollection.items), 'snapIndex').filter(item => {
//         return item.isDeselected === undefined || !item.isDeselected
//     });
    
//     const rounds = items.length / moduleSize;

//     const families = familyProps.getFamilyNames(items);
//     const familyStats = familyProps.getFamilyStats(items);
//     const speciesNames = items.map(item => item.name);
//     const speciesVernacularNames = itemProperties.vernacularNamesForItems(items, config);

//     const collection = {
//         id: selectedCollection.id,
//         name: selectedCollection.name,
//         items : items,
//         itemIndex: 0,
//         currentRound: 1,
//         moduleSize: moduleSize,
//         rounds : items.length % moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1,
//         families: families,
//         familyStats: familyStats,
//         speciesNames: speciesNames,
//         speciesVernacularNames: speciesVernacularNames
//      };

//      collection.items.forEach(item => {
//         item.vernacularNames = itemProperties.getVernacularNames(item, config);
//         item.vernacularName = itemProperties.getVernacularName(item, config);
//      });

//      collections.forEach(c => {
//         if(c.id === collection.id) {
//             c = collection;
//         }
//     });

//      return collection;
// };

export const speciesStateHelper = {
    collections
}