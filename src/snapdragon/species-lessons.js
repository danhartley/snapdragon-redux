import * as R from 'ramda';

import { utils } from 'utils/utils';
import { collections } from 'snapdragon/species-collections';

const required = ['Herbs and Spices', 'Vegetables', 'Fruit', 'Insects'];

export const lessons = collections.filter(collection => R.contains(collection.name, required));

export const kitchenGarden = { 
    id: 1, name: 'Kitchen Garden', 
    type: 'species',
    description: 'This course has over 750 questions and will take about 2 hours to complete. The species of fruit, vegetables, herbs, spices, and insects may be found, with one or two exceptions, in a Mediterranean climate.',    
    items:[ ...lessons[0].items, ...lessons[1].items, ...lessons[2].items, ...lessons[3].items ],
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