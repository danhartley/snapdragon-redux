import { iconicTaxa } from 'snapdragon-config/snapdragon-iconic-taxa';

const snapdragonMonsanto = {    
    id: 1, 
    behaviour: 'dynamic',
    name: 'Parque Florestal Monsanto',
    type: 'place',
    rangeSensitive: true,
    glossary: ['plantae', 'common', 'fungi'],
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    moduleSize: 4,
    iconicTaxa: iconicTaxa.all
}

const snapdragonArrabida = {
    id: 2, 
    behaviour: 'dynamic',
    name: 'O Parque Natural da Arrábida, SE, PT',
    type: 'place',
    rangeSensitive: true,
    glossary: ['plantae', 'common', 'fungi'],
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    moduleSize: 4,
    iconicTaxa: iconicTaxa    .all
};

const snapdragonLichens = {
  id: 3,
  behaviour: 'static',
  name: 'Common Lichens',
  type: 'taxon',
  moduleSize: 4,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['lichen', 'common'],
  iconicTaxa: [ {
      id: 'fungi',
      common: 'Fungi & Lichens'
  } ], 
  itemNames: [
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
    {
      name: 'Ramalina farinacea'
    },
    {
      name: 'Evernia prunastri'
    },
    {
      name: 'Usnea florida'
    },
    {
      name: 'Physcia tenella'
    },
    {
      name: 'Placynthium nigrum'
    },
    {
      name: 'Physcia aipolia'
    },
    {
      name: 'Rhizocarpon geographicum'
    },
    {
      name: 'Ochrolechia parella'
    },
    {
      name: 'Platismatia glauca'
    },
    {
      name: 'Diploicia canescens'
    },
    {
      name: 'Usnea subfloridana'
    },
    {
      name: 'Cladonia pocillum'
    },
    {
      name: 'Peltigera membranacea'
    },
    {
      name: 'Cladonia portentosa'
    },
    {
      name: 'Cladonia squamosa'
    },
    {
      name: 'Ramalina fastigiata'
    },
    {
      name: 'Flavoparmelia caperata'
    },
    {
      name: 'Parmotrema perlatum'
    },
    {
      name: 'Parmelia sulcata'
    },
    {
      name: 'Lecidella elaeochroma'
    },
    {
      name: 'Lecanora chlarotera'
    },
  ],
  items: []
};

const snapdragonKitchenGarden = { 
    id: 4,
    behaviour: 'static',
    name: 'Kitchen Garden', 
    moduleSize: 6,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    itemNames: [
        'Allium sativum',
        'Coriandrum sativum',
        'Cuminum cyminum',
        'Origanum majorana',
        'Cymbopogon citratus',
        'Sinapis alba',
        'Zingiber officinale',
        'Brassica nigra',
        'Carum carvi',
        'Satureja hortensis',
        'Piper nigrum',
        'Laurus nobilis',
        'Capsicum annuum',
        'Salvia officinalis',
        'Origanum vulgare',
        'Foeniculum vulgare',
        'Mentha spicata',
        'Anethum graveolens',
        'Thymus vulgaris',
        'Petroselinum crispum',
        'Ocimum basilicum',
        'Allium schoenoprasum',
        'Artemisia dracunculus',
        'Rosmarinus officinalis',
        'Borago officinalis',
        'Cucumis sativus',
        'Beta vulgaris',
        'Spinacia oleracea',
        'Raphanus sativus',
        'Cucurbita pepo',
        'Solanum lycopersicum',
        'Brassica rapa',
        'Vicia faba',
        'Phaseolus coccineus',
        'Pisum sativum',
        'Pastinaca sativa',
        'Solanum melongena',
        'Cynara cardunculus',
        'Lactuca sativa',
        'Daucus carota',
        'Brassica oleracea',
        'Solanum tuberosum',
        'Allium cepa',
        'Vitis vinifera',
        'Mespilus germanica',
        'Prunus armeniaca',
        'Prunus domestica',
        'Prunus persica',
        'Rubus idaeus',
        'Citrus limon',
        'Pyrus communis',
        'Ficus carica',
        'Prunus avium',
        'Lavandula angustifolia',
        'Lavandula stoechas'
      ],
    items: [],
    iconicTaxa: [ {
        id: 'plantae',
        common: 'Plants'
    } ]
};

const snapdragonTreesOfLisbon = { 
    behaviour: 'static',
    id: 5, 
    name: '25 Trees of Lisbon',
    type: 'taxon',
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
    } ]
};
  
const snapdragonWalkOne = { 
behaviour: 'static',
id: 6, 
name: 'Jardim da Estrela',
descriptions: [
    'Jardim da Estrela.'
],
moduleSize: 4,
lessonPlanLandscape: 1,
lessonPlanPortrait: 101,
glossary: ['plantae', 'aves', 'fungi', 'common', 'insecta', 'lichen', 'animalia'],
items: [],
species: [
    {
    name: 'Celtis australis',
    time: [],
    description: ''
    },
    {
    name: 'Magnolia grandiflora',
    time: [],
    description: ''
    },
    {
    name: 'Bauhinia forficata',
    time: [],
    description: ''
    },
    {
    name: 'Bauhinia variegata',
    time: [],
    description: ''
    },
    {
    name: 'Tilia platyphyllos',
    time: [],
    description: ''
    },
    {
    name: 'Tilia tomentosa',
    time: [],
    description: ''
    },
    {
    name: 'Xanthoria parietina',
    time: [],
    description: ''
    },
    {
    name: 'Plumbago auriculata',
    time: [],
    description: ''
    },
    {
    name: 'Lavandula dentata',
    time: [],
    description: ''
    },
    {
    name: 'Lavandula stoechas',
    time: [],
    description: ''
    },
    {
    name: 'Platanus acerifolia',
    time: [],
    description: ''
    },
    {
    name: 'Phoenix canariensis',
    time: [],
    description: ''
    },
    {
    name: 'Phoenix reclinata',
    time: [],
    description: ''
    },
    {
    name: 'Chamaerops humilis',
    time: [],
    description: ''
    },
    {
    name: 'Roystonea regia',
    time: [],
    description: ''
    },
    {
    name: 'Fatsia japonica',
    time: [],
    description: ''
    },
    {
    name: 'Cupressus sempervirens',
    time: [],
    description: ''
    },
    {
    name: 'Cupressus lusitanica',
    time: [],
    description: ''
    },
    {
    name: 'Taxus baccata',
    time: [],
    description: ''
    },
    {
    name: 'Passer domesticus',
    time: [],
    description: ''
    },
    {
    name: 'Turdus merula',
    time: [],
    description: ''
    },
    {
    name: 'Aesculus hippocastanum',
    time: [],
    description: ''
    },
    {
    name: 'Cedrus deodara',
    time: [],
    description: ''
    },
    {
    name: 'Cercis siliquastrum',
    time: [],
    description: ''
    },
    {
    name: 'Agapanthus africanus',
    time: [],
    description: ''
    },
    {
    name: 'Lantana',
    time: [],
    description: ''
    },
    {
    name: 'Nerium oleander',
    time: [],
    description: ''
    },
    {
    name: 'Quercus robur',
    time: [],
    description: ''
    },
    {
    name: 'Ginkgo biloba',
    time: [],
    description: ''
    },
    {
    name: 'Jacaranda mimosifolia',
    time: [],
    description: ''
    },
    {
    name: 'Olea europaea',
    time: [],
    description: ''
    },
    {
    name: 'Pinus pinea',
    time: [],
    description: ''
    },
    {
    name: 'Saphora japonica',
    time: [],
    description: ''
    },
    {
    name: 'Phytolacca dioica',
    time: [],
    description: ''
    },
    {
    name: 'Gleditsia triacanthos',
    time: [],
    description: ''
    },
    {
    name: 'Ficus macrophylla',
    time: [],
    description: ''
    },
    {
    name: 'Ailanthus altissima',
    time: [],
    description: ''
    },
    {
    name: 'Araucaria columnaris',
    time: [],
    description: ''
    },
    {
    name: 'Vanessa cardui',
    time: [],
    description: ''
    },
    {
    name: 'Ceiba speciosa',
    time: [],
    description: ''
    },
    {
    name: 'Ceratonia siliqua',
    time: [],
    description: ''
    },
    {
    name: 'Dombeya wallichii',
    time: [],
    description: ''
    },
    {
    name: 'Apollonias barbujana',
    time: [],
    description: ''
    },
    {
    name: 'Dendrocalamus giganteus',
    time: [],
    description: ''
    },
    {
    name: 'Cedrus libani',
    time: [],
    description: ''
    },
    {
    name: 'Dracaena draco',
    time: [],
    description: ''
    },
    {
    name: 'Sequoia sempervirens',
    time: [],
    description: ''
    },
    {
    name: 'Pittosporum undulatum',
    time: [],
    description: ''
    },
    {
    name: 'hibiscus syriacus',
    time: [],
    description: ''
    },
    {
    name: 'Brugmansia arborea',
    time: [],
    description: ''
    },
    {
    name: 'Corynocarpus laevigatus',
    time: [],
    description: ''
    },
    {
    name: 'Pittosporum tobira',
    time: [],
    description: ''
    },
    {
    name: 'Robinia pseudoacacia',
    time: [],
    description: ''
    },
    {
    name: 'Schinus molle',
    time: [],
    description: ''
    }
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
text: {
    intro: 'An introduction to the species of Estrela Gardens.'
}
};

const snapdragonWalkTwo = { 
    behaviour: 'static',
    id: 7, 
    name: 'Conifers of Jardim da Estrela',
    type: 'taxon',
    descriptions: [
        'Conifers of Jardim da Estrela.'
    ],
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae'],
    items: [],
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
    ]
};

const snapdragonLookalikes = { 
    behaviour: 'static',
    id: 8, 
    name: 'Lookalikes',
    descriptions: [
        'Lookalikes'
    ],
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common', 'fungi', 'amphibia', 'insecta', 'lichen', 'animalia'],
    items: [
        
    ],
    species: [
        {
        name: 'Lavandula angustifolia',
        time: [],
        description: ''
        },
        {
        name: 'Lavandula stoechas',
        time: [],
        description: ''
        },
        {
        name: 'Taraxacum officinale',
        time: [],
        description: ''
        },
        {
        name: 'Tussilago farfara',
        time: [],
        description: ''
        },
        {
        name: 'Lycoperdon pyriforme',
        time: [],
        description: ''
        },
        {
        name: 'Scleroderma citrinum',
        time: [],
        description: ''
        },
        {
        name: 'Hirundo rustica',
        time: [],
        description: ''
        },
        {
        name: 'Apus apus',
        time: [],
        description: ''
        },
        {
        name: 'Delichon urbicum',
        time: [],
        description: ''
        },
        {
        name: 'Accipiter nisus',
        time: [],
        description: ''
        },
        {
        name: 'Falco tinnunculus',
        time: [],
        description: ''
        },
        {
        name: 'Phoenicurus ochruros',
        time: [],
        description: ''
        },
        {
        name: 'Phoenicurus phoenicurus',
        time: [],
        description: ''
        },
        {
        name: 'Hericium coralloides',
        time: [],
        description: ''
        },
        {
        name: 'Hericium americanum',
        time: [],
        description: ''
        },
        {
        name: 'Hydnum umbilicatum',
        time: [],
        description: ''
        },
        {
        name: 'Hydnum repandum',
        time: [],
        description: ''
        },
        {
        name: 'Delphinus delphis',
        time: [],
        description: ''
        },
        {
        name: 'Phocoena phocoena',
        time: [],
        description: ''
        },
        {
        name: 'Laetiporus sulphureus',
        time: [],
        description: ''
        },
        {
        name: 'Laetiporus cincinnatus',
        time: [],
        description: ''
        },
        {
        name: 'Polyporus squamosus',
        time: [],
        description: ''
        },
        {
        name: 'Morchella esculenta',
        time: [],
        description: ''
        },
        {
        name: 'Gyromitra esculenta',
        time: [],
        description: ''
        },
        {
        name: 'Cantharellus cibarius',
        time: [],
        description: ''
        },
        {
        name: 'Hygrophoropsis aurantiaca',
        time: [],
        description: ''
        },
    ],
    iconicTaxa: iconicTaxa.all
};

const snapdragonCommonBritishBirds = { 
  id: 8, 
  behaviour: 'static',
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
      name: 'Passer domesticus',
      time: 0,
      description: ''
    },
    {
      name: 'Sturnus vulgaris',
      time: 0,
      description: ''
    },
    {
      name: 'Cyanistes caeruleus',
      time: 0,
      description: ''
    },
    {
      name: 'Turdus merula',
      time: 0,
      description: ''
    },
    {
      name: 'Columba palumbus',
      time: 0,
      description: ''
    },
    {
      name: 'Carduelis carduelis',
      time: 0,
      description: ''
    },
    {
      name: 'Parus major',
      time: 0,
      description: ''
    },
    {
      name: 'Erithacus rubecula',
      time: 0,
      description: ''
    },
    {
      name: 'Aegithalos caudatus',
      time: 0,
      description: ''
    },
    {
      name: 'Fringilla coelebs',
      time: 0,
      description: ''
    }
  ],
  iconicTaxa: [ {
      id: 'aves',
      common: 'Birds'
  } ]
};

export const snapdragon = [
    snapdragonLichens,
    snapdragonKitchenGarden
];