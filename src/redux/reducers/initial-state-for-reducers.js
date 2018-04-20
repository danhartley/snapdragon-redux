import * as R from 'ramda';

import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { collections } from 'syllabus/lesson-collections';
import { helpers } from 'redux/reducers/helpers-for-reducers';

const initCollection = (rawCollection = collections[0]) => {
    const prepCollection = R.pipe(helpers.filterExcluded, helpers.cleanNames, utils.shuffleArray, helpers.embellishCollection);
    const items = prepCollection(rawCollection.items);
    const rounds = items.length / config.moduleSize;

    const collection = {
        name: rawCollection.eol_name,
        items : items,
        itemIndex: 0,
        currentRound: 0,
        moduleSize: config.moduleSize,
        rounds : rounds % 2 === 0 ? rounds : rounds + 0.5
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