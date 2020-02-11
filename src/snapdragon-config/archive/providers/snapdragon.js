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
    iconicTaxa: iconicTaxa.all,
    guide: {
      season: 'all_year'
    }
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
    iconicTaxa: iconicTaxa.all,
    guide: {
      season: 'all_year'
    }
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
  items: [],
  guide: {
    season: 'all_year'
  }
};

const snapdragonKitchenGarden = { 
    id: 4,
    behaviour: 'static',
    name: 'Kitchen Garden', 
    moduleSize: 6,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    species: [
      {
        "name": "Allium sativum"
      },
      {
        "name": "Coriandrum sativum"
      },
      {
        "name": "Cuminum cyminum"
      },
      {
        "name": "Origanum majorana"
      },
      {
        "name": "Cymbopogon citratus"
      },
      {
        "name": "Sinapis alba"
      },
      {
        "name": "Zingiber officinale"
      },
      {
        "name": "Brassica nigra"
      },
      {
        "name": "Carum carvi"
      },
      {
        "name": "Satureja hortensis"
      },
      {
        "name": "Piper nigrum"
      },
      {
        "name": "Laurus nobilis"
      },
      {
        "name": "Capsicum annuum"
      },
      {
        "name": "Salvia officinalis"
      },
      {
        "name": "Origanum vulgare"
      },
      {
        "name": "Foeniculum vulgare"
      },
      {
        "name": "Mentha spicata"
      },
      {
        "name": "Anethum graveolens"
      },
      {
        "name": "Thymus vulgaris"
      },
      {
        "name": "Petroselinum crispum"
      },
      {
        "name": "Ocimum basilicum"
      },
      {
        "name": "Allium schoenoprasum"
      },
      {
        "name": "Artemisia dracunculus"
      },
      {
        "name": "Rosmarinus officinalis"
      },
      {
        "name": "Borago officinalis"
      },
      {
        "name": "Cucumis sativus"
      },
      {
        "name": "Beta vulgaris"
      },
      {
        "name": "Spinacia oleracea"
      },
      {
        "name": "Raphanus sativus"
      },
      {
        "name": "Cucurbita pepo"
      },
      {
        "name": "Solanum lycopersicum"
      },
      {
        "name": "Brassica rapa"
      },
      {
        "name": "Vicia faba"
      },
      {
        "name": "Phaseolus coccineus"
      },
      {
        "name": "Pisum sativum"
      },
      {
        "name": "Pastinaca sativa"
      },
      {
        "name": "Solanum melongena"
      },
      {
        "name": "Cynara cardunculus"
      },
      {
        "name": "Lactuca sativa"
      },
      {
        "name": "Daucus carota"
      },
      {
        "name": "Brassica oleracea"
      },
      {
        "name": "Solanum tuberosum"
      },
      {
        "name": "Allium cepa"
      },
      {
        "name": "Vitis vinifera"
      },
      {
        "name": "Mespilus germanica"
      },
      {
        "name": "Prunus armeniaca"
      },
      {
        "name": "Prunus domestica"
      },
      {
        "name": "Prunus persica"
      },
      {
        "name": "Rubus idaeus"
      },
      {
        "name": "Citrus limon"
      },
      {
        "name": "Pyrus communis"
      },
      {
        "name": "Ficus carica"
      },
      {
        "name": "Prunus avium"
      },
      {
        "name": "Lavandula angustifolia"
      },
      {
        "name": "Lavandula stoechas"
      }
    ],
    items: [],
    iconicTaxa: [ {
        id: 'plantae',
        common: 'Plants'
    } ],
    guide: {
      season: 'all_year'
    }
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
    items: [],
    species: [
      {
        "name": "Acer negundo"
      },
      {
        "name": "Acer pseudoplatanus"
      },
      {
        "name": "Celtis australis"
      },
      {
        "name": "Cercis siliquastrum"
      },
      {
        "name": "Cupressus sempervirens"
      },
      {
        "name": "Eucalyptus globulus"
      },
      {
        "name": "Fraxinus angustifolia"
      },
      {
        "name": "Ginkgo biloba"
      },
      {
        "name": "Jacaranda mimosifolia"
      },
      {
        "name": "Olea europaea"
      },
      {
        "name": "Phoenix canariensis"
      },
      {
        "name": "Pinus pinea"
      },
      {
        "name": "Platanus acerifolia"
      },
      {
        "name": "Populus alba"
      },
      {
        "name": "Populus nigra"
      },
      {
        "name": "Quercus faginea"
      },
      {
        "name": "Quercus ilex"
      },
      {
        "name": "Quercus robur"
      },
      {
        "name": "Robinia pseudoacacia"
      },
      {
        "name": "Saphora japonica"
      },
      {
        "name": "Tilia tomentosa"
      },
      {
        "name": "Tipuana tipu"
      },
      {
        "name": "Gleditsia triacanthos"
      },
      {
        "name": "Ulmus minor"
      },
      {
        "name": "Quercus suber"
      }
    ],
    iconicTaxa: [ {
        id: 'plantae',
        common: 'Plants'
    } ],
    guide: {
      season: 'all_year'
    }
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
  },
  guide: {
    season: 'all_year'
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
    species: [
      {
        "name": "Araucaria columnaris"
      },
      {
        "name": "Buxus sempervirens"
      },
      {
        "name": "Cedrus atlantica"
      },
      {
        "name": "Cedrus deodara"
      },
      {
        "name": "Cedrus libani"
      },
      {
        "name": "Cupressus lusitanica"
      },
      {
        "name": "Cupressus sempervirens"
      },
      {
        "name": "Juniperus chinensis"
      },
      {
        "name": "Picea abies"
      },
      {
        "name": "Pinus canariensis"
      },
      {
        "name": "Pinus halepensis"
      },
      {
        "name": "Pinus pinea"
      },
      {
        "name": "Sequoia sempervirens"
      }
    ],
    iconicTaxa: [ 
        {
        id: 'plantae',
        common: 'Plants'
        }
    ],
    guide: {
      season: 'all_year'
    }
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
    iconicTaxa: iconicTaxa.all,
    guide: {
      season: 'all_year'
    }
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
  } ],
  guide: {
    season: 'all_year'
  }
};

export const snapdragon = [
    // snapdragonLichens,
    // snapdragonKitchenGarden
];