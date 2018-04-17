import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { collections } from 'syllabus/lesson-collections';
import { helpers } from 'redux/reducers/helpers-for-reducers';

const initCollection = R.pipe(helpers.cleanNames, utils.shuffleArray, helpers.embellishCollection);

const collection = initCollection(collections[0].collection);

const initItems = (collection, moduleSize) => {
    const items = collection.filter((item, index) => index < moduleSize);
    items.moduleSize = moduleSize;
    items.collectionCount = collection.length;
    items.collectionIndex = moduleSize;
    items.rounds = items.collectionCount / items.moduleSize;
    items.currentRound = items.collectionIndex / items.moduleSize;
    return items;
}

const items = initItems(collection, config.moduleSize);
const item = items[0];

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
    items, 
    item,
    score,
    initCollection,
    initItems
}