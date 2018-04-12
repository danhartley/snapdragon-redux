import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { modules } from 'syllabus/lesson-modules';
import { helpers } from 'redux/reducers/helpers-for-reducers';

const initPool = lessonModule => {
    const itemsWithNames = helpers.addMultipleNames(lessonModule.pool, lessonModule.pool, 6);
    const itemsWithNamesAndImages = helpers.addMultipleImages(lessonModule.pool, itemsWithNames, 9)
    const itemPool = itemsWithNamesAndImages.map(item => {
        item.imageIndices = utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10,11,12], 12, true);
        return item;
    });
    return itemPool;
};

const initItems = (itemPool, lessonModule) => {
    const items = itemPool.filter((item, index) => index < 2);
    items.moduleSize = lessonModule.moduleSize;
    items.poolCount = lessonModule.pool.length;
    items.poolIndex = lessonModule.moduleSize;
    items.rounds = items.poolCount / items.moduleSize;
    items.currentRound = items.poolIndex / items.moduleSize;
    return items;
}

const lessonModule = modules.createLessonModule(config.moduleSize);
const itemPool = initPool(lessonModule);
const items = initItems(itemPool, lessonModule);
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
    lessonModule,
    itemPool,
    items, 
    item,
    score
}

