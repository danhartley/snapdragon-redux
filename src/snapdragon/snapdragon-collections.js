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

const snapdragonLichens = {
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

const snapdragonKitchenGarden = { 
    providerId: 2,
    id: 4, 
    name: 'Kitchen Garden', 
    type: 'species',
    descriptions: [
        'Learn the common and scientific names of herbs, vegetables and fruit used in Western cooking.',
        'All of the species are either native or adapted to a Mediterranean climate.',
        'Later lessons will introduce you to families and the traits they share.'        
    ],
    thumb: 'https://content.eol.org/data/media/81/3f/ae/542.8232814894.260x190.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    collectionType: 'Collection',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 1,
    course: 'Snapdragon',
    speciesCount: 53,
    familiesCount: 16,
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
        // "Fragaria ananassa",
        "Pyrus communis",
        "Ficus carica",
        // "Malus domestica",
        "Prunus avium",
        // "Apis mellifera"
      ],
    index: 0,
    iconicTaxa: [ 'plantae' ]
};

const rhsTrees = { 
    providerId: 2,
    id: 5, name: 'Deciduous and Evergreen Trees', 
    type: 'species',
    descriptions: ['This is an approved list of Deciduous and Evergreen Trees from the Royal Horticultural Society (RHS).', 'Students taking RHS courses in Practical Horticulture are required to learn some, or all, of these species.'],
    collections: ['Deciduous and evergreen trees'],
    thumb: 'https://content.eol.org/data/media/7e/c3/1d/542.17202950412.260x190.jpg',
    moduleSize: 6,
    curator: 'Snapdragon',
    collectionType: 'Collection',
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    courseId: 2,
    course: 'RHS Practical Horticulture',
    speciesCount: 65,
    familiesCount: 20,
    itemNames: [
        "Styrax hemsleyanus",
        // "Stewartia sinensis",
        // "Tilia euchlora",
        "Sorbus cashmiriana",
        // "Tilia europaea",
        "Stewartia pseudocamellia",
        "Sorbus aucuparia",
        // "Salix sepulcralis",
        "Sorbus aria",
        "Salix alba",
        "Robinia pseudoacacia",
        "Quercus robur",
        "Pyrus salicifolia",
        "Quercus ilex",
        "Quercus coccinea",
        // "Prunus serrula",
        "Pyrus calleryana",
        "Prunus subhirtella",
        "Prunus cerasifera",
        "Platanus orientalis",
        "Populus nigra",
        "Prunus avium",
        "Olea europaea",
        "Platanus acerifolia",
        // "Liriodendron chinense",
        "Malus floribunda",
        "Malus sylvestris",
        "Liriodendron tulipifera",
        // "Laburnum watereri",
        // "Magnolia soulangeana",
        "Liquidambar styraciflua",
        // "Ilex altaclerensis",
        "Ligustrum lucidum",
        // "Eucryphia x nymansensis",
        "Juglans regia",
        // "Eucalyptus pauciflora",
        // "Crataegus prunifolia",
        "Fraxinus ornus",
        "Eucalyptus gunnii",
        "Gleditsia triacanthos",
        "Fagus sylvatica",
        "Fraxinus excelsior",
        "Crataegus laevigata",
        "Crataegus monogyna",
        "Cercis siliquastrum",
        "Cercidiphyllum japonicum",
        // "Cordyline australis",
        "Catalpa bignonioides",
        "Betula utilis",
        "Amelanchier lamarckii",
        "Castanea sativa",
        "Carpinus betulus",
        "Betula pendula",
        "Amelanchier canadensis",
        "Alnus cordata",
        "Alnus glutinosa",
        // "Aesculus carnea",
        "Aesculus hippocastanum",
        "Acer rubrum",
        "Acer platanoides",
        "Acer pseudoplatanus",
        "Acer davidii",
        "Acer griseum",
        // "Acacia baileyana",
        "Acacia dealbata"
      ],
    index: 1,
    iconicTaxa: [ 'plantae' ]
};

const rhsWeeds = { 
    id: 6, 
    providerId: 2,
    name: 'RHS Weeds I', 
    type: 'species',
    descriptions: [
        'Part I of the approved list of Weeds for students taking Royal Horticultural Society Qualifications in Practical Horticulture.',
        'Snapdragon does not necessarily support the view that weeds are plants in the wrong place.'
    ],
    collections: ['RHS Weeds I'],
    thumb: 'https://content.eol.org/data/media/55/9d/2c/509.118977.260x190.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    collectionType: 'Collection',
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
    index: 3,
    iconicTaxa: [ 'plantae' ]
};

const mushroomCollection = {
    providerId: 2,
    type: 'species',
    thumb: 'https://content.eol.org/data/media/59/16/59/509.2840237.260x190.jpg',
    moduleSize: 4,
    curator: 'Snapdragon',
    collectionType: 'Collection',
    lessonPlanLandscape: 3,
    lessonPlanPortrait: 103,
    glossary: ['fungi'],
    course: 'Snapdragon',
    iconicTaxa: [ 'fungi' ]
};

const snapdragonMushroomsEasternUSA = {
    ...mushroomCollection,
    id: 7,
    name: 'Mushrooms Eastern US Fall',
    thumb: 'https://content.eol.org/data/media/55/b5/47/509.12337524.260x190.jpg',
    itemNames: [ 
        'Grifola frondosa', 'Laetiporus sulphureus', 'Hericium erinaceus', 'Lycoperdon perlatum',
        'Lycoperdon pyriforme', 'Hydnum repandum', 'Craterellus tubaeformis', 'Hydnum umbilicatum', 
        'Hericium americanum', 'Hericium coralloides', 'Calvatia gigantea', 'Armillaria mellea', 'Armillaria tabescens', 'Entoloma abortivum'
        , 'Polyporus squamosus',
        'Laetiporus cincinnatus'
        //'Clitocybe nuda'
        
    ],
    descriptions: [
        'A collection of mushrooms that can be found in the Fall in the Eastern United States.',
        'Some of the species may be found in other seasons, and across the US.'
    ],
    speciesCount: 16,
    familiesCount: 9,
    index: 4
}

export const snapdragonCollections = [
    locationSpecies,
    placeSpecies,
    snapdragonLichens,
    snapdragonKitchenGarden,
    snapdragonMushroomsEasternUSA,
    rhsTrees,
    rhsWeeds
];