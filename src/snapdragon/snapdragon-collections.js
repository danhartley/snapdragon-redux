import * as R from 'ramda';

import { collections } from 'snapdragon/eol-collections';

const kg = ['Herbs and Spices', 'Vegetables', 'Fruit', 'Insects'];

export const kitchenGardenLessons = collections.filter(collection => R.contains(collection.name, kg));

export const kitchenGarden = { 
    providerId: 1,
    id: 1, name: 'Kitchen Garden', 
    type: 'species',
    descriptions: [
        'Learn the common and scientific names of herbs, vegetables and fruit used in Western cooking.',
        'All of the species are either native or adapted to a Mediterranean climate.',
        'Later lessons will introduce you to families and the traits they share.'        
    ],    
    items: [ ...kitchenGardenLessons[0].items, ...kitchenGardenLessons[1].items, ...kitchenGardenLessons[2].items, ...kitchenGardenLessons[3].items ],
    collections: kg,
    thumb: 'https://media.eol.org/content/2014/06/03/05/47795_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    userLevel: 'General Interest',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 1,
    course: 'Snapdragon'
};

export const rhsTrees = { 
    providerId: 2,
    id: 2, name: 'Deciduous and Evergreen Trees', 
    type: 'species',
    descriptions: ['This is an approved list of Deciduous and Evergreen Trees from the Royal Horticultural Society (RHS).', 'Students taking RHS courses in Practical Horticulture are required to learn some, or all, of these species.'],
    items: [ ...collections[0].items ],
    collections: ['Deciduous and evergreen trees'],
    thumb: 'https://media.eol.org/content/2012/06/12/18/89509_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    userLevel: 'RHS students',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 2,
    course: 'RHS Practical Horticulture'
};

export const commonBirds = { 
    providerId: 1,
    id: 3, name: 'RSPB Top 10 UK Birds', 
    type: 'species',
    descriptions: [
        'This lesson will test you on the top 10 most common birds in the UK.',
        'The list is taken from the RSPB Big Garden Birdwatch 2018 survey.',
        '420,489 people recorded 6,764,475 separate bird sightings.'
    ],
    items: collections[5].items,
    collections: ['RSPB Top 10 UK Birds'],
    thumb: 'https://media.eol.org/content/2015/01/21/07/32241_88_88.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'General Interest',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['animalia', 'common'],
    courseId: 3,
    course: 'Snapdragon'
};

export const rhsWeeds1 = { 
    providerId: 2,
    id: 4, name: 'RHS Weeds I', 
    type: 'species',
    descriptions: [
        'Part I of the approved list of Weeds for students taking Royal Horticultural Society Qualifications in Practical Horticulture.',
        'Snapdragon does not necessarily support the view that weeds are plants in the wrong place.'
    ],
    items: [ ...collections[6].items ],
    collections: ['RHS Weeds I'],
    thumb: 'https://media.eol.org/content/2012/06/13/04/53382_orig.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'RHS students',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 2,
    course: 'RHS Practical Horticulture'
};

const mushroomCollection = {
    providerId: 1,
    type: 'species',
    thumb: 'https://media.eol.org/content/2013/03/01/14/45554_orig.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'Amateur mycologists',
    lessonPlanLandscape: 3,
    lessonPlanPortrait: 103,
    glossary: ['fungi'],
    course: 'Snapdragon'
};

export const fallMushroomsEasternUSA = {
    ...mushroomCollection,
    id: 11,
    name: 'Mushrooms Eastern US Fall',
    itemNames: [ 
        'Grifola frondosa', 'Laetiporus sulphureus', 'Hericium erinaceus', 'Lycoperdon perlatum',
        'Lycoperdon pyriforme', 'Hydnum repandum',
        'Laetiporus cincinnatus', 'Craterellus tubaeformis', 'Hydnum umbilicatum', 
        'Hericium americanum', 'Hericium coralloides', 'Calvatia gigantea', 
        'Clitocybe nuda', 'Armillaria mellea', 'Armillaria tabescens', 'Entoloma abortivum'
        
    ],
    descriptions: [
        'A collection of mushrooms that can be found in the Fall in the Eastern United States.',
        'Some of the species may be found in other seasons, and across the US.'
    ],
    items: []
}

export const wildFoodUKTopTenBeginners = {
    ...mushroomCollection,
    id: 10,
    name: '10 Safe Mushrooms for Beginners',
    itemNames: [
        'Fistulina hepatica', 'Boletus edulis', 'Pleurotus ostreatus', 'Auricularia auricula-judae',
        'Calvatia gigantea', 'Hydnum repandum', 'Polyporus squamosus', 'Sarcoscypha coccinea',
        'Sparassis crispa', 'Lepista personata'
    ],
    descriptions: [
        'A collection of 10 mushrooms that are distinctive in appearance and have no poisonous look-alikes.',
        'A good start for beginners.',
        'Specific to the UK.'
    ],
    items: []
};

export const cogumelosEmPortugal = {
    ...mushroomCollection,
    id: 8,
    name: 'Mushrooms of Portugal',
    itemNames: [
        'Boletus edulis', 'Lactarius deliciosus', 'Agaricus campestris', 'Macrolepiota procera',
        'Craterellus cornucopioides', 'Cantharellus cibarius', 'Amanita caesarea',
        'Fistulina hepatica', 'Amanita phalloides', 'Amanita muscaria',
        'Amanita ponderosa', 'Tricholoma equestre', 'Boletus pinophilus', 'Hydnum repandum'
    ],
    descriptions: [
        'A collection of mushrooms, both edible and poisonous, common to one or more regions of Portugal.'
    ],
    items: []
};

const itemNames = collections[7].items.map(item => item.name);

cogumelosEmPortugal.items = cogumelosEmPortugal.itemNames.map(name => { 
    if(R.contains(name, itemNames)) {
        return collections[7].items.find(item => item.name === name);
    }
}).filter(item => item);

wildFoodUKTopTenBeginners.items = wildFoodUKTopTenBeginners.itemNames.map(name => { 
    if(R.contains(name, itemNames)) {
        return collections[7].items.find(item => item.name === name);
    }
}).filter(item => item);

fallMushroomsEasternUSA.items = fallMushroomsEasternUSA.itemNames.map(name => { 
    if(R.contains(name, itemNames)) {
        return collections[7].items.find(item => item.name === name);
    }
}).filter(item => item);

fallMushroomsEasternUSA.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

cogumelosEmPortugal.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

wildFoodUKTopTenBeginners.items.forEach((item,index)=>{
    item.snapIndex = index + 1;
});

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

export const snapdragonCollections = [
    kitchenGarden,
    rhsTrees,
    commonBirds,
    rhsWeeds1,
    wildFoodUKTopTenBeginners,
    cogumelosEmPortugal,
    fallMushroomsEasternUSA
];