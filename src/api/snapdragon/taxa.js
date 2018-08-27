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
        thumb: '2017/02/18/22/29040_98_68.jpg',
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
        thumb: '2014/04/16/16/98519_88_88.jpg',
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
        thumb: "2014/08/14/23/80866_88_88.jpg",
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
        thumb: '2015/04/30/10/19667_88_88.jpg',
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
        thumb: '2015/01/27/22/09266_98_68.jpg',
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
        thumb: '2017/01/25/21/74379_88_88.jpg',
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
        thumb: "2013/02/03/12/43681_98_68.jpg",
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
        thumb: "2013/02/03/12/43681_98_68.jpg",
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
        thumb: "2015/01/26/11/41088_88_88.jpg",
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
        thumb: "2015/01/31/00/39232_88_88.jpg",
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
        thumb: "2012/05/23/07/89214_88_88.jpg",
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
        thumb: "2012/01/25/15/09074_98_68.jpg",
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
        thumb: "2017/01/30/20/37424_88_88.jpg",
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
                identification: 'Dense flower spikes of tiny radially symmetrical flowers; no petals or sepals. Succulent leaves with pungent flavour.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Piperaceae",
        eol: "http://eol.org/pages/4351/overview"        
    },
    {
        taxon: 'family',
        name: 'Fabaceae',
        thumb: "2010/03/24/13/32972_98_68.jpg",
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
        thumb: "2014/08/25/10/53156_88_88.jpg",
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
        thumb: "2012/05/23/09/05989_98_68.jpg",
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
        thumb: "2011/08/04/10/10257_88_88.jpg",
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
        thumb: "2012/06/12/15/54548_88_88.jpg",
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
        thumb: "2012/06/12/16/57629_98_68.jpg",
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
        thumb: "2014/08/15/04/78512_88_88.jpg",
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
        thumb: "2013/12/08/20/40721_88_88.jpg",
        names: [ { language: "en", names: ['Grape family','Wild grape family']} ,
        { language: "fr", names:[ 'Grape family' ]},
        { language: "de", names:[ 'Grape family' ]},
        { language: "es", names:[ 'Grape family' ]},
        { language: "pt", names:[ 'Grape family' ]},
        { language: "it", names:[ 'Grape family' ]}],
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
        thumb: "2012/06/13/03/98939_88_88.jpg",
        names: [ { language: "en", names: ['Laurel family']} ,
        { language: "fr", names:[ 'Laurel family' ]},
        { language: "de", names:[ 'Laurel family' ]},
        { language: "es", names:[ 'Laurel family' ]},
        { language: "pt", names:[ 'Laurel family' ]},
        { language: "it", names:[ 'Laurel family' ]}],
        species: 2850,
        genera: 45,
        pollinators: [ { language: "en", names: ['Bees', 'Wasps'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The family has a worldwide distribution in tropical and warm climates from low-lying to montane.',
                identification: 'Aromatic trees and shrubs. The fruits are drupes, one-seeded fleshy fruit with a hard layer, the endocarp, surrounding the seed.'
            }
        ],
        members: ['Persea americana', 'Laurus nobilis'],
        eol: "http://eol.org/pages/4308/overview",
        wiki: "https://en.wikipedia.org/wiki/Lauraceae"
    },
    {
        taxon: 'family',
        name: 'Ericaceae',
        thumb: "2012/06/13/13/64173_88_88.jpg",
        names: [ { language: "en", names: ['Heath family', 'Heather family']} ,
        { language: "fr", names:[ 'Èricacées' ]},
        { language: "de", names:[ 'Heidekrautgewächse' ]},
        { language: "es", names:[ 'Heath family' ]},
        { language: "pt", names:[ 'Heath family' ]},
        { language: "it", names:[ 'Heath family' ]}],
        species: 4250,
        genera: 124,
        pollinators: [ { language: "en", names: ['Bees', 'Hummingbirds'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Common in acidic and poor soils.',
                identification: 'Red or white bell-shaped flowers (parts in 4\'s or 5\'s). Commonly evergreen leaves. Family includes cranberry and rhododendron.'
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
        names: [ { language: "en", names: ['Borage family', 'Borage']} ,
        { language: "fr", names:[ 'Bourraches' ]},
        { language: "de", names:[ 'Raublattgewächse' ]},
        { language: "es", names:[ 'Borage family' ]},
        { language: "pt", names:[ 'Borage family' ]},
        { language: "it", names:[ 'Borage family' ]}],
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
        names: [ { language: "en", names: ['Carnation family', 'Pink family', 'Chickweed family']} ,
        { language: "fr", names:[ 'Caryophyllacées' ]},
        { language: "de", names:[ 'Nelkengewächse' ]},
        { language: "es", names:[ 'Carnation family' ]},
        { language: "pt", names:[ 'Cariofiláceas' ]},
        { language: "it", names:[ 'Cariofillacee' ]}],
        species:  2625,
        genera: 81,
        pollinators: [ { language: "en", names: ['Bees', 'Butterflies'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Flowering plants mainly from the Mediterranean. Members include, pinks, carnations and campions.',
                identification: 'Rough stems. Opposite leaves. Flower parts in 5\'s with ragged ends.'
            }
        ],
        members: ['Dianthus caryophyllus'],
        eol: "http://eol.org/pages/4229/overview",
        wiki: "https://en.wikipedia.org/wiki/Caryophyllaceae"
    },
    {
        taxon: 'family',
        name: 'Iridaceae',
        thumb: "http://media.eol.org/content/2009/07/24/04/85444_98_68.jpg",
        names: [ { language: "en", names: ['Iris family']} ,
        { language: "fr", names:[ 'Iridacées' ]},
        { language: "de", names:[ 'Schwertliliengewächse' ]},
        { language: "es", names:[ 'Iridáceas' ]},
        { language: "pt", names:[ 'Iris' ]},
        { language: "it", names:[ 'Iris family' ]}],
        species:  2244,
        genera: 66,
        pollinators: [ { language: "en", names: ['Solitary Bees', 'Butterflies', 'Moths', 'Birds', 'Flies'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Widespread family of perennial plants, with a bulb, corm or rhizome. The plants grow erect, and have leaves that are generally grass-like, with a sharp central fold.',
                identification: 'Lily-like flowers, grass-like leaves.'
            }
        ],
        members: ['Dianthus caryophyllus'],
        eol: "http://eol.org/pages/4183/overview",
        wiki: "https://en.wikipedia.org/wiki/Iridaceae"
    },
    {
        taxon: 'family',
        name: 'Iridaceae',
        thumb: "http://media.eol.org/content/2009/07/24/04/85444_98_68.jpg",
        names: [ { language: "en", names: ['Iris family']} ,
        { language: "fr", names:[ 'Iridacées' ]},
        { language: "de", names:[ 'Schwertliliengewächse' ]},
        { language: "es", names:[ 'Iridáceas' ]},
        { language: "pt", names:[ 'Iris' ]},
        { language: "it", names:[ 'Iris family' ]}],
        species:  2244,
        genera: 66,
        pollinators: [ { language: "en", names: ['Solitary Bees', 'Butterflies', 'Moths', 'Birds', 'Flies'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Widespread family of perennial plants, with a bulb, corm or rhizome. The plants grow erect, and have leaves that are generally grass-like, with a sharp central fold.',
                identification: 'Lily-like flowers, grass-like leaves.'
            }
        ],
        members: ['Dianthus caryophyllus'],
        eol: "http://eol.org/pages/4183/overview",
        wiki: "https://en.wikipedia.org/wiki/Iridaceae"
    },
    {
        taxon: 'family',
        name: 'Iridaceae',
        thumb: "http://media.eol.org/content/2009/07/24/04/85444_98_68.jpg",
        names: [ { language: "en", names: ['Iris family']} ,
        { language: "fr", names:[ 'Iridacées' ]},
        { language: "de", names:[ 'Schwertliliengewächse' ]},
        { language: "es", names:[ 'Iridáceas' ]},
        { language: "pt", names:[ 'Iris' ]},
        { language: "it", names:[ 'Iris family' ]}],
        species:  2244,
        genera: 66,
        pollinators: [ { language: "en", names: ['Solitary Bees', 'Butterflies', 'Moths', 'Birds', 'Flies'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Widespread family of perennial plants, with a bulb, corm or rhizome. The plants grow erect, and have leaves that are generally grass-like, with a sharp central fold.',
                identification: 'Lily-like flowers, grass-like leaves.'
            }
        ],
        members: ['Dianthus caryophyllus'],
        eol: "http://eol.org/pages/4183/overview",
        wiki: "https://en.wikipedia.org/wiki/Iridaceae"
    },
    {
        taxon: 'family',
        name: 'Mimosaceae',
        thumb: "2015/01/19/17/65438_88_88.jpg",
        names: [ { language: "en", names: ['Mimosoideae']} ,
        { language: "fr", names:[ 'Mimosoideae' ]},
        { language: "de", names:[ 'Mimosoideae' ]},
        { language: "es", names:[ 'Mimosoideae' ]},
        { language: "pt", names:[ 'Mimosoideae' ]},
        { language: "it", names:[ 'Mimosoideae' ]}],
        species:  2500,
        genera: 40,
        pollinators: [ { language: "en", names: ['Bees', 'Butterflies'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Found in arid areas, rarely temperate climates. 3 genera occur naturally in Australia. Most species in the genera Acacia.',
                identification: 'Radially symmetrical flowers. Valvate (twice divided) flowers.'
            }
        ],
        eol: "http://eol.org/pages/2865720/overview",
        wiki: "https://en.wikipedia.org/wiki/Mimosaceae"
    },
    {
        taxon: 'family',
        name: 'Sapindaceae',
        thumb: "2015/05/20/03/13849_88_88.jpg",
        names: [ { language: "en", names: ['Soapberry family']} ,
        { language: "fr", names:[ 'Sapindacées' ]},
        { language: "de", names:[ 'Seifenbaumgewächse' ]},
        { language: "es", names:[ 'Sapindáceas' ]},
        { language: "pt", names:[ 'Sapindáceas' ]},
        { language: "it", names:[ 'Sapindaceae' ]}],
        species:  1858,
        genera: 138,
        pollinators: [ { language: "en", names: ['Insects', 'Birds', 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Occur in temperate to tropical regions, many in laurel forests. Many are laticiferous, i.e. they contain latex and many contain mildly toxic saponins with soap-like qualities in foliage and/or the seeds, or roots.',
                identification: 'Leaves spirally alternate or opposite; pinnately or palmately (Aesculus) compound, or palmate (Acer).'
            }
        ],
        eol: "http://eol.org/pages/4415/overview",
        wiki: "https://en.wikipedia.org/wiki/Sapindaceae"
    },
    {
        taxon: 'family',
        name: 'Betulaceae',
        thumb: "2015/04/30/07/54206_88_88.jpg",
        names: [ { language: "en", names: ['Birch family']} ,
        { language: "fr", names:[ 'Bétulacée' ]},
        { language: "de", names:[ 'Birkengewächse' ]},
        { language: "es", names:[ 'Betuláceas' ]},
        { language: "pt", names:[ 'Birch family' ]},
        { language: "it", names:[ 'Betulacee' ]}],
        species:  167,
        genera: 6,
        pollinators: [ { language: "en", names: ['Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Deciduous, nut-bearing trees and shrubs, including the birches, alders, hazels and hornbeams.',
                identification: 'Flowers are typically catkins and often appear before leaves; nuts have bracts attached.'
            }
        ],
        eol: "http://eol.org/pages/5528/overview",
        wiki: "https://en.wikipedia.org/wiki/Betulaceae"
    },
    {
        taxon: 'family',
        name: 'Fagaceae',
        thumb: "2014/02/08/07/45589_88_88.jpg",
        names: [ { language: "en", names: ['Beech family']} ,
        { language: "fr", names:[ 'Fagacée' ]},
        { language: "de", names:[ 'Buchengewächse' ]},
        { language: "es", names:[ 'Fagaceae' ]},
        { language: "pt", names:[ 'Birch' ]},
        { language: "it", names:[ 'Fagacee' ]}],
        species:  927,
        genera: 8,
        pollinators: [ { language: "en", names: ['Insects', 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Species (oak, chestnut, and beech) used for floors, furniture, cabinets, and wine barrels.',
                identification: 'Trees or shrubs with single nuts in spiky or scaly husks. Unisex catkin flowers. Alternate simple leaves with pinnate venation.'
            }
        ],
        eol: "http://eol.org/pages/4197/overview",
        wiki: "https://en.wikipedia.org/wiki/Fagaceae"
    },
    {
        taxon: 'family',
        name: 'Bignoniaceae',
        thumb: "2014/09/14/00/14843_88_88.jpg",
        names: [ { language: "en", names: ['Bignonias']} ,
        { language: "fr", names:[ 'Bignonias' ]},
        { language: "de", names:[ 'Trompetenbaumgewächse' ]},
        { language: "es", names:[ 'Bignonias' ]},
        { language: "pt", names:[ 'Bignonias' ]},
        { language: "it", names:[ 'Bignonias' ]}],
        species:  860,
        genera: 85,
        pollinators: [ { language: "en", names: ['Bees', 'Birds', 'Moths'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Trees or shrubs or often woody climbers (including lianas, climbing by tendrils, by twining, or rarely, by aerial roots), rarely herbs.',
                identification: 'Leaves opposite or rarely in whorls of 3 or 4, simple or pinnately compound with terminal leaflets sometimes modified into tendrils, sometimes palmately compound; stipules absent.'
            }
        ],
        eol: "http://eol.org/pages/4421/overview",
        wiki: "https://en.wikipedia.org/wiki/Bignoniaceae"
    },
    {
        taxon: 'family',
        name: 'Caesalpiniaceae',
        thumb: "2012/06/06/13/83275_88_88.jpg",
        names: [ { language: "en", names: ['Caesalpinioideae']} ,
        { language: "fr", names:[ 'Caesalpinioideae' ]},
        { language: "de", names:[ 'Caesalpinioideae' ]},
        { language: "es", names:[ 'Caesalpinioideae' ]},
        { language: "pt", names:[ 'Caesalpinioideae' ]},
        { language: "it", names:[ 'Caesalpinioideae' ]}],
        species:  2000,
        genera: 160,
        pollinators: [ { language: "en", names: ['Bees', 'Butterflies'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Caesalpinioideae is a botanical name at the rank of subfamily, placed in the large family Fabaceae or Leguminosae. Its name is formed from the generic name Caesalpinia. It is known also as the peacock flower subfamily,',
                identification: 'Leaves are alternate, stipulate, mostly pinnately compound sometimes bipinnate or simple.'
            }
        ],
        eol: "http://eol.org/pages/2865551/overview",
        wiki: "https://en.wikipedia.org/wiki/Caesalpiniaceae"
    },
    {
        taxon: 'family',
        name: 'Asparagaceae',
        thumb: "2013/11/25/03/02174_88_88.jpg",
        names: [ { language: "en", names: ['Asparagus family']} ,
        { language: "fr", names:[ 'Asparagacées' ]},
        { language: "de", names:[ 'Spargelgewächse' ]},
        { language: "es", names:[ 'Asparagáceas' ]},
        { language: "pt", names:[ 'Asparagus family' ]},
        { language: "it", names:[ 'Asparagacee' ]}],
        species:  2900,
        genera: 114,
        pollinators: [ { language: "en", names: ['Flies', 'Bees'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Family (together with Agave, Beargrass, and Brodiaea families) formed when the Lily family was broken up.',
                identification: '3 sepals and 3 petals that similar in size and color; 6 stamens and a tripartite pistil.'
            }
        ],
        eol: "http://eol.org/pages/8194/overview",
        wiki: "https://en.wikipedia.org/wiki/Asparagaceae"
    },
    {
        taxon: 'family',
        name: 'Myrtaceae',
        thumb: "2012/10/19/00/00976_88_88.jpg",
        names: [ { language: "en", names: ['Myrtles']} ,
        { language: "fr", names:[ 'Myrtacées' ]},
        { language: "de", names:[ 'Myrtles' ]},
        { language: "es", names:[ 'Mirtáceas' ]},
        { language: "pt", names:[ 'Myrtles' ]},
        { language: "it", names:[ 'Myrtles' ]}],
        species:  5950,
        genera: 132,
        pollinators: [ { language: "en", names: ['Bees'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Family of dicotyledonous plants. Wide distribution in tropical and warm-temperate regions, genera include Eucalyptus, Corymbia and Callistemon.',
                identification: 'Evergreen, leaves opposite, simple, and with an entire margin. Woody with essential oils. 4 or 5 petals. Conspicuous, bright and numerous stamens.'
            }
        ],
        eol: "http://eol.org/pages/8095/overview",
        wiki: "https://en.wikipedia.org/wiki/Myrtaceae"
    },
    {
        taxon: 'family',
        name: 'Cunoniaceae',
        thumb: "2011/11/01/20/89856_88_88.jpg",
        names: [ { language: "en", names: ['Wild Alder family']} ,
        { language: "fr", names:[ 'Wild Alder family' ]},
        { language: "de", names:[ 'Wild Alder family' ]},
        { language: "es", names:[ 'Wild Alder family' ]},
        { language: "pt", names:[ 'Wild Alder family' ]},
        { language: "it", names:[ 'Wild Alder family' ]}],
        species:  330,
        genera: 27,
        pollinators: [ { language: "en", names: ['Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Woody plants in the order Oxalidales, mostly found in the tropical and wet temperate regions of the Southern Hemisphere.',
                identification: 'Trees and shrubs mostly evergreen. Leaves opposite or whorled, simple or compound. Usually 4/5 petals/sepals. Fruit a woody capsule with small seeds.'
            }
        ],
        eol: "http://eol.org/pages/4390/overview",
        wiki: "https://en.wikipedia.org/wiki/Cunoniaceae"
    },
    {
        taxon: 'family',
        name: 'Oleaceae',
        thumb: "2012/12/23/03/10152_88_88.jpg",
        names: [ { language: "en", names: ['Olive family']} ,
        { language: "fr", names:[ 'Olive family' ]},
        { language: "de", names:[ 'Ölbaumgewächse' ]},
        { language: "es", names:[ 'Oleáceas' ]},
        { language: "pt", names:[ 'Olive family' ]},
        { language: "it", names:[ 'Olive family' ]}],
        species:  700,
        genera: 25,
        pollinators: [ { language: "en", names: ['Wind', 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Shrubs, trees, and lianas. Subcosmopolitan distribution, (subarctic to the southernmost parts of Africa, Australia, and South America).',
                identification: 'Trees or shrubs, opposite leaves and 4 sepals, 4 or 0 petals and 2 stamens. Odiferous flowers.'
            }
        ],
        eol: "http://eol.org/pages/4426/overview",
        wiki: "https://en.wikipedia.org/wiki/Oleaceae"
    },
    {
        taxon: 'family',
        name: 'Caesalpiniaceae',
        thumb: "2012/06/06/13/83275_88_88.jpg",
        names: [ { language: "en", names: ['Caesalpinioideae']} ,
        { language: "fr", names:[ 'Caesalpinioideae' ]},
        { language: "de", names:[ 'Caesalpinioideae' ]},
        { language: "es", names:[ 'Caesalpinioideae' ]},
        { language: "pt", names:[ 'Caesalpinioideae' ]},
        { language: "it", names:[ 'Caesalpinioideae' ]}],
        species: 2500,
        genera: 148,
        pollinators: [ { language: "en", names: [''] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Mostly tropical and subtropical trees and shrubs.',
                identification: 'Leaves are stipulate, alternate, and mostly pinnately compound but may be bipinnate or simple. Fruit is usually a legume.'
            }
        ],
        eol: "http://eol.org/pages/2865551/overview",
        wiki: "https://en.wikipedia.org/wiki/Caesalpiniaceae"
    },
    {
        taxon: 'family',
        name: 'Aquifoliaceae',
        thumb: "2014/09/13/01/38591_88_88.jpg",
        names: [ { language: "en", names: ['Holly']} ,
        { language: "fr", names:[ 'Aquifoliacées' ]},
        { language: "de", names:[ 'Stechpalmengewächse' ]},
        { language: "es", names:[ 'Aquifoliáceas' ]},
        { language: "pt", names:[ 'Aquifoliáceas' ]},
        { language: "it", names:[ 'Holly' ]}],
        species: 400,
        genera: 2,
        pollinators: [ { language: "en", names: ['Bees', 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The species are evergreen or deciduous trees, shrubs, and climbers from tropics to temperate zones worldwide. Flowers produce pollen or seeds.',
                identification: 'Shiny leaves and bright, red berries in some holly species.'
            }
        ],
        eol: "http://eol.org/pages/4240/overview",
        wiki: "https://en.wikipedia.org/wiki/Aquifoliaceae"
    },
    {
        taxon: 'family',
        name: 'Juglandaceae',
        thumb: "2015/04/30/18/90529_88_88.jpg",
        names: [ { language: "en", names: ['Walnut family']} ,
        { language: "fr", names:[ 'Juglandacées' ]},
        { language: "de", names:[ 'Walnussgewächse' ]},
        { language: "es", names:[ 'Juglandáceas' ]},
        { language: "pt", names:[ 'Walnut family' ]},
        { language: "it", names:[ 'Walnut family' ]}],
        species: 50,
        genera: 10,
        pollinators: [ { language: "en", names: ['Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Family includes nut-producing walnut, pecan and hickory trees.',
                identification: 'Large, aromatic leaves that usually alternate, pinnately compound or ternate. Catkins.'
            }
        ],
        eol: "http://eol.org/pages/4240/overview",
        wiki: "https://en.wikipedia.org/wiki/Juglandaceae"
    },
    {
        taxon: 'family',
        name: 'Papilionaceae',
        thumb: "2012/07/26/21/36713_88_88.jpg",
        names: [ { language: "en", names: ['Dillwynia, Peaflowers']} ,
        { language: "fr", names:[ 'Dillwynia' ]},
        { language: "de", names:[ 'Dillwynia' ]},
        { language: "es", names:[ 'Dillwynia' ]},
        { language: "pt", names:[ 'Dillwynia' ]},
        { language: "it", names:[ 'Dillwynia' ]}],
        species: 375,
        genera: 3,
        pollinators: [ { language: "en", names: ['Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Widely distributed, adapted to a variety of environments. Species include trees, shrubs, and herbaceous plants (pea, the sweet pea, the laburnum).',
                identification: 'Pea-shaped flowers. Root nodulation is common.'
            }
        ],
        eol: "http://eol.org/pages/2874237/overview",
        wiki: "https://en.wikipedia.org/wiki/Papilionaceae"
    },
    {
        taxon: 'family',
        name: 'Hamamelidaceae',
        thumb: "2013/02/26/12/81796_88_88.jpg",
        names: [ { language: "en", names: ['Witch-hazel family']} ,
        { language: "fr", names:[ 'Witch-hazel family' ]},
        { language: "de", names:[ 'Witch-hazel family' ]},
        { language: "es", names:[ 'Witch-hazel family' ]},
        { language: "pt", names:[ 'Witch-hazel family' ]},
        { language: "it", names:[ 'Witch-hazel family' ]}],
        species: 140,
        genera: 30,
        pollinators: [ { language: "en", names: [ 'Wind', 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Shrubs and trees distributed in North America and western and eastern Asia.',
                identification: 'Simple leaves. 4/5 strap-shaped flowers. Sometimes either or both sepals and petals are lacking. Woody fruits.'
            }
        ],
        eol: "http://eol.org/pages/4293/overview",
        wiki: "https://en.wikipedia.org/wiki/Hamamelidaceae"
    },
    {
        taxon: 'family',
        name: 'Magnoliaceae',
        thumb: "2014/05/01/13/34482_88_88.jpg",
        names: [ { language: "en", names: ['Magnolia family']} ,
        { language: "fr", names:[ 'Magnolia family' ]},
        { language: "de", names:[ 'Magnolia family' ]},
        { language: "es", names:[ 'Magnolia family' ]},
        { language: "pt", names:[ 'Magnolia family' ]},
        { language: "it", names:[ 'Magnolia family' ]}],
        species: 219,
        genera: 17,
        pollinators: [ { language: "en", names: [ 'Beetles', 'Bees'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Trees and shrubs concentrated in the SE US, Mexico, Central America, the Caribbean, and in East and SE Asia. Species include the Tulip tree.',
                identification: 'Stamens and pistils in spirals on a conical receptacle. Undifferentiated sepals/petals. Fragrant flowers.'
            }
        ],
        eol: "http://eol.org/pages/4194/overview",
        wiki: "https://en.wikipedia.org/wiki/Magnoliaceae"
    },
    {
        taxon: 'family',
        name: 'Platanaceae',
        thumb: "2012/06/13/14/08088_88_88.jpg",
        names: [ { language: "en", names: ['Plane Tree family']} ,
        { language: "fr", names:[ 'Plane Tree family' ]},
        { language: "de", names:[ 'Plane Tree family' ]},
        { language: "es", names:[ 'Plane Tree family' ]},
        { language: "pt", names:[ 'Plane Tree family' ]},
        { language: "it", names:[ 'Platanacee' ]}],
        species: 8,
        genera: 1,
        pollinators: [ { language: "en", names: [ 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The family consists of one extant genus, Platanus. Tall trees, native to temperate and subtropical regions of the Northern Hemisphere. The hybrid London plane is widely planted in cities.',
                identification: 'Speckled bark that sheds in large irregular sheets, leaving smooth, pale surface. Reduced flowers in balls.'
            }
        ],
        eol: "http://eol.org/pages/4294/overview",
        wiki: "https://en.wikipedia.org/wiki/Platanaceae"
    },
    {
        taxon: 'family',
        name: 'Salicaceae',
        thumb: "2012/05/24/01/44806_88_88.jpg",
        names: [ { language: "en", names: ['Willow family']} ,
        { language: "fr", names:[ 'Willow family' ]},
        { language: "de", names:[ 'Weidengewächse' ]},
        { language: "es", names:[ 'Willow family' ]},
        { language: "pt", names:[ 'Willow family' ]},
        { language: "it", names:[ 'Willow family' ]}],
        species: 1220,
        genera: 56,
        pollinators: [ { language: "en", names: [ 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Family includes cottonwoods (Populus) and willows (Salix). Analgesic, anti-inflammatory, astringent and diuretic properties.',
                identification: 'Riparian trees and bushes. Alternate leaves. Catkins form small capsules.'
            }
        ],
        eol: "http://eol.org/pages/4400/overview",
        wiki: "https://en.wikipedia.org/wiki/Salicaceae"
    },
    {
        taxon: 'family',
        name: 'Theaceae',
        thumb: "2013/01/09/07/00837_88_88.jpg",
        names: [ { language: "en", names: ['Tea family']} ,
        { language: "fr", names:[ 'Tea family' ]},
        { language: "de", names:[ 'Teestrauchgewächse' ]},
        { language: "es", names:[ 'Tea family' ]},
        { language: "pt", names:[ 'Tea family' ]},
        { language: "it", names:[ 'Tea family' ]}],
        species: 200,
        genera: 40,
        pollinators: [ { language: "en", names: [ 'Bees' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Flowering shrubs and trees, including the camellias (Camellia sinensis, tea), native to temperate and tropical regions of both hemispheres.',
                identification: 'Theoid leaf has toothed margins crowned by a glandular, deciduous tip.'
            }
        ],
        eol: "http://eol.org/pages/4446/overview",
        wiki: "https://en.wikipedia.org/wiki/Theaceae"
    },
    {
        taxon: 'family',
        name: 'Styracaceae',
        thumb: "2015/01/14/00/21247_88_88.jpg",
        names: [ { language: "en", names: ['Storax family']} ,
        { language: "fr", names:[ 'Storax family' ]},
        { language: "de", names:[ 'Storax family' ]},
        { language: "es", names:[ 'Storax family' ]},
        { language: "pt", names:[ 'Storax family' ]},
        { language: "it", names:[ 'Storax family' ]}],
        species: 160,
        genera: 11,
        pollinators: [ { language: "en", names: [ 'Bumblees', 'Bees', 'Butterflies', 'Wasps', 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Small family of flowering trees and shrubs in the order Ericales, occurring in warm temperate and subtropical regions of the Northern Hemisphere.',
                identification: 'Spirally arranged simple leaves with no stipules. Fruit, dry capsule or fleshy drupe.'
            }
        ],
        eol: "http://eol.org/pages/4263/overview",
        wiki: "https://en.wikipedia.org/wiki/Styracaceae"
    },
    {
        taxon: 'family',
        name: 'Malvaceae',
        thumb: "2017/09/09/23/95319_88_88.jpg",
        names: [ { language: "en", names: ['Mallows or Hibiscus']} ,
        { language: "fr", names:[ 'Mauves' ]},
        { language: "de", names:[ 'Malvengewächse' ]},
        { language: "es", names:[ 'Storax family' ]},
        { language: "pt", names:[ 'Storax family' ]},
        { language: "it", names:[ 'Storax family' ]}],
        species: 4225,
        genera: 244,
        pollinators: [ { language: "en", names: [ 'Bees', 'Hummingbirds', 'Bats', 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Large family of flowering plants including of economic importance okra, cotton, cacao and durian.',
                identification: '5 petals (lobed margin) and a column of stamens. Mucilaginous stems. Hairs common.'
            }
        ],
        eol: "http://eol.org/pages/4321/overview",
        wiki: "https://en.wikipedia.org/wiki/Malvaceae"
    },
    {
        taxon: 'family',
        name: 'Altingiaceae',
        thumb: "2013/02/26/12/81796_88_88.jpg",
        names: [ { language: "en", names: ['']} ,
        { language: "fr", names:[ '' ]},
        { language: "de", names:[ '' ]},
        { language: "es", names:[ '' ]},
        { language: "pt", names:[ '' ]},
        { language: "it", names:[ '' ]}],
        species: 15,
        genera: 1,
        pollinators: [ { language: "en", names: [ 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'They naturally occur in Central America, Mexico, eastern North America, the eastern Mediterranean, China, and tropical Asia. They are often cultivated as ornamentals and many produce valuable wood.',
                identification: 'Wind-pollinated trees that produce hard, woody fruits containing numerous seeds.'
            }
        ],
        eol: "http://eol.org/pages/6367079/overview",
        wiki: "https://en.wikipedia.org/wiki/Altingiaceae"
    },
    // {
    //     taxon: 'family',
    //     name: 'Paridae',
    //     thumb: "2015/03/21/14/84751_98_68.jpg",
    //     names: [ { language: "en", names: ['Tits, chickadees']} ,
    //     { language: "fr", names:[ 'Tits, chickadees' ]},
    //     { language: "de", names:[ 'Meisen' ]},
    //     { language: "es", names:[ 'Carboneros, herrerillos' ]},
    //     { language: "pt", names:[ 'Tits, chickadees' ]},
    //     { language: "it", names:[ 'Tits, chickadees' ]}],
    //     species: '--',
    //     genera: '--',
    //     // pollinators: [ { language: "en", names: [ 'Wind'] } ],
    //     descriptions: [
    //         {
    //             language: 'en',
    //             summary: 'A large family of small passerine birds which occur mainly in the Northern Hemisphere and Africa.',
    //             identification: 'Small birds with plain or colourful plumages, stout legs and strong feet and short, triangular bills. Several species have crests.'
    //         }
    //     ],
    //     eol: "http://eol.org/pages/1629/overview",
    //     wiki: "https://en.wikipedia.org/wiki/Paridae"
    // },
    // {
    //     taxon: 'family',
    //     name: 'Sturnidae',
    //     thumb: "2015/04/30/03/95558_98_68.jpg",
    //     names: [ { language: "en", names: ['Starlings']} ,
    //     { language: "fr", names:[ 'Starlings' ]},
    //     { language: "de", names:[ 'Stare' ]},
    //     { language: "es", names:[ 'Starlings' ]},
    //     { language: "pt", names:[ 'Starlings' ]},
    //     { language: "it", names:[ 'Starlings' ]}],
    //     species: '--',
    //     genera: '--',
    //     // pollinators: [ { language: "en", names: [ 'Wind'] } ],
    //     descriptions: [
    //         {
    //             language: 'en',
    //             summary: 'Small to medium-sized passerine birds. The starling species familiar to most people in Europe and North America is the common starling, and throughout much of Asia and the Pacific, the common myna is indeed common.',
    //             identification: 'Small to medium-sized birds many with are strikingly coloured and iridescent.'
    //         }
    //     ],
    //     eol: "http://eol.org/pages/1607/overview",
    //     wiki: "https://en.wikipedia.org/wiki/Sturnidae"
    // },
    // {
    //     taxon: 'family',
    //     name: 'Apodidae',
    //     thumb: "2014/04/16/09/52451_88_88.jpg",
    //     names: [ { language: "en", names: ['Swifts']} ,
    //     { language: "fr", names:[ 'Martinets et Salanganes' ]},
    //     { language: "de", names:[ 'Segler' ]},
    //     { language: "es", names:[ 'Swifts' ]},
    //     { language: "pt", names:[ 'Swifts' ]},
    //     { language: "it", names:[ 'Apodidi' ]}],
    //     species: '--',
    //     genera: '--',
    //     // pollinators: [ { language: "en", names: [ 'Wind'] } ],
    //     descriptions: [
    //         {
    //             language: 'en',
    //             summary: 'Highly aerial birds, they are superficially similar to swallows, but are not closely related to any passerine species. Swifts are placed in the order Apodiformes with hummingbirds.',
    //             identification: 'Elongated, cigar-shaped bodies, short, forked tails, very small bills but wide mouths, long, stiff, scythe-shaped wings and tiny legs, with all four toes facing forwards.'
    //         }
    //     ],
    //     eol: "http://eol.org/pages/8023/overview",
    //     wiki: "https://en.wikipedia.org/wiki/Apodidae"
    // },
    // {
    //     taxon: 'family',
    //     name: 'Troglodytidae',
    //     thumb: "2014/04/24/12/47487_98_68.jpg",
    //     names: [ { language: "en", names: ['Wrens']} ,
    //     { language: "fr", names:[ 'Wrens' ]},
    //     { language: "de", names:[ 'Segler' ]},
    //     { language: "es", names:[ 'Wrens' ]},
    //     { language: "pt", names:[ 'Wrens' ]},
    //     { language: "it", names:[ 'Wrens' ]}],
    //     species: '88',
    //     genera: '19',
    //     // pollinators: [ { language: "en", names: [ 'Wind'] } ],
    //     descriptions: [
    //         {
    //             language: 'en',
    //             summary: 'Small and rather inconspicuous, except for their loud and often complex songs. Live in almost any environment.',
    //             identification: 'Round-bodied, short-tailed and short-winged, with pointed bills and quite strong feet.'
    //         }
    //     ],
    //     eol: "http://eol.org/pages/1602/overview",
    //     wiki: "https://en.wikipedia.org/wiki/Troglodytidae"
    // },
    // {
    //     taxon: 'family',
    //     name: 'Muscicapidae',
    //     thumb: "2012/06/12/23/53991_260_190.jpg",
    //     names: [ { language: "en", names: ['Old World flycatcher']} ,
    //     { language: "fr", names:[ 'Old World flycatcher' ]},
    //     { language: "de", names:[ 'Fliegenschnäpper' ]},
    //     { language: "es", names:[ 'Old World flycatcher' ]},
    //     { language: "pt", names:[ 'Old World flycatcher' ]},
    //     { language: "it", names:[ 'Old World flycatcher' ]}],
    //     species: '324',
    //     genera: '51',
    //     // pollinators: [ { language: "en", names: [ 'Wind'] } ],
    //     descriptions: [
    //         {
    //             language: 'en',
    //             summary: 'Weak songs and harsh calls.',
    //             identification: 'Small to medium birds, dull brown in colour. Broad, flattened bills suited to catching insects in flight; ground-foraging species have finer bills.'
    //         }
    //     ],
    //     eol: "http://eol.org/pages/1637/overview",
    //     wiki: "https://en.wikipedia.org/wiki/Muscicapidae"
    // },
    // {
    //     taxon: 'family',
    //     name: 'Passeridae',
    //     thumb: "2015/06/17/14/46120_88_88.jpg",
    //     names: [ { language: "en", names: ['Sparrows']} ,
    //     { language: "fr", names:[ 'Passéridés' ]},
    //     { language: "de", names:[ 'Sperlinge' ]},
    //     { language: "es", names:[ 'Sparrows' ]},
    //     { language: "pt", names:[ 'Sparrows' ]},
    //     { language: "it", names:[ 'Sparrows' ]}],
    //     species: '43',
    //     genera: '8',
    //     // pollinators: [ { language: "en", names: [ 'Wind'] } ],
    //     descriptions: [
    //         {
    //             language: 'en',
    //             summary: 'Many species nest on buildings and the house and Eurasian tree sparrows, in particular, inhabit cities in large numbers, so sparrows are among the most familiar of all wild birds. They are primarily seed-eaters, though they also consume small insects.',
    //             identification: 'Finch-like birds. They have stout bodies, rounded wings and broad heads, with deep, conical bills adapted for seed-eating.'
    //         }
    //     ],
    //     eol: "http://eol.org/pages/1627/overview",
    //     wiki: "https://en.wikipedia.org/wiki/Passeridae"
    // },
    // {
    //     taxon: 'family',
    //     name: 'Columbidae',
    //     thumb: "2014/12/25/21/51614_88_88.jpg",
    //     names: [ { language: "en", names: ['Pigeon']} ,
    //     { language: "fr", names:[ 'Pigeon' ]},
    //     { language: "de", names:[ 'Tauben' ]},
    //     { language: "es", names:[ 'Paloma' ]},
    //     { language: "pt", names:[ 'Pombos' ]},
    //     { language: "it", names:[ 'Pigeon' ]}],
    //     species: '310',
    //     genera: '42',
    //     // pollinators: [ { language: "en", names: [ 'Wind'] } ],
    //     descriptions: [
    //         {
    //             language: 'en',
    //             summary: 'Columbine refers to pigeons and doves. Likely the most common birds in the world. They primarily feed on seeds, fruits, and plants.',
    //             identification: 'Small, rounded heads, small, slim bills with a small fleshy patch at the base, rounded bodies with dense, soft feathers, tapered wings and short, scaly legs.'
    //         }
    //     ],
    //     eol: "http://eol.org/pages/7978/overview",
    //     wiki: "https://en.wikipedia.org/wiki/Columbidae"
    // },
];