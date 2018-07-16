export const taxa = [
    {
        taxon: "family",
        name: 'Asteraceae',
        aka: [{ en :['Compositae', 'Aster', 'Daisies', 'Composite', 'Sunflower family']}],
        "wiki-entry": "https://en.wikipedia.org/wiki/Asteraceae",
        "eol-entry": "http://eol.org/pages/4206/overview",
        thumb: 'http://media.eol.org/content/2017/02/18/22/29040_98_68.jpg',
        species: 32913,
        genera: 1911,
        description: [
            {   
                language: 'en',
                summary: 'Many members have composite flowers in the form of flower heads (capitula or pseudanthia) which can appear to be a single flower.',

            }
        ]
    },
    {
        taxon: "family",
        name: 'Apiaceae',
        aka: [{ en :['Umbelliferae', 'Umbellifers', 'Celery family', 'Carrot family', 'Parsely family']}],
        "wiki-entry": "https://en.wikipedia.org/wiki/Apiaceae",
        "eol-entry": "http://eol.org/pages/4200/overview",
        thumb: 'https://media.eol.org/content/2014/04/16/16/98519_88_88.jpg',
        members: [  'Daucus carota subsp. sativus', 'Coriandrum sativum', 'Petroselinum crispum', 'Foeniculum vulgare', 
                    'Anethum graveolens', 'Conium maculatum', 'Cuminum cyminum', 'Carum carvi', 'Anthriscus cerefolium',
                    'Myrrhis odorata', 'Pimpinella anisum', 'Levisticum officinale', 'Pastinaca sativa'],
        species: 3700,
        description: [
            { 
                summary: 'A family of mostly aromatic flowering plants that includes economically important species such as carrot, parsley and coriander.',
                language: 'en',
                leaf: ['variable size', 'alternate', 'petiolate', 'sessile'],
                blade: [ 'dissected', 'ternate', 'pinnate', 'simple and entire'],
                inflorescence: 'the flowers nearly always aggregated in terminal umbels, that may be simple or more commonly compound, often umbelliform cymes.',
                petals: 5,
                sepals: 5,
                aetherolea: ['Petroselinum crispum', 'Coriandrum sativum', 'Anethum graveolens'],
                companion: true
         }
        ]

    },
    {
        taxon: "family",
        name: 'Lamiaceae',
        aka: [{ en :['Labiatae', 'Mint', 'Deadnettles']}],
        "wiki-entry": "https://en.wikipedia.org/wiki/Lamiaceae",
        "eol-entry": "http://eol.org/pages/4302/overview",
        thumb: "http://media.eol.org/content/2014/08/14/23/80866_88_88.jpg",
        members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
        propagation: 'stem cuttings',
        aetherolea: ['Rosmarinus officinalis', 'Lavandula officinalis'],
        genera: 236,
        species: 7534,
        description: [
            {
                language: 'en',
                summary: 'Most members of the family are perennial or annual herbs with square stems.',
                leaf: 'Typically simple and oppositely arranged; most are fragrant and contain volatile oils.',  
                inflorescence: 'The flowers are bilaterally symmetrical with five united petals and five united sepals, usually arranged in clusters and feature two-lipped, open-mouthed, tubular corollas (united petals) with five-lobed bell-like calyxes (united sepals).',
                petals: 5,
                speals: 5
         }
        ]
    },
    {
        taxon: "family",
        name: 'Brassicaceae',
        aka: [{ en :['Cruciferae', 'Mustards', 'Crucifers', 'Cabbage family']}],
        thumb: 'http://media.eol.org/content/2015/04/30/10/19667_88_88.jpg',
        species: 4060,
        genera: 372,
        description: [
            {
                language: 'en',
                summary: 'A a medium-sized and economically important family of flowering plants commonly known as the mustards, crucifers, or cabbage family.'
            }
        ]
    },
    {
        taxon: "family",
        name: 'Amaryllidaceae',
        aka: [ { en: ['Amaryllis']}],
        thumb: 'http://media.eol.org/content/2015/01/27/22/09266_98_68.jpg',
        species: 1600,
        genera: 75,
        description: [
            {
                language: 'en',
                summary: 'The subfamily Allioideae contains a number of important food crops, including onion, garlic, leek, and chives.'
            }
        ]
    },
    {
        taxon: "order",
        name: 'Lepidoptera',
        aka: [ { en :['Butterflies and Moths']}],
        thumb: 'https://media.eol.org/content/2017/01/25/21/74379_88_88.jpg',
        species: 180000,
        families: 126,
        description: [
            {
                language: 'en',
                summary: 'With the exception of a few moths, adult lepidopterans have two pairs of wings. The family name is derived from the Greek, meaning “scaly winged”.'
            }
        ],
        role: [ 'pollinators', 'food', 'pest', 'producers' ],
        "wiki-entry": "https://en.wikipedia.org/wiki/Lepidoptera",
        "eol-entry": "http://eol.org/pages/747/overview"
    },
    {
        taxon: "order",
        name: "Hymenoptera",
        thumb: "http://media.eol.org/content/2013/02/03/12/43681_98_68.jpg",
        aka: [ { en: ['Ants, Bees, and Wasps']} ],
        species: 150000
    },
    {
        taxon: "family",
        name: "Apidae",
        thumb: "http://media.eol.org/content/2013/02/03/12/43681_98_68.jpg",
        species: 5700,
        members: ["Apis mellifera"],
        role: ["pollinator"],
        description: [
            {
                language: 'en',
                summary: "Although the most visible members of this family are social, the vast majority of apid bees are solitary."
            }
        ],        
        "inat-link": "https://www.inaturalist.org/taxa/47221-Apidae"
    },
    {
        taxon: 'order',
        name: "Coleoptera",
        thumb: "http://media.eol.org/content/2015/01/26/11/41088_88_88.jpg",
        aka: [ { en: ['Beetles']} ],
        species: 400000,
        description: [
            {
                language: "en",
                summary: "Their front pair of wings is hardened into wing-cases, elytra, distinguishing them from most other insects."
            }
        ]
    },
    {
        taxon: 'order',
        name: "Diptera",
        thumb: "http://media.eol.org/content/2015/01/31/00/39232_88_88.jpg",
        aka: [ { en: ['Flies']} ],
        species: 150000,
        description: [
            {
                language: "en",
                summary: "Insects of this order use only a single pair of wings to fly, the hindwings having evolved into advanced mechanosensory organs known as halteres, which act as high-speed sensors of rotational movement and allow dipterans to perform advanced aerobatics."
            }
        ]
    },
    {
        taxon: 'family',
        name: 'Poaceae',
        thumb: "http://media.eol.org/content/2012/05/23/07/89214_88_88.jpg",
        aka: [ { en: ['Poaceae', 'Gramineae', 'Grasses'] } ],
        "wiki-entry": 'https://en.wikipedia.org/wiki/Poaceae',
        species: 1200, 
        genera: 780,
        description: [
            {
                language: 'en',
                summary: 'Members have stems that are hollow except at the nodes and narrow alternate leaves borne in two ranks. The lower part of each leaf encloses the stem, forming a leaf-sheath.'
            }
        ]
    },
    {
        taxon: 'family',
        name: 'Zingiberaceae',
        thumb: "http://media.eol.org/content/2012/01/25/15/09074_98_68.jpg",
        aka: [ { en: 'Ginger family'} ],
        species: 1600,
        genera: 50,
        description: [
            {
                language: 'en',
                summary: 'Aromatic herbaceous plants that are self-supporting or epiphytic. Species include important spices and plants with medicinal properties.'
            }
        ]
    },
    {
        taxon: 'family',
        name: 'Piperaceae',
        thumb: "http://media.eol.org/content/2017/01/30/20/37424_88_88.jpg",
        aka: [ { en: ['Pepper family']} ],
        species: 3600,
        genera: 13,
        description: [
            {
                language: 'en',
                summary: 'Members grow as small trees, shrubs, perennial and annual herbs. The leaves have a pungent flavour.'
            }
        ]
    },
    {
        taxon: 'family',
        name: 'Fabaceae',
        thumb: "http://media.eol.org/content/2010/03/24/13/32972_98_68.jpg",
        aka: [ { en: ['Leguminosae','Pea family', 'Bean family']} ],
        species: 19000,
        genera: 751,
        description: [
            {
                language: 'en',
                summary: 'Members are easily recognized by their fruit (legume) and the distincitve formation of petals as "banner, wings, and keel.',
            }
        ],
        "eol-entry": "http://eol.org/pages/4277/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Fabaceae"
    },
    {
        taxon: 'family',
        name: 'Rosaceae',
        thumb: "http://media.eol.org/content/2014/08/25/10/53156_88_88.jpg",
        aka: [ { en: ['Rose family']} ],
        species: 4828,
        genera: 91,
        description: [
            {
                language: 'en',
                summary: 'Members include edible fruits (apples, pears, apricots, peaches) and ornamental plants (roses).'
            }
        ],
        "eol-entry": "http://eol.org/pages/8097/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Rosaceae"
    },
    {
        taxon: 'family',
        name: 'Rutaceae',
        thumb: "http://media.eol.org/content/2012/05/23/09/05989_98_68.jpg",
        aka: [ { en: ['Citrus family', 'Rue family']} ],
        species: 1600,
        genera: 160,
        description: [
            {
                language: 'en',
                summary: 'Flowers divides into 4 or 5 parts, usually with strong scents. Commonly known as the Rue or Citrus family.'
            }
        ],
        "eol-entry": "http://eol.org/pages/582200/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Rutaceae"
    },
    {
        taxon: 'family',
        name: 'Cucurbitaceae',
        thumb: "http://media.eol.org/content/2011/08/04/10/10257_88_88.jpg",
        aka: [ { en: ['Cucurbits', 'Gourd family', 'Gourds, Melons, Squash, & Cucumbers']} ],
        species: 975,
        genera: 98,
        description: [
            {
                language: 'en',
                summary: 'Members grow in the tropics and temperate areas; those with edible fruits were among the earliest cultivated plants in both the Old and New Worlds.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4458/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Cucurbitaceae"
    },
    {
        taxon: 'family',
        name: 'Amaranthaceae',
        thumb: "http://media.eol.org/content/2012/06/12/15/54548_88_88.jpg",
        aka: [ { en: ['Amaranth family', 'Pigweed']} ],
        species: 2040,
        genera: 165,
        description: [
            {
                language: 'en',
                summary: 'Many of the species are halophytes, tolerating salty soils, or grow in dry steppes or semi-deserts.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4226/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Amaranthaceae"
    },
    {
        taxon: 'family',
        name: 'Solanaceae',
        thumb: "http://media.eol.org/content/2012/06/12/16/57629_98_68.jpg",
        aka: [ { en: ['Nightshades']} ],
        species: 2700,
        genera: 98,
        description: [
            {
                language: 'en',
                summary: 'Members range from annual and perennial herbs to vines, lianas, epiphytes, shrubs, and trees, and includes a number of important agricultural crops, medicinal plants, and spices.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4437/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Solanaceae"
    },
    {
        taxon: 'family',
        name: 'Moraceae',
        thumb: "http://media.eol.org/content/2014/08/15/04/78512_88_88.jpg",
        aka: [ { en: ['Mulberry family', 'Fig family']} ],
        species: 1100,
        genera: 38,
        description: [
            {
                language: 'en',
                summary: 'Members known for their fleshy fruit containing seeds. Widespread in tropical and subtropical regions.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4450/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Moraceae"
    },
    {
        taxon: 'family',
        name: 'Vitaceae',
        thumb: "http://media.eol.org/content/2013/12/08/20/40721_88_88.jpg",
        aka: [ { en: ['Wild Grape Family']} ],
        species: 910,
        genera: 14,
        description: [
            {
                language: 'en',
                summary: 'The berries of Vitis species, commonly known as grapes, are an important fruit crop and, when fermented, produce wine.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4382/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Vitaceae"
    },
    {
        taxon: 'family',
        name: 'Lauraceae',
        thumb: "http://media.eol.org/content/2012/06/13/03/98939_88_88.jpg",
        aka: [ { en: ['Laurel Family']} ],
        species: 2850,
        genera: 45,
        description: [
            {
                language: 'en',
                summary: 'The family has a worldwide distribution in tropical and warm climates from low-lying to montane. Frequently aromatic trees and shrubs.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4308/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Lauraceae"
    }
];