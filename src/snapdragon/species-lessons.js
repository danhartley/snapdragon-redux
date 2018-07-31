import * as R from 'ramda';

import { utils } from 'utils/utils';
import { collections } from 'snapdragon/species-collections';

const required = ['Herbs and Spices', 'Vegetables', 'Fruit'];

export const lessons = collections.filter(collection => R.contains(collection.name, required));

export const kitchenGarden = { 
    id: 1, name: 'Kitchen Garden', 
    type: 'species', 
    // items: [ ...lessons[1].items ],
    items:[ ...lessons[0].items, ...lessons[1].items, ...lessons[2].items ],
    // items:[ ...lessons[0].items, ...lessons[1].items, ...lessons[2].items ].filter(item => item.name === 'Brassica oleracea'),
    collections: required
};

export const Exam = { 
    id: 2, name: 'Exam', 
    type: 'species', 
    items:collections[6].items,
    collections: ['Exam']
};

kitchenGarden.items = utils.shuffleArray(kitchenGarden.items);

kitchenGarden.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

Exam.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});