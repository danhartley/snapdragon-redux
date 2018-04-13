import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { modules } from 'syllabus/lesson-modules';
import { helpers } from 'redux/reducers/helpers-for-reducers';

const initPool = mod => {
    const itemsWithNames = helpers.addMultipleNames(mod.pool, mod.pool, 6);
    const itemsWithNamesAndImages = helpers.addMultipleImages(mod.pool, itemsWithNames, 9)
    const pool = itemsWithNamesAndImages.map(item => {
        item.imageIndices = utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10,11,12], 12, true);
        return item;
    });
    return pool;
};

const initItems = (pool, mod) => {
    const items = pool.filter((item, index) => index < 2);
    items.moduleSize = mod.moduleSize;
    items.poolCount = mod.pool.length;
    items.poolIndex = mod.moduleSize;
    items.rounds = items.poolCount / items.moduleSize;
    items.currentRound = items.poolIndex / items.moduleSize;
    return items;
}

const mod = modules.createLessonModule(config.moduleSize);
const pool = initPool(mod);
const items = initItems(pool, mod);
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

export const InitialState = {
    mod,
    pool,
    items, 
    item,
    score
}

