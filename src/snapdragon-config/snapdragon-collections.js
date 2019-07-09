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
        // "Fragaria ananassa",
        "Pyrus communis",
        "Ficus carica",
        // "Malus domestica",
        "Prunus avium",
        // "Apis mellifera",
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
    // descriptions: [
    //     'Part I of the approved list of Weeds for students taking Royal Horticultural Society Qualifications in Practical Horticulture.',
    //     'Snapdragon does not necessarily support the view that weeds are plants in the wrong place.'
    // ],    
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
    itemNames: 
    [
      "Tricholoma equestre",
      "Amanita pantherina",
      // "Chlorophyllum rhacodes",
      // "Amanita caesarea",
      // "Amanita phalloides",
      // "Armillaria mellea",
      // "Clathrus ruber",
      // "Lepista personata",
      // "Agaricus xanthodermus",
      // "Clitocybe fragrans",
      // "Morchella esculenta",
      // "Clitocybe odora",
      // "Grifola frondosa",
      // "Xylaria hypoxylon",
      // "Lepista nuda",
      // "Hericium coralloides",
      // "Laetiporus sulphureus",
      // "Tylopilus felleus",
      // "Laccaria amethystina",
      // "Parasola plicatilis",
      // "Cantharellus cibarius",
      // "Suillus collinitus",
      // "Amanita rubescens",
      // "Fistulina hepatica",
      // "Sparassis crispa",
      // "Calvatia gigantea",
      // "Boletus pinophilus",
      // "Leratiomyces ceres",
      // "Coprinopsis picacea",
      // "Scleroderma citrinum",
      // "Bjerkandera adusta",
      // "Armillaria tabescens",
      // "Lycoperdon pyriforme",
      // "Craterellus tubaeformis",
      // "Leucoagaricus leucothites",
      // "Phaeolus schweinitzii",
      // "Marasmius oreades",
      // "Hygrophoropsis aurantiaca",
      // "Sarcoscypha coccinea",
      // "Hericium americanum",
      // "Agrocybe aegerita",
      // "Boletus edulis",
      // "Bolbitius titubans",
      // "Lycoperdon perlatum",
      // "Gyromitra esculenta",
      // "Coprinus comatus",
      // "Lactarius deliciosus",
      // "Boletus luridus",
      // "Amanita virosa",
      // "Hydnum repandum",
      // "Coprinellus disseminatus",
      // "Polyporus squamosus",
      // "Hericium erinaceus",
      // "Peziza repanda",
      // "Paxillus involutus",
      // "Schizophyllum commune",
      // "Agaricus campestris",
      // "Lactarius vinaceorufescens",
      // "Mycena rosea",
      // "Clitopilus prunulus",
      // "Suillus granulatus",
      // "Hydnum umbilicatum",
      // "Tapinella panuoides",
      // "Lactarius sanguifluus",
      // "Pleurotus ostreatus",
      // "Amanita muscaria",
      // "Omphalotus olearius",
      // "Laetiporus cincinnatus",
      // "Clitocybe rivulosa",
      // "Macrolepiota procera",
      // "Craterellus cornucopioides",
      // "Auricularia auricula-judae",
      // "Entoloma abortivum",
      // "Coprinellus micaceus"
    ],

    // [ 
    //     'Grifola frondosa', 'Laetiporus sulphureus', 'Hericium erinaceus', 'Lycoperdon perlatum',
    //     'Lycoperdon pyriforme', 'Hydnum repandum', 'Craterellus tubaeformis', 'Hydnum umbilicatum', 
    //     'Hericium americanum', 'Hericium coralloides', 'Calvatia gigantea', 'Armillaria mellea', 'Armillaria tabescens', 'Entoloma abortivum'
    //     , 'Polyporus squamosus',
    //     'Laetiporus cincinnatus'        
    // ],
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
        "Fringilla coelebs"
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

export const snapdragonCollections = [
    
    location,
    place,

    placeMonsanto,
    placeArrabida,
    
    snapdragonLichens,
    snapdragonKitchenGarden,
    snapdragonMushroomsEasternUSA,
    commonBritishBirds,
    
    rhsTrees,
    rhsWeeds
];