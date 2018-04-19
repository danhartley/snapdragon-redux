import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { collections } from 'syllabus/lesson-collections';
import { helpers } from 'redux/reducers/helpers-for-reducers';

const initCollection = R.pipe(helpers.cleanNames, utils.shuffleArray, helpers.embellishCollection);

const items = initCollection(collections[0].collection);

const collection = { 
    items,
    index: 0,
    currentRound: 0,
    moduleSize: config.moduleSize,
    rounds: items.length / config.moduleSize
 };
// collection.itemIndex = 0;
// collection.currentRound = 0;
// collection.moduleSize = config.moduleSize;
// collection.rounds = collection.length / collection.moduleSize;

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