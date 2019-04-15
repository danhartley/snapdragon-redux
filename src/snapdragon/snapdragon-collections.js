import { deciduousAndEvergreenTrees } from 'api/rhs/deciduous-evergreen-trees';
import { birds } from 'api/snapdragon/birds';
import { mushrooms } from 'api/snapdragon/mushrooms';
import { weeds } from 'api/rhs/weeds';
import { lichen } from 'api/snapdragon/lichen';

import { leaf } from 'api/leaf';

import { plants } from 'api/snapdragon/plants';

const allIconicTaxa = [
    {
      id: 'fungi',
      common: 'Fungi & Lichens'
    },
    {
      id: 'amphibia',
      common: 'Amphibians'
    },
    {
      id: 'mammalia',
      common: 'Mammals'
    },
    {
      id: 'plantae',
      common: 'Plants'
    },
    {
      id: 'lepidoptera',
      common: 'Butterflies & Moths'
    },
    {
      id: 'insecta',
      common: 'Insects'
    },
    {
      id: 'aves',
      common: 'Birds'
    }
];

const snapdragonLichens = {
    id: 3,
    type: 'taxon',
    name: 'Common Lichens',
    guide: {
        locationPlace: 'Common Lichens',
        locationType: 'place',
        place: {
            name: 'Snapdragon Lichens',
            id: 'any',
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: [
            {
              id: 'fungi',
              common: 'Fungi & Lichens'
            }
        ],
        ready: true
    },
    collection: {
      id: 3
    },
    providerId: 2,
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['lichen', 'common'],
    iconicTaxa: [ 'fungi' ],    
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
    items: lichen,
    descriptions: [
        'Lichens are composite organisms formed from the symbiosis of a fungus (mycobiont), a photosynthetic alga or cyanobacterium (photobiont) and basidiomycete yeasts.',
        // 'Lichens grow on a range of substrates including bark and rocks and \'in the air\' as epiphytes.',
        'Lichens are important environmental indicators (bioindicators) of air and water quality.'
    ]
};

const locationDefaults = {
    default: true,
    id: 1,
    providerId: 1,
    rangeSensitive: true,
    glossary: ['plantae', 'common', 'fungi'],
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    moduleSize: 4,
};

const placeDefaults = {
    default: true,
    id: 2, 
    providerId: 1,
    type: 'place',
    rangeSensitive: true,
    glossary: ['plantae', 'common', 'fungi'],
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    moduleSize: 4,
    collection: {
        id: 2
    },
    iconicTaxa: allIconicTaxa.map(all => all.id)
};

const placeMonsanto = {    
    ...placeDefaults,  
    default: false,  
    name: 'Parque Florestal Monsanto',            
    guide: {
        locationPlace: 'Monsanto Forest Park, LI, PT',
        locationType: 'place',
        place: {
            name: 'Monsanto Forest Park, LI, PT',
            id: 61034,
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: allIconicTaxa,
        ready: true
    }
}

const placeArrabida = {
    ...placeDefaults,
    default: false,
    name: 'O Parque Natural da Arrábida, SE, PT',            
    guide: {
        locationPlace: 'O Parque Natural da Arrábida, SE, PT',
        locationType: 'place',
        place: {
            name: 'O Parque Natural da Arrábida, SE, PT',
            id: 131416,
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: allIconicTaxa,
        ready: true
    } 
};

const snapdragonKitchenGarden = { 
    id: 4,
    providerId: 2,
    type: 'snapdragon',
    name: 'Kitchen Garden',            
    guide: {
        locationPlace: 'Kitchen Garden',
        locationType: 'place',
        place: {
            name: 'Kitchen Garden',
            id: 'any',
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: [
            {
              id: 'plantae',
              common: 'Plants'
            },
        ],
        ready: true
    },
    collection: {
      id: 4
    },
    // descriptions: [
    //     'Learn the common and scientific names of herbs, vegetables and fruit used in Western cooking.',
    //     'All of the species are either native or adapted to a Mediterranean climate.',
    //     'Later lessons will introduce you to families and the traits they share.'        
    // ],
    moduleSize: 6,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
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
    items: [ ...plants ],
    iconicTaxa: [ 'plantae' ]
};

const rhsTrees = { 
    id: 5,
    name: 'RHS Trees',
    providerId: 2,
    moduleSize: 6,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
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
    items: deciduousAndEvergreenTrees,
    iconicTaxa: [ 'plantae' ],
    type: 'course',
    guide: {
        locationPlace: 'RHS Trees',
        locationType: 'place',
        place: {
            name: 'RHS Trees',
            id: 'any',
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: [
            {
                id: 'plantae',
                common: 'Plants'
            },
        ],
        ready: true
    },
    collection: {
        id: 5
    },
    eol_link: 'https://eol.org/collections/140596',
    externalLink: { text: 'RHS Practical Horticulture', url:'https://www.rhs.org.uk/education-learning/qualifications-and-training/rhs-qualifications/level-1-qualifications/level-1-intro-award-in-practical-horticulture' },
};

const rhsWeeds = { 
    id: 6, 
    providerId: 2,
    name: 'RHS Weeds I', 
    // descriptions: [
    //     'Part I of the approved list of Weeds for students taking Royal Horticultural Society Qualifications in Practical Horticulture.',
    //     'Snapdragon does not necessarily support the view that weeds are plants in the wrong place.'
    // ],    
    type: 'course',
    guide: {
        locationPlace: 'RHS Weeds',
        locationType: 'place',
        place: {
            name: 'RHS Weeds',
            id: 'any',
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: [
            {
              id: 'plantae',
              common: 'Plants'
            },
        ],
        ready: true
    },
    collection: {
      id: 6
    },
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    items: weeds,
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
    iconicTaxa: [ 'plantae' ],
    eol_link: 'https://eol.org/collections/140731',
    externalLink: { text: 'RHS Practical Horticulture', url:'https://www.rhs.org.uk/education-learning/qualifications-and-training/rhs-qualifications/level-1-qualifications/level-1-intro-award-in-practical-horticulture' },
};

const mushroomDefaults = {
    providerId: 2,
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['fungi'],
    iconicTaxa: [ 'fungi' ],
    items: mushrooms
};

const snapdragonMushroomsEasternUSA = {
    ...mushroomDefaults,
    id: 7,
    type: 'taxon',
    name: 'Mushrooms Eastern USA',            
    guide: {
        locationPlace: 'Mushrooms Eastern USA',
        locationType: 'place',
        place: {
            name: 'Snapdragon Mushrooms Eastern USA',
            id: 'any',
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: [
            {
              id: 'fungi',
              common: 'Fungi'
            },
        ],
        ready: true
    },
    collection: {
      id: 7
    },
    itemNames: [ 
        'Grifola frondosa', 'Laetiporus sulphureus', 'Hericium erinaceus', 'Lycoperdon perlatum',
        'Lycoperdon pyriforme', 'Hydnum repandum', 'Craterellus tubaeformis', 'Hydnum umbilicatum', 
        'Hericium americanum', 'Hericium coralloides', 'Calvatia gigantea', 'Armillaria mellea', 'Armillaria tabescens', 'Entoloma abortivum'
        , 'Polyporus squamosus',
        'Laetiporus cincinnatus'
        //'Clitocybe nuda'
        
    ],
    // descriptions: [
    //     'A collection of mushrooms that can be found in the Fall in the Eastern United States.',
    //     'Some of the species may be found in other seasons, and across the US.'
    // ],
}

const commonBritishBirds = { 
    providerId: 2,
    id: 8, 
    name: 'RSPB Top 10 UK Birds',
    type: 'taxon',
    guide: {
        locationPlace: 'Common British Birds',
        locationType: 'place',
        place: {
            name: 'Snapdragon Common British Birds',
            id: 'any',
            type: 'places'
        },
        season: {
            type: 'all_year'
        },
        iconicTaxa: [
            {
              id: 'aves',
              common: 'Birds'
            },
        ],
        ready: true
    },
    descriptions: [
        'This lesson will test you on the top 10 most common birds in the UK.',
        'The list is taken from the RSPB Big Garden Birdwatch 2018 survey.',
        '420,489 people recorded 6,764,475 separate bird sightings.'
    ],
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['animalia', 'common'],
    items: birds,
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
    iconicTaxa: [ 'aves' ],
    collection: {
        id: 8
      },
};

export const snapdragonCollections = [
    
    locationDefaults,
    
    placeDefaults,
    placeMonsanto,
    placeArrabida,
    
    snapdragonLichens,
    snapdragonKitchenGarden,
    snapdragonMushroomsEasternUSA,
    commonBritishBirds,
    
    rhsTrees,
    rhsWeeds
];