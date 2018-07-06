import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { collections } from 'snapdragon/species-collections';
import { helpers } from 'redux/reducers/helpers-for-reducers';
import { itemProperties } from 'ui/helpers/data-checking';

const initCollection = (rawCollection = collections[0]) => {
    let prepCollection = rawCollection.type === 'skill'
        ? R.pipe(utils.shuffleArray)
        // : R.pipe(helpers.filterExcluded, helpers.extractScientificNames, utils.shuffleArray, helpers.embellishCollection);
        : R.pipe(helpers.filterExcluded, helpers.extractScientificNames, helpers.embellishCollection);
    const items = utils.sortBy(prepCollection(rawCollection.items), 'snap-id');
    const rounds = items.length / config.moduleSize;

    const wildcards = [];
    const epithets = rawCollection.items.map( (item, index) => {
        const species = itemProperties.speciesName(item.name);
        const latin = itemProperties.latin(species);
        const binomial = item.name;        
        return { ...latin, binomial, index };
    });
    wildcards.push({ name: 'epithets', items: epithets.filter(epithet => epithet.latin)});

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
        itemGroups: itemGroups
     };

     return collection;
};

const collection = initCollection();

const score = {
    total: 0,
    correct: 0,
    binomial: '',
    wrong: 0,
    answer: '',
    question: '',
    fails: [],
    passes: [],
    success: false
};

export const initialState = {
    collections,
    collection,
    score,
    initCollection
}