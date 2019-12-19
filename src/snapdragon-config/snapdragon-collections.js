import { custom } from 'snapdragon-config/providers/custom'; // 10000-10001
import { snapdragon } from 'snapdragon-config/providers/snapdragon'; // 1-1000
import { rhs } from 'snapdragon-config/providers/rhs'; // 1001-1002
import { learnYourLand } from 'snapdragon-config/providers/learn-your-land'; // 1003-1004

const daisyCreekFarms1 = {
    id: 1005,
    behaviour: 'static',
    name: 'Daisy Creek Farms - 10 Indoor Herbs',
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
        description: `Propagation: you can start dill from seed; in 1-2 weeks the first set of leaves will emerge and will soon take on their familiar form.
        
        Dill leaves are thin and look like fine threads. 
        
        Dill is perfect for growing on the kitchen counter top.

        Culinary: the taste of dill is a combination of fennel, anise and celery; makes a great addition to soups and roasted potatoes.
        `,
        questionIds: ['1', '2']
      },
      {
        name: 'Thymus vulgaris',
        time: [65],
        description: `Propagation: thyme is a perennial; frost hardy herb and can be grown outdoors; best grown from a cutting (difficult to grow from seed).`,
        questionIds: ['3']
      },
      {
        name: 'Origanum vulgare',
        time: [80],
        description: `Culinary: oregano has a strong flavour, so use carefully in your cooking.
        
        Propagation: oregano does not cope with winters well; it is not frost resistant. Howeverm it can be grown easily from a cutting or seed, indoors on a kitchen counter top.`
      },
      {
        name: 'Salvia officinalis',
        time: [98],
        description: `Propagation: sage can tolerant frosts to -10°C (15°F). Extremely good indoor plant if you live in a hot or cold climate.

        Culinary: pine and citrously flavour, often used in combination with other hebrs like thyme and rosemary.
        `
      },
      {
        name: 'Petroselinum crispum',
        time: [115],
        description: `Culinary: parsley brightens flavours and adds balance to savoury dishes. Goes well with meat, eggs, and most of the vegetables. 

        Propagation: best grown from seed, it can tolerate frosts to -12°C (10°F).`
      },
      {
        name: 'Coriandrum sativum',
        time: [137],
        description: `Also known as Coriander.
        
        Culinary: probably the most popular herb and heavily used in Mexican and Indian cooking.

        Propagation: best grown from seed (which must be split first to ensure it germinates quickly). Seed leaves will appear within a week. 
        Best planted in fall, in spring it flowers quickly; or grow indoors all year round.`
      },
      {
        name: 'Artemisia dracunculus',
        time: [172],
        description: `Propagation: a winter hardy perennial that tolerates frost well (to -30°C or -20°F), but that also grows well indoors.
        
        Culinary: used extensively in French cooking.`
      },
      {
        name: 'Ocimum basilicum',
        time: [194],
        description: `        
        Propagation: grows outdoors in the summer, but dies in winter.
        To keep it alive, take cuttings and propogate in first week of spring. In this way, I get a head start on my outdoor basil bed for the entire summer.
        Also grows well from seed.`
      },
      {
        name: 'Mentha spicata',
        time: [224],
        description: `
        
        Culinary: great for drinks and tea.

        Propagation: grows well from cuttings or roots. It dies back in winter and regrows in spring with plentiful watering. 
        
        Alternatively bring inside in winter.`
      },
      {
        name: 'Rosmarinus officinalis',
        time: [241],
        description: `
        Propagation: grows easily - simply place cuttings in water; it will easily root and can then be planted out (indoors or out). 
        
        Winter hardy but avoid excessive frosts.`
      },
    ],
    notes: [
      {
        tag: 'Herbs',
        time: [1],
        colCount: 3,
        description: `Thyme (cuttings, seed)
        Basil (cuttings, seed)
        Rosemary (cuttings, plants)
        Dill (seeds)
        Oregano (cuttings, seeds)
        Sage (cutting, seeds)
        Parsely (seeds)
        Coriander (seeds)
        Tarragon (cuttings, plants)
        Mint (cuttings, plants)`
      },
      {
        tag: 'Sunlight',
        time: [20],
        description: `Herbs grown inside require at least 3-4 hours of sunlight a day.`
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
      src: 'https://yt3.ggpht.com/a/AGF-l78Az9mTbDQcmHLm-0jsbttdd7yfiFrDHfvRDA=s48-c-k-c0xffffffff-no-rj-mo',
      links: [
        {
          label: '',
          url: ''
        },
        {
          label: 'Patreon',
          url: 'https://www.patreon.com/jagsingh'
        }
      ],
      location: 'California, US'
    }   
};

const paulDinning1 = {
    id: 1006,
    behaviour: 'static',
    name: 'UK Garden Bird Identification',
    moduleSize: 4,
    lessonPlanLandscape: 10,
    lessonPlanPortrait: 110,
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
      location: 'United Kingdom'
    }   
};

const woodlandsTV1 = {  
  id: 1007,
  behaviour: 'static',
  name: 'WoodlandsTV - An Introduction to Lichen',
  type: 'taxon',
  moduleSize: 1,
  lessonPlanLandscape: 12,
  lessonPlanPortrait: 110,
  glossary: ['lichen', 'common'],
  iconicTaxa: [ 
    {
      id: 'fungi',
      common: 'Fungi & Lichens'
    },
  ],
  species: [
    // {
    //   name: 'Quercus rubra',      
    //   time: [85],
    //   description: 'Supports a wide variety of lichens.'
    // },
    {
      name: 'Graphis scripta',
      time: [190],
      questionIds: ['24', '25', '26', '31'],
      description: 'Graphis scripta. Named for the apothecia which form lines which ressemble some kind of ancient script or writing.'
    },
    {
      name: 'Xanthoria parietina',
      questionIds: ['27', '28', '29'],
    },
    {
      name: 'Ramalina farinacea',
      questionIds: ['30']
    },
    
  ],
  notes: [
    {
      tag: 'Symbiotic association',
      time: [49],
      description: `
      Commensalist relationsip between a fungus and a single-celled photosynthetic organism such as an alga or cyanobacterium.`
    },
    // {
    //   tag: 'Fungus structure',
    //   time: [51]
    // },
    // {
    //   tag: 'Single-celled photosynthetic organism',
    //   time: [55]
    // },
    {
      tag: 'Alga',
      time: [59],
      description: `
      A photosynthetic eukaryotic organism.`
    },
    {
      tag: 'Cyanobacterium',
      time: [64],
      description: `
      A photosynthetic prokaryotic (organism whose cells lack a nucleus) microorganisms, of the phylum Cyanobacteria. Formerly called blue-green alga.`
    },
    {
      tag: 'Lichen composition',
      time: [70],
      description: `
      Some lichens have both an alga and a cyanobacterium.
      
      It has recently been discovered that some lichens also have a second fungus as an integral part of their ecosystem.
      `
    },
    {
      tag: 'Quercus rubra',      
      time: [85],
      description: `
      Red oak tree.

      Here supporting a wide variety of lichens including one each from the 3 main groups or growth forms.`
    },
    {
      tag: `Fruticose or 'shrubby'`,
      time: [110],
      description: `
      Bushy like a shrub; it is attached to the bark substrate at one point and branches out from there.`
    },
    {
      tag: `Foliose or 'leafy'`,
      time: [126],
      description: `
      Flat like a leaf, with both a top side and a bottom side (which can be revelead).`
    },
    {
      tag: `Crustose or 'crusty'`,
      time: [148],
      description: `
      Grows directly onto the bark; cannot be pealed off.
      
      Difficult to tell apart because they have fewer features than foliose or fruticose lichens.
      `
    },
    {
      tag: 'Apothecia',
      time: [183],
      description: `Fruiting bodies that release spores.`
    },
    {
      tag: 'Cladonia',
      time: [224],
      description: `
      Cladonia (cup lichen) is a genus of moss-like lichens in the family Cladoniaceae. They are the primary food source for reindeer/caribou (Snapdragon).

      Forms gothic structures (podetia).`
    },
    {
      tag: 'Podetia',
      time: [231],
      description: `
      Structures (feet) that grow upwards from the substrate. 
      
      A Podetium is a hollow stalk extending from the primary thallus; it is not considered part of the primary thallus as it is a fruiting structure for reproduction (Snapdragon).`
    },
    {
      tag: 'Apothecia',
      time: [238],
      description: `
      Liitle brown blobs which are the fruiting bodies which release spores from which the lichen fungus reproduces.`
    },
    {
      tag: 'Role of Lichen',
      time: [250],
      description: `
      Lichens fix carbon and nitrogen. 
      
      Form habitats for many living things such as bark flies and the wasps that predate on them.
      
      Snapdragon:
      
      Enrich the soil by trapping water, dust and silt. 
      Contribute organic matter to the soil when they die.
      Act as bioindicators (revealing air quality and presence of toxic compounds).`
    },
  ],
  producer: 'WoodlandsTV',
  video: {
    id: 'XQ_ZY57MY64',
    startAt: 0,
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
        url: 'https://www.youtube.com/channel/UCCeOzbtcmqPmWdMeB6x9nvA'
      }
    ],
    location: 'United Kingdom'
  }
};

const wiseWomanTradition = {  
  id: 1008,
  behaviour: 'static',
  name: 'Susun Weed - Wild Plant Identification',
  type: 'taxon',
  moduleSize: 1,
  lessonPlanLandscape: 10,
  lessonPlanPortrait: 110,
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
      description: `Flowers are in perfect condition, just right for picking and making tinctures and oils from the fresh blossoms.
      
      A tincture is typically an extract of plant or animal material dissolved in ethanol (ethyl alcohol).

      In herbal medicine, alcoholic tinctures are most commonly made with a 20% ethanol concentration (Snapdragon).
      `
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
      description: `Staghorn Sumac, named in honour of the fuzz on the horns of a young male deer. Produces huge clusters of red berries which are high in anti-oxidants including anthocyanins.
      
      Antioxidants are compounds that inhibit oxidation which produces free radicals, thereby leading to chain reactions that may damage the cells of organisms (Snapdragon).

      Anthocyanins are water-soluble pigments that, depending on their pH, may appear red, purple, blue or black. Colouration may attract pollinators (to flowers), animals for seed dispersal (fruit), and protect against extreme weather (Snapdragon). 
      `
    },
    {
      name: 'Vitis',
      time: [172],
      description: 'The tendrils are crisp, cruncy with lots of vitamin C. The grapes and its leaves can also be eaten.'
    },
    {
      name: 'Daucus carota',
      time: [200],
      description: `Flowers are rich in potassium. Together with the leaves, they can go in a salad. The whole plant is edible. 
      
      Skin contact with the foliage of Daucus carota, especially wet foliage, can cause skin irritation in some people, (Snapdragon). `,
      questionIds: ['13']
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
        url: 'https://www.youtube.com/channel/UCo0uJBHNwF_IqhvVMbvdDTA'
      }
    ],
    location: 'United States'
  }
};

const btoCorvids = { 
  id: 1009, 
  behaviour: 'static',
  name: 'British Trust for Ornithology - Corvid Ids',
  moduleSize: 1,
  lessonPlanLandscape: 11,
  lessonPlanPortrait: 111,
  glossary: ['aves'],
  items: [],
  species: [
    {
      name: 'Corvus corone',
      time: [30, 50],
      questionIds: ['12'],
      quickId: 'Large and handsome with pleasing proportions; the head is neatly rounded, plumage neat against the body and colour jet black and glossy.',
      description: `Range: found throughtout the British Isles with the exception of NW Scotland and most of Ireland where it is replaced by the hooded crow.

      Behaviour: found singly, more commony in pairs, but frequently in groups.

      Appearance: large and handsome with pleasing proportions. It has a large beak and reasonably upright angle on the ground (at ~45°). Deliberate walking action. 
      
      The head is neatly rounded, plumage neat against the body and colour jet black and glossy.
      
      In flight: steady wingbeats and heavy, giving the impression that it is bigger than it is (may be mistaken for a buzzard). Pleasingly proportioned effect.

      Vocalisation: highly vocal, give a distinctive, far-carrying 'kaaa', usually repeated 3 times.      
      `
    },
    {
      name: 'Corvus frugilegus',
      time: [110],
      quickId: 'Bare white face and pale bill base; somewhat scruffy and baggy with loose oily-looking plumage, potbelly, higly peaked crown and splendid, baggy pantaloons.',
      description: `Appearance: similar in size to the carrion crow.
       
      Range: found throughtout Britain & Ireland with the exception of the extreme NW.
      
      Behaviour: usually found in groups, nesting in rookeries and foraging in gangs.

      Defining feature: bare white face and pale bill base. 

      On the ground, tend to more upright (than the carrion crow), and look somewhat scruffy and baggy with loose oily-looking plumage, potbelly, higly peaked crown and splendid, baggy pantaloons.

      In flight: rooks look longer winged (than crows) with wings narrowing slightly near the body. The tail is long and graduated (unlike crow), but can look confusingly like a raven tail if size is not apparent.

      In late spring and summer, recently fledged rooks have (until they become independent) fully feathered faces and can look crow-like, especially as baggy trousers and oily plummage have yet to develop.      
      
      Vocalisation: extremely vocal with a wide repertoire, rooks have a distinctive, drawn-out 'kaah', which they often utter whilst pitching forward.
      `
    },
    {
      name: 'Corvus corax',
      time: [213],
      quickId: 'Huge. Long, heavy bill. Heavy ruffle of throat feathers (or hackles), barrel chest and long neck, provide unique, heavy-headed impression.',
      description: `
      Appearance: the raven is huge, by far the largest passerine (perching birds, or songbirds), with similar wingspan to a buzzard (Buteo buteo), and even larger body.

      Habitat: almost everywhere except the far E Scotland & England though may even be found here, especially in winter.

      Appearance: can be mistaken for a crow, but size will usually impress.

      Bill: strikingly long, and heavy. 

      Defining features: size; the bill, heavy ruffle of throat feathers (or hackles), barrel chest and long neck, provide unique, heavy-headed impression.

      Flight: wings are long and broad with well fingered-wingtips, more like a raptor than a crow, but most noticeable is the long graduated, wedge-shaped tail.

      Vocalisation: distinctive gravelly 'kwaak', singly or repeated.
      `
    },
    {
      name: 'Coloeus monedula',
      time: [282],
      quickId: 'Broad neck and short bill leads to a blunt appearance at the front end. Individual pairs fly close to each other.',
      description: `Range: found throughout the UK with the exception of far NW Scotland and Shetland.

      Destinctive features: grey nape, black forehead and white eyes.

      Behaviour: highly social usually found in pairs or large groups and are garrulous and noisy.

      Vocalisation: 'jack' or 'chack' most obvious and frequent call.

      In flight: appears neat and often speedier than larger corvids.

      Appearance: broad neck and short bill leads to a blunt appearance at the front end. Individual pairs can easily be picked out of a flock as they fly close to each other.

      Habitat: common in human habitats and frequent nesters in chimneys. Can be confused with choughs near cliffs.
      `
    },
    {
      name: 'Pyrrhocorax pyrrhocorax',
      time: [336],
      quickId: 'Unique, coral-red, down-curved bill and pinky red legs. The wingtips extend well beyond the tail.',
      description: `Appearance: chough is slightly larger and more rangey than the jackdaw.

      Range: our rarest black crow, found on some Scottish islands, the Irish coast, the Isle of Man, Wales and Cornwall. Best identified feeding on short, cliff top turf.

      Appearance: unique, coral-red, down-curved bill and pinky red legs. The wingtips extend well beyond the tail.

      In flight: accomplished flyers, flying and tumbling aerobatically. Broad-based, paddle-like wings with heavily fingered even frayed tips.

      Vocalisation: like all crows, noisy, and their 'chee-ow' calls echo around the cliffs often giving away their presence. 
      `
    },
    {
      name: 'Pyrrhocorax graculus',
      time: [402],
      quickId: 'Short wings and long tails, short, slight bills are lemon yellow.',
      description: `European cousin of the British chough.

      Appearance: short wings and long tails, short, slight bills are lemon yellow.
      `
    }
  ],
  notes: [
    {
      tag: 'The crow family',
      time: [0],
      description: `A cosmopolitan family of oscine passerine birds (songbirds) that contains the crows, ravens, rooks, choughs and jackdaws as well as the jays, magpies, treepies, and nutcrackers.
      
      They are notworthy for their intelligence, self-awareness and tool-making abilities.
      `
    },
    {
      tag: 'Identification',
      time: [10],
      description: `One of the most frustrating ID challenges is being able to separate the 5 all black crows that occur in the UK: crow, rook, raven, jackdaw and chough.
      
      On the ground and with good views it is relatively straightforward. But particularly in flight things are more difficult.
      `
    },
    {
      tag: 'Corvus cornix',
      time: [42],
      description: `Range: replaces the carrion crown in Ireland.
      
      Appearance: two-tone grey and black plumage.`
    },
    {
      tag: 'Carrion crow v Rook',
      time: [190],
      description: `Carrion crow bill: deeply curved and stout, compared to more straight, dagger-shaped bill of the rook.


      Rook bill: dagger-shaped, straight, bill, compared to the more deeply curved and stout bill of the rook. Check for adults to help with identification.
      
      The presence of nearby adults should give the game away: you will not see rooks feeding crows.
      `
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
    title: 'BTO Bird ID: Crow, Rook, Raven, Jackdaw & Chough',
    intro: 'BTO Bird ID - Corvids',
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
        url: 'https://www.youtube.com/channel/UC1t-goRaF_qrFwwyxipvwow'
      }
    ],
    location: 'United Kingdom'
  }  
};

const bloomsForBeesCU = { 
  id: 1010, 
  behaviour: 'static',
  name: 'Blooms for Bees - Bumblebees of the UK',
  moduleSize: 1,
  lessonPlanLandscape: 11,
  lessonPlanPortrait: 111,
  glossary: ['insecta', 'animalia'],
  items: [],
  species: [
    {
      name: 'Bombus terrestris',
      time: [25],
      questionIds: [18],
      quickId: 'Worker: 2 dark yellow or orange bands and a white tail.',
      description: `Range: the buff-tailed bumblebee is one of our most common species, present throughout the UK.

      The large queen is one of the first to be seen in early spring.

      Queen appearance: 2 yellow bands and a buff or beige coloured tail.
      
      Worker (female) appearance: whiter tail than the queen, with often a thin line of buff hairs at the top of the tail.
      
      Male appearance: similar to worker bee, but tails likely to more buff coloured and the yellow colour behind their head reaches further around their body. They never have yellow hair on their heads, the hair is black.
      `
    },
    {
      name: 'Bombus lucorum',
      time: [67],
      questionIds: [19],
      quickId: 'Worker: 2 bright lemon yellow bands and a bright white tail.',
      description: `Apperance: similar to the buff-tailed bumblebee but with a bright white tail. It also has two yellow bands though these are brighter and more lemony than the buff-tailed bumblebee.
      
      Queens and workers: similar in appearance though the queens are larger.
      
      Males: similar although the yellow colouring is broader and they have yellow hair on their heads.
      `
    },
    {
      name: 'Bombus lapidarius',
      time: [112],
      questionIds: [20],
      quickId: 'Worker: black body and a dark, orange-red tail.',
      description: `The red-tailed bumblebee is common throughout the UK except the far north. 

      Queen and workers appearance: distinctive black body and a dark, orange-red tail.

      Male appearance: yellow behind their head, yellow facial hair and the tail is a pale orange.

      Colours often fade as the sun bleaches their hair.
      `
    },
    {
      name: 'Bombus hortorum',
      time: [148],
      questionIds: [21],
      quickId: 'Worker: 3 yellow bands and a long tongue.',
      description: `The garden bumblebee is present in gardens but also in other habitats.
      
      Appearance: similar to buff and white-tailed bumblebees.
      
      Key feature: 3 yellow bands. A long tongue (and face to accomodate it).

      Queens, workers and males similar in appearance and vary somewhat in size.
      `
    },
    {
      name: 'Bombus pratorum',
      time: [187],
      questionIds: [22],
      quickId: 'Worker: 2 yellow bands (one may be faint or absent) and an orange tail.',
      description: `The early bumblebee is a small bumblee, found throughout UK but absent in northern Scotland. 
      
      Queens seen from (late February or) March onwards.

      Appearance: quite fluffy. 
      
      Queen: 2 yellow bands and an orange tail.

      Worker: a little smaller than the queen with similar colouring but variable; central yellow band may be faint or absent.

      Male: seen from late May, early June; same size as workers but with yellow facial hair.
      `
    },
    {
      name: 'Bombus pascuorum',
      time: [240],
      questionIds: [23],
      quickId: 'Worker: ginger all over but variable from pale to almost black, and fades with age.',
      description: `Most widespread of the carder bumblebees.

      Emerge in March (one of the latest active species).

      Appearance: queens, workers and males are ginger all over but variable from pale to almost black, and fades with age.
      `
    },
    {
      name: 'Bombus hypnorum',
      time: [278],
      quickId: 'Worker: ginger thorax, black abdomen and a white tail.',
      description: `The tree bumblebee is a relatively recent arrival to the UK from mainland Europe (2001). Now common and widespread.

      Appearance: queen, workers and males all have ginger thorax, black abdomen and a white tail.
      
      Male: larger than workers with brown hairs on their head rather than black. 

      Can appear worn, as though going bald, late in the season.
      `
    }
  ],
  notes: [
    {
      tag: 'Introduction',
      time: [8],
      description: `The UK is home to 25 species of bumblebee, only 7 are widspread and common; these account for the majority of sightings.
      `
    },
  ],
  iconicTaxa: [ 
    {
      id: 'insecta',
      common: 'Insects'
    },
  ],
  video: {
    id: 'nWhvMwvzgjM',
    startAt: 0,
    title: 'Common Bumblebees of the United Kingdom',
    intro: 'Common Bumblebees of the United Kingdom',
    owner: 'Blooms For Bees CU',
    ownerUrl: '',
    presenter: 'BTOvideoBlooms For Bees CU',
    src: 'https://yt3.ggpht.com/a/AGF-l7-yYRi6gG9w7Z0WEvJVonpFbmSu2SsHszV5pQ=s48-c-k-c0xffffffff-no-rj-mo',
    links: [
      {
        label: '',
        url: ''
      },
      {
        label: 'Channel',
        url: 'https://www.youtube.com/channel/UCMccqprrhQDGrL3bju3GzrA'
      }
    ],location: 'United Kingdom'
  }  
};

const nationalTrustButterflies = { 
  id: 1011, 
  behaviour: 'static',
  name: 'National Trust - Britain\'s butterflies',
  moduleSize: 1,
  lessonPlanLandscape: 10,
  lessonPlanPortrait: 110,
  glossary: ['insecta'],
  items: [],
  species: [
    // {
    //   name: 'Pieris brassicae',
    //   time: [20],
    //   description: ``
    // },
    // {
    //   name: 'Aglais io',
    //   time: [25],
    //   description: ``
    // },
    {
      name: 'Polyommatus bellargus',
      time: [186, 276],
      description: `(Lysandra bellargus is also known as Polyommatus bellargus).
      
      A freshly emerged male Adonis blue. 

      Underside: browny grey with orange dots and black spots.

      Upperside: electric, irridescent, bright blue.

      Species decline: died out in the Cotswalds in 1963 but reappeared 40 years later. Now over 30 colonies.
      `
    },
    {
      name: 'Polyommatus icarus',
      time: [218],
      description: `A pair of common blues mating. 
      
      The butterfly is the mature, reproductive stage of a complex metamorphosis (Snapdragon).

      After mating the female lays eggs.
      `
    },
    {
      name: 'Lysandra coridon',
      time: [258],
      description: `A male chalkhill butterfly.

      Hard to identify because there is not much of him left. The average butterfly of this size lives about a week but individuals may live for much longer (he may be 2-3 weeks old).
      `
    }
  ],
  notes: [
    {
      tag: 'Chalkhill blue vs Adonis blue',
      time: [276],
      description: `Separating the female chalkhill blue and the Adonis blue is extremely difficult:
      
      Chalkhill blue females are old and ragged when the second brood of the Adonis blue females are flying (so the Adonis flies a little bit later).        
      `
    },
  ],
  iconicTaxa: [ 
    {
      id: 'insecta',
      common: 'Insects'
    },
  ],
  video: {
    id: '9jGWMliBqXw',
    startAt: 186,
    title: 'Spotting and identifying Britain\'s butterflies',
    intro: 'Spotting and identifying Britain\'s butterflies',
    owner: 'National Trust',
    ownerUrl: '',
    presenter: 'Matthew Oates, National Trust Butterfly Specialist.',
    src: 'https://yt3.ggpht.com/a/AGF-l786SjIkVyF0YCgaLyoTVXtpjCG-RP31KMQVCQ=s48-c-k-c0xffffffff-no-rj-mo',
    links: [
      {
        label: '',
        url: ''
      },
      {
        label: 'Channel',
        url: 'https://www.youtube.com/channel/UCbSxeBQ-U-goXdmkiNBSrrg'
      },
    ],
    location: 'United Kingdom'
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
  btoCorvids,
  bloomsForBeesCU,
  nationalTrustButterflies
];