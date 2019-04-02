const lichenCollection = {
    providerId: 2,
    type: 'species',
    thumb: 'https://content.eol.org/data/media/80/d2/d6/542.6832443214.260x190.jpg',
    moduleSize: 2,
    curator: 'Snapdragon',
    collectionType: 'Collection',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 1,
    glossary: ['lichen', 'common'],
    course: 'Snapdragon',
    iconicTaxa: [ 'fungi' ]
};

export const snapDragonLichens = {
    ...lichenCollection,
    id: 3,
    name: 'Common Lichen',
    itemNames: [
        'Xanthoria parietina', 'Physcia adscendens', 'Parmelia saxatilis', 'Graphis scripta',
        'Ramalina farinacea', 'Evernia prunastri', 'Usnea florida', 
        'Physcia tenella', 'Placynthium nigrum', 'Physcia aipolia',
        'Rhizocarpon geographicum', 'Ochrolechia parella',
        'Platismatia glauca', 'Diploicia canescens', 'Usnea subfloridana',
        'Cladonia pocillum', 'Peltigera membranacea', 'Cladonia portentosa', 'Cladonia squamosa',
        'Ramalina fastigiata', 'Flavoparmelia caperata', 'Parmotrema perlatum', 'Parmelia sulcata',
        'Lecidella elaeochroma', 'Lecanora chlarotera'
    ],
    descriptions: [
        'Lichens are composite organisms formed from the symbiosis of a fungus (mycobiont), a photosynthetic alga or cyanobacterium (photobiont) and basidiomycete yeasts.',
        // 'Lichens grow on a range of substrates including bark and rocks and \'in the air\' as epiphytes.',
        'Lichens are important environmental indicators (bioindicators) of air and water quality.'
    ],
    speciesCount: 25,
    familiesCount: 11,
    index: 5
};

const locationSpecies = {
    id: 1,
    providerId: 1,
    rangeSensitive: true,
    glossary: ['plantae', 'common', 'fungi'],
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    moduleSize: 4,
};

const placeSpecies = {
    id: 2, 
    providerId: 1,
    rangeSensitive: false,
    rangeSensitive: true,
    glossary: ['plantae', 'common', 'fungi'],
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    moduleSize: 4,
};

export const snapdragonCollections = [
    locationSpecies,
    placeSpecies,
    snapDragonLichens
];