import { learnYourLand } from 'snapdragon-config/learn your land/learn-your-land-collections';

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
  species: [
    {
      name: 'Xanthoria parietina'
    },
    {
      name: 'Physcia adscendens'
    },
    {
      name: 'Parmelia saxatilis'
    },
    {
      name: 'Graphis scripta'
    },
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

const kitchen1 = {
    id: 15,
    behaviour: 'static',
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    iconicTaxa: [ {
      id: 'plantae',
      common: 'Plants'
    }, ],
    items: [],
    name: '10 Indoor Herbs',
    species: [ 
      {
        name: 'Anethum graveolens',
        time: [38],
        description: `You can start dill from seed; in one to two weeks the first set of leaves will emerge and will soon take on its familiar form.`
      },
      {
        name: 'Thymus vulgaris',
        time: [65],
        description: `Perennial; frost hardy and can be grown outdoors. 
        
        Best grown from a cutting.`
      },
      {
        name: 'Origanum vulgare',
        time: [80],
        description: `Oregano can be grown from a cutting or seed. It is not frost resistant.`
      },
      {
        name: 'Salvia officinalis',
        time: [98],
        description: `Sage can tolerant frosts to -10C.`
      },
      {
        name: 'Petroselinum crispum',
        time: [115],
        description: `Best grown from seed, it can tolerate frosts to -12C.`
      },
      {
        name: 'Coriandrum sativum',
        time: [137],
        description: `Also known as Coriander.
        
        Best grown from seed (which must be split first to ensure it germinates quickly). 
        
        Seed leaves will appear within a week. Best planted in fall, in spring it flowers quickly.`
      },
      {
        name: 'Artemisia dracunculus',
        time: [172],
        description: `A winter hardy perennial and tolerates forst well (to -20C).`
      },
      {
        name: 'Ocimum basilicum',
        time: [194],
        description: `Dies in winter; take cuttings and propogate in first week of spring. Also grows well from seed.`
      },
      {
        name: 'Mentha spicata',
        time: [224],
        description: `Grows well from cuttings or roots. It dies back in winter and regrows in spring with plentiful watering. 
        
        Alternatively bring inside in winter.`
      },
      {
        name: 'Rosmarinus officinalis',
        time: [241],
        description: `Place cuttings in water; it will easily root and can then be planted out (indoors or out). 
        
        Winter hardy but avoid excessive frosts.`
      },
    ],
    producer: 'Jag Singh - Daisy Creek Farms',
    video: {
      id: 'DeLjnFTDjFc',
      startAt: 37,
      title: '10 Herbs You Can Grow Indoors on Kitchen Counter',
      intro: '10 Herbs You Can Grow Indoors on Kitchen Counter.',
      owner: 'Learn Your Land',
      ownerUrl: '',
      presenter: 'Jag Singh',
      links: [
        {
          label: '',
          url: ''
        },
        {
          label: 'Patreon',
          url: 'www.patreon.com/jagsingh'
        }
      ],
    }   
};

const birds1 = {
    id: 16,
    behaviour: 'static',
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['animalia', 'common'],
    iconicTaxa: [ {
      id: 'aves',
      common: 'Birds'
  } ],
    species: [
      {
        name: "Erithacus rubecula",
        time: [1,149,227,319,560,592],
        description: 'European robin'
      },
      {
        name: "Fringilla coelebs",
        time: [10,133,235,288,347,418,428,495],
        description: 'Female chaffinch'
      },
      {
        name: "Pyrrhula pyrrhula",
        time: [24,64,110,170,198,456],
        description: 'Male bullfinch'
      },
      {
        name: "Sylvia atricapilla",
        time: [31,50,120,175,324,399,452,567],
        description: 'Female blackcap'
      },
      {
        name: "Carduelis carduelis",
        time: [42,207,266,383],
        description: 'European goldfinch'
      },
      {
        name: "Prunella modularis",
        time: [70,223,312,457,518],
        description: 'Dunnock'
      },
      {
        name: "Cyanistes caeruleus",
        time: [80,162,360,455,479,532],
        description: 'Blue tit'
      },
      {
        name: "Passer domesticus",
        time: [88,96,258337,548],
        description: 'Male house sparrow'
      },
      {
        name: "Parus major",
        time: [103,512],
        description: 'Great tit'
      },
      {
        name: "Turdus merula",
        time: [184,578],
        description: 'Blackbird'
      },
      {
        name: "Chloris chloris",
        time: [247],
        description: 'Female greenfinch'
      }    
    ],
    name: 'UK Garden Bird Identification',
    producer: 'Paul Dinning',
    video: {
      id: 'wCngPMlOFok',
      startAt: 0,
      title: 'Garden Bird Identification - Let Nature Sing',
      intro: 'Garden Bird Identification - Let Nature Sing.',
      owner: 'Paul Dinning',
      ownerUrl: '',
      presenter: 'Paul Dinning',
      links: [
        {
          label: '',
          url: ''
        },
        {
          label: '',
          url: ''
        }
      ],
    }   
};

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
    species: [
      {
        name: "Passer domesticus",
        time: 0,
        description: ''
      },
      {
        name: "Sturnus vulgaris",
        time: 0,
        description: ''
      },
      {
        name: "Cyanistes caeruleus",
        time: 0,
        description: ''
      },
      {
        name: "Turdus merula",
        time: 0,
        description: ''
      },
      {
        name: "Columba palumbus",
        time: 0,
        description: ''
      },
      {
        name: "Carduelis carduelis",
        time: 0,
        description: ''
      },
      {
        name: "Parus major",
        time: 0,
        description: ''
      },
      {
        name: "Erithacus rubecula",
        time: 0,
        description: ''
      },
      {
        name: "Aegithalos caudatus",
        time: 0,
        description: ''
      },
      {
        name: "Fringilla coelebs",
        time: 0,
        description: ''
      }
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

const woodlandsTV1 = {
  
  id: 17,
  type: 'taxon',
  name: 'An Introduction to Lichen',
  behaviour: 'static',
  moduleSize: 4,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['lichen', 'common'],
  iconicTaxa: [ 
    {
      id: 'fungi',
      common: 'Fungi & Lichens'
    },
  ],
  species: [
    {
      name: 'Quercus rubra',
      time: [85],
      description: 'Supports a wide variety of lichens.'
    },
    {
      name: 'Graphis scripta',
      time: [190],
      description: 'The apothecia form lines which ressemble some kind of ancient script or writing.'
    },
  ],
  notes: [
    {
      tag: 'Symbiotic association',
      time: [49]
    },
    {
      tag: 'Fungus structure',
      time: [51]
    },
    {
      tag: 'Single-celled photosynthetic organism',
      time: [55]
    },
    {
      tag: 'Cyanobacterium',
      time: [64]
    },
    {
      tag: 'Second fungus',
      time: [77]
    },
    {
      tag: 'Fruticose',
      time: [110],
      description: `Bushy like a shrub; it is attached to the bark substrate at one point and branches out from there.`
    },
    {
      tag: 'Foliose',
      time: [126],
      description: `Flat like a leaf, with both a top side and a bottom side (which can be revelead).`
    },
    {
      tag: 'Crustose',
      time: [148],
      description: `Grows directly onto the bark; cannot be pealed off.`
    },
    {
      tag: 'Apothecia',
      time: [183],
      description: `Fruiting bodies that release spores.`
    },
    {
      tag: 'Cladonia',
      time: [224],
      description: `Forms gothic structures.`
    },
    {
      tag: 'Podetia',
      time: [231],
      description: `Structures (feet) that grow upwards from the substrate. A Podetium is a hollow stalk extending from the primary thallus; it is not considered part of the primary thallus as it is a fruiting structure for reproduction.`
    },
    {
      tag: 'Apothecia',
      time: [238],
      description: `Liitle brown blobs which are the fruiting bodies which release spores from which the lichen reproduces.`
    },
    {
      tag: 'Role',
      time: [290],
      description: `Fix carbon and nitrogen. Habitat for many living things such as bark flies and the wasps that predate on them.`
    },
  ],
  producer: 'WoodlandsTV',
  video: {
    id: 'XQ_ZY57MY64',
    startAt: 48,
    title: 'An Introduction to Lichen',
    intro: 'I hope you enjoy this brief introduction to foraging edible mushrooms in Eastern North America. When you\'ve finished watching, review what we covered to see how much you remember, and to reinforce what you learnt.',
    owner: 'WoodlandsTV',
    ownerUrl: 'https://www.youtube.com/channel/UCCeOzbtcmqPmWdMeB6x9nvA',
    presenter: 'Joe Hope',
    links: [
      {
        label: '',
        url: ''
      },
      {
        label: 'Website',
        url: 'youtube.com/channel/UCCeOzbtcmqPmWdMeB6x9nvA'
      }
    ],
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
    'Chamaerops humilis',
    'Roystonea regia', // tall, wrong garden ?
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
    'Vanessa cardui',
    
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
    },
    {
      id: 'lepidoptera',
      common: 'Butterflies & Moths'
    },
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
    
    ...learnYourLand,

    kitchen1,

    birds1,

    woodlandsTV1,

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