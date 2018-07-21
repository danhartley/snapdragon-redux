export const taxa = [
    {
        taxon: "family",
        name: 'Asteraceae',
        alt: [ 'Compositae'],
        names: [{ language: "en", names:[ 'Daisies', 'Compositae', 'Aster', 'Composite', 'Sunflower family']}],
        "wiki-entry": "https://en.wikipedia.org/wiki/Asteraceae",
        "eol-entry": "http://eol.org/pages/4206/overview",
        thumb: 'https://media.eol.org/content/2017/02/18/22/29040_98_68.jpg',
        species: 32913,
        genera: 1911,
        descriptions: [
            {   
                language: 'en',
                summary: 'Worldwide distribution, from the polar regions to the tropics. Second only to the orchid family in size.',
                identification: 'Composite flowers with either disk or ray flowers, or both.'
            }
        ],
        members: ['Cynara cardunculus', 'Helianthus annuus']
    },
    {
        taxon: "family",
        name: 'Apiaceae',
        alt: ['Umbelliferae'],
        names: [{ language: "en", names:[ 'Carrot or Parsley family', 'Umbellifers', 'Celery family', 'Carrot family', 'Parsely family']}],
        "wiki-entry": "https://en.wikipedia.org/wiki/Apiaceae",
        "eol-entry": "http://eol.org/pages/4200/overview",
        thumb: 'https://media.eol.org/content/2014/04/16/16/98519_88_88.jpg',
        members: [  'Daucus carota subsp. sativus', 'Coriandrum sativum', 'Petroselinum crispum', 'Foeniculum vulgare', 
                    'Anethum graveolens', 'Conium maculatum', 'Cuminum cyminum', 'Carum carvi', 'Anthriscus cerefolium',
                    'Myrrhis odorata', 'Pimpinella anisum', 'Levisticum officinale', 'Pastinaca sativa'],
        species: 3700,
        genera: 400,
        toxic: { members:['Conium maculatum'] },
        descriptions: [
            { 
                summary: 'A family of mostly aromatic flowering plants that includes species such as carrot, celery, cumin, parsley and coriander, and the posionouse hemlocks.',
                identification: 'Compound, termial umbels radiating from a single point. Hollow flower stalks.',
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
        alt: ['Labiatae'],
        names: [{ language: "en", names:[ 'Mint or Deadnettles', 'Mint or Basil', 'Labiatae', 'Mint', 'Deadnettles']}],
        "wiki-entry": "https://en.wikipedia.org/wiki/Lamiaceae",
        "eol-entry": "http://eol.org/pages/4302/overview",
        thumb: "http://media.eol.org/content/2014/08/14/23/80866_88_88.jpg",
        members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
        propagation: 'stem cuttings',
        aetherolea: ['Rosmarinus officinalis', 'Lavandula officinalis'],
        genera: 236,
        species: 7534,
        descriptions: [
            {
                language: 'en',
                summary: 'Most members of the family are perennial or annual herbs with square stems.',
                identification: 'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
                leaf: 'Important members include basil, rosemary, lavender, marjoram, thyme, savory and the mints. Not to be confused with Verbena and Urticaceae.',  
                inflorescence: 'The flowers are bilaterally symmetrical with five united petals and five united sepals, usually arranged in clusters and feature two-lipped, open-mouthed, tubular corollas (united petals) with five-lobed bell-like calyxes (united sepals).',
                petals: 5,
                speals: 5
         }
        ]
    },
    {
        taxon: "family",
        name: 'Brassicaceae',
        alt: ['Cruciferae'],
        names: [{ language: "en", names:['Mustards', 'Cruciferae', 'Crucifers', 'Cabbage family']}],
        thumb: 'https://media.eol.org/content/2015/04/30/10/19667_88_88.jpg',
        species: 4060,
        genera: 372,
        descriptions: [
            {
                language: 'en',
                summary: 'All members of this family are edible. Cauliflower, Brussel sprouts, broccoli, kohlrabi, cabbage and kale are bred from the single species, Brassica oleracea.',
                identification: '4 petals, 6 stamen (4 tall, 2 short)'
            }
        ],
        members: ['Arabidopsis thaliana', 'Brassica oleracea']
    },
    {
        taxon: "family",
        name: 'Amaryllidaceae',
        names: [ { language: "en", names: ['Amaryllis']}],
        thumb: 'https://media.eol.org/content/2015/01/27/22/09266_98_68.jpg',
        species: 1600,
        genera: 75,
        descriptions: [
            {
                language: 'en',
                summary: 'The subfamily Allioideae contains a number of important food crops, including onion, garlic, leek, and chives. Formerly part of the Lily family. Contains the subfamily Agapanthus.',
                identification: '3 undifferentiated petals and sepals (tepals). Lily-like flowers, onion-like bulbs. Flowerheads wrapped in a bract.'
            }
        ]
    },
    {
        taxon: "order",
        name: 'Lepidoptera',
        names: [ { language: "en", names:['Butterflies and Moths']}],
        thumb: 'https://media.eol.org/content/2017/01/25/21/74379_88_88.jpg',
        species: 180000,
        families: 126,
        descriptions: [
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
        names: [ { language: "en", names: ['Ants, Bees, and Wasps']} ],
        descriptions: [
            {
                language: 'en',
                summary: ""
            }
        ],
        species: 150000
    },
    {
        taxon: "family",
        name: "Apidae",
        names: [ { language: "en", names: ['Bees']}],
        thumb: "http://media.eol.org/content/2013/02/03/12/43681_98_68.jpg",
        species: 5700,
        members: ["Apis mellifera"],
        role: ["pollinator"],
        descriptions: [
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
        names: [ { language: "en", names: ['Beetles']} ],
        species: 400000,
        descriptions: [
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
        names: [ { language: "en", names: ['Flies']} ],
        species: 150000,
        descriptions: [
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
        alt: ['Poaceae', 'Gramineae'],
        names: [ { language: "en", names: ['Grasses'] } ],
        "wiki-entry": 'https://en.wikipedia.org/wiki/Poaceae',
        species: 1200, 
        genera: 780,
        descriptions: [
            {
                language: 'en',
                summary: 'Cereal grains wheat (Triticum), rice (Oryza), wild rice (Zizania), corn (Zea), oats (Avena), barley (Hordeum), millet (Echinochloa) and rye (Secale) belong to this family. 3 (rarely 2 or 6) stamen. Ovary usually matures into 1 seed. Bracts surrounding the flower are also known as chaff. Hollow stems except at the nodes and narrow alternate leaves borne in two ranks. The lower part of each leaf encloses the stem, forming a leaf-sheath.',
                identification: 'Grasses with distinctive nodes on the flower stem. Non-showy flowers.'
            }
        ],
        toxic: { members: ['Lolium temulentum'] }
    },
    {
        taxon: 'family',
        name: 'Zingiberaceae',
        thumb: "http://media.eol.org/content/2012/01/25/15/09074_98_68.jpg",
        names: [ { language: "en", names: ['Ginger family']} ],
        species: 1600,
        genera: 50,
        descriptions: [
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
        names: [ { language: "en", names: ['Pepper family']} ],
        species: 3600,
        genera: 13,
        descriptions: [
            {
                language: 'en',
                summary: 'Small trees, shrubs, perennial and annual herbs. Includes Piper nigrum the source of both black and white pepper.',
                identification: 'Dense flower spikes of tiny radially symmetrical flowers with a bract below and no petals or sepals. Soft, fleshy or succulent leaves with pungent flavour.'
            }
        ]
    },
    {
        taxon: 'family',
        name: 'Fabaceae',
        thumb: "http://media.eol.org/content/2010/03/24/13/32972_98_68.jpg",
        alt: ['Leguminosae'],
        names: [ { language: "en", names: ['Pea family', 'Bean family', 'Legumes']} ],
        toxic: { members:['Hedysarum alpinum']},
        species: 19000,
        genera: 751,
        descriptions: [
            {
                language: 'en',
                summary: 'Widely distributed, the third-largest land plant family. Genera include Mimosa and Acacia. Food staples pea, alfafa, soybean, chickpea, peanut, beans, carob and liqourice.',
                identification: 'Many have 5 petals in a distinctive "banner, wings, and keel" form, and/or pinnate leaves (Mimosa). Characterisic pod or legume fruit.'
            }
        ],
        members: ['Pisum sativum', 'Glycine max', 'Cicer arietinum', 'Arachis hypogaea'],
        "eol-entry": "http://eol.org/pages/4277/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Fabaceae"
    },
    {
        taxon: 'family',
        name: 'Rosaceae',
        thumb: "http://media.eol.org/content/2014/08/25/10/53156_88_88.jpg",
        names: [ { language: "en", names: ['Rose family']} ],
        species: 4828,
        toxic: { members:['Conium maculatum'] },
        genera: 91,
        descriptions: [
            {
                language: 'en',
                summary: 'Members include edible fruits (apples, pears, apricots, peaches) and ornamental plants (roses). Genera include Sorbus, Crataegus and Prunus. Mostly decidous. Worldwide, most diverse in northern hemisphere.',
                identification: 'Highly fragrant flowers. 5 sepals and 5 petals. Stamen often numerous. Serrated, oval-shaped leaves.'
            }
        ],
        "eol-entry": "http://eol.org/pages/8097/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Rosaceae"
    },
    {
        taxon: 'family',
        name: 'Rutaceae',
        thumb: "http://media.eol.org/content/2012/05/23/09/05989_98_68.jpg",
        names: [ { language: "en", names: ['Citrus family', 'Rue family']} ],
        species: 1600,
        genera: 160,
        descriptions: [
            {
                language: 'en',
                summary: 'Includes woody shrubs and trees, distributed worldwide, especially in warm temperate and tropical regions. Commonly known as the Rue or Citrus family.',
                identification: 'Flowers that divide into 4 or 5 parts, usually with strong scents.'
            }
        ],
        "eol-entry": "http://eol.org/pages/582200/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Rutaceae"
    },
    {
        taxon: 'family',
        name: 'Cucurbitaceae',
        thumb: "http://media.eol.org/content/2011/08/04/10/10257_88_88.jpg",
        names: [ { language: "en", names: ['Gourd family', 'Cucurbits', 'Gourds, Melons, Squash, & Cucumbers']} ],
        species: 975,
        genera: 98,
        descriptions: [
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
        names: [ { language: "en", names: ['Amaranth family', 'Pigweed']} ],
        species: 2040,
        genera: 165,
        descriptions: [
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
        names: [ { language: "en", names: ['Nightshades']} ],
        species: 2700,
        genera: 98,
        descriptions: [
            {
                language: 'en',
                summary: 'Members range from annual and perennial herbs to vines, lianas, epiphytes, shrubs, and trees, and include agricultural crops (potato), medicinal plants, and spices. Many contain potent alkaloids (tobacco).',
                identification: 'Alternate leaves. 5 united petals and sepals. 2 cells in the ovary: berry (tomato) or capsule (petunia).'
            }
        ],
        members: ['Nicotiana tabacum', 'Solanum tuberosum'],
        "eol-entry": "http://eol.org/pages/4437/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Solanaceae"
    },
    {
        taxon: 'family',
        name: 'Moraceae',
        thumb: "http://media.eol.org/content/2014/08/15/04/78512_88_88.jpg",
        names: [ { language: "en", names: ['Mulberry family', 'Fig family']} ],
        species: 1100,
        genera: 38,
        descriptions: [
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
        names: [ { language: "en", names: ['Wild Grape Family']} ],
        species: 910,
        genera: 14,
        descriptions: [
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
        names: [ { language: "en", names: ['Laurel Family']} ],
        species: 2850,
        genera: 45,
        descriptions: [
            {
                language: 'en',
                summary: 'The family has a worldwide distribution in tropical and warm climates from low-lying to montane. Frequently aromatic trees and shrubs.'
            }
        ],
        "eol-entry": "http://eol.org/pages/4308/overview",
        "wiki-entry": "https://en.wikipedia.org/wiki/Lauraceae"
    }
];