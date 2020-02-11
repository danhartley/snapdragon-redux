
const rhsTrees = { 
    id: 1001,
    behaviour: 'static',
    name: 'RHS Trees',
    type: 'taxon',
    moduleSize: 6,
    lessonPlanLandscape: 10,
    lessonPlanPortrait: 110,
    glossary: ['plantae', 'common'],
    species: [
      {
        "name": "Styrax hemsleyanus"
      },
      {
        "name": "Sorbus cashmiriana"
      },
      {
        "name": "Stewartia pseudocamellia"
      },
      {
        "name": "Sorbus aucuparia"
      },
      {
        "name": "Sorbus aria"
      },
      {
        "name": "Salix alba"
      },
      {
        "name": "Robinia pseudoacacia"
      },
      {
        "name": "Quercus robur"
      },
      {
        "name": "Pyrus salicifolia"
      },
      {
        "name": "Quercus ilex"
      },
      {
        "name": "Quercus coccinea"
      },
      {
        "name": "Pyrus calleryana"
      },
      {
        "name": "Prunus subhirtella"
      },
      {
        "name": "Prunus cerasifera"
      },
      {
        "name": "Platanus orientalis"
      },
      {
        "name": "Populus nigra"
      },
      {
        "name": "Prunus avium"
      },
      {
        "name": "Olea europaea"
      },
      {
        "name": "Platanus acerifolia"
      },
      {
        "name": "Malus floribunda"
      },
      {
        "name": "Malus sylvestris"
      },
      {
        "name": "Liriodendron tulipifera"
      },
      {
        "name": "Liquidambar styraciflua"
      },
      {
        "name": "Ligustrum lucidum"
      },
      {
        "name": "Juglans regia"
      },
      {
        "name": "Fraxinus ornus"
      },
      {
        "name": "Eucalyptus gunnii"
      },
      {
        "name": "Gleditsia triacanthos"
      },
      {
        "name": "Fagus sylvatica"
      },
      {
        "name": "Fraxinus excelsior"
      },
      {
        "name": "Crataegus laevigata"
      },
      {
        "name": "Crataegus monogyna"
      },
      {
        "name": "Cercis siliquastrum"
      },
      {
        "name": "Cercidiphyllum japonicum"
      },
      {
        "name": "Catalpa bignonioides"
      },
      {
        "name": "Betula utilis"
      },
      {
        "name": "Amelanchier lamarckii"
      },
      {
        "name": "Castanea sativa"
      },
      {
        "name": "Carpinus betulus"
      },
      {
        "name": "Betula pendula"
      },
      {
        "name": "Amelanchier canadensis"
      },
      {
        "name": "Alnus cordata"
      },
      {
        "name": "Alnus glutinosa"
      },
      {
        "name": "Aesculus hippocastanum"
      },
      {
        "name": "Acer rubrum"
      },
      {
        "name": "Acer platanoides"
      },
      {
        "name": "Acer pseudoplatanus"
      },
      {
        "name": "Acer davidii"
      },
      {
        "name": "Acer griseum"
      },
      {
        "name": "Acacia dealbata"
      }
    ],
    items: [],      
    iconicTaxa: [ {
      id: 'plantae',
      common: 'Plants'
    } ],
    guide: {
      season: 'all_year'
    },
    eol_link: 'https://eol.org/collections/140596',
    externalLink: { text: 'RHS Practical Horticulture', url:'https://www.rhs.org.uk/education-learning/qualifications-and-training/rhs-qualifications/level-1-qualifications/level-1-intro-award-in-practical-horticulture' }
};

const rhsWeeds = { 
    id: 1002, 
    behaviour: 'static',
    name: 'RHS Weeds I',
    moduleSize: 4,
    lessonPlanLandscape: 10,
    lessonPlanPortrait: 110,
    glossary: ['plantae', 'common'],
    items: [],
    species: [
        { name: 'Elymus repens' },
        { name: 'Equisetum arvense' },
        { name: 'Dactylis glomerata' },
        { name: 'Convolvulus arvensis' },
        { name: 'Cerastium fontanum' },
        { name: 'Cirsium arvense' },
        { name: 'Calystegia sepium' },
        { name: 'Cardamine hirsuta' },
        { name: 'Aegopodium podagraria' },
        { name: 'Capsella bursa-pastoris' },
        { name: 'Bellis perennis' }
    ],
    iconicTaxa: [ {
        id: 'plantae',
        common: 'Plants'
    } ],
    guide: {
      season: 'all_year'
    },
    eol_link: 'https://eol.org/collections/140731',
    externalLink: { text: 'RHS Practical Horticulture', url:'https://www.rhs.org.uk/education-learning/qualifications-and-training/rhs-qualifications/level-1-qualifications/level-1-intro-award-in-practical-horticulture' }
};

export const rhs = [
    // rhsTrees,
    // rhsWeeds
];