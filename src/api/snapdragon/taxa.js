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
                summary: 'Many members have composite flowers in the form of flower heads (capitula or pseudanthia) surrounded by involucral bracts. When viewed from a distance, each capitulum may have the appearance of being a single flower.',

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
                summary: 'Most are herbaceous plants, some shrubs, with simple, although sometimes deeply incised, alternatingly set leaves without stipules or in leaf rosettes, with terminal inflorescences without bracts, containing flowers with four free sepals, four free alternating petals, two short and four longer free stamens, and a fruit with seeds in rows.'
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
                summary: 'Herbaceous or succulent'
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
                summary: 'Lepidopteran are characterized by the presence of scales that cover the bodies, wings, and a proboscis; some form of membranous wings; and holometabolous, meaning they undergo complete metamorphosis.'
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
        summary: "Although the most visible members of Apidae are social, the vast majority of apid bees are solitary.",
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
                summary: 'Grasses have stems that are hollow except at the nodes and narrow alternate leaves borne in two ranks. The lower part of each leaf encloses the stem, forming a leaf-sheath.'
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
                summary: 'Members of the family are small to large herbaceous plants with distichous leaves with basal sheaths that overlap to form a pseudostem. The plants are either self-supporting or epiphytic.'
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
                summary: 'Members of pepper family are small trees, shrubs, or perennial or annual herbs.'
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
                summary: 'Members includes trees, shrubs, and perennial or annual herbaceous plants, which are easily recognized by their fruit (legume) and their compound, stipulated leaves.'
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
                summary: 'Members include herbs, shrubs, and trees, including many edible fruits.'
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
                summary: 'Members have flowers that divide into four or five parts, usually with strong scents. They range in form and size from herbs to shrubs and large trees.'
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
                summary: 'Members grow in the tropics and in temperate areas; those with edible fruits were among the earliest cultivated plants in both the Old and New Worlds. The family ranks high for the number of species used as human food.'
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
                summary: 'Members are widespread and cosmopolitan family from the tropics to cool temperate regions. Many of the species are halophytes, tolerating salty soils, or grow in dry steppes or semi-deserts.'
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
                summary: 'Members range from annual and perennial herbs to vines, lianas, epiphytes, shrubs, and trees, and includes a number of important agricultural crops, medicinal plants, spices, weeds, and ornamentals.'
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
                summary: 'The family has a worldwide distribution in tropical and warm climates. The Lauraceae are important components of tropical forests ranging from low-lying to montane. In several forested regions, Lauraceae are among the top five families in terms of the number of species present.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4308/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Lauraceae"
    }
];