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
    items: [],
    glossary: ['fungi', 'common'],
};

const learnYourLand1 = {
    ...mushroomDefaults,
    id: 7,
    type: 'taxon',
    name: 'Learn Your Land - Autumn foraging',            
    species: [ 
        {
          name: 'Grifola frondosa',
          time: [252],
          description: `A large, grey brown polypore, with overlapping caps, that are fan-shaped and fleshy (unlike many polypores which are woody). Frondosa means leafy or abundant or full of leaves.
          
          The underside is white to grey with numerous tiny pores (and no gills).          
          
          The spore print is white.          
          
          This mushroom can be found in late summer to fall in the Northeast US especially on large, old oaks (and generally on living or dead oaks), beeches, maples and other hardwoods. It grows at the base, or close to the base, or on the trunks of trees.          
          
          D‐Fraction, an extract of Maitake my have properties beneficial in the treatment of cancer.`
        },
        {
          name: 'Laetiporus sulphureus',
          time: [360],
          description: `Chicken of the woods has a chicken like texture. It can be found late spring to mid-autumn.

          This mushroom has overlapping clusters or rosette and is commonly found on deciduous trees. 
          
          The cap may be up 12". The top is smooth and faintly wrinkled.
          When fresh it is bright orange to yellow-orange, and sometimes has a bright yellow margin.
          
          Best when young, it is indigestible for some.`
        },
        {
          name: 'Hericium erinaceus'
        },
        {
          name: 'Lycoperdon perlatum'
        },
        {
          name: 'Lycoperdon pyriforme'
        },
        {
          name: 'Hydnum repandum'
        },
        {
          name: 'Craterellus tubaeformis'
        },
        {
          name: 'Hydnum umbilicatum'
        },
        {
          name: 'Hericium americanum'
        },
        {
          name: 'Hericium coralloides'
        },
        {
          name: 'Calvatia gigantea',
          time: [935],
          description: `Puffballs are gasteroid mushrooms (stomach fungi) which produce spores internally.

          The gleba should be pure white inside; with age it will turn olive-yellow, brown, to purple due to the spores.
          
          Before eating check that there are no mushrooms inside, as these may be poisonous (for example a member of the amanita genus).
          
          The giant puffball is bald, smooth and round, soft and white when young, becoming yellow with age. It is 7-12" across, 6-10" high but can grow much larger. Cut open to reveal the outer skin and the gleba. 
          
          It may be found in open woods lawns and pastures, through summer-fall.`
        },
        {
          name: 'Armillaria mellea'
        },
        {
          name: 'Armillaria tabescens'
        },
        {
          name: 'Entoloma abortivum'
        },
        {
          name: 'Polyporus squamosus'
        },        
        {
          name: 'Laetiporus cincinnatus'
        },        
    ],
    producer: 'Adam Haritan, Learn Your Land',
    video: {
      id: '6PNq6paMBXU',
      startAt: 0,
      title: '16 Wild Edible Mushrooms You Can Forage This Autumn',
      intro: 'I hope you enjoy this brief introduction to foraging edible mushrooms in Eastern North America. When you\'ve finished watching, review what we covered to see how much you remember, and to reinforce what you learnt.',
      owner: 'Learn Your Land',
      ownerUrl: 'www.youtube.com/channel/UCcbf8wnyVJl631LAmAbo7nw',
      presenter: 'Adam Haritan',
      links: [
        {
          label: 'Subscribe to the Learn Your Land email newsletter here',
          url: ''
        },
        {
          label: 'Website',
          url: 'learnyourland.com'
        }
      ],
    },
    guide: {
      locationPlace: 'Learn Your Land - Autumn foraging',
      locationType: 'taxon',
      place: {
          name: 'Learn Your Land - Autumn foraging',
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

const learnYourLand2 = {
    ...mushroomDefaults,
    id: 14,
    type: 'taxon',
    name: 'Learn Your Land - Spring foraging',            
    species: [ 
      {
        name: 'Morchella angusticeps',
        time: [290],
        description: `One of the first species to appear and easy to identify:

        Medium sized mushroom with a conical, honeycomb-pitted cap, and vertically oriented pits and ridges.
        
        Key feature: ridges are dark especially at maturity and the pits are lighter in colour.
        
        It is hollow in cross-section from top to bottom including the stem.
        
        Key feature: the cap is fully attached to stem but with a small groove or sinus where the base of the cap meets the stem.
        
        Habitat: under ash, black cherry, tulip poplar.
        
        Season: March-April.`
      },
      {
        name: 'Morchella punctipes',
        time: [370],
        description: `Not valued as highly as other morels but it is edible and shares many features with other morels, especially other black morels.

        A medium sized species to 6" or taller.
        
        Like other members of the black morel clade it has a conical cap with vertically oriented pits and ridges that darken at maturity.
                
        It is entirely hollow from top to bottom.
        
        Key feature:  the bottom of the cap hangs free from the stem, like a skirt i.e. not fully attached (hence its name).
        
        Habitat: ash, tulip poplar, American elm, and black cherry.
        
        Season: after the easter black morel, and before the yellow morel (March-May).`
      },
      {
        name: 'Morchella americana',
        time: [453],
        description: `Esculenta clade.

        Medium sized mushroom but up to 10' or greater.
        
        The cap is less conical than is the case with the black morels, but like all true morels it is of a honeycomb appearance with pits and ridges.
        
        Key feature: the pits and ridges do not darken with age.
        
        It is hollow from top to bottom, and the cap is entirely connected.
        
        Habitat: grows in association with many trees; dying and dead elms, apple trees, tulip poplars, ash trees, sycamores, and pines.
        
        Season: later, after the black morels, although there may be some overlap.`
      },
      {
        name: 'Polyporus squamosus',
        time: [600],
        description: `A large mushroom to 12" or more, with distinctive large, dark brown scales (hence the name). 

        The fertile underside is a honeycomb of small pores which release white spores.
        
        Habitat: similar to morels; grows directly on wood, esp. dead and decomposing elms; often seen as a consolation when morels are absent.
        
        Smell: cucumber or watermelon rind.
        
        Season: most prolific in spring, (but may be found in summer and fall).
        
        Culinary: not considered choice but it is edible. Best eaten when young (and small) before it becomes leathery; can be dehydrated for stews etc.`
      },
      {
        name: 'Stropharia rugosoannulata',
        time: [731],
        description: `It has a medium to large cap up to 12" across.

        The cap is wine or burgundy coloured, and fades to straw or tan with age.
        
        The fertile surface has white gills fading to grey, purple or black, which release dark purple, brown or black spores.
        
        A partial veil may be visible on immature mushrooms, leaving a rugged ring when older.
        
        Habitat: often found in suburban or urban landscapes, and is widely cultivated.
        
        Culinary: check for insects and the quality of its habitat (avoid pesticides, etc.) before eating.
        
        Season: a spring favourite.`
      },
      {
        name: 'Pleurotus ostreatus',
        time: [841],
        description: `A widely cultivated species; there are 40-200 species in the genus pleurotus.

        It is a medium-large species.
        
        The cap is white to tan to light brown usually in shelf-like clusters. The gills are white and decurrent (run down stem).
        
        The spores are pale lilac or white.
        
        Habitat: oyster mushrooms are decomposers of wood, and only appear on wood (though this may be hidden).
        
        Season: prefers cooler weather, appearing mostly spring or later if the season is mild. (If not, your are probably looking at a different species).
        
        Culinary: delicious and abundant.`
      },
      {
        name: 'Laetiporus sulphureus',
        time: [958],
        description: `Easy to identify, and to find.
        
        Medium to larege polypore. Takes the form of overlapping clusters or a rosette on deciduous trees.

        The cap diameter is up to 12". Its top is smooth and faintly wrinkled.
        
        When fresh it is bright orange to yellow-orange, sometimes with a bright yellow margin. With age it becomes grey and crumbly. The underside is bright yellow with tiny pores.
        
        habitat: at the base or a few feet from deciduous trees, in overlapping cluster up and down the tree.

        Season: appears spring to mid-autumn.
        
        Culinary: chicken like texture; indigestible to some (start with a small amount).`
      },
      {
        name: 'Laetiporus cincinnatus',
        time: [987],
        description: `Similar to chicken of the woods but growing at the base or a few feet from hardwoods, in a rosette pattern, and not typically overlapping up and down the tree.

        The caps are duller and paler than L.sulphureus, pale orange to pink orange (rather than vibrant yellow or orange). The pores are a pale peach white.
        
        Habitat: rarely in overlapping clusters but in rosette or a cluster on or near the tree.

        Season: spring and summer into autumn.

        Culinary: best eaten when young; indigestible for some.`
      },
      {
        name: 'Coprinellus micaceus',
        time: [1115],
        description: `One of the ink cap mushrooms which autodigest, or deliquesce. Also described as coprinoid (as not all exhibit deliquescence).

        There are 4 similar species, all are edible (though a microscope may be needed to distinguish between them).
                
        The gills partially deliquesce with age leaving an inky goo.

        Key feature: the cap contains fine granules when young and fresh, but with age and weathering they may be lost.
                
        The spore print is black.

        Habitat: they form in large clusters on or around stumps and logs, and the buried wood of commonly broadleaf trees: cherry, ash, oak.
        
        Season: all year, but especially in spring.
        
        Culinary: this species does not contain coprine (which reacts with alcohol), but other ink caps do.`
      },
    ],
    producer: 'Adam Haritan, Learn Your Land',
    video: {
      id: 'OE54NpooUls',
      startAt: 240,
      title: '9 Wild Edible Mushrooms You Can Forage This Spring',
      intro: 'I hope you enjoy this brief introduction to foraging edible mushrooms in Eastern North America. When you\'ve finished watching, review what we covered to see how much you remember, and to reinforce what you learnt.',
      owner: 'Learn Your Land',
      ownerUrl: 'www.youtube.com/channel/UCcbf8wnyVJl631LAmAbo7nw',
      presenter: 'Adam Haritan',
      links: [
        {
          label: 'Subscribe to the Learn Your Land email newsletter here',
          url: ''
        },
        {
          label: 'Website',
          url: 'learnyourland.com'
        }
      ],
    },
    guide: {
      locationPlace: 'Learn Your Land - Spring foraging',
      locationType: 'taxon',
      place: {
          name: 'Learn Your Land - Spring foraging',
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
    type: 'custom',
    moduleSize: 4,
    lessonPlanLandscape: 1,
    lessonPlanPortrait: 101,
    glossary: ['plantae', 'common'],
    iconicTaxa: [ {
      id: 'plantae',
      common: 'Plants'
    }, ],
    items: [],
    name: '10 Herbs Indoor Herbs',
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
        description: `Oregano can be grown from a cutting or seed, however, it is not frost resistant.`
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
        description: `Also known as Corainder.
        
        Best grown from seed (which must be split first to esnure it germinates quickly). 
        
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
      startAt: 0,
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
    type: 'custom',
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
    name: 'Garden Bird Identification',
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
    
    learnYourLand1,
    learnYourLand2,

    kitchen1,

    birds1,

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