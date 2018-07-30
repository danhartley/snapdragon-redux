import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { kitchenGarden, Exam } from 'snapdragon/species-lessons';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { getFamilies } from 'redux/reducers/initial-state/species-state/species-taxa';

const collections = [ kitchenGarden ];

const initCollection = (rawCollection = collections[0]) => {
    let prepCollection = rawCollection.type === 'skill'
        ? R.pipe(utils.shuffleArray)
        : R.pipe(helpers.filterExcluded, helpers.extractScientificNames, helpers.embellishCollection);
    const items = utils.sortBy(prepCollection(rawCollection.items), 'snapId');
    const rounds = items.length / config.moduleSize;

    const families = getFamilies(items);

    const collection = {
        name: rawCollection.name,
        items : items,
        itemIndex: 0,
        currentRound: 1,
        moduleSize: config.moduleSize,
        rounds : items.length % config.moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1,
        families: families
     };

     return collection;
};

const collection = initCollection();

export const speciesState = {
    collections,
    collection,    
    initCollection
}