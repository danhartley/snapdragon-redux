import * as R from 'ramda';

import { collections } from 'snapdragon/species-collections';

const kg = ['Herbs and Spices', 'Vegetables', 'Fruit', 'Insects'];

export const kitchenGardenLessons = collections.filter(collection => R.contains(collection.name, kg));

export const kitchenGarden = { 
    id: 1, name: 'Kitchen Garden', 
    type: 'species',
    descriptions: [
        'This lesson has over 750 questions and will take about 2 hours to complete. Species are native or adapted to a Mediterranean climate.',
        'You will start by learning to recognise species, become familiar with their common and latin names, and identify their genus. Subsequent levels will build on this knowledge.'        
    ],    
    items: [ ...kitchenGardenLessons[0].items, ...kitchenGardenLessons[1].items, ...kitchenGardenLessons[2].items, ...kitchenGardenLessons[3].items ],
    collections: kg,
    thumb: 'https://media.eol.org/content/2014/06/03/05/47795_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    userLevel: 'General Interest',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3,
    glossary: ['plantae', 'common'],
    courseId: 1,
    course: 'Snapdragon'
};

export const rhsTrees = { 
    id: 2, name: 'Deciduous and Evergreen Trees', 
    type: 'species',
    descriptions: ['The approved list of Deciduous and Evergreen Trees for students taking Royal Horticultural Society Qualifications in Practical Horticulture.'],
    items: [ ...collections[0].items ],
    collections: ['Deciduous and evergreen trees'],
    thumb: 'https://media.eol.org/content/2015/04/30/19/57100_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    userLevel: 'RHS students',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3,
    glossary: ['plantae', 'common'],
    courseId: 2,
    course: 'RHS Practical Horticulture'
};

export const commonBirds = { 
    id: 3, name: 'RSPB Top 10 UK Birds', 
    type: 'species',
    descriptions: [
        'The top 10 most common birds in the UK.',
        'The RSPB Big Garden Birdwatch 2018 survey recorded 6,764,475 birds.',
        'There were 420,489 respondents.'
    ],
    items: collections[5].items,
    collections: ['RSPB Top 10 UK Birds'],
    thumb: 'https://media.eol.org/content/2015/01/21/07/32241_88_88.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'General Interest',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3,
    glossary: ['animalia', 'common'],
    courseId: 1,
    course: 'Snapdragon'
};

export const rhsWeeds1 = { 
    id: 4, name: 'RHS Weeds I', 
    type: 'species',
    descriptions: [
        'Part I of the approved list of Weeds for students taking Royal Horticultural Society Qualifications in Practical Horticulture.',
        'Snapdragon does not necessarily support the view that weeds are plants in the wrong place.'
    ],
    items: [ ...collections[6].items ],
    collections: ['RHS Weeds I'],
    thumb: 'https://media.eol.org/content/2015/01/21/07/32241_88_88.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'RHS students',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3,
    glossary: ['plantae', 'common'],
    courseId: 2,
    course: 'RHS Practical Horticulture'
};

export const mushroomQuiz = { 
    id: 5, name: 'Mushroom Quiz', 
    type: 'species',
    descriptions: [
        '10 common mushrooms, 5 are edible, 5 are toxic.',
        'Can you identify which are safe to gather?'
    ],
    items: [ ...collections[7].items ],
    collections: ['Mushroom Quiz'],
    thumb: 'https://media.eol.org/content/2015/01/21/07/32241_88_88.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'Amateur mycologists',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 3,
    glossary: ['fungi', 'common'],
    courseId: 1,
    course: 'Snapdragon'
};

kitchenGarden.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

rhsTrees.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

commonBirds.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

rhsWeeds1.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

mushroomQuiz.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});