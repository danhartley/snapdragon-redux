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
        thumb: "http://media.eol.org/content/2012/08/05/03/69621_580_360.jpg",
        aka: [ { en: 'Pepper family'} ],
        species: 3600,
        genera: 13,
        description: [
            {
                language: 'en',
                summary: 'Members of pepper family are small trees, shrubs, or perennial or annual herbs.'
            }
        ]
    }
];