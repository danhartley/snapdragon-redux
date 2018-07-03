import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { collections } from 'snapdragon/species-collections';
import { helpers } from 'redux/reducers/helpers-for-reducers';

const initCollection = (rawCollection = collections[0]) => {
    let prepCollection = rawCollection.type === 'skill'
        ? R.pipe(utils.shuffleArray)
        : R.pipe(helpers.filterExcluded, helpers.extractScientificNames, utils.shuffleArray, helpers.embellishCollection);
    const items = prepCollection(rawCollection.items);
    const rounds = items.length / config.moduleSize;

    const collection = {
        name: rawCollection.name,
        items : items,
        itemIndex: 0,
        currentRound: 1,
        moduleSize: config.moduleSize,
        rounds : items.length % config.moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1
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