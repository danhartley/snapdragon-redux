import { utils } from 'utils/utils';
import { config } from 'syllabus/lesson-config';
import { modules } from 'syllabus/lesson-modules';
import { helpers } from 'redux/reducers/helpers-for-reducers';

const collections = modules.collections;
modules.collection = collections[0].collection;

const initCollection = mod => {
    const itemsWithNames = helpers.addMultipleNames(mod.collection, mod.collection, 6);
    const itemsWithNamesAndImages = helpers.addMultipleImages(mod.collection, itemsWithNames, 9)
    const collection = itemsWithNamesAndImages.map(item => {
        item.imageIndices = utils.randomiseSelection([1,2,3,4,5,6,7,8,9,10,11,12], 12, true);
        return item;
    });
    return collection;
};

const initItems = (collection, mod) => {
    const items = collection.filter((item, index) => index < mod.moduleSize);
    items.moduleSize = mod.moduleSize;
    items.collectionCount = mod.collection.length;
    items.collectionIndex = mod.moduleSize;
    items.rounds = items.collectionCount / items.moduleSize;
    items.currentRound = items.collectionIndex / items.moduleSize;
    return items;
}

const mod = helpers.createLessonModule(modules.collection, config.moduleSize);

mod.collection = helpers.cleanNames(mod.collection);
mod.collection = utils.shuffleArray(mod.collection);

const collection = initCollection(mod);
const items = initItems(collection, mod);
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
    collections,
    collection,
    items, 
    item,
    score
}