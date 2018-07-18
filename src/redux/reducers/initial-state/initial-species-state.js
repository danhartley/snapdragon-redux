import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { kitchenGarden } from 'snapdragon/species-lessons';

import { helpers } from 'redux/reducers/helpers-for-reducers';

import { getSpeciesEpithets } from 'redux/reducers/initial-state/species-state/species-epithets';
import { getFamilies } from 'redux/reducers/initial-state/species-state/taxa';

const collections = [ kitchenGarden ];

const initCollection = (rawCollection = collections[0]) => {
    let prepCollection = rawCollection.type === 'skill'
        ? R.pipe(utils.shuffleArray)
        : R.pipe(helpers.filterExcluded, helpers.extractScientificNames, helpers.embellishCollection);
    const items = utils.sortBy(prepCollection(rawCollection.items), 'snapId');
    const rounds = items.length / config.moduleSize;

    const wildcards = [];    
    wildcards.push(getSpeciesEpithets(rawCollection.items));
    
    const families = getFamilies(rawCollection.items);

    let itemGroups = [];
    let group = [];
    items.forEach((item, index) => {
        group.push(index);
        if((index + 1) % config.moduleSize === 0) {
            itemGroups.push(group);
            group = [];
        }
    });

    const collection = {
        name: rawCollection.name,
        items : items,
        itemIndex: 0,
        currentRound: 1,
        moduleSize: config.moduleSize,
        rounds : items.length % config.moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1,
        wildcards: wildcards, 
        itemGroups: itemGroups,
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