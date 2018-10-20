import * as R from 'ramda';

import { collections } from 'snapdragon/eol-collections';

const getItems = (collection, index) => {
    const itemNames = collections[index].items.map(item => item.name);
    const items = collection.itemNames.map(name => { 
        if(R.contains(name, itemNames)) {
            return collections[index].items.find(item => item.name === name);
        }
    });
    
    items.filter(item => item).forEach((item,index)=>{
        item.snapIndex = index + 1;
    });

    return items;
};

export const kitchenGarden = { 
    providerId: 1,
    id: 1, name: 'Kitchen Garden', 
    type: 'species',
    descriptions: [
        'Learn the common and scientific names of herbs, vegetables and fruit used in Western cooking.',
        'All of the species are either native or adapted to a Mediterranean climate.',
        'Later lessons will introduce you to families and the traits they share.'        
    ],    
    items: [],
    thumb: 'https://media.eol.org/content/2014/06/03/05/47795_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    userLevel: 'General Interest',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 1,
    course: 'Snapdragon',
    speciesCount: 56,
    familiesCount: 19,
    itemNames: [
        "Allium sativum",
        "Coriandrum sativum",
        "Cuminum cyminum",
        "Origanum majorana",
        "Cymbopogon citratus",
        "Sinapis alba",
        "Zingiber officinale",
        "Brassica nigra",
        "Carum carvi",
        "Satureja hortensis",
        "Piper nigrum",
        "Laurus nobilis",
        "Capsicum annuum",
        "Salvia officinalis",
        "Origanum vulgare",
        "Foeniculum vulgare",
        "Mentha spicata",
        "Anethum graveolens",
        "Thymus vulgaris",
        "Petroselinum crispum",
        "Ocimum basilicum",
        "Allium schoenoprasum",
        "Artemisia dracunculus",
        "Rosmarinus officinalis",
        "Borago officinalis",
        "Cucumis sativus",
        "Beta vulgaris",
        "Spinacia oleracea",
        "Raphanus sativus",
        "Cucurbita pepo",
        "Solanum lycopersicum",
        "Brassica rapa",
        "Vicia faba",
        "Phaseolus coccineus",
        "Pisum sativum",
        "Pastinaca sativa",
        "Solanum melongena",
        "Cynara cardunculus",
        "Lactuca sativa",
        "Daucus carota",
        "Brassica oleracea",
        "Solanum tuberosum",
        "Allium cepa",
        "Vitis vinifera",
        "Mespilus germanica",
        "Prunus armeniaca",
        "Prunus domestica",
        "Prunus persica",
        "Rubus idaeus",
        "Citrus limon",
        "Fragaria ananassa",
        "Pyrus communis",
        "Ficus carica",
        "Malus domestica",
        "Prunus avium",
        "Apis mellifera"
      ],
    getItems: function() {
        return getItems(this, 0);
    },
};

export const rhsTrees = { 
    providerId: 2,
    id: 2, name: 'Deciduous and Evergreen Trees', 
    type: 'species',
    descriptions: ['This is an approved list of Deciduous and Evergreen Trees from the Royal Horticultural Society (RHS).', 'Students taking RHS courses in Practical Horticulture are required to learn some, or all, of these species.'],
    items: [],
    collections: ['Deciduous and evergreen trees'],
    thumb: 'https://media.eol.org/content/2012/06/12/18/89509_orig.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    userLevel: 'RHS students',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 2,
    course: 'RHS Practical Horticulture',
    speciesCount: 65,
    familiesCount: 20,
    itemNames: [
        "Styrax hemsleyanus",
        "Stewartia sinensis",
        "Tilia euchlora",
        "Sorbus cashmiriana",
        "Tilia europaea",
        "Stewartia pseudocamellia",
        "Sorbus aucuparia",
        "Salix sepulcralis",
        "Sorbus aria",
        "Salix alba",
        "Robinia pseudoacacia",
        "Quercus robur",
        "Pyrus salicifolia",
        "Quercus ilex",
        "Quercus coccinea",
        "Prunus serrula",
        "Pyrus calleryana",
        "Prunus subhirtella",
        "Prunus cerasifera",
        "Platanus orientalis",
        "Populus nigra",
        "Prunus avium",
        "Olea europaea",
        "Platanus acerifolia",
        "Liriodendron chinense",
        "Malus floribunda",
        "Malus sylvestris",
        "Liriodendron tulipifera",
        "Laburnum watereri",
        "Magnolia soulangeana",
        "Liquidambar styraciflua",
        "Ilex altaclerensis",
        "Ligustrum lucidum",
        "Eucryphia x nymansensis",
        "Juglans regia",
        "Eucalyptus pauciflora",
        "Crataegus prunifolia",
        "Fraxinus ornus",
        "Eucalyptus gunnii",
        "Gleditsia triacanthos",
        "Fagus sylvatica",
        "Fraxinus excelsior",
        "Crataegus laevigata",
        "Crataegus monogyna",
        "Cercis siliquastrum",
        "Cercidiphyllum japonicum",
        "Cordyline australis",
        "Catalpa bignonioides",
        "Betula utilis",
        "Amelanchier lamarckii",
        "Castanea sativa",
        "Carpinus betulus",
        "Betula pendula",
        "Amelanchier canadensis",
        "Alnus cordata",
        "Alnus glutinosa",
        "Aesculus carnea",
        "Aesculus hippocastanum",
        "Acer rubrum",
        "Acer platanoides",
        "Acer pseudoplatanus",
        "Acer davidii",
        "Acer griseum",
        "Acacia baileyana",
        "Acacia dealbata"
      ],
    getItems: function() {
        return getItems(this, 1);
    },
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
    items: [],
    collections: ['RSPB Top 10 UK Birds'],
    thumb: 'https://media.eol.org/content/2015/01/21/07/32241_88_88.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'General Interest',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['animalia', 'common'],
    courseId: 3,
    course: 'Snapdragon',
    speciesCount: 10,
    familiesCount: 7,
    itemNames: [
        "Passer domesticus",
        "Sturnus vulgaris",
        "Cyanistes caeruleus",
        "Turdus merula",
        "Columba palumbus",
        "Carduelis carduelis",
        "Parus major",
        "Erithacus rubecula",
        "Aegithalos caudatus",
        "Fringilla coelebs"
      ],
    getItems: function() {
        return getItems(this, 2);
    },
};

export const rhsWeeds1 = { 
    providerId: 2,
    id: 4, name: 'RHS Weeds I', 
    type: 'species',
    descriptions: [
        'Part I of the approved list of Weeds for students taking Royal Horticultural Society Qualifications in Practical Horticulture.',
        'Snapdragon does not necessarily support the view that weeds are plants in the wrong place.'
    ],
    items: [],
    collections: ['RHS Weeds I'],
    thumb: 'https://media.eol.org/content/2012/06/13/04/53382_orig.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    userLevel: 'RHS students',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 2,
    course: 'RHS Practical Horticulture',
    speciesCount: 11,
    familiesCount: 7,
    itemNames: [
        "Elymus repens",
        "Equisetum arvense",
        "Dactylis glomerata",
        "Convolvulus arvensis",
        "Cerastium fontanum",
        "Cirsium arvense",
        "Calystegia sepium",
        "Cardamine hirsuta",
        "Aegopodium podagraria",
        "Capsella bursa-pastoris",
        "Bellis perennis"
      ],
    getItems: function() {
        return getItems(this, 3);
    },
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
    items: [],
    speciesCount: 16,
    familiesCount: 9,
    getItems: function() {
        return getItems(this, 4);
    },
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
    items: [],
    speciesCount: 10,
    familiesCount: 10,
    getItems: function() {
        return getItems(this, 4);
    },
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
    items: [],
    speciesCount: 14,
    familiesCount: 8,
    getItems: function() {
        return getItems(this, 4);
    },
};

kitchenGarden.items.forEach((item,index)=>{
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