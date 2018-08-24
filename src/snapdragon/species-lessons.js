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
    descriptions: [
        'This course has over 750 questions and will take about 2 hours to complete. Species are native or adapted to a Mediterranean climate.',
        'You will start by learning to recognise species, become familiar with their common and latin names, and be able to select the genus to which they belong. Subsequent levels will build on this knowledge.'        
    ],    
    items:[ ...kitchenGardenLessons[0].items, ...kitchenGardenLessons[1].items, ...kitchenGardenLessons[2].items, ...kitchenGardenLessons[3].items ],
    collections: kg,
    thumb: 'https://media.eol.org/content/2014/06/03/05/47795_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    level: 'The Interested',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3
};

export const nationalFlowers = { 
    id: 2, name: 'National Flowers', 
    type: 'species',
    descriptions: [
        'Short lesson on the national flowers of Germany, Italy, Portugal, Spain, France and England.',
        'Useful as a quick-start introduction to Snapdragon it will take about 30 minutes to complete.'
],
    items:[ ...nationalFlowersLessons[0].items ],
    collections: ['National Flowers'],
    thumb: 'https://media.eol.org/content/2012/06/13/04/65813_orig.jpg',
    moduleSize: 2,
    curator: 'Snapdragon',
    level: 'Everyone',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3
};

export const rhsTrees = { 
    id: 3, name: 'Deciduous and Evergreen Trees', 
    type: 'species',
    descriptions: ['The approved list of Deciduous and Evergreen Trees for students taking Royal Horticultural Society Qualifications in Practical Horticulture.'],
    items:[ ...collections[0].items ],
    collections: ['Deciduous and evergreen trees'],
    thumb: 'https://media.eol.org/content/2015/04/30/19/57100_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    level: 'RHS students',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3
};

kitchenGarden.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

nationalFlowers.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

rhsTrees.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});