export const taxa = [
    {
        taxon: 'family',
        name: 'Asteraceae',
        alt: [ 'Compositae'],
        names: [{ language: "en", names:[ 'Daisies', 'Compositae', 'Aster', 'Composite', 'Sunflower family' ]},
        { language: "fr", names:[ 'Astéracées' ]},
        { language: "de", names:[ 'Korbblütler' ]},
        { language: "es", names:[ 'Daisies' ]},
        { language: "pt", names:[ 'Daisies' ]},
        { language: "it", names:[ 'Daisies' ]}],
        wiki: "https://en.wikipedia.org/wiki/Asteraceae",
        eol: "http://eol.org/pages/4206/overview",
        thumb: 'https://media.eol.org/content/2017/02/18/22/29040_98_68.jpg',
        species: 32913,
        genera: 1911,
        descriptions: [
            {   
                language: 'en',
                summary: 'Worldwide distribution, second only to the orchids in size. Economically important, products include cooking oils, lettuce, sunflower seeds, and artichokes. The head may track the sun which maximizes reflectivity thereby attracting more pollinators.',
                identification: 'Composite flowers with either disk or ray flowers, or both.'
            }
        ],
        pollinators: [ { language: "en", names: ['Insects', 'Wind', 'Asexual'] } ],
        members: ['Cynara cardunculus', 'Helianthus annuus'],
        wiki: "https://en.wikipedia.org/wiki/Asteraceae",
        eol: "http://eol.org/pages/4206/overview"
    },
    {
        taxon: 'family',
        name: 'Apiaceae',
        alt: ['Umbelliferae'],
        names: [{ language: "en", names:[ 'Carrot or Parsley family', 'Umbellifers', 'Celery family', 'Carrot family', 'Parsely family']},
        { language: "fr", names:[ 'Apiaceae' ]},
        { language: "de", names:[ 'Doldengewächse' ]},
        { language: "es", names:[ 'Carrot or Parsley family' ]},
        { language: "pt", names:[ 'Carrot or Parsley family' ]},
        { language: "it", names:[ 'Carrot or Parsley family' ]}],
        thumb: 'https://media.eol.org/content/2014/04/16/16/98519_88_88.jpg',
        members: [  'Daucus carota subsp. sativus', 'Coriandrum sativum', 'Petroselinum crispum', 'Foeniculum vulgare', 
                    'Anethum graveolens', 'Conium maculatum', 'Cuminum cyminum', 'Carum carvi', 'Anthriscus cerefolium',
                    'Myrrhis odorata', 'Pimpinella anisum', 'Levisticum officinale', 'Pastinaca sativa'],
        pollinators: [ { language: "en", names: ['Carpenter Bees', 'Mason Bees', 'Leafcutter Bees'], families: ['Xylocopa', 'Megachilidae'] } ],
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
        ],
        wiki: "https://en.wikipedia.org/wiki/Apiaceae",
        eol: "http://eol.org/pages/4200/overview"
    },
    {
        taxon: 'family',
        name: 'Lamiaceae',
        alt: ['Labiatae'],
        names: [{ language: "en", names:[ 'Mint or Deadnettles', 'Mint or Basil', 'Labiatae', 'Mint', 'Deadnettles']},
        { language: "fr", names:[ 'Menthes' ]},
        { language: "de", names:[ 'Lippenblütler' ]},
        { language: "es", names:[ 'Mint' ]},
        { language: "pt", names:[ 'Mint' ]},
        { language: "it", names:[ 'Mint' ]}],
        wiki: "https://en.wikipedia.org/wiki/Lamiaceae",
        eol: "http://eol.org/pages/4302/overview",
        thumb: "https://media.eol.org/content/2014/08/14/23/80866_88_88.jpg",
        members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
        pollinators: [ { language: "en", names: ['Insects', 'Bumblebees', 'Single Bees'] } ],
        propagation: 'stem cuttings',
        aetherolea: ['Rosmarinus officinalis', 'Lavandula officinalis'],
        genera: 236,
        species: 7534,
        descriptions: [
            {
                language: 'en',
                summary: 'Many aromatic perennials including basil, mint, rosemary, sage, savory, marjoram, and oregano. Readily propagated from stem cuttings or seed (chia).',
                identification: 'Square stems, simple and opposite leaves, often fragrant. 5 petals and sepals, fused in both cases.',
                leaf: 'Important members include basil, rosemary, lavender, marjoram, thyme, savory and the mints. Not to be confused with Verbena and Urticaceae.',  
                inflorescence: 'The flowers are bilaterally symmetrical with five united petals and five united sepals, usually arranged in clusters and feature two-lipped, open-mouthed, tubular corollas (united petals) with five-lobed bell-like calyxes (united sepals).',
                petals: 5,
                speals: 5
         }
        ],
        wiki: "https://en.wikipedia.org/wiki/Lamiaceae",
        eol: "http://eol.org/pages/4302/overview"
    },
    {
        taxon: 'family',
        name: 'Brassicaceae',
        alt: ['Cruciferae'],
        names: [{ language: "en", names:['Mustards', 'Cruciferae', 'Crucifers', 'Cabbage family']},
        { language: "fr", names:[ 'Brassicaceae' ]},
        { language: "de", names:[ 'Kreuzblütengewächse' ]},
        { language: "es", names:[ 'Mustards' ]},
        { language: "pt", names:[ 'Mustards' ]},
        { language: "it", names:[ 'Mustards' ]}],
        thumb: 'https://media.eol.org/content/2015/04/30/10/19667_88_88.jpg',
        species: 4060,
        genera: 372,
        pollinators: [ { language: "en", names: ['Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'All members of this family are edible. Cauliflower, Brussel sprouts, broccoli, kohlrabi, cabbage and kale are bred from the single species, Brassica oleracea.',
                identification: '4 petals, 6 stamen (4 tall, 2 short)'
            }
        ],
        members: ['Arabidopsis thaliana', 'Brassica oleracea'],
        wiki: "https://en.wikipedia.org/wiki/Brassicaceae",
        eol: "http://eol.org/pages/4219/overview"
    },
    {
        taxon: 'family',
        name: 'Amaryllidaceae',
        names: [ { language: "en", names: ['Amaryllis']},
        { language: "fr", names:[ 'Amaryllis' ]},
        { language: "de", names:[ 'Narzissengewächse' ]},
        { language: "es", names:[ 'Amaryllis' ]},
        { language: "pt", names:[ 'Amaryllis' ]},
        { language: "it", names:[ 'Amaryllis' ]}],
        thumb: 'https://media.eol.org/content/2015/01/27/22/09266_98_68.jpg',
        species: 1600,
        genera: 75,
        descriptions: [
            {
                language: 'en',
                summary: 'The subfamily Allioideae contains a number of important food crops, including onion, garlic, leek, and chives. Formerly part of the Lily family. Contains the subfamily Agapanthus.',
                identification: '3 tepals. Lily-like flowers, onion-like bulbs. Flowerheads wrapped in bract.'
            }
        ],
        pollinators: [ { language: "en", names: ['Carpenter Bees' ,' Owlet Moths'] } ],
        members: ['Allium cepa', 'Allium schoenoprasum'],
        wiki: "https://en.wikipedia.org/wiki/Amaryllidaceae",
        eol: "http://eol.org/pages/8187/overview"
    },
    {
        taxon: "order",
        name: 'Lepidoptera',
        names: [ { language: "en", names:['Butterflies and Moths']},
        { language: "fr", names:[ 'Hétérocères' ]},
        { language: "de", names:[ 'Schmetterlinge' ]},
        { language: "es", names:[ 'Butterflies and Moths' ]},
        { language: "pt", names:[ 'Borboleta' ]},
        { language: "it", names:[ 'Butterflies and Moths' ]}],
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
        wiki: "https://en.wikipedia.org/wiki/Lepidoptera",
        eol: "http://eol.org/pages/747/overview"
    },
    {
        taxon: "order",
        name: "Hymenoptera",
        thumb: "https://media.eol.org/content/2013/02/03/12/43681_98_68.jpg",
        names: [ { language: "en", names: ['Ants, Bees, and Wasps']},
        { language: "fr", names:[ 'Hyménoptères' ]},
        { language: "de", names:[ 'Hautflügler' ]},
        { language: "es", names:[ 'Ants, Bees, and Wasps' ]},
        { language: "pt", names:[ 'Vespa' ]},
        { language: "it", names:[ 'Ants, Bees, and Wasps' ]}],
        descriptions: [
            {
                language: 'en',
                summary: ""
            }
        ],
        species: 150000,
        wiki: "https://en.wikipedia.org/wiki/Hymenoptera",
        eol: "http://eol.org/pages/648/overview"
    },
    {
        taxon: 'family',
        name: "Apidae",
        names: [ { language: "en", names: ['Bees']},
        { language: "fr", names:[ 'Bees' ]},
        { language: "de", names:[ 'Echte Bienen' ]},
        { language: "es", names:[ 'Bees' ]},
        { language: "pt", names:[ 'Bees' ]},
        { language: "it", names:[ 'Bees' ]}],
        thumb: "https://media.eol.org/content/2013/02/03/12/43681_98_68.jpg",
        species: 5700,
        members: ["Apis mellifera"],
        pollinators: [ { language: "en", names: ['Flowering plants'] } ],
        descriptions: [
            {
                language: 'en',
                summary: "Although the most visible members of this family are social, the vast majority of apid bees are solitary.",
                identification: 'Yellow, black, or honey brown. Body covered in numerous branched hairs. Pollen basket on tibia.'
            }
        ],        
        eol: 'http://eol.org/pages/677/overview',
        "inat-link": "https://www.inaturalist.org/taxa/47221-Apidae",
        wiki: "https://en.wikipedia.org/wiki/Apidae"
    },
    {
        taxon: 'order',
        name: "Coleoptera",
        thumb: "https://media.eol.org/content/2015/01/26/11/41088_88_88.jpg",
        names: [ { language: "en", names: ['Beetles']},
        { language: "fr", names:[ 'Coléoptères' ]},
        { language: "de", names:[ 'Käfer' ]},
        { language: "es", names:[ 'Coleoptera' ]},
        { language: "pt", names:[ 'Besouro' ]},
        { language: "it", names:[ 'Coleoptera' ]}],
        species: 400000,
        descriptions: [
            {
                language: "en",
                summary: "Their front pair of wings is hardened into wing-cases, elytra, distinguishing them from most other insects."
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Coleoptera",
        eol: "http://eol.org/pages/345/overview"
    },
    {
        taxon: 'order',
        name: "Diptera",
        thumb: "https://media.eol.org/content/2015/01/31/00/39232_88_88.jpg",
        names: [ { language: "en", names: ['Flies']},
        { language: "fr", names:[ 'Diptères' ]},
        { language: "de", names:[ 'Zweiflügler' ]},
        { language: "es", names:[ 'Flies' ]},
        { language: "pt", names:[ 'Mosca' ]},
        { language: "it", names:[ 'Flies' ]}],
        species: 150000,
        descriptions: [
            {
                language: "en",
                summary: "Insects of this order use only a single pair of wings to fly, the hindwings having evolved into advanced mechanosensory organs known as halteres, which act as high-speed sensors of rotational movement and allow dipterans to perform advanced aerobatics."
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Diptera",
        eol: "http://eol.org/pages/421/overview"
    },
    {
        taxon: 'family',
        name: 'Poaceae',
        thumb: "https://media.eol.org/content/2012/05/23/07/89214_88_88.jpg",
        alt: ['Poaceae', 'Gramineae'],
        names: [ { language: "en", names: ['Grasses', 'True Grasses'] } ,
        { language: "fr", names:[ 'Graminées' ]},
        { language: "de", names:[ 'Süßgräser' ]},
        { language: "es", names:[ 'Grasses' ]},
        { language: "pt", names:[ 'Grasses' ]},
        { language: "it", names:[ 'Grasses' ]}],
        pollinators: [ { language: "en", names: ['Wind', 'Insects'] } ],
        wiki: 'https://en.wikipedia.org/wiki/Poaceae',
        species: 1200, 
        genera: 780,
        descriptions: [
            {
                language: 'en',
                summary: 'This family is the world’s single most important source of food and its species the most abundant.',
                identification: 'Grasses with distinctive nodes on otherwise hollow flower stems. Non-showy flowers.' 
            }
        ],
        members: ['Triticum','Oryza','Zizania','Zea', 'Avena', 'Hordeum', 'Echinochloa', 'Secale' ],
        toxic: { members: ['Lolium temulentum'] },
        wiki: "https://en.wikipedia.org/wiki/Poaceae",
        eol: "http://eol.org/pages/8223/overview"
    },
    {
        taxon: 'family',
        name: 'Zingiberaceae',
        thumb: "https://media.eol.org/content/2012/01/25/15/09074_98_68.jpg",
        names: [ { language: "en", names: ['Ginger family']} ,
        { language: "fr", names:[ 'Ginger family' ]},
        { language: "de", names:[ 'Ginger family' ]},
        { language: "es", names:[ 'Ginger family' ]},
        { language: "pt", names:[ 'Ginger family' ]},
        { language: "it", names:[ 'Ginger family' ]}],
        species: 1600,
        genera: 50,
        pollinators: [ { language: "en", names: ['Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Aromatic herbaceous plants that are self-supporting or epiphytic. Species include important spices and plants with medicinal properties.',
                identification: 'Orchid-like flowers. Fleshy rhizomes (underground stem).'
            }
        ],
        members: ['Curcuma longa', 'Zingiber officinale', 'Elettaria cardamomum'],
        wiki: "https://en.wikipedia.org/wiki/Zingiberaceae",
        eol: "http://eol.org/pages/8183/overview"
    },
    {
        taxon: 'family',
        name: 'Piperaceae',
        thumb: "https://media.eol.org/content/2017/01/30/20/37424_88_88.jpg",
        names: [ { language: "en", names: ['Pepper family']} ,
        { language: "fr", names:[ 'Pepper family' ]},
        { language: "de", names:[ 'Pepper family' ]},
        { language: "es", names:[ 'Pepper family' ]},
        { language: "pt", names:[ 'Pepper family' ]},
        { language: "it", names:[ 'Pepper family' ]}],
        species: 3600,
        genera: 13,
        pollinators: [ { language: "en", names: ['Wind','Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Small trees, shrubs, perennial and annual herbs. Includes Piper nigrum the source of both black and white pepper.',
                identification: 'Dense flower spikes of tiny radially symmetrical flowers; no petals or sepals. Soft, fleshy or succulent leaves with pungent flavour.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Piperaceae",
        eol: "http://eol.org/pages/4351/overview"        
    },
    {
        taxon: 'family',
        name: 'Fabaceae',
        thumb: "https://media.eol.org/content/2010/03/24/13/32972_98_68.jpg",
        alt: ['Leguminosae'],
        names: [ { language: "en", names: ['Pea family', 'Bean family', 'Legumes']} ,
        { language: "fr", names:[ 'Pea family' ]},
        { language: "de", names:[ 'Hülsenfrüchtler' ]},
        { language: "es", names:[ 'Pea family' ]},
        { language: "pt", names:[ 'Pea family' ]},
        { language: "it", names:[ 'Pea family' ]}],
        toxic: { members:['Hedysarum alpinum']},
        species: 19000,
        genera: 751,
        pollinators: [ { language: "en", names: ['Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Widely distributed, the third-largest land plant family. Genera include Mimosa and Acacia. Food staples pea, alfafa, soybean, chickpea, peanut, beans, carob and liqourice.',
                identification: '5 petals in "banner, wings, and keel" form, and/or pinnate leaves (Mimosa). Pod or legume fruit.'
            }
        ],
        members: ['Pisum sativum', 'Glycine max', 'Cicer arietinum', 'Arachis hypogaea'],
        eol: "http://eol.org/pages/4277/overview",
        wiki: "https://en.wikipedia.org/wiki/Fabaceae"
    },
    {
        taxon: 'family',
        name: 'Rosaceae',
        thumb: "https://media.eol.org/content/2014/08/25/10/53156_88_88.jpg",
        names: [ { language: "en", names: ['Rose family']} ,
        { language: "fr", names:[ 'Rosaceae' ]},
        { language: "de", names:[ 'Rosengewächse' ]},
        { language: "es", names:[ 'Rose family' ]},
        { language: "pt", names:[ 'Rose family' ]},
        { language: "it", names:[ 'Rosaceae' ]}],
        species: 4828,
        toxic: { members:['Conium maculatum'] },
        pollinators: [ { language: "en", names: ['Insects', 'Wind'] } ],
        genera: 91,
        descriptions: [
            {
                language: 'en',
                summary: 'Members include edible fruits (apples, pears, apricots, peaches) and ornamental plants (roses). Genera include Sorbus, Crataegus and Prunus. Mostly decidous. Worldwide, most diverse in northern hemisphere.',
                identification: 'Highly fragrant flowers. 5 sepals and 5 petals. Stamen often numerous. Serrated, oval-shaped leaves.'
            }
        ],
        members: ['Malus domestica', 'Pyrus communis'],
        eol: "http://eol.org/pages/8097/overview",
        wiki: "https://en.wikipedia.org/wiki/Rosaceae"
    },
    {
        taxon: 'family',
        name: 'Rutaceae',
        thumb: "https://media.eol.org/content/2012/05/23/09/05989_98_68.jpg",
        names: [ { language: "en", names: ['Citrus family', 'Rue family']} ,
        { language: "fr", names:[ 'Citronnier' ]},
        { language: "de", names:[ 'Zitrone' ]},
        { language: "es", names:[ 'Limonero' ]},
        { language: "pt", names:[ 'Limão' ]},
        { language: "it", names:[ 'Limone' ]}],
        species: 1600,
        genera: 160,
        pollinators: [ { language: "en", names: ['Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Includes woody shrubs and trees, distributed worldwide, especially in warm temperate and tropical regions. Fruits of the genus Citrus include orange, lemon and lime.',
                identification: 'Flowers that divide into 4 or 5 parts. Frequently aromatic.'
            }
        ],
        eol: "http://eol.org/pages/582200/overview",
        wiki: "https://en.wikipedia.org/wiki/Rutaceae"
    },
    {
        taxon: 'family',
        name: 'Cucurbitaceae',
        thumb: "https://media.eol.org/content/2011/08/04/10/10257_88_88.jpg",
        names: [ { language: "en", names: ['Gourd family', 'Cucurbits', 'Gourds, Melons, Squash, & Cucumbers']} ,
        { language: "fr", names:[ 'Cucurbitaceae' ]},
        { language: "de", names:[ 'Gourd family' ]},
        { language: "es", names:[ 'Gourd family' ]},
        { language: "pt", names:[ 'Gourd family' ]},
        { language: "it", names:[ 'Gourd family' ]}],
        species: 975,
        genera: 98,
        pollinators: [ { language: "en", names: ['Bees', 'Beetles'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Members grow in the tropics and temperate areas; those with edible fruits were among the earliest cultivated plants in both the Old and New Worlds.',
                identification: 'Climbing vines, tendrils, funnel-shaped flowers and large fruit often with 3 chambers.'
            }
        ],
        eol: "http://eol.org/pages/4458/overview",
        wiki: "https://en.wikipedia.org/wiki/Cucurbitaceae"
    },
    {
        taxon: 'family',
        name: 'Amaranthaceae',
        thumb: "https://media.eol.org/content/2012/06/12/15/54548_88_88.jpg",
        names: [ { language: "en", names: ['Amaranth family', 'Pigweed']} ,
        { language: "fr", names:[ 'Amaranthaceae' ]},
        { language: "de", names:[ 'Amaranth family' ]},
        { language: "es", names:[ 'Amaranth family' ]},
        { language: "pt", names:[ 'Amaranth family' ]},
        { language: "it", names:[ 'Amaranth family' ]}],
        species: 2040,
        genera: 165,
        pollinators: [ { language: "en", names: ['Insects', 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Many of the species are halophytes, tolerating salty soils, or grow in dry steppes or semi-deserts. Many species use the C4 pathway to fix carbon.',
                identification: 'Red-colored plants. Leaves may be succulent or hairy.'
            }
        ],
        members: ['Beta vulgaris', 'Spinacia oleracea'],
        eol: "http://eol.org/pages/4226/overview",
        wiki: "https://en.wikipedia.org/wiki/Amaranthaceae"
    },
    {
        taxon: 'family',
        name: 'Solanaceae',
        thumb: "https://media.eol.org/content/2012/06/12/16/57629_98_68.jpg",
        names: [ { language: "en", names: ['Nightshades']} ,
        { language: "fr", names:[ 'Solanacées' ]},
        { language: "de", names:[ 'Nachtschattengewächse' ]},
        { language: "es", names:[ 'Nightshades' ]},
        { language: "pt", names:[ 'Solanacée' ]},
        { language: "it", names:[ 'Nightshades' ]}],
        species: 2700,
        genera: 98,
        pollinators: [ { language: "en", names: ['Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Members range from annual and perennial herbs to vines, lianas, epiphytes, shrubs, and trees, and include agricultural crops (potato), medicinal plants, and spices. Many contain potent alkaloids (tobacco).',
                identification: 'Alternate leaves. 5 united petals and sepals. 2 cells in the ovary: berry (tomato) or capsule (petunia).'
            }
        ],
        members: ['Nicotiana tabacum', 'Solanum tuberosum'],
        eol: "http://eol.org/pages/4437/overview",
        wiki: "https://en.wikipedia.org/wiki/Solanaceae"
    },
    {
        taxon: 'family',
        name: 'Moraceae',
        thumb: "https://media.eol.org/content/2014/08/15/04/78512_88_88.jpg",
        names: [ { language: "en", names: ['Mulberry family', 'Fig family']} ,
        { language: "fr", names:[ 'Mulberry family' ]},
        { language: "de", names:[ 'Mulberry family' ]},
        { language: "es", names:[ 'Mulberry family' ]},
        { language: "pt", names:[ 'Mulberry family' ]},
        { language: "it", names:[ 'Mulberry family' ]}],
        species: 1100,
        genera: 38,
        pollinators: [ { language: "en", names: ['Wind', 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Members known for their fleshy fruit containing seeds. Widespread in tropical and subtropical regions.',
                identification: 'Trees and shrubs with milky sap. 2 carpels sometimes with 1 reduced, compound inconspicuous flowers, and compound fruits.'
            }
        ],
        members: ['Ficus', 'Morus alba'],
        eol: "http://eol.org/pages/4450/overview",
        wiki: "https://en.wikipedia.org/wiki/Moraceae"
    },
    {
        taxon: 'family',
        name: 'Vitaceae',
        thumb: "https://media.eol.org/content/2013/12/08/20/40721_88_88.jpg",
        names: [ { language: "en", names: ['Grape Family','Wild Grape Family']} ,
        { language: "fr", names:[ 'Grape Family' ]},
        { language: "de", names:[ 'Grape Family' ]},
        { language: "es", names:[ 'Grape Family' ]},
        { language: "pt", names:[ 'Grape Family' ]},
        { language: "it", names:[ 'Grape Family' ]}],
        species: 910,
        genera: 14,
        pollinators: [ { language: "en", names: ['Bees', 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The berries of Vitis species, commonly known as grapes, are an important fruit crop and, when fermented, produce wine.',
                identification: 'Climbing vines, tendrils and bunches of berries (grapes)'
            }
        ],
        members: ['Vitis vinifera'],
        eol: "http://eol.org/pages/4382/overview",
        wiki: "https://en.wikipedia.org/wiki/Vitaceae"
    },
    {
        taxon: 'family',
        name: 'Lauraceae',
        thumb: "https://media.eol.org/content/2012/06/13/03/98939_88_88.jpg",
        names: [ { language: "en", names: ['Laurel Family']} ,
        { language: "fr", names:[ 'Laurel Family' ]},
        { language: "de", names:[ 'Laurel Family' ]},
        { language: "es", names:[ 'Laurel Family' ]},
        { language: "pt", names:[ 'Laurel Family' ]},
        { language: "it", names:[ 'Laurel Family' ]}],
        species: 2850,
        genera: 45,
        pollinators: [ { language: "en", names: ['Bees', 'Wasps'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The family has a worldwide distribution in tropical and warm climates from low-lying to montane.',
                identification: 'Frequently aromatic trees and shrubs. The fruits are drupes, one-seeded fleshy fruit with a hard layer, the endocarp, surrounding the seed.'
            }
        ],
        members: ['Persea americana', 'Laurus nobilis'],
        eol: "http://eol.org/pages/4308/overview",
        wiki: "https://en.wikipedia.org/wiki/Lauraceae"
    },
    {
        taxon: 'family',
        name: 'Ericaceae',
        thumb: "https://media.eol.org/content/2012/06/13/13/64173_88_88.jpg",
        names: [ { language: "en", names: ['Heath Family', 'Heather Family']} ,
        { language: "fr", names:[ 'Èricacées' ]},
        { language: "de", names:[ 'Heidekrautgewächse' ]},
        { language: "es", names:[ 'Heath Family' ]},
        { language: "pt", names:[ 'Heath Family' ]},
        { language: "it", names:[ 'Heath Family' ]}],
        species: 4250,
        genera: 124,
        pollinators: [ { language: "en", names: ['Bees', 'Hummingbirds'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Common in acidic and poor soils.',
                identification: 'Red or white bell-shaped flowers (parts in 4\'s or 5\'s). Commonly evergreen leaves. Family includes cranberry, blueberry and rhododendron.'
            }
        ],
        members: ['Vaccinium oxycoccos', 'Vaccinium', 'Rhododendron', 'Arbutus unedo', 'Erica'],
        eol: "http://eol.org/pages/4267/overview",
        wiki: "https://en.wikipedia.org/wiki/Ericaceae"
    },
    {
        taxon: 'family',
        name: 'Boraginaceae',
        thumb: "http://media.eol.org/content/2014/10/05/05/78144_88_88.jpg",
        names: [ { language: "en", names: ['Borage Family', 'Borage']} ,
        { language: "fr", names:[ 'Bourraches' ]},
        { language: "de", names:[ 'Raublattgewächse' ]},
        { language: "es", names:[ 'Borage Family' ]},
        { language: "pt", names:[ 'Borage Family' ]},
        { language: "it", names:[ 'Borage Family' ]}],
        species: 2000,
        genera: 146,
        pollinators: [ { language: "en", names: ['Bees', 'Bumblebees'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Herbs, shrubs and trees. Members include the Forget-me-nots (Myosotis).',
                identification: 'Flower parts in 5\'s. Hairy leaves.'
            }
        ],
        members: ['Borago officinalis', 'Myosotis', 'Echium vulgare'],
        eol: "http://eol.org/pages/4301/overview",
        wiki: "https://en.wikipedia.org/wiki/Boraginaceae"
    },
    {
        taxon: 'family',
        name: 'Caryophyllaceae',
        thumb: "http://media.eol.org/content/2012/05/23/08/72167_88_88.jpg",
        names: [ { language: "en", names: ['Carnation Family', 'Pink Family', 'Chickweed Family']} ,
        { language: "fr", names:[ 'Caryophyllacées' ]},
        { language: "de", names:[ 'Nelkengewächse' ]},
        { language: "es", names:[ 'Carnation Family' ]},
        { language: "pt", names:[ 'Cariofiláceas' ]},
        { language: "it", names:[ 'Cariofillacee' ]}],
        species:  2625,
        genera: 81,
        pollinators: [ { language: "en", names: ['Bees', 'Butterflies'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Flowering plants mainly from the Mediterranean. Members include, pinks, carnations and campions.',
                identification: 'Rough stems. Opposite leaves. Flower parts in 5\'s with slipt ends.'
            }
        ],
        members: ['Dianthus caryophyllus'],
        eol: "http://eol.org/pages/4229/overview",
        wiki: "https://en.wikipedia.org/wiki/Caryophyllaceae"
    }
];