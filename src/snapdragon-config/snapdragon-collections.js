export const allIconicTaxa = [
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
    },
    {
      id: 'reptilia',
      common: 'Reptiles'
    }
];

const location = {
  id:1000,
  type: 'custom',
  default: true,
  behaviour: 'dynamic',
  rangeSensitive: true,
  glossary: ['plantae', 'common', 'fungi', 'amphibia', 'insecta', 'lichen', 'animalia'],
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  moduleSize: 4,
  iconicTaxa: allIconicTaxa
};

const place = {    
  id: 2000,
  default: true,    
  behaviour: 'dynamic',
  type: 'place',
  rangeSensitive: true,
  glossary: ['plantae', 'common', 'fungi'],
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  moduleSize: 4,
  iconicTaxa: allIconicTaxa
};

const placeMonsanto = {    
    ...place,  
    id: 1, 
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
      ready: true
  }
}

const placeArrabida = {
    ...place,
    id: 2, 
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
      speciesRange: 0,
      ready: true
  }
};

const snapdragonLichens = {
  id: 3,
  type: 'taxon',
  name: 'Common Lichens',
  behaviour: 'static',
  moduleSize: 4,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['lichen', 'common'],
  iconicTaxa: [ {
      id: 'fungi',
      common: 'Fungi & Lichens'
    } ], 
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
  items: [],
  guide: {
    locationPlace: 'Common Lichens',
    locationType: 'taxon',
    place: {
        name: 'Common Lichens',
        id: 'any',
        type: 'places'
    },
    season: {
        type: 'all_year'
    },
    speciesRange: 0,
    ready: true
  }
};

const snapdragonKitchenGarden = { 
    id: 4,
    behaviour: 'static',
    type: 'custom',
    name: 'Kitchen Garden', 
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
        "Pyrus communis",
        "Ficus carica",
        "Prunus avium",
        "Lavandula angustifolia",
        "Lavandula stoechas"
      ],
    items: [],
    iconicTaxa: [ {
        id: 'plantae',
        common: 'Plants'
    } ],
    guide: {
      locationPlace: 'Kitchen Garden',
      locationType: 'course',
      place: {
          name: 'Kitchen Garden',
          id: 'any',
          type: 'places'
      },
      season: {
          type: 'all_year'
      },
      speciesRange: 0,
      ready: true
  }
};

const rhsTrees = { 
    id: 5,
    name: 'RHS Trees',
    behaviour: 'static',
    moduleSize: 6,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    itemNames: [
        "Styrax hemsleyanus",
        "Sorbus cashmiriana",
        "Stewartia pseudocamellia",
        "Sorbus aucuparia",
        "Sorbus aria",
        "Salix alba",
        "Robinia pseudoacacia",
        "Quercus robur",
        "Pyrus salicifolia",
        "Quercus ilex",
        "Quercus coccinea",
        "Pyrus calleryana",
        "Prunus subhirtella",
        "Prunus cerasifera",
        "Platanus orientalis",
        "Populus nigra",
        "Prunus avium",
        "Olea europaea",
        "Platanus acerifolia",
        "Malus floribunda",
        "Malus sylvestris",
        "Liriodendron tulipifera",
        "Liquidambar styraciflua",
        "Ligustrum lucidum",
        "Juglans regia",
        "Fraxinus ornus",
        "Eucalyptus gunnii",
        "Gleditsia triacanthos",
        "Fagus sylvatica",
        "Fraxinus excelsior",
        "Crataegus laevigata",
        "Crataegus monogyna",
        "Cercis siliquastrum",
        "Cercidiphyllum japonicum",
        "Catalpa bignonioides",
        "Betula utilis",
        "Amelanchier lamarckii",
        "Castanea sativa",
        "Carpinus betulus",
        "Betula pendula",
        "Amelanchier canadensis",
        "Alnus cordata",
        "Alnus glutinosa",
        "Aesculus hippocastanum",
        "Acer rubrum",
        "Acer platanoides",
        "Acer pseudoplatanus",
        "Acer davidii",
        "Acer griseum",
        "Acacia dealbata"
      ],
    items: [],
    iconicTaxa: [ {
        id: 'plantae',
        common: 'Plants'
      } ],
    type: 'custom',
    eol_link: 'https://eol.org/collections/140596',
    externalLink: { text: 'RHS Practical Horticulture', url:'https://www.rhs.org.uk/education-learning/qualifications-and-training/rhs-qualifications/level-1-qualifications/level-1-intro-award-in-practical-horticulture' },
    guide: {
      locationPlace: 'RHS Trees',
      locationType: 'course',
      place: {
          name: 'RHS Trees',
          id: 'any',
          type: 'places'
      },
      season: {
          type: 'all_year'
      },
      speciesRange: 0,
      ready: true
  }
};

const rhsWeeds = { 
    id: 6, 
    behaviour: 'static',
    name: 'RHS Weeds I',
    type: 'custom',
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    items: [],
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
    iconicTaxa: [ {
        id: 'plantae',
        common: 'Plants'
      } ],
    eol_link: 'https://eol.org/collections/140731',
    externalLink: { text: 'RHS Practical Horticulture', url:'https://www.rhs.org.uk/education-learning/qualifications-and-training/rhs-qualifications/level-1-qualifications/level-1-intro-award-in-practical-horticulture' },
    guide: {
      locationPlace: 'RHS Weeds',
      locationType: 'course',
      place: {
          name: 'RHS Weeds',
          id: 'any',
          type: 'places'
      },
      season: {
          type: 'all_year'
      },
      speciesRange: 0,
      ready: true
  }
};

const mushroomDefaults = {
    behaviour: 'static',
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['fungi'],
    iconicTaxa: [ {
        id: 'fungi',
        common: 'Fungi & Lichens'
      } ],
    items: []
};

const snapdragonMushroomsEasternUSA = {
    ...mushroomDefaults,
    id: 7,
    type: 'taxon',
    name: 'Mushrooms Eastern USA',            
    itemNames: [ 
        'Grifola frondosa', 'Laetiporus sulphureus', 'Hericium erinaceus', 'Lycoperdon perlatum',
        'Lycoperdon pyriforme', 'Hydnum repandum', 'Craterellus tubaeformis', 'Hydnum umbilicatum', 
        'Hericium americanum', 'Hericium coralloides', 'Calvatia gigantea', 'Armillaria mellea', 'Armillaria tabescens', 'Entoloma abortivum'
        , 'Polyporus squamosus',
        'Laetiporus cincinnatus'        
    ],
    guide: {
      locationPlace: 'Mushrooms Eastern USA',
      locationType: 'taxon',
      place: {
          name: 'Mushrooms Eastern USA',
          id: 'any',
          type: 'places'
      },
      season: {
          type: 'all_year'
      },
      speciesRange: 0,
      ready: true
  }
}

const commonBritishBirds = { 
    behaviour: 'static',
    id: 8, 
    name: 'RSPB Top 10 UK Birds',
    type: 'taxon',
    descriptions: [
        'This lesson will test you on the top 10 most common birds in the UK.',
        'The list is taken from the RSPB Big Garden Birdwatch 2018 survey.',
        '420,489 people recorded 6,764,475 separate bird sightings.'
    ],
    moduleSize: 4,
    lessonPlanLandscape: 5,
    lessonPlanPortrait: 105,
    glossary: ['animalia', 'common'],
    items: [],
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
        "Fringilla coelebs",

        // 'Apus apus',
        // 'Delichon urbicum',
        // 'Hirundo rustica'
      ],
    iconicTaxa: [ {
        id: 'aves',
        common: 'Birds'
    } ],
    guide: {
      locationPlace: 'Common British Birds',
      locationType: 'taxon',
      place: {
          name: 'Common British Birds',
          id: 'any',
          type: 'places'
      },
      season: {
          type: 'all_year'
      },
      speciesRange: 0,
      ready: true
  }
};

const selectedItemsCollection = { 
  id: 9,
  behaviour: 'static',
  type: 'custom',
  name: 'User collection', 
  moduleSize: 6,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['common'],
  itemNames: [],
  items: [],
  iconicTaxa: [],
  guide: {
    iconicTaxa: [],
    locationPlace: 'User collection',
    locationType: 'taxon',
    place: {
        name: 'User collection',
        id: 'any',
        type: 'places'
    },
    season: {
        type: 'all_year'
    },
    speciesRange: 0,
    ready: true
}
};

const treesOfLisbon = { 
  behaviour: 'static',
  id: 10, 
  name: '25 Trees of Lisbon',
  type: 'custom',
  descriptions: [
      'Os 25 espécies de árvores mais frequentes.'
  ],
  moduleSize: 4,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['plantae', 'common'],
  items: [
    
  ],
  itemNames: [
    'Acer negundo',
    'Acer pseudoplatanus',
    'Celtis australis',
    'Cercis siliquastrum',
    'Cupressus sempervirens',
    'Eucalyptus globulus',
    'Fraxinus angustifolia',
    'Ginkgo biloba',
    'Jacaranda mimosifolia',
    'Olea europaea',
    'Phoenix canariensis',
    'Pinus pinea',
    'Platanus acerifolia',
    'Populus alba',
    'Populus nigra',
    'Quercus faginea',
    'Quercus ilex',
    'Quercus robur',
    'Robinia pseudoacacia',
    'Saphora japonica',
    'Tilia tomentosa',
    'Tipuana tipu',
    'Gleditsia triacanthos',
    'Ulmus minor',
    'Quercus suber',
    ],
  iconicTaxa: [ {
      id: 'plantae',
      common: 'Plants'
  } ],
  guide: {
    locationPlace: '25 Trees of Lisbon',
    locationType: 'taxon',
    place: {
        name: '25 Trees of Lisbon',
        id: 'any',
        type: 'places'
    },
    season: {
        type: 'all_year'
    },
    speciesRange: 0,
    ready: true
  }
};

const walkOne = { 
  behaviour: 'static',
  id: 11, 
  name: 'Jardim da Estrela',
  type: 'custom',
  descriptions: [
      'Jardim da Estrela.'
  ],
  moduleSize: 4,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['plantae', 'aves', 'fungi', 'common', 'insecta', 'lichen', 'animalia'],
  items: [
    
  ],
  itemNames: [
    'Celtis australis',
    'Magnolia grandiflora',

    'Bauhinia forficata', // syn. candicans
    'Bauhinia variegata', // less likely

    'Tilia platyphyllos', 
    'Tilia tomentosa',

    'Xanthoria parietina',

    'Plumbago auriculata',

    'Lavandula dentata',
    'Lavandula stoechas',

    'Platanus acerifolia',
    'Phoenix canariensis',
    'Phoenix reclinata', // tall?
    'Roystonea regia', // tall, wrong garden x
    'Chamaerops humilis',
    'Fatsia japonica',

    'Cupressus sempervirens',
    'Cupressus lusitanica',

    'Taxus baccata',

    'Passer domesticus',
    'Turdus merula',

    'Aesculus hippocastanum',
    'Cedrus deodara',

    'Cercis siliquastrum',
    
    'Agapanthus africanus',
    'Lantana',
    'Nerium oleander',

    'Quercus robur',
    'Ginkgo biloba',
    'Jacaranda mimosifolia',
    'Olea europaea',
    
    'Pinus pinea',
    'Saphora japonica',
    'Phytolacca dioica',
    'Gleditsia triacanthos',
    'Ficus macrophylla',
    'Ailanthus altissima', // possible, not recorded though...
    'Araucaria columnaris', // tallest
    
    // avenue

    'Ceiba speciosa',
    'Ceratonia siliqua',
    // 'Dombeya x cayeuxii', // the big flower balls
    'Dombeya wallichii', // parent of the above
    'Apollonias barbujana',

    'Dendrocalamus giganteus',
    'Cedrus libani',
    'Dracaena draco',

    'Sequoia sempervirens',

    'Pittosporum undulatum',
    
    'hibiscus syriacus',
    'Brugmansia arborea',
    'Corynocarpus laevigatus',


    'Pittosporum tobira',

    'Robinia pseudoacacia', //needs checking

    // top gate

    'Schinus molle'
    ],
  iconicTaxa: [ 
    {
      id: 'fungi',
      common: 'Fungi & Lichens'
    },
    {
      id: 'plantae',
      common: 'Plants'
    },
    {
      id: 'aves',
      common: 'Birds'
    }
  ],
  guide: {
    locationPlace: 'Jardim da Estrela',
    locationType: 'taxon',
    place: {
        name: 'Jardim da Estrela',
        id: 'any',
        type: 'places'
    },
    season: {
        type: 'all_year'
    },
    speciesRange: 0,
    ready: true
  }
};

const walkTwo = { 
  behaviour: 'static',
  id: 12, 
  name: 'Conifers of Jardim da Estrela',
  type: 'custom',
  descriptions: [
      'Conifers of Jardim da Estrela.'
  ],
  moduleSize: 4,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['plantae'],
  items: [
    
  ],
  itemNames: [
    'Araucaria columnaris',
    'Buxus sempervirens',
    'Cedrus atlantica',
    'Cedrus deodara',
    'Cedrus libani',
    'Cupressus lusitanica',
    'Cupressus sempervirens',
    'Juniperus chinensis',
    'Picea abies',
    'Pinus canariensis',
    'Pinus halepensis',
    'Pinus pinea',
    'Sequoia sempervirens'
    ],
  iconicTaxa: [ 
    {
      id: 'plantae',
      common: 'Plants'
    }
  ],
  guide: {
    locationPlace: 'Jardim da Estrela',
    locationType: 'taxon',
    place: {
        name: 'Conifers of Jardim da Estrela',
        id: 'any',
        type: 'places'
    },
    season: {
        type: 'all_year'
    },
    speciesRange: 0,
    ready: true
  }
};

const lookalikes = { 
  behaviour: 'static',
  id: 13, 
  name: 'Lookalikes',
  type: 'custom',
  descriptions: [
      'Lookalikes'
  ],
  moduleSize: 4,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['plantae', 'common', 'fungi', 'amphibia', 'insecta', 'lichen', 'animalia'],
  items: [
    
  ],
  itemNames: [
    "Lavandula angustifolia",
    'Lavandula stoechas',
    "Taraxacum officinale",
    'Tussilago farfara',
    "Lycoperdon pyriforme",
    'Scleroderma citrinum',
    "Hirundo rustica",
    'Apus apus',
    'Delichon urbicum',
    'Accipiter nisus',
    "Falco tinnunculus",
    "Phoenicurus ochruros",
    'Phoenicurus phoenicurus',
    'Hericium coralloides',
    "Hericium americanum",
    'Hydnum umbilicatum',
    "Hydnum repandum",
    "Delphinus delphis",
    'Phocoena phocoena',
    "Laetiporus sulphureus",
    'Laetiporus cincinnatus',
    'Polyporus squamosus',
    "Morchella esculenta",
    'Gyromitra esculenta',
    "Cantharellus cibarius",
    'Hygrophoropsis aurantiaca'
  ],
  iconicTaxa: allIconicTaxa,
  guide: {
    locationPlace: 'Lookalikes',
    locationType: 'taxon',
    place: {
        name: 'Lookalikes',
        id: 'any',
        type: 'places'
    },
    season: {
        type: 'all_year'
    },
    speciesRange: 0,
    ready: true
  }
};

export const snapdragonCollections = [
    
    location,
    place,

    placeMonsanto,
    placeArrabida,
    
    snapdragonLichens,
    snapdragonMushroomsEasternUSA,
    commonBritishBirds,
    
    walkOne,
    walkTwo,
    lookalikes,
    treesOfLisbon,
    rhsTrees,
    rhsWeeds,
    snapdragonKitchenGarden,

    selectedItemsCollection
];