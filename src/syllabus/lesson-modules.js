import { utils } from 'utils/utils';
import { flora, common, herbs } from 'api/flora';
import { lamiaceae } from 'api/families';

const collections = [
    {
        id: 1,
        name: 'lamiaceae',
        file: 'api/families',
        eol_description: 'Lamiaceae: Mint and Basil Family'
    },
    {
        id: 2,
        name: 'herbs',
        file: 'api/flora',
        eol_description: '12 Common Herbs'
    },
    {
        id: 3,
        name: 'flora',
        file: 'api/flora',
        eol_description: 'Flora Lisboa e Vale do Tejo'
    }
];

const binomials = lamiaceae
    .map(item => {
        const names = item.name.split(' ');
        item.genus = names[0];
        item.species = names[1];
        item.name = item.name.split(' ').slice(0,2).join(' ');
        return item;
});

const prepareCollection = collection => {
    return collection.map(item => {
        const names = item.name.split(' ');
        item.genus = names[0];
        item.species = names[1];
        item.name = item.name.split(' ').slice(0,2).join(' ');
        return item;
})};

const collection = utils.shuffleArray(binomials);

const createLessonModule = (moduleSize) => {
    const items = collection
        .filter((item, index) => {
            if(index < moduleSize) return item;
        });
    const lesson = {
        collection,
        items,
        moduleSize
    }
    return lesson;
};

export const modules = {
    collections,
    collection,
    createLessonModule
};