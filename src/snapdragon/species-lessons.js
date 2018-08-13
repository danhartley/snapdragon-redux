import * as R from 'ramda';

import { utils } from 'utils/utils';
import { collections } from 'snapdragon/species-collections';

const kg = ['Herbs and Spices', 'Vegetables', 'Fruit', 'Insects'];
const nf = ['National Flowers'];

export const kitchenGardenLessons = collections.filter(collection => R.contains(collection.name, kg));
export const nationalFlowersLessons = collections.filter(collection => R.contains(collection.name, nf));

export const kitchenGarden = { 
    id: 1, name: 'Kitchen Garden', 
    type: 'species',
    description: 'This course has over 750 questions and will take about 2 hours to complete. The species of fruit, vegetables, herbs, spices, and insects are found in a Mediterranean climate.',    
    items:[ ...kitchenGardenLessons[0].items, ...kitchenGardenLessons[1].items, ...kitchenGardenLessons[2].items, ...kitchenGardenLessons[3].items ],
    collections: kg,
    thumb: 'https://media.eol.org/content/2014/06/03/05/47795_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    level: 'The Interested'
};

export const nationalFlowers = { 
    id: 2, name: 'National Flowers', 
    type: 'species',
    description: 'Short lesson on the national flowers of Germany, Italy, Portugal, Spain, France and England. Useful as a quick-start introduction to Snapdragon it will take about 30 minutes.',
    items:[ ...nationalFlowersLessons[0].items ],
    collections: ['National Flowers'],
    thumb: 'https://media.eol.org/content/2012/06/13/04/65813_orig.jpg',
    moduleSize: 2,
    curator: 'Snapdragon',
    level: 'Everyone'    
};

kitchenGarden.items = utils.shuffleArray(kitchenGarden.items);
nationalFlowers.items = utils.shuffleArray(nationalFlowers.items);

kitchenGarden.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

nationalFlowers.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});