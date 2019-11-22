import { custom } from 'snapdragon-config/providers/custom'; // 10000-10001
import { snapdragon } from 'snapdragon-config/providers/snapdragon'; // 1-1000
import { rhs } from 'snapdragon-config/providers/rhs'; // 1001-1002
import { learnYourLand } from 'snapdragon-config/providers/learn-your-land'; // 1003-1004

const daisyCreekFarms1 = {
    id: 1005,
    behaviour: 'static',
    name: '10 Indoor Herbs',
    moduleSize: 1,
    lessonPlanLandscape: 10,
    lessonPlanPortrait: 110,
    glossary: ['plantae', 'common'],
    iconicTaxa: [ {
      id: 'plantae',
      common: 'Plants'
    }, ],
    items: [],
    species: [ 
      {
        name: 'Anethum graveolens',
        time: [38],
        description: `You can start dill from seed; in one to two weeks the first set of leaves will emerge and will soon take on their familiar form.`
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
      src: 'https://yt3.ggpht.com/a/AGF-l78Az9mTbDQcmHLm-0jsbttdd7yfiFrDHfvRDA=s48-c-k-c0xffffffff-no-rj-mo',
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

const paulDinning1 = {
    id: 1006,
    behaviour: 'static',
    name: 'UK Garden Bird Identification',
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
        name: 'Erithacus rubecula',
        time: [1,149,227,319,560,592],
        description: 'European robin'
      },
      {
        name: 'Fringilla coelebs',
        time: [10,133,235,288,347,418,428,495],
        description: 'Female chaffinch'
      },
      {
        name: 'Pyrrhula pyrrhula',
        time: [24,64,110,170,198,456],
        description: 'Male bullfinch'
      },
      {
        name: 'Sylvia atricapilla',
        time: [31,50,120,175,324,399,452,567],
        description: 'Female blackcap'
      },
      {
        name: 'Carduelis carduelis',
        time: [42,207,266,383],
        description: 'European goldfinch'
      },
      {
        name: 'Prunella modularis',
        time: [70,223,312,457,518],
        description: 'Dunnock'
      },
      {
        name: 'Cyanistes caeruleus',
        time: [80,162,360,455,479,532],
        description: 'Blue tit'
      },
      {
        name: 'Passer domesticus',
        time: [88,96,258337,548],
        description: 'Male house sparrow'
      },
      {
        name: 'Parus major',
        time: [103,512],
        description: 'Great tit'
      },
      {
        name: 'Turdus merula',
        time: [184,578],
        description: 'Blackbird'
      },
      {
        name: 'Chloris chloris',
        time: [247],
        description: 'Female greenfinch'
      }    
    ],    
    producer: 'Paul Dinning',
    video: {
      id: 'wCngPMlOFok',
      startAt: 0,
      title: 'Garden Bird Identification - Let Nature Sing',
      intro: 'Garden Bird Identification - Let Nature Sing.',
      owner: 'Paul Dinning',
      ownerUrl: '',
      presenter: 'Paul Dinning',
      src: 'https://yt3.ggpht.com/a/AGF-l7_gzXJiKx7sDLQlTYdyAg-X43aIui3RNiLp_Q=s48-c-k-c0xffffffff-no-rj-mo',
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

const woodlandsTV1 = {  
  id: 1007,
  behaviour: 'static',
  name: 'An Introduction to Lichen',
  type: 'taxon',
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
    src: 'https://yt3.ggpht.com/a/AGF-l78prjWYkW5Gx8fOdTnDb9nSBy_b287Ge4-81g=s48-c-k-c0xffffffff-no-rj-mo',
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

const wiseWomanTradition = {  
  id: 1008,
  behaviour: 'static',
  name: 'Wild Plant Identification with Susun Weed',
  type: 'taxon',
  moduleSize: 1,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['plantae', 'common'],
  iconicTaxa: [ 
    {
      id: 'plantae',
      common: 'Plants'
    },
  ],
  species: [
    {
      name: 'Hypericum perforatum',
      time: [18],
      description: 'Flowers are in perfect condition, just right for picking and making tinctures and oils from the fresh blossoms.'
    },
    {
      name: 'Lythrum salicaria',
      time: [40],
      description: 'Deemed invasive, now appreciated more. The flowers (together with chicory and cronewort) are part of my third eye opening tincture.'
    },
    {
      name: 'Artemisia vulgaris',
      time: [86],
      description: 'Cronewort, or Common mugwort. White on the back of the leaves, just coming into bud. The flowers of cronewort, chicory and purple loosestrife comprise the third eye opening tincture.'
    },
    {
      name: 'Rhus typhina',
      time: [112],
      description: 'Staghorn Sumac, named in honour of the fuzz on the horns of a young male deer. Produces huge clusters of red berries which are high in anti-oxidants including anthocyanins.'
    },
    {
      name: 'Vitis',
      time: [172],
      description: 'The tendrils are crisp, cruncy with lots of vitamin C. The grapes and its leaves can also be eaten.'
    },
    {
      name: 'Daucus carota',
      time: [200],
      description: 'Flowers are rich in potassium. Together with the leaves, they can go in a salad. The whole plant is edible. (Skin contact with the foliage of Daucus carota, especially wet foliage, can cause skin irritation in some people, ed.). '
    },
    {
      name: 'Geranium maculatum',
      time: [218],
      description: 'Wild geranium is widely used by herbalists as an astrigent, something to contract tissues, to counter weeping sores, eczema, etc.'
    },
    {
      name: 'Polygonum cuspidatum',
      time: [240],
      description: 'Where there\'s one, there will be more. Dig the root in autumn and make a tincture from it. Dynamite for helping people who are dealing with Lyme disease.'
    },
    {
      name: 'Impatiens capensis',
      time: [275],
      description: 'Green blessings are everywhere around you.'
    },
  ],
  notes: [
  ],
  producer: 'wisewomantradition',
  video: {
    id: 'Oyb9do5_6Ts',
    startAt: 0,
    title: 'Wild Plant Identification with Susun Weed',
    intro: 'Remember, green blessings are everywhere. When you\'ve finished watching, review what we covered to see how much you remember, and to reinforce what you learnt.',
    owner: 'wisewomantradition',
    ownerUrl: 'https://www.youtube.com/channel/UCo0uJBHNwF_IqhvVMbvdDTA',
    presenter: 'Susun Weed',
    src: 'https://yt3.ggpht.com/a/AGF-l7_0rsdKYlsNUg8ayuivW0J3LLEK1NtKVKSAPQ=s48-c-k-c0xffffffff-no-rj-mo',
    links: [
      {
        label: '',
        url: ''
      },
      {
        label: 'Channel',
        url: 'youtube.com/channel/UCo0uJBHNwF_IqhvVMbvdDTA'
      }
    ],
  }
};

const btoCorvids = { 
  id: 1009, 
  behaviour: 'static',
  name: 'BTO Bird ID - Corvids - Crow, Rook, Raven',
  descriptions: [
      'BTO Bird ID - Corvids - Crow, Rook, Raven.'
  ],
  moduleSize: 1,
  lessonPlanLandscape: 1,
  lessonPlanPortrait: 101,
  glossary: ['aves'],
  items: [],
  species: [
    {
      name: 'Corvus corax',
      time: [],
      description: ''
    },
    {
      name: 'Corvus corone',
      time: [],
      description: ''
    },
    {
      name: 'Corvus frugilegus',
      time: [],
      description: ''
    },
  ],
  iconicTaxa: [ 
    {
      id: 'aves',
      common: 'Birds'
    }
  ],
  video: {
    id: 'qi1p0yh4X3I',
    startAt: 0,
    title: 'BTO Bird ID - Corvids - Crow, Rook, Raven',
    intro: 'BTO Bird ID - Corvids - Crow, Rook, Raven',
    owner: 'British Trust for Ornithology',
    ownerUrl: '',
    presenter: 'BTOvideo',
    src: 'https://yt3.ggpht.com/a/AGF-l7_dIfQOLCQyanCxTmXHdRpaktSdtmPAnwy4Hg=s48-c-k-c0xffffffff-no-rj-mo',
    links: [
      {
        label: '',
        url: ''
      },
      {
        label: 'Channel',
        url: 'https://www.youtube.com/user/BTOvideo'
      }
    ],
  }  
};

export const snapdragonCollections = [
    
  ...custom,

  ...snapdragon,    
  ...rhs,
  ...learnYourLand,

  daisyCreekFarms1,
  woodlandsTV1,
  wiseWomanTradition,
  btoCorvids

];