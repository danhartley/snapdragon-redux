import * as SD from 'api/traits/trait-types';

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
        thumb: '89/27/23/549.BI-image-109191.jpg',
        species: 32913,
        genera: 1911,
        descriptions: [
            {   
                language: 'en',
                summary: 'Worldwide distribution, second only to the orchids in size. Economically important, products include cooking oils, lettuce, sunflower seeds, and artichokes. The head may track the sun which maximizes reflectivity thereby attracting more pollinators.',
                identification: 'Composite flowers with either disk or ray flowers, or both.'
            }
        ],
        traits: [ { language: "en", name: 'pollination', values: ['Insects', 'Wind', 'Asexual'] } ],
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
        thumb: '8f/30/e4/607.http___bioimages_vanderbilt_edu_thomas_0280-01-07.260x190.jpg',
        members: [  'Daucus carota subsp. sativus', 'Coriandrum sativum', 'Petroselinum crispum', 'Foeniculum vulgare', 
                    'Anethum graveolens', 'Conium maculatum', 'Cuminum cyminum', 'Carum carvi', 'Anthriscus cerefolium',
                    'Myrrhis odorata', 'Pimpinella anisum', 'Levisticum officinale', 'Pastinaca sativa'],
        traits: [ { language: "en", name: 'pollination', values: ['Carpenter Bees', 'Mason Bees', 'Leafcutter Bees'], families: ['Xylocopa', 'Megachilidae'] } ],
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
        thumb: '85/9d/51/7.CalPhotos_0000_0000_0406_1220.jpg',
        members: ['Ocimum basilicum', 'Rosmarinus officinalis'],
        traits: [ { language: "en", name: 'pollination', values: ['Insects', 'Bumblebees', 'Single Bees'] } ],
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
        thumb: '86/e3/4c/7.CalPhotos_0000_0000_1006_1064.jpg',
        species: 4060,
        genera: 372,
        traits: [ { language: "en", name: 'pollination', values: ['Insects'] } ],
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
        thumb: '77/59/25/539.HDICO_OM1593_Ammocharis_coranica_2_1328719702_JPG.jpg',
        species: 1600,
        genera: 75,
        descriptions: [
            {
                language: 'en',
                summary: 'The subfamily Allioideae contains a number of important food crops, including onion, garlic, leek, and chives. Formerly part of the Lily family. Contains the subfamily Agapanthus.',
                identification: '3 tepals. Lily-like flowers, onion-like bulbs. Flowerheads wrapped in bract.'
            }
        ],
        traits: [ { language: "en", name: 'pollination', values: ['Carpenter Bees' ,' Owlet Moths'] } ],
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
        thumb: '7e/64/05/542.13517914453.580x360.jpg',
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
        thumb: "7f/70/1f/542.32969830352.jpg",
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
        thumb: "81/22/92/542.7894625598.jpg",
        species: 5700,
        members: ["Apis mellifera"],
        traits: [ { language: "en", name: 'pollination', values: ['Flowering plants'] } ],
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
        thumb: "80/28/3f/542.5076516308.jpg",
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
        thumb: "7e/e2/c7/542.22623853841.jpg",
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
        thumb: '85/d8/6f/7.CalPhotos_0000_0000_0508_0518.jpg',
        alt: ['Poaceae', 'Gramineae'],
        names: [ { language: "en", names: ['Grasses', 'True Grasses'] } ,
        { language: "fr", names:[ 'Graminées' ]},
        { language: "de", names:[ 'Süßgräser' ]},
        { language: "es", names:[ 'Grasses' ]},
        { language: "pt", names:[ 'Grasses' ]},
        { language: "it", names:[ 'Grasses' ]}],
        traits: [ { language: "en", name: 'pollination', values: ['Wind', 'Insects'] } ],
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
        thumb: '88/6e/da/7.CalPhotos_8266_3203_3156_0064.jpg',
        names: [ { language: "en", names: ['Ginger family']} ,
        { language: "fr", names:[ 'Ginger family' ]},
        { language: "de", names:[ 'Ginger family' ]},
        { language: "es", names:[ 'Ginger family' ]},
        { language: "pt", names:[ 'Ginger family' ]},
        { language: "it", names:[ 'Ginger family' ]}],
        species: 1600,
        genera: 50,
        traits: [ { language: "en", name: 'pollination', values: ['Insects'] } ],
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
        thumb: '81/9d/83/542.9768479402.jpg',
        names: [ { language: "en", names: ['Pepper family']} ,
        { language: "fr", names:[ 'Pepper family' ]},
        { language: "de", names:[ 'Pepper family' ]},
        { language: "es", names:[ 'Pepper family' ]},
        { language: "pt", names:[ 'Pepper family' ]},
        { language: "it", names:[ 'Pepper family' ]}],
        species: 3600,
        genera: 13,
        traits: [ { language: "en", name: 'pollination', values: ['Wind','Insects'] } ],
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
        thumb: "87/ed/19/7.CalPhotos_1338_3161_0663_0023.jpg",
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
        traits: [ { language: "en", name: 'pollination', values: ['Insects'] } ],
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
        thumb: "84/dd/ed/7.CalPhotos_0000_0000_0109_1082.jpg",
        names: [ { language: "en", names: ['Rose family']} ,
        { language: "fr", names:[ 'Rosaceae' ]},
        { language: "de", names:[ 'Rosengewächse' ]},
        { language: "es", names:[ 'Rose family' ]},
        { language: "pt", names:[ 'Rose family' ]},
        { language: "it", names:[ 'Rosaceae' ]}],
        species: 4828,
        toxic: { members:['Conium maculatum'] },
        traits: [ { language: "en", name: 'pollination', values: ['Insects', 'Wind'] } ],
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
        thumb: "7e/55/3f/542.12003170514.jpg",
        names: [ { language: "en", names: ['Citrus family', 'Rue family']} ,
        { language: "fr", names:[ 'Citronnier' ]},
        { language: "de", names:[ 'Zitrone' ]},
        { language: "es", names:[ 'Limonero' ]},
        { language: "pt", names:[ 'Limão' ]},
        { language: "it", names:[ 'Limone' ]}],
        species: 1600,
        genera: 160,
        traits: [ { language: "en", name: 'pollination', values: ['Insects'] } ],
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
        thumb: "79/0e/d7/539.MHPAC_BioBot02404-BB012678_1351011574_JPG.jpg",
        names: [ { language: "en", names: ['Gourd family', 'Cucurbits', 'Gourds, Melons, Squash, & Cucumbers']} ,
        { language: "fr", names:[ 'Cucurbitaceae' ]},
        { language: "de", names:[ 'Gourd family' ]},
        { language: "es", names:[ 'Gourd family' ]},
        { language: "pt", names:[ 'Gourd family' ]},
        { language: "it", names:[ 'Gourd family' ]}],
        species: 975,
        genera: 98,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Beetles'] } ],
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
        thumb: "79/22/0d/539.MHPAC_BioBot10730-BB044660_1258047670_JPG.jpg",
        names: [ { language: "en", names: ['Amaranth family', 'Pigweed']} ,
        { language: "fr", names:[ 'Amaranthaceae' ]},
        { language: "de", names:[ 'Amaranth family' ]},
        { language: "es", names:[ 'Amaranth family' ]},
        { language: "pt", names:[ 'Amaranth family' ]},
        { language: "it", names:[ 'Amaranth family' ]}],
        species: 2040,
        genera: 165,
        traits: [ { language: "en", name: 'pollination', values: ['Insects', 'Wind'] } ],
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
        thumb: "85/5b/a1/7.CalPhotos_0000_0000_0307_0316.jpg",
        names: [ { language: "en", names: ['Nightshades']} ,
        { language: "fr", names:[ 'Solanacées' ]},
        { language: "de", names:[ 'Nachtschattengewächse' ]},
        { language: "es", names:[ 'Nightshades' ]},
        { language: "pt", names:[ 'Solanacée' ]},
        { language: "it", names:[ 'Nightshades' ]}],
        species: 2700,
        genera: 98,
        traits: [ { language: "en", name: 'pollination', values: ['Insects'] } ],
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
        thumb: "79/09/05/539.MHPAC_BioBot01550-BB008258_1271028422_JPG.jpg",
        names: [ { language: "en", names: ['Mulberry family', 'Fig family']} ,
        { language: "fr", names:[ 'Mulberry family' ]},
        { language: "de", names:[ 'Mulberry family' ]},
        { language: "es", names:[ 'Mulberry family' ]},
        { language: "pt", names:[ 'Mulberry family' ]},
        { language: "it", names:[ 'Mulberry family' ]}],
        species: 1100,
        genera: 38,
        traits: [ { language: "en", name: 'pollination', values: ['Wind', 'Insects'] } ],
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
        thumb: "7e/ca/b0/542.18637596315.jpg",
        names: [ { language: "en", names: ['Grape family','Wild grape family']} ,
        { language: "fr", names:[ 'Grape family' ]},
        { language: "de", names:[ 'Grape family' ]},
        { language: "es", names:[ 'Grape family' ]},
        { language: "pt", names:[ 'Grape family' ]},
        { language: "it", names:[ 'Grape family' ]}],
        species: 910,
        genera: 14,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Insects'] } ],
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
        thumb: "7e/60/5b/542.132702206.jpg",
        names: [ { language: "en", names: ['Laurel family']} ,
        { language: "fr", names:[ 'Laurel family' ]},
        { language: "de", names:[ 'Laurel family' ]},
        { language: "es", names:[ 'Laurel family' ]},
        { language: "pt", names:[ 'Laurel family' ]},
        { language: "it", names:[ 'Laurel family' ]}],
        species: 2850,
        genera: 45,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Wasps'] } ],
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
        thumb: "85/2d/13/7.CalPhotos_0000_0000_0212_0104.260x190.jpg",
        names: [ { language: "en", names: ['Heath family', 'Heather family']} ,
        { language: "fr", names:[ 'Èricacées' ]},
        { language: "de", names:[ 'Heidekrautgewächse' ]},
        { language: "es", names:[ 'Heath family' ]},
        { language: "pt", names:[ 'Heath family' ]},
        { language: "it", names:[ 'Heath family' ]}],
        species: 4250,
        genera: 124,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Hummingbirds'] } ],
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
        thumb: "85/98/03/7.CalPhotos_0000_0000_0404_0269.260x190.jpg",
        names: [ { language: "en", names: ['Borage family', 'Borage']} ,
        { language: "fr", names:[ 'Bourraches' ]},
        { language: "de", names:[ 'Raublattgewächse' ]},
        { language: "es", names:[ 'Borage family' ]},
        { language: "pt", names:[ 'Borage family' ]},
        { language: "it", names:[ 'Borage family' ]}],
        species: 2000,
        genera: 146,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Bumblebees'] } ],
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
        thumb: "55/da/e3/509.12793277.260x190.jpg",
        names: [ { language: "en", names: ['Carnation family', 'Pink family', 'Chickweed family']} ,
        { language: "fr", names:[ 'Caryophyllacées' ]},
        { language: "de", names:[ 'Nelkengewächse' ]},
        { language: "es", names:[ 'Carnation family' ]},
        { language: "pt", names:[ 'Cariofiláceas' ]},
        { language: "it", names:[ 'Cariofillacee' ]}],
        species:  2625,
        genera: 81,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Butterflies'] } ],
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
        thumb: "66/56/12/509.61873118.jpg",
        names: [ { language: "en", names: ['Iris family']} ,
        { language: "fr", names:[ 'Iridacées' ]},
        { language: "de", names:[ 'Schwertliliengewächse' ]},
        { language: "es", names:[ 'Iridáceas' ]},
        { language: "pt", names:[ 'Iris' ]},
        { language: "it", names:[ 'Iris family' ]}],
        species:  2244,
        genera: 66,
        traits: [ { language: "en", name: 'pollination', values: ['Solitary Bees', 'Butterflies', 'Moths', 'Birds', 'Flies'] } ],
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
        thumb: "7f/4a/ed/542.3103584927.260x190.jpg",
        names: [ { language: "en", names: ['Mimosoideae']} ,
        { language: "fr", names:[ 'Mimosoideae' ]},
        { language: "de", names:[ 'Mimosoideae' ]},
        { language: "es", names:[ 'Mimosoideae' ]},
        { language: "pt", names:[ 'Mimosoideae' ]},
        { language: "it", names:[ 'Mimosoideae' ]}],
        species:  2500,
        genera: 40,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Butterflies'] } ],
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
        thumb: "80/ee/bb/542.7139571177.260x190.jpg",
        names: [ { language: "en", names: ['Soapberry family']} ,
        { language: "fr", names:[ 'Sapindacées' ]},
        { language: "de", names:[ 'Seifenbaumgewächse' ]},
        { language: "es", names:[ 'Sapindáceas' ]},
        { language: "pt", names:[ 'Sapindáceas' ]},
        { language: "it", names:[ 'Sapindaceae' ]}],
        species:  1858,
        genera: 138,
        traits: [ { language: "en", name: 'pollination', values: ['Insects', 'Birds', 'Wind'] } ],
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
        thumb: "7e/9c/56/542.15435393043.260x190.jpg",
        names: [ { language: "en", names: ['Birch family']} ,
        { language: "fr", names:[ 'Bétulacée' ]},
        { language: "de", names:[ 'Birkengewächse' ]},
        { language: "es", names:[ 'Betuláceas' ]},
        { language: "pt", names:[ 'Birch family' ]},
        { language: "it", names:[ 'Betulacee' ]}],
        species:  167,
        genera: 6,
        traits: [ { language: "en", name: 'pollination', values: ['Wind'] } ],
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
        thumb: "57/a0/ac/509.21742238.260x190.jpg",
        names: [ { language: "en", names: ['Beech family']} ,
        { language: "fr", names:[ 'Fagacée' ]},
        { language: "de", names:[ 'Buchengewächse' ]},
        { language: "es", names:[ 'Fagaceae' ]},
        { language: "pt", names:[ 'Birch' ]},
        { language: "it", names:[ 'Fagacee' ]}],
        species:  927,
        genera: 8,
        traits: [ { language: "en", name: 'pollination', values: ['Insects', 'Wind'] } ],
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
        thumb: "7e/87/42/542.14678051928.jpg",
        names: [ { language: "en", names: ['Bignonias']} ,
        { language: "fr", names:[ 'Bignonias' ]},
        { language: "de", names:[ 'Trompetenbaumgewächse' ]},
        { language: "es", names:[ 'Bignonias' ]},
        { language: "pt", names:[ 'Bignonias' ]},
        { language: "it", names:[ 'Bignonias' ]}],
        species:  860,
        genera: 85,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Birds', 'Moths'] } ],
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
        thumb: "5b/b8/4a/509.1739527.jpg",
        names: [ { language: "en", names: ['Caesalpinioideae']} ,
        { language: "fr", names:[ 'Caesalpinioideae' ]},
        { language: "de", names:[ 'Caesalpinioideae' ]},
        { language: "es", names:[ 'Caesalpinioideae' ]},
        { language: "pt", names:[ 'Caesalpinioideae' ]},
        { language: "it", names:[ 'Caesalpinioideae' ]}],
        species:  2000,
        genera: 160,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Butterflies'] } ],
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
        thumb: "86/41/2e/7.CalPhotos_0000_0000_0617_1953.260x190.jpg",
        names: [ { language: "en", names: ['Asparagus family']} ,
        { language: "fr", names:[ 'Asparagacées' ]},
        { language: "de", names:[ 'Spargelgewächse' ]},
        { language: "es", names:[ 'Asparagáceas' ]},
        { language: "pt", names:[ 'Asparagus family' ]},
        { language: "it", names:[ 'Asparagacee' ]}],
        species:  2900,
        genera: 114,
        traits: [ { language: "en", name: 'pollination', values: ['Flies', 'Bees'] } ],
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
        thumb: "87/e4/ed/7.CalPhotos_1335_3153_0220_0075.jpg",
        names: [ { language: "en", names: ['Myrtles']} ,
        { language: "fr", names:[ 'Myrtacées' ]},
        { language: "de", names:[ 'Myrtles' ]},
        { language: "es", names:[ 'Mirtáceas' ]},
        { language: "pt", names:[ 'Myrtles' ]},
        { language: "it", names:[ 'Myrtles' ]}],
        species:  5950,
        genera: 132,
        traits: [ { language: "en", name: 'pollination', values: ['Bees'] } ],
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
        thumb: "55/a4/bb/509.12048086.260x190.jpg",
        names: [ { language: "en", names: ['Wild Alder family']} ,
        { language: "fr", names:[ 'Wild Alder family' ]},
        { language: "de", names:[ 'Wild Alder family' ]},
        { language: "es", names:[ 'Wild Alder family' ]},
        { language: "pt", names:[ 'Wild Alder family' ]},
        { language: "it", names:[ 'Wild Alder family' ]}],
        species:  330,
        genera: 27,
        traits: [ { language: "en", name: 'pollination', values: ['Wind'] } ],
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
        thumb: "7a/63/02/539.SAFH_OM3183_Olea_capensis_1286045400_JPG.jpg",
        names: [ { language: "en", names: ['Olive family']} ,
        { language: "fr", names:[ 'Olive family' ]},
        { language: "de", names:[ 'Ölbaumgewächse' ]},
        { language: "es", names:[ 'Oleáceas' ]},
        { language: "pt", names:[ 'Olive family' ]},
        { language: "it", names:[ 'Olive family' ]}],
        species:  700,
        genera: 25,
        traits: [ { language: "en", name: 'pollination', values: ['Wind', 'Insects'] } ],
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
        thumb: "5b/b8/4a/509.1739527.jpg",
        names: [ { language: "en", names: ['Caesalpinioideae']} ,
        { language: "fr", names:[ 'Caesalpinioideae' ]},
        { language: "de", names:[ 'Caesalpinioideae' ]},
        { language: "es", names:[ 'Caesalpinioideae' ]},
        { language: "pt", names:[ 'Caesalpinioideae' ]},
        { language: "it", names:[ 'Caesalpinioideae' ]}],
        species: 2500,
        genera: 148,
        traits: [ { language: "en", name: 'pollination', values: [''] } ],
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
        thumb: "7e/42/c3/542.10935784183.jpg",
        names: [ { language: "en", names: ['Holly']} ,
        { language: "fr", names:[ 'Aquifoliacées' ]},
        { language: "de", names:[ 'Stechpalmengewächse' ]},
        { language: "es", names:[ 'Aquifoliáceas' ]},
        { language: "pt", names:[ 'Aquifoliáceas' ]},
        { language: "it", names:[ 'Holly' ]}],
        species: 400,
        genera: 2,
        traits: [ { language: "en", name: 'pollination', values: ['Bees', 'Insects'] } ],
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
        thumb: "7e/4c/3f/542.114734451.260x190.jpg",
        names: [ { language: "en", names: ['Walnut family']} ,
        { language: "fr", names:[ 'Juglandacées' ]},
        { language: "de", names:[ 'Walnussgewächse' ]},
        { language: "es", names:[ 'Juglandáceas' ]},
        { language: "pt", names:[ 'Walnut family' ]},
        { language: "it", names:[ 'Walnut family' ]}],
        species: 50,
        genera: 10,
        traits: [ { language: "en", name: 'pollination', values: ['Wind'] } ],
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
        thumb: "5b/b8/4a/509.1739527.jpg",
        names: [ { language: "en", names: ['Dillwynia, Peaflowers']} ,
        { language: "fr", names:[ 'Dillwynia' ]},
        { language: "de", names:[ 'Dillwynia' ]},
        { language: "es", names:[ 'Dillwynia' ]},
        { language: "pt", names:[ 'Dillwynia' ]},
        { language: "it", names:[ 'Dillwynia' ]}],
        species: 375,
        genera: 3,
        traits: [ { language: "en", name: 'pollination', values: ['Insects'] } ],
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
        thumb: "8f/87/92/643.13144909.260x190.jpg",
        names: [ { language: "en", names: ['Witch-hazel family']} ,
        { language: "fr", names:[ 'Witch-hazel family' ]},
        { language: "de", names:[ 'Witch-hazel family' ]},
        { language: "es", names:[ 'Witch-hazel family' ]},
        { language: "pt", names:[ 'Witch-hazel family' ]},
        { language: "it", names:[ 'Witch-hazel family' ]}],
        species: 140,
        genera: 30,
        traits: [ { language: "en", name: 'pollination', values: [ 'Wind', 'Insects'] } ],
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
        thumb: "5b/b8/4a/509.1739527.jpg",
        names: [ { language: "en", names: ['Magnolia family']} ,
        { language: "fr", names:[ 'Magnolia family' ]},
        { language: "de", names:[ 'Magnolia family' ]},
        { language: "es", names:[ 'Magnolia family' ]},
        { language: "pt", names:[ 'Magnolia family' ]},
        { language: "it", names:[ 'Magnolia family' ]}],
        species: 219,
        genera: 17,
        traits: [ { language: "en", name: 'pollination', values: [ 'Beetles', 'Bees'] } ],
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
        thumb: "7e/a8/1f/542.15875631919.260x190.jpg",
        names: [ { language: "en", names: ['Plane Tree family']} ,
        { language: "fr", names:[ 'Plane Tree family' ]},
        { language: "de", names:[ 'Plane Tree family' ]},
        { language: "es", names:[ 'Plane Tree family' ]},
        { language: "pt", names:[ 'Plane Tree family' ]},
        { language: "it", names:[ 'Platanacee' ]}],
        species: 8,
        genera: 1,
        traits: [ { language: "en", name: 'pollination', values: [ 'Wind'] } ],
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
        thumb: "7e/5b/9f/542.12758652025.260x190.jpg",
        names: [ { language: "en", names: ['Willow family']} ,
        { language: "fr", names:[ 'Willow family' ]},
        { language: "de", names:[ 'Weidengewächse' ]},
        { language: "es", names:[ 'Willow family' ]},
        { language: "pt", names:[ 'Willow family' ]},
        { language: "it", names:[ 'Willow family' ]}],
        species: 1220,
        genera: 56,
        traits: [ { language: "en", name: 'pollination', values: [ 'Wind'] } ],
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
        thumb: "7f/e6/91/542.4287509448.260x190.jpg",
        names: [ { language: "en", names: ['Tea family']} ,
        { language: "fr", names:[ 'Tea family' ]},
        { language: "de", names:[ 'Teestrauchgewächse' ]},
        { language: "es", names:[ 'Tea family' ]},
        { language: "pt", names:[ 'Tea family' ]},
        { language: "it", names:[ 'Tea family' ]}],
        species: 200,
        genera: 40,
        traits: [ { language: "en", name: 'pollination', values: [ 'Bees' ] } ],
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
        thumb: "55/2d/63/509.10046026.260x190.jpg",
        names: [ { language: "en", names: ['Storax family']} ,
        { language: "fr", names:[ 'Storax family' ]},
        { language: "de", names:[ 'Storax family' ]},
        { language: "es", names:[ 'Storax family' ]},
        { language: "pt", names:[ 'Storax family' ]},
        { language: "it", names:[ 'Storax family' ]}],
        species: 160,
        genera: 11,
        traits: [ { language: "en", name: 'pollination', values: [ 'Bumblees', 'Bees', 'Butterflies', 'Wasps', 'Wind'] } ],
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
        thumb: "8f/78/59/634.29863770.260x190.jpg",
        names: [ { language: "en", names: ['Mallows or Hibiscus']} ,
        { language: "fr", names:[ 'Mauves' ]},
        { language: "de", names:[ 'Malvengewächse' ]},
        { language: "es", names:[ 'Storax family' ]},
        { language: "pt", names:[ 'Storax family' ]},
        { language: "it", names:[ 'Storax family' ]}],
        species: 4225,
        genera: 244,
        traits: [ { language: "en", name: 'pollination', values: [ 'Bees', 'Hummingbirds', 'Bats', 'Insects'] } ],
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
        thumb: "85/c5/a7/7.CalPhotos_0000_0000_0417_0239.260x190.jpg",
        names: [ { language: "en", names: ['Altingiaceae']} ,
        { language: "fr", names:[ 'Altingiaceae' ]},
        { language: "de", names:[ 'Altingiaceae' ]},
        { language: "es", names:[ 'Altingiaceae' ]},
        { language: "pt", names:[ 'Altingiaceae' ]},
        { language: "it", names:[ 'Altingiaceae' ]}],
        species: 15,
        genera: 1,
        traits: [ { language: "en", name: 'pollination', values: [ 'Wind'] } ],
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
    {
        taxon: 'family',
        name: 'Paridae',
        thumb: "7f/d3/4a/542.4055191461.260x190.jpg",
        names: [ { language: "en", names: ['Tits, chickadees']} ,
        { language: "fr", names:[ 'Tits, chickadees' ]},
        { language: "de", names:[ 'Meisen' ]},
        { language: "es", names:[ 'Carboneros, herrerillos' ]},
        { language: "pt", names:[ 'Tits, chickadees' ]},
        { language: "it", names:[ 'Tits, chickadees' ]}],
        species: '--',
        genera: '--',
        traits: [ { language: "en", name: 'diet', values: [ 'Insects', 'Nuts and seeds' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'A large family of small passerine birds which occur mainly in the Northern Hemisphere and Africa.',
                identification: 'Small birds with plain or colourful plumages, stout legs and strong feet and short, triangular bills. Several species have crests.'
            }
        ],
        eol: "http://eol.org/pages/1629/overview",
        wiki: "https://en.wikipedia.org/wiki/Paridae"
    },
    {
        taxon: 'family',
        name: 'Sturnidae',
        thumb: "80/14/88/542.4819779815.260x190.jpg",
        names: [ { language: "en", names: ['Starlings']} ,
        { language: "fr", names:[ 'Starlings' ]},
        { language: "de", names:[ 'Stare' ]},
        { language: "es", names:[ 'Starlings' ]},
        { language: "pt", names:[ 'Starlings' ]},
        { language: "it", names:[ 'Starlings' ]}],
        species: '--',
        genera: '--',
        traits: [ { language: "en", name: 'diet', values: [ 'Insects', 'Fruit' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Small-medium sized passerine birds. The starling is most common Europe and N America, the myna in Asia and Pacific.',
                identification: 'Small-medium sized birds many strikingly coloured and iridescent.'
            }
        ],
        eol: "http://eol.org/pages/1607/overview",
        wiki: "https://en.wikipedia.org/wiki/Sturnidae"
    },
    {
        taxon: 'family',
        name: 'Apodidae',
        thumb: "67/df/94/509.8056860.260x190.jpg",
        names: [ { language: "en", names: ['Swifts']} ,
        { language: "fr", names:[ 'Martinets et Salanganes' ]},
        { language: "de", names:[ 'Segler' ]},
        { language: "es", names:[ 'Swifts' ]},
        { language: "pt", names:[ 'Swifts' ]},
        { language: "it", names:[ 'Apodidi' ]}],
        species: '--',
        genera: '--',
        traits: [ { language: "en", name: 'diet', values: [ 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Superficially similar to swallows, but are not closely related to any passerine species, placed in the Apodiformes with hummingbirds.',
                identification: 'Cigar-shaped bodies, short, forked tails, short bills, wide mouths, long, stiff, scythe-shaped wings, tiny legs.'
            }
        ],
        eol: "http://eol.org/pages/8023/overview",
        wiki: "https://en.wikipedia.org/wiki/Apodidae"
    },
    {
        taxon: 'family',
        name: 'Troglodytidae',
        thumb: "57/3e/c2/509.19872637.260x190.jpg",
        names: [ { language: "en", names: ['Wrens']} ,
        { language: "fr", names:[ 'Wrens' ]},
        { language: "de", names:[ 'Segler' ]},
        { language: "es", names:[ 'Wrens' ]},
        { language: "pt", names:[ 'Wrens' ]},
        { language: "it", names:[ 'Wrens' ]}],
        species: '88',
        genera: '19',
        traits: [ { language: "en", name: 'diet', values: [ 'Insects', 'Small frogs and lizards'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Small and rather inconspicuous, except for their loud and often complex songs. Live in almost any environment.',
                identification: 'Round-bodied, short-tailed and short-winged, with pointed bills and quite strong feet.'
            }
        ],
        eol: "http://eol.org/pages/1602/overview",
        wiki: "https://en.wikipedia.org/wiki/Troglodytidae"
    },
    {
        taxon: 'family',
        name: 'Muscicapidae',
        thumb: "56/3e/2e/509.15227061.260x190.jpg",
        names: [ { language: "en", names: ['Old World flycatchers']} ,
        { language: "fr", names:[ 'Old World flycatchers' ]},
        { language: "de", names:[ 'Fliegenschnäpper' ]},
        { language: "es", names:[ 'Old World flycatchers' ]},
        { language: "pt", names:[ 'Old World flycatchers' ]},
        { language: "it", names:[ 'Old World flycatchers' ]}],
        species: '324',
        genera: '51',
        traits: [ { language: "en", name: 'diet', values: [ 'Insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Weak songs and harsh calls.',
                identification: 'Small-medium birds, dull brown in colour. Broad, flattened bills suited to catching insects; ground-foragers have finer bills.'
            }
        ],
        eol: "http://eol.org/pages/1637/overview",
        wiki: "https://en.wikipedia.org/wiki/Muscicapidae"
    },
    {
        taxon: 'family',
        name: 'Passeridae',
        thumb: "7e/8f/28/542.14939260212.260x190.jpg",
        names: [ { language: "en", names: ['Sparrows']} ,
        { language: "fr", names:[ 'Passéridés' ]},
        { language: "de", names:[ 'Sperlinge' ]},
        { language: "es", names:[ 'Sparrows' ]},
        { language: "pt", names:[ 'Sparrows' ]},
        { language: "it", names:[ 'Sparrows' ]}],
        species: '43',
        genera: '8',
        traits: [ { language: "en", name: 'diet', values: [ 'Seeds', 'Small insects'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Common in cities in large numbers often nesting on buildings. Primarily seed-eaters, they also consume small insects.',
                identification: 'Finch-like birds. They have stout bodies, rounded wings and broad heads, with deep, conical bills adapted for seed-eating.'
            }
        ],
        eol: "http://eol.org/pages/1627/overview",
        wiki: "https://en.wikipedia.org/wiki/Passeridae"
    },
    {
        taxon: 'family',
        name: 'Columbidae',
        thumb: "58/cc/09/509.27062433.260x190.jpg",
        names: [ { language: "en", names: ['Pigeon']} ,
        { language: "fr", names:[ 'Pigeon' ]},
        { language: "de", names:[ 'Tauben' ]},
        { language: "es", names:[ 'Paloma' ]},
        { language: "pt", names:[ 'Pombos' ]},
        { language: "it", names:[ 'Pigeon' ]}],
        species: '310',
        genera: '42',
        traits: [ { language: "en", name: 'diet', values: [ 'Seeds', 'Fruit' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The family of pigeons and doves. Likely the most common birds in the world. They primarily feed on seeds, fruits, and plants.',
                identification: 'Small, rounded heads and bodies, small, slim bills, dense, soft feathers, tapered wings and short, scaly legs.'
            }
        ],
        eol: "http://eol.org/pages/7978/overview",
        wiki: "https://en.wikipedia.org/wiki/Columbidae"
    },
    {
        taxon: 'family',
        name: 'Convolvulaceae',
        thumb: "85/ab/c0/7.CalPhotos_0000_0000_0412_0288.260x190.jpg",
        names: [ { language: "en", names: ['Morning-glory Family']} ,
        { language: "fr", names:[ 'Convolvulacées' ]},
        { language: "de", names:[ 'Windengewächse' ]},
        { language: "es", names:[ 'Morning-glory Family' ]},
        { language: "pt", names:[ 'Morning-glory Family' ]},
        { language: "it", names:[ 'Morning-glory Family' ]}],
        species: '1650',
        genera: '60',
        traits: [ { language: "en", name: 'pollination', values: [ 'Bees', 'Self', 'Bats'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Twining and erect herbs, some woody vines, trees, and shrubs. Widespread in both tropical and temperate areas. Members often ornamental but also the sweet potato (Ipomoea batatas).',
                identification: 'Open funnel-shaped flowers and winding stems.'
            }
        ],
        eol: "http://eol.org/pages/4431/overview",
        wiki: "https://en.wikipedia.org/wiki/Convolvulaceae"
    },
    {
        taxon: 'family',
        name: 'Equisetaceae',
        thumb: "7e/49/46/542.11310017733.260x190.jpg",
        names: [ { language: "en", names: ['Horsetails']} ,
        { language: "fr", names:[ 'Prèle' ]},
        { language: "de", names:[ 'Schachtelhalmgewächse' ]},
        { language: "es", names:[ 'Horsetails' ]},
        { language: "pt", names:[ 'Cavalinha' ]},
        { language: "it", names:[ 'Horsetails' ]}],
        species: '20',
        genera: '1',
        traits: [ { language: "en", name: 'pollination', values: [ 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The only surviving family of the Equisetales, a group with many fossils of large tree-like plants that possessed ribbed stems similar to modern horsetails.',
                identification: '1 stalk bearing cone-like spore-producing structures, 1 sterile (the horse tail).'
            }
        ],
        eol: "http://eol.org/pages/4080/overview",
        wiki: "https://en.wikipedia.org/wiki/Equisetaceae"
    },
    {
        taxon: 'family',
        name: 'Euphorbiaceae',
        thumb: "85/bd/97/7.CalPhotos_0000_0000_0415_1738.260x190.jpg",
        names: [ { language: "en", names: ['Spurge family']} ,
        { language: "fr", names:[ 'Euphorbiacées' ]},
        { language: "de", names:[ 'Wolfsmilchgewächse' ]},
        { language: "es", names:[ 'Spurge family' ]},
        { language: "pt", names:[ 'Euforbiácea' ]},
        { language: "it", names:[ 'Euforbiacee' ]}],
        species: '7500',
        genera: '300',
        traits: [ { language: "en", name: 'pollination', values: [ 'Bees', 'Insects', 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'A large, diverse, and widespread family. Euphorbia subtribe show highly specialized form of pseudanthium called a cyathium.',
                identification: 'Colourful bracts. Radially symmetrical flowers.'
            }
        ],
        eol: "http://eol.org/pages/4198/overview",
        wiki: "https://en.wikipedia.org/wiki/Euphorbiaceae"
    },
    {
        taxon: 'family',
        name: 'Ranunculaceae',
        thumb: "55/33/18/509.10157728.260x190.jpg",
        names: [ { language: "en", names: ['Buttercup family', 'Crowfoot family']} ,
        { language: "fr", names:[ 'Renonculacées' ]},
        { language: "de", names:[ 'Hahnenfußgewächse' ]},
        { language: "es", names:[ 'Ranunculáceas' ]},
        { language: "pt", names:[ 'Buttercup family' ]},
        { language: "it", names:[ 'Buttercup family' ]}],
        species: '2000',
        genera: '43',
        traits: [ { language: "en", name: 'pollination', values: [ 'Insects', 'Wind'] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Mostly herbaceous annuals or perennials, but some woody climbers (Clematis). Mostly bisexual flowers often aggregated in cymes, panicles, or spikes.',
                identification: 'Dicots with 3 or more simple, hooked pistils.'
            }
        ],
        eol: "http://eol.org/pages/4377/overview",
        wiki: "https://en.wikipedia.org/wiki/Ranunculaceae"
    },
    {
        taxon: 'family',
        name: 'Polygonaceae',
        thumb: "7e/c5/09/542.17384452171.260x190.jpg",
        names: [ { language: "en", names: ['Knotweed family', 'Smartweed family']} ,
        { language: "fr", names:[ 'Polygonacées' ]},
        { language: "de", names:[ 'Knöterichgewächse' ]},
        { language: "es", names:[ 'Centinodias' ]},
        { language: "pt", names:[ 'Knotweed family' ]},
        { language: "it", names:[ 'Knotweed family' ]}],
        species: '1200',
        genera: '48',
        traits: [ { language: "en", name: 'pollination', values: [ 'Insects' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Flowering plants. Its name refers to the many swollen nodes the stems of some species have (poly - many and goni - knee or joint.',
                identification: 'Small flowers, , no corolla, 3-6 colourful sepals.'
            }
        ],
        eol: "http://eol.org/pages/4364/overview",
        wiki: "https://en.wikipedia.org/wiki/Polygonaceae"
    },
    {
        taxon: 'family',
        name: 'Urticaceae',
        thumb: "7f/7d/df/542.3387596748.260x190.jpg",
        names: [ { language: "en", names: ['Nettle family']} ,
        { language: "fr", names:[ 'Nettle family' ]},
        { language: "de", names:[ 'Brennnesselgewächse' ]},
        { language: "es", names:[ 'Nettle family' ]},
        { language: "pt", names:[ 'Nettle family' ]},
        { language: "it", names:[ 'Nettle family' ]}],
        species: '2625',
        genera: '53',
        traits: [ { language: "en", name: 'pollination', values: [ 'Wind' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Shrubs, lianas, herbs, or, rarely, trees. Disperse pollen when stamens are mature and filaments straighten explosively.',
                identification: 'Hairy plants, no petals, flowers in string-like clusters from leaf axil.'
            }
        ],
        eol: "http://eol.org/pages/4452/overview",
        wiki: "https://en.wikipedia.org/wiki/Urticaceae"
    },
    {
        taxon: 'family',
        name: 'Plantaginaceae',
        thumb: "8b/04/57/562.233907.260x190.jpg",
        names: [ { language: "en", names: ['Plantain family']} ,
        { language: "fr", names:[ 'Plantaginacées' ]},
        { language: "de", names:[ 'Wegerichgewächse' ]},
        { language: "es", names:[ 'Plantagináceas' ]},
        { language: "pt", names:[ 'Plantain family' ]},
        { language: "it", names:[ 'Plantaginacee' ]}],
        species: '1900',
        genera: '94',
        traits: [ { language: "en", name: 'pollination', values: [ 'Wind', 'Wasps', 'Bumbless', 'Inescts' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Diverse, cosmopolitan family of herbs, shrubs and some aquatic plants and members formerly in Figwort and Snapdragon families.',
                identification: 'Most flowers polysymmetric, corolla 2-lipped.'
            }
        ],
        eol: "http://eol.org/pages/4354/overview",
        wiki: "https://en.wikipedia.org/wiki/Plantaginaceae"
    },
    {
        taxon: 'family',
        name: 'Fringillidae',
        thumb: "57/91/5a/509.21298991.260x190.jpg",
        names: [ { language: "en", names: ['Finches']} ,
        { language: "fr", names:[ 'Finches' ]},
        { language: "de", names:[ 'Finken' ]},
        { language: "es", names:[ 'Finches' ]},
        { language: "pt", names:[ 'Finches' ]},
        { language: "it", names:[ 'Finches' ]}],
        species: '228',
        genera: '50',
        traits: [ { language: "en", name: 'diet', values: [ 'Seeds' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Small-medium sized passerine birds. Great range of habitats where they are usually resident and do not migrate.',
                identification: 'Forked or notched tails, pointed wings, rounded or elongated bodies and round heads, triangular bill.'
            }
        ],
        eol: "http://eol.org/pages/7548/overview",
        wiki: "https://en.wikipedia.org/wiki/Fringillidae"
    },
    {
        taxon: 'family',
        name: 'Aegithalidae',
        thumb: "56/d9/fc/509.1801295.260x190.jpg",
        names: [ { language: "en", names: ['Bushtits', 'Long-tailed tits']} ,
        { language: "fr", names:[ 'Bushtits' ]},
        { language: "de", names:[ 'Schwanzmeisen' ]},
        { language: "es", names:[ 'Bushtits' ]},
        { language: "pt", names:[ 'Bushtits' ]},
        { language: "it", names:[ 'Bushtits' ]}],
        species: '13',
        genera: '4',
        traits: [ { language: "en", name: 'diet', values: [ 'Insects', 'Berries', 'Seeds' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Generally not migratory, the long-tailed tit is an exception. During non-breeding season, birds live in flocks of up to 50 individuals.',
                identification: 'Small, passerine birds with moderately long tails and muted colours.'
            }
        ],
        eol: "http://eol.org/pages/7573/overview",
        wiki: "https://en.wikipedia.org/wiki/Aegithalidae"
    },
    {
        taxon: 'family',
        name: 'Amanitaceae',
        thumb: "80/a0/36/542.6459624581.260x190.jpg",
        names: [ { language: "en", names: ['Amanita Family']} ,
        { language: "fr", names:[ 'Amanita Family' ]},
        { language: "de", names:[ 'Amanita Family' ]},
        { language: "es", names:[ 'Amanita Family' ]},
        { language: "pt", names:[ 'Amanita Family' ]},
        { language: "it", names:[ 'Amanitacee' ]}],
        species: '1000',
        genera: '2',
        traits: [ { language: "en", name: 'habitat', values: [ 'Woodlands' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Found in woodlands. Many emerge from egg-like structure formed by the universal veil. Mostly deadly are white with white spore prints.',
                identification: 'White free gills, white spore print. Stalks have ring below cap and broaden to volva. Puffball shape in early stages but with gills in cross section.'
            }
        ],
        eol: "http://eol.org/pages/2861424/overview",
        wiki: "https://en.wikipedia.org/wiki/Amanitaceae"
    },
    {
        taxon: 'family',
        name: 'Mycenaceae',
        thumb: "81/a0/41/542.9911897114.260x190.jpg",
        names: [ { language: "en", names: ['Bonnet mushrooms']} ,
        { language: "fr", names:[ 'Bonnet mushrooms' ]},
        { language: "de", names:[ 'Bonnet mushrooms' ]},
        { language: "es", names:[ 'Bonnet mushrooms' ]},
        { language: "pt", names:[ 'Bonnet mushrooms' ]},
        { language: "it", names:[ 'Bonnet mushrooms' ]}],
        species: '705',
        genera: '10',
        traits: [ { language: "en", name: 'habitat', values: [ 'Diverse' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Cosmopolitan distribution. Members are saprobic.',
                identification: 'Require detailed microscopic examination.'
            }
        ],
        eol: "http://eol.org/pages/6890860/overview",
        wiki: "https://en.wikipedia.org/wiki/Mycenaceae"
    },
    {
        taxon: 'family',
        name: 'Tricholomataceae',
        thumb: "81/9f/96/542.9870330465.260x190.jpg",
        names: [ { language: "en", names: ['Pale-Spore Mushroom Family']} ,
        { language: "fr", names:[ 'Pale-Spore Mushroom Family' ]},
        { language: "de", names:[ 'Ritterlingsverwandte' ]},
        { language: "es", names:[ 'Pale-Spore Mushroom Family' ]},
        { language: "pt", names:[ 'Pale-Spore Mushroom Family' ]},
        { language: "it", names:[ 'Pale-Spore Mushroom Family' ]}],
        species: '1020',
        genera: '78',
        traits: [ { language: "en", name: 'habitat', values: [ 'Meadows', 'Lawns' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Most species are saprophytic. The family is a mixed bag of heterogeneous genera and species.',
                identification: 'Pale yellow, pink or white spores.'
            }
        ],
        eol: "http://eol.org/pages/5965/overview",
        wiki: "https://en.wikipedia.org/wiki/Tricholomataceae"
    },
    {
        taxon: 'family',
        name: 'Boletaceae',
        thumb: "56/f1/7f/509.18415691.260x190.jpg",
        names: [ { language: "en", names: ['Boletes']} ,
        { language: "fr", names:[ 'Boletaceae' ]},
        { language: "de", names:[ 'Dickröhrlingsverwandte' ]},
        { language: "es", names:[ 'Boletaceae' ]},
        { language: "pt", names:[ 'Boletaceae' ]},
        { language: "it", names:[ 'Boletacee' ]}],
        species: '415',
        genera: '26',
        traits: [ { language: "en", name: 'habitat', values: [ 'Moist conditions' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Widespread. A relatively safe group with many members prized for their flavour.',
                identification: 'Small pores (tubes) on the underside of the mushroom, instead of gills. Thick stems and caps.'
            }
        ],
        eol: "http://eol.org/pages/5960/overview",
        wiki: "https://en.wikipedia.org/wiki/Boletaceae"
    },
    {
        taxon: 'family',
        name: 'Hydnangiaceae',
        thumb: "80/8d/3c/542.6215601000.260x190.jpg",
        names: [ { language: "en", names: ['Hydnangiaceae']} ,
        { language: "fr", names:[ 'Hydnangiaceae' ]},
        { language: "de", names:[ 'Hydnangiaceae' ]},
        { language: "es", names:[ 'Hydnangiaceae' ]},
        { language: "pt", names:[ 'Hydnangiaceae' ]},
        { language: "it", names:[ 'Hydnangiaceae' ]}],
        species: '30',
        genera: '4',
        traits: [ { language: "en", name: 'habitat', values: [ 'Coniferous and deciduous forests' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Widespread in temperate and tropical regions.',
                identification: 'May have fruit bodies with stipes and caps, or gasteroid (with internal spore production, like puffballs).'
            }
        ],
        eol: "http://eol.org/pages/5982/overview",
        wiki: "https://en.wikipedia.org/wiki/Hydnangiaceae"
    },
    {
        taxon: 'family',
        name: 'Sclerodermataceae',
        thumb: "55/e2/e7/509.1294352.260x190.jpg",
        names: [ { language: "en", names: ['Earth-balls']} ,
        { language: "fr", names:[ 'Earth-balls' ]},
        { language: "de", names:[ 'Earth-balls' ]},
        { language: "es", names:[ 'Earth-balls' ]},
        { language: "pt", names:[ 'Earth-balls' ]},
        { language: "it", names:[ 'Earth-balls' ]}],
        species: '109',
        genera: '6',
        traits: [ { language: "en", name: 'habitat', values: [ 'Rotten wood' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Species known as the ‘hard-skinned puffballs’, ‘earthballs’, or ’earthstars’, widespread in temperate and tropical regions.',
                identification: 'Epigenous, rarely hypogeous. Hard skins more or less spherical in shape without a stem or with an irregular root-like stem.'
            }
        ],
        eol: "http://eol.org/pages/5944/overview",
        wiki: "https://en.wikipedia.org/wiki/Sclerodermataceae"
    },
    {
        taxon: 'family',
        name: 'Auriculariaceae',
        thumb: "58/27/6f/509.24302782.260x190.jpg",
        names: [ { language: "en", names: ['Jelly fungi']} ,
        { language: "fr", names:[ 'Jelly fungi' ]},
        { language: "de", names:[ 'Jelly fungi' ]},
        { language: "es", names:[ 'Jelly fungi' ]},
        { language: "pt", names:[ 'Jelly fungi' ]},
        { language: "it", names:[ 'Jelly fungi' ]}],
        species: '100',
        genera: '7',
        traits: [ { language: "en", name: 'habitat', values: [ 'Dead wood' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Cosmopolitan. Species saprotrophic, most growing on dead wood.',
                identification: 'Conspicuous and may be ear-shaped, button-shaped, lobed, or effused.'
            }
        ],
        eol: "http://eol.org/pages/5963/overview",
        wiki: "https://en.wikipedia.org/wiki/Auriculariaceae"
    },
    {
        taxon: 'family',
        name: 'Agaricaceae',
        thumb: "8b/10/86/562.80446.260x190.jpg",
        names: [ { language: "en", names: ['Agaricus', 'True Mushrooms']} ,
        { language: "fr", names:[ 'Agaricus' ]},
        { language: "de", names:[ 'Agaricus' ]},
        { language: "es", names:[ 'Agaricus' ]},
        { language: "pt", names:[ 'Agaricus' ]},
        { language: "it", names:[ 'Agaricus' ]}],
        species: '1340',
        genera: '85',
        traits: [ { language: "en", name: 'habitat', values: [ 'Woodland', 'Grassland' ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Wide variety of fruit body morphology. Species include the ‘true puffballs‘.',
                identification: 'In pileate form dominant with thin gills free from attachment to the stipe. Caps are scurfy to smooth, flat to umbonate. ‘True puffballs‘ are round and tough.'
            }
        ],
        eol: "http://eol.org/pages/5966/overview",
        wiki: "https://en.wikipedia.org/wiki/Agaricaceae"
    },
    {
        taxon: 'family',
        name: 'Cantharellaceae',
        thumb: "89/a4/65/549.BI-image-22860.260x190.jpg",
        names: [ { language: "en", names: ['Chanterelle Family']} ,
        { language: "fr", names:[ 'Chanterelle Family' ]},
        { language: "de", names:[ 'Leistlingsartige' ]},
        { language: "es", names:[ 'Chanterelle Family' ]},
        { language: "pt", names:[ 'Chanterelle Family' ]},
        { language: "it", names:[ 'Chanterelle Family' ]}],
        species: '90',
        genera: '5',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND_LITTER ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Cosmopolitan. Form mutually beneficial relationship with the roots of trees and other plants (ectomycorrhizal).',
                identification: 'Fruit are mushroom or trumpet-like, with spore-bearing surfaces that are smooth, wrinkled, veined, or gill-like, typically decurrent (running down the upper stem).'
            }
        ],
        eol: "http://eol.org/pages/5940/overview",
        wiki: "https://en.wikipedia.org/wiki/Cantharellaceae"
    },
    {
        taxon: 'family',
        name: 'Discinaceae',
        thumb: "85/e3/42/7.CalPhotos_0000_0000_0511_0014.260x190.jpg",
        names: [ { language: "en", names: ['Discinaceae']} ,
        { language: "fr", names:[ 'Discinaceae' ]},
        { language: "de", names:[ 'Discinaceae' ]},
        { language: "es", names:[ 'Discinaceae' ]},
        { language: "pt", names:[ 'Discinaceae' ]},
        { language: "it", names:[ 'Discinaceae' ]}],
        species: '58',
        genera: '5',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND_LITTER ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Family of ascomycete fungi (sac fungi), the best known members of which are the false morels of the genus Gyromitra.',
                identification: 'Species in genus Gyromitra have irregular caps yellow to brown and well-developed stems that are not hollow.'
            }
        ],
        eol: "http://eol.org/pages/6080/overview",
        wiki: "https://en.wikipedia.org/wiki/Discinaceae"
    },
    {
        taxon: 'family',
        name: 'Fomitopsidaceae',
        thumb: "56/29/b9/509.14887652.260x190.jpg",
        names: [ { language: "en", names: ['Bracket Polypores']} ,
        { language: "fr", names:[ 'Bracket Polypores' ]},
        { language: "de", names:[ 'Bracket Polypores' ]},
        { language: "es", names:[ 'Bracket Polypores' ]},
        { language: "pt", names:[ 'Bracket Polypores' ]},
        { language: "it", names:[ 'Bracket Polypores' ]}],
        species: '--',
        genera: '14',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Most species are parasitic on woody plants, and cause brown rots (wood-dcay fungus).',
                identification: ''
            }
        ],
        eol: "http://eol.org/pages/5913/overview",
        wiki: "https://en.wikipedia.org/wiki/Fomitopsidaceae"
    },
    {
        taxon: 'family',
        name: 'Hericiaceae',
        thumb: "55/7d/5d/509.11283568.260x190.jpg",
        names: [ { language: "en", names: ['Tooth Fungi']} ,
        { language: "fr", names:[ 'Tooth Fungi' ]},
        { language: "de", names:[ 'Tooth Fungi' ]},
        { language: "es", names:[ 'Tooth Fungi' ]},
        { language: "pt", names:[ 'Tooth Fungi' ]},
        { language: "it", names:[ 'Tooth Fungi' ]}],
        species: '--',
        genera: '5',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Taxa are mainly known from north temperate regions, and are saprobic on rotting wood.',
                identification: 'Species of this family commonly have fruitbodies with pegs, spines, or teeth hanging from the hymenium.'
            }
        ],
        eol: "http://eol.org/pages/5913/overview",
        wiki: "https://en.wikipedia.org/wiki/Hericiaceae"
    },
    {
        taxon: 'family',
        name: 'Marasmiaceae',
        thumb: "7f/ea/b5/542.4343067674.260x190.jpg",
        names: [ { language: "en", names: ['Marasmiaceae']} ,
        { language: "fr", names:[ 'Marasmiaceae' ]},
        { language: "de", names:[ 'Marasmiaceae' ]},
        { language: "es", names:[ 'Marasmiaceae' ]},
        { language: "pt", names:[ 'Marasmiaceae' ]},
        { language: "it", names:[ 'Marasmiaceae' ]}],
        species: '1590',
        genera: '54',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The widely consumed edible fungus Lentinula edodes, the shiitake mushroom, is a member of this family.',
                identification: 'Tough stems with capacity to shrivel up in dry period and rehydrate later.'
            }
        ],
        eol: "http://eol.org/pages/5979/overview",
        wiki: "https://en.wikipedia.org/wiki/Marasmiaceae"
    },
    {
        taxon: 'family',
        name: 'Meripilaceae',
        thumb: "80/19/c1/542.4889052380.jpg",
        names: [ { language: "en", names: ['Meripilaceae']} ,
        { language: "fr", names:[ 'Meripilaceae' ]},
        { language: "de", names:[ 'Meripilaceae' ]},
        { language: "es", names:[ 'Meripilaceae' ]},
        { language: "pt", names:[ 'Meripilaceae' ]},
        { language: "it", names:[ 'Meripilaceae' ]}],
        species: '57',
        genera: '7',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Family of fungi in the order Polyporales.',
                identification: ''
            }
        ],
        eol: "http://eol.org/pages/5907/overview",
        wiki: "https://en.wikipedia.org/wiki/Meripilaceae"
    },
    {
        taxon: 'family',
        name: 'Morchellaceae',
        thumb: "55/cd/f0/509.1266580.260x190.jpg",
        names: [ { language: "en", names: ['Morchellaceae']} ,
        { language: "fr", names:[ 'Morchellaceae' ]},
        { language: "de", names:[ 'Morchellaceae' ]},
        { language: "es", names:[ 'Morchellaceae' ]},
        { language: "pt", names:[ 'Morchellaceae' ]},
        { language: "it", names:[ 'Morchellaceae' ]}],
        species: '49+',
        genera: '9',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD, SD.habitat.WASTELAND, SD.habitat.WOODLAND, SD.habitat.FIELDS ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Include true morels of the genus Morchella, the thimble morels of the genus Verpa, and a genus of cup-shaped fungi Disciotis.',
                identification: 'Morchella species have ascocarp with sponge-like pileus, hollow stipe and pileus.'
            }
        ],
        eol: "http://eol.org/pages/5907/overview",
        wiki: "https://en.wikipedia.org/wiki/Morchellaceae"
    },
    {
        taxon: 'family',
        name: 'Omphalotaceae',
        thumb: "55/43/a7/509.10437840.260x190.jpg",
        names: [ { language: "en", names: ['Marasmiaceae']} ,
        { language: "fr", names:[ 'Omphalotaceae' ]},
        { language: "de", names:[ 'Omphalotaceae' ]},
        { language: "es", names:[ 'Omphalotaceae' ]},
        { language: "pt", names:[ 'Omphalotaceae' ]},
        { language: "it", names:[ 'Omphalotaceae' ]}],
        species: '1590',
        genera: '54',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'The widely consumed edible fungus Lentinula edodes, the shiitake mushroom, is a member of this family.',
                identification: 'Tough stems with capacity to shrivel up in dry period and rehydrate later.'
            }
        ],
        eol: "http://eol.org/pages/5974/overview",
        wiki: "https://en.wikipedia.org/wiki/Omphalotaceae"
    },
    {
        taxon: 'family',
        name: 'Pleurotaceae',
        thumb: "56/5a/e0/509.15687325.260x190.jpg",
        names: [ { language: "en", names: ['Pleurotaceae']} ,
        { language: "fr", names:[ 'Pleurotaceae' ]},
        { language: "de", names:[ 'Pleurotaceae' ]},
        { language: "es", names:[ 'Pleurotaceae' ]},
        { language: "pt", names:[ 'Pleurotaceae' ]},
        { language: "it", names:[ 'Pleurotaceae' ]}],
        species: '94',
        genera: '4',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD, SD.habitat.WOOD ] } ],
        descriptions: [
            {
                language: 'en',
                summary: 'Members of this family can be mistaken for members of Marasmiaceae. Includes oyster mushroom (Pleurotus ostreatus).',
                identification: 'Small to medium-sized with white spores.'
            }
        ],
        eol: "http://eol.org/pages/5972/overview",
        wiki: "https://en.wikipedia.org/wiki/Pleurotaceae"
    },
    {
        taxon: 'family',
        name: 'Russulaceae',
        thumb: "80/9a/6c/542.6358019607.260x190.jpg",
        names: [ { language: "en", names: ['Russulaceae']} ,
        { language: "fr", names:[ 'Russulaceae' ]},
        { language: "de", names:[ 'Täublingsartige' ]},
        { language: "es", names:[ 'Russulaceae' ]},
        { language: "pt", names:[ 'Russulaceae' ]},
        { language: "it", names:[ 'Russulaceae' ]}],
        species: '1900',
        genera: '7',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD, SD.habitat.WOOD, SD.habitat.WOODLAND_LITTER]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Worldwide distribution. Includes the brittlegills and milk-caps. Important group of root-symbiotic ectomycorrhizal fungi in forests and shrublands.',
                identification: 'Gilled mushrooms characterised by brittle flesh of their fruitbodies.'
            }
        ],
        eol: "http://eol.org/pages/5889/overview",
        wiki: "https://en.wikipedia.org/wiki/Russulaceae"
    },
    {
        taxon: 'family',
        name: 'Fistulinaceae',
        thumb: "80/a0/61/542.6459646533.260x190.jpg",
        names: [ { language: "en", names: ['Fistulinaceae']} ,
        { language: "fr", names:[ 'Fistulinaceae' ]},
        { language: "de", names:[ 'Fistulinaceae' ]},
        { language: "es", names:[ 'Fistulinaceae' ]},
        { language: "pt", names:[ 'Fistulinaceae' ]},
        { language: "it", names:[ 'Fistulinaceae' ]}],
        species: '--',
        genera: '3',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.WOOD ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Basidiocarps (fruits) are formed annually, are pileate with lateral stipe.',
                identification: 'Fleshy and moist. They grow on wood.'
            }
        ],
        eol: "http://eol.org/pages/5985/overview",
        wiki: "https://en.wikipedia.org/wiki/Fistulinaceae"
    },
    {
        taxon: 'family',
        name: 'Hygrophoropsidaceae',
        thumb: "55/b2/a0/509.1229113.260x190.jpg",
        names: [ { language: "en", names: ['Hygrophoropsidaceae']} ,
        { language: "fr", names:[ 'Hygrophoropsidaceae' ]},
        { language: "de", names:[ 'Hygrophoropsidaceae' ]},
        { language: "es", names:[ 'Hygrophoropsidaceae' ]},
        { language: "pt", names:[ 'Hygrophoropsidaceae' ]},
        { language: "it", names:[ 'Hygrophoropsidaceae' ]}],
        species: '18',
        genera: '2',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.WOOD ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Includes the "false chanterelle", Hygrophoropsis aurantiaca. Cause brown rot in their hosts.',
                identification: 'Fleshy and moist. They grow on wood.'
            }
        ],
        eol: "http://eol.org/pages/5953/overview",
        wiki: "https://en.wikipedia.org/wiki/Hygrophoropsidaceae"
    },
    {
        taxon: 'family',
        name: 'Psathyrellaceae',
        thumb: "5a/b2/ff/509.1227570.260x190.jpg",
        names: [ { language: "en", names: ['Hygrophoropsidaceae']} ,
        { language: "fr", names:[ 'Hygrophoropsidaceae' ]},
        { language: "de", names:[ 'Hygrophoropsidaceae' ]},
        { language: "es", names:[ 'Hygrophoropsidaceae' ]},
        { language: "pt", names:[ 'Hygrophoropsidaceae' ]},
        { language: "it", names:[ 'Hygrophoropsidaceae' ]}],
        species: '500+',
        genera: '14',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD, SD.habitat.SOIL ]}],
        descriptions: [
            {
                language: 'en',
                summary: '~50% species produce fruiting bodies that dissolve into ink-like ooze when the spores are mature via autodigestion.',
                identification: 'Dark-spored agarics that generally have soft, fragile fruiting bodies; characterized by black, dark brown, rarely reddish spore prints.'
            }
        ],
        eol: "http://eol.org/pages/5970/overview",
        wiki: "https://en.wikipedia.org/wiki/Psathyrellaceae"
    },
    {
        taxon: 'family',
        name: 'Polyporaceae',
        thumb: "55/a7/29/509.12097289.260x190.jpg",
        names: [ { language: "en", names: ['Bracket Polypores']} ,
        { language: "fr", names:[ 'Bracket Polypores' ]},
        { language: "de", names:[ 'Bracket Polypores' ]},
        { language: "es", names:[ 'Bracket Polypores' ]},
        { language: "pt", names:[ 'Bracket Polypores' ]},
        { language: "it", names:[ 'Bracket Polypores' ]}],
        species: '1621',
        genera: '114',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD, SD.habitat.WOODLAND ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Widely distributed.',
                identification: 'Usually grown on living or dead trees. Can reach 40cm in diameter. Many are brackets, others have definite stipe. Most have vertical pores, some gills.'
            }
        ],
        eol: "http://eol.org/pages/5903/overview",
        wiki: "https://en.wikipedia.org/wiki/Polyporaceae"
    },
    {
        taxon: 'family',
        name: 'Hydnaceae',
        thumb: "55/78/24/509.11210836.260x190.jpg",
        names: [ { language: "en", names: ['Hydnaceae']} ,
        { language: "fr", names:[ 'Hydnaceae' ]},
        { language: "de", names:[ 'Hydnaceae' ]},
        { language: "es", names:[ 'Hydnaceae' ]},
        { language: "pt", names:[ 'Hydnaceae' ]},
        { language: "it", names:[ 'Hydnaceae' ]}],
        species: '190',
        genera: '9',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND_LITTER ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Widely distributed. Family members are ectomycorrhizal, forming a mutually beneficial relationship with the roots of trees and other plants.',
                identification: 'Hymenium consists of slender, downward-hanging tapering extensions referred to as "spines" or "teeth".'
            }
        ],
        eol: "http://eol.org/pages/5938/overview",
        wiki: "https://en.wikipedia.org/wiki/Hydnaceae"
    },
    {
        taxon: 'family',
        name: 'Sarcoscyphaceae',
        thumb: "80/b7/94/542.6651981919.260x190.jpg",
        names: [ { language: "en", names: ['Cup Fungi']} ,
        { language: "fr", names:[ 'Cup Fungi' ]},
        { language: "de", names:[ 'Cup Fungi' ]},
        { language: "es", names:[ 'Cup Fungi' ]},
        { language: "pt", names:[ 'Cup Fungi' ]},
        { language: "it", names:[ 'Cup Fungi' ]}],
        species: '102',
        genera: '13',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.DEAD_WOOD, SD.habitat.MOSS, SD.habitat.DAMP ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Cosmopolitan in distribution (tropical and temperate regions).',
                identification: 'Found damp stream valleys, north-facing slopes, mosses. Fruiting later winter/early spring on dead wood.'
            }
        ],
        eol: "http://eol.org/pages/6073/overview",
        wiki: "https://en.wikipedia.org/wiki/Sarcoscyphaceae"
    },
    {
        taxon: 'family',
        name: 'Sparassidaceae',
        thumb: "55/ce/37/509.1266931.260x190.jpg",
        names: [ { language: "en", names: ['Sparassidaceae']} ,
        { language: "fr", names:[ 'Sparassidaceae' ]},
        { language: "de", names:[ 'Sparassidaceae' ]},
        { language: "es", names:[ 'Sparassidaceae' ]},
        { language: "pt", names:[ 'Sparassidaceae' ]},
        { language: "it", names:[ 'Sparassidaceae' ]}],
        species: '10',
        genera: '2',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Sparassis genus is cultivated and sold in Korea, Japan, US and Australia.',
                identification: 'Fruit bodies are branched, fan-shaped segments that originate from a central core.'
            }
        ],
        eol: "http://eol.org/pages/5901/overview",
        wiki: "https://en.wikipedia.org/wiki/Sparassidaceae"
    },
    {
        taxon: 'family',
        name: 'Entolomataceae',
        thumb: "80/9a/70/542.6358020935.260x190.jpg",
        names: [ { language: "en", names: ['Entolomataceae']} ,
        { language: "fr", names:[ 'Entolomataceae' ]},
        { language: "de", names:[ 'Entolomataceae' ]},
        { language: "es", names:[ 'Entolomataceae' ]},
        { language: "pt", names:[ 'Entolomataceae' ]},
        { language: "it", names:[ 'Entolomataceae' ]}],
        species: '1500',
        genera: '9/10',
        traits: [ { language: "en", name: 'habitat', values: [ SD.habitat.WIDESPREAD ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Large family of pink-spored terrestrial gilled mushrooms. Widespread, many habitats.',
                identification: 'Distinctive spore print: pink (or brownish/greyish pink), ornamented with bumps or ridges, or polygonal cross-section.'
            }
        ],
        eol: "http://eol.org/pages/5986/overview",
        wiki: "https://en.wikipedia.org/wiki/Entolomataceae"
    },
    {
        taxon: 'family',
        name: 'Oxalidaceae',
        thumb: "57/ab/e5/509.22004646.260x190.jpg",
        names: [ { language: "en", names: ['Wood Sorrel Family']} ,
        { language: "fr", names:[ 'Oxalidacées' ]},
        { language: "de", names:[ 'Sauerkleegewächse' ]},
        { language: "es", names:[ 'oxalidáceas' ]},
        { language: "pt", names:[ 'Oxalidaceae' ]},
        { language: "it", names:[ 'Oxalidaceae' ]}],
        species: '570',
        genera: '5',
        traits: [ { language: "en", name: SD.name.USAGE, values: [ SD.usage.FOOD ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Small family of five genera of herbaceous plants, shrubs and small trees, most in the genus Oxalis (wood sorrels).',
                identification: `Typically have divided 'shamrock' leaves, leaflets that spread open in light and close in darkness and flower parts in 5's.`
            }
        ],
        eol: "http://eol.org/pages/4286/overview",
        wiki: "https://en.wikipedia.org/wiki/Oxalidaceae"
    },
    {
        taxon: 'family',
        name: 'Papilionidae',
        thumb: "55/6d/72/509.11059686.260x190.jpg",
        names: [ { language: "en", names: ['Swallowtail butterfly']} ,
        { language: "fr", names:[ 'Papilionidae' ]},
        { language: "de", names:[ 'Ritterfalter' ]},
        { language: "es", names:[ 'papiliónidos' ]},
        { language: "pt", names:[ 'Cauda-de-andorinha' ]},
        { language: "it", names:[ 'Papilionidae' ]}],
        species: '~600',
        genera: '31',
        descriptions: [
            {
                language: 'en',
                summary: 'Large, colorful butterflies family includes the largest, the birdwing butterflies.',
                identification: `Forked hindwings. Caterpillar bears a repugnatorial organ called the osmeterium on its prothorax.`
            }
        ],
        eol: "http://eol.org/pages/884/overview",
        wiki: "https://en.wikipedia.org/wiki/Papilionidae"
    },
    {
        taxon: 'family',
        name: 'Anatidae',
        thumb: "55/6d/72/509.11059686.260x190.jpg",
        names: [ { language: "en", names: ['Ducks, geese and swans']} ,
        { language: "fr", names:[ 'Anatidés' ]},
        { language: "de", names:[ 'Entenvögel' ]},
        { language: "es", names:[ 'Anatidae' ]},
        { language: "pt", names:[ 'Anatidae' ]},
        { language: "it", names:[ 'Anatidae' ]}],
        species: '146',
        genera: '43',
        descriptions: [
            {
                language: 'en',
                summary: 'Water birds adapted for swimming, floating and diving. Herbivorous, monogamous some migrate annually.',
                identification: `Small-large birds with broad, elongated bodies and webbed feet. Short wings, rapid beats.`
            }
        ],
        eol: "http://eol.org/pages/8027/overview",
        wiki: "https://en.wikipedia.org/wiki/Anatidae"
    },

    // genus data from: https://www.ukfungusday.co.uk/files/7814/9796/1077/Genus_information_sheets1.FINAL.pdf

    {
        taxon: 'genus',
        name: 'Coprinus',
        names: [ { language: "en", names: ['Inkcaps']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.SOIL, SD.habitat.WOOD, SD.habitat.VEGETATION, SD.habitat.ROOTS, SD.habitat.DUNG ] },
            { language: "en", name: 'cap size cms', values: [ '.5-5' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Deliquesce when mature; short-lived; moist conditions.',
                identification: 'Thin-fleshed caps, white when young, often with veil (fibrils), .5-5cm. Gills age from white to black. White stems, may be tall in relation to cap.'
            }
        ]
    },
    {
        taxon: 'genus',
        name: 'Agaricus',
        names: [ { language: "en", names: ['Agarics']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND_LITTER, SD.habitat.GRASSLAND ] },
            { language: "en", name: 'smell', values: [ 'Mushroomy', 'Ink', 'Almonds' ] },
            { language: "en", name: 'cap size cms', values: [ '3-15' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Mid Summer and throughout Autumn.',
                identification: 'Caps 3-15cm, white to brown, smooth but often scaly, some stain red or yellow. Gills pale pink, age to black brown (spore colour). White stem with ring (may be lost).'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Lactarius',
        names: [ { language: "en", names: ['Milkcaps']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND_LITTER, SD.habitat.GRASSLAND ] },
            { language: "en", name: 'cap size cms', values: [ '3-10' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Exude milky liquid of many colours from damaged gills and flesh. Autumnal. Mycorrhizal',
                identification: 'Caps 3-10cm, brown, grey, tan, or white, smooth, hairy, concentric zoning. Gills, spores cream. Stems paler, no ring.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Inocybe',
        names: [ { language: "en", names: ['Fibrecaps']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND ] },
            { language: "en", name: 'cap size cms', values: [ '1-8' ] },
            { language: "en", name: 'smell', values: [ 'Marzipan', 'Honey', 'Fish' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Small. All but one poisonous. Autumnal. Mycorrhizal',
                identification: 'Caps smooth, scaly, often split at edges. 1-8cm; brown, white, yellow and 1 lilac. Gills pale age to dark brown (spore colour). No ring, may have bulb at base.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Scleroderma',
        names: [ { language: "en", names: ['Earthballs']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND ] },
            { language: "en", name: 'smell', values: [ 'Strong, unpleasant' ] },
            { language: "en", name: 'lookalikes', values: [ 'Lycoperdon (Puffballs)' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'All poisonous, some similar to Puffballs.',
                identification: 'Thick scaly brown or dirty yellow skins (never white). Olive brown inside, turning black. Unpleasant smell.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Macrolepiota',
        names: [ { language: "en", names: ['Parasols']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND_LITTER, SD.habitat.DUNES, SD.habitat.GRASSLAND ] },
            { language: "en", name: 'lookalikes', values: [ 'Amanita (Puffballs)' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Late Summer, Autumn.',
                identification: 'Rough scaly caps often pale brown to white with a darker brown central zone. Gills and spores are nearly always white. Stems often have ring, sometimes swollen base.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Lycoperdon',
        names: [ { language: "en", names: ['Puffballs']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND, SD.habitat.GRASSLAND ] },
            { language: "en", name: 'lookalikes', values: [ 'Scleroderma (Earthballs)' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Some edible, some similar to Earthballs.',
                identification: 'Regular shape, soft skins mature from white to very pale brown when spores ready. The flesh inside white, then brown when sporing. Very little smell.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Amanita',
        names: [ { language: "en", names: ['Amanita']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND_LITTER, SD.habitat.GRASSLAND ] },
            { language: "en", name: 'cap size cms', values: [ '5-10' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Few edible, mainly poisonous, some deadly.',
                identification: 'Caps white, yellow, red, orange, cream, beige or brown; often flecked with white or occasionally grey ‘spots’. Gills and spores are white. Stem often white and often has skirt. Volva at base.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Mycena',
        names: [ { language: "en", names: ['Bonnets']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WIDESPREAD ] },
            { language: "en", name: 'cap size cms', values: [ '.5-3' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Few edible, mainly poisonous, some deadly.',
                identification: 'Small, delicate, smooth caps (red, pink, white, black, blue). Long, thin stems. Gills, spores white.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Tylopilus',
        names: [ { language: "en", names: ['Boletesnpm run watch']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND, SD.habitat.WOODLAND_LITTER, SD.habitat.MOSS ] },
            { language: "en", name: 'cap size cms', values: [ '10-20' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Form mycorrhizal relationships with trees. Widespread but only one species in Europe.',
                identification: 'Swollen, wide stipes without a ring. Pinkish pores.'
            }
        ]
    },    
    {
        taxon: 'genus',
        name: 'Boletus',
        names: [ { language: "en", names: ['Boletes']}],
        traits: [ 
            { language: "en", name: 'habitat', values: [ SD.habitat.WOODLAND, SD.habitat.WOODLAND_LITTER, SD.habitat.MOSS ] },
            { language: "en", name: 'cap size cms', values: [ '10-20' ] },
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Commonly known as Boletes although this group is now known to include species from genera.',
                identification: 'Pileus has spongy surface of pores. Stipe is thick and may bulge. Pileus (cap) and stipe (stem) are clearly differentiated.'
            }
        ]
    },
    {
        taxon: 'genus',
        name: 'Cladonia',
        names: [ { language: "en", names: ['Pixie Cup Lichens']}],
        traits: [ 
            { language: "en", name: 'Associate with', values: [ SD.associate.ALGA ] },          
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Grow on acid substrates. While some grow directly of tree bark, others grow on rotting wood, among moss, or directly on bare soil surfaces.',
                identification: 'Classic composition is a number of small leaf-like basal squamules from which grow upright structures (podetia) bearing the fruiting bodies.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Cladonia"
    },
    {
        taxon: 'genus',
        name: 'Peltigera',
        names: [ { language: "en", names: ['Felt Lichens']}],
        traits: [ 
            { language: "en", name: 'Associate with', values: [ SD.associate.CYNOBACTERIUM ] },          
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Grow on acid substrates. While some grow directly of tree bark, others grow on rotting wood, among moss, or directly on bare soil surfaces.',
                identification: 'Foliose, large (20-30 cm in diameter), grey-brown, darker, glossy when wet.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Peltigera"
    },
    {
        taxon: 'genus',
        name: 'Usnea',
        phylum: 'Ascomycota',
        species: 87,
        names: [ { language: "en", names: ['Old Man\'s Beard', 'Beard Lichen']}],
        traits: [ 
            { language: "en", name: 'Associate with', values: [ SD.associate.ALGA ] },          
        ],
        descriptions: [
            {
                language: 'en',
                type: SD.thallusType.FRUTICOSE,
                ecology: { name: SD.name.ACID_RAIN, value: `${SD.level.LOW}`},
                medicinal: { name: SD.name.MEDICINAL_PROPERTIES, value: `${SD.medicinalProperties.ANTISEPTIC}, ${SD.medicinalProperties.ANTI_INFLAMMATORY}, ${SD.medicinalProperties.ANTIBIOTIC}, ${SD.medicinalProperties.ANLAGESIC}`},
                usage: { name: SD.name.USAGE, value: `${SD.usage.PERFUMERY}, ${SD.usage.DYING}`},
                summary: 'Numerous. Found in areas of low atmospheric pollution.',
                identification: 'Stringy or fibrous appearance, fruticose, usually found on tree bark. Branches somewhat elastic.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Usnea"
    },
    {
        taxon: 'genus',
        name: '',
        names: [ { language: "en", names: ['Script Lichens']}],
        traits: [ 
            { language: "en", name: 'Associate with', values: [ SD.associate.ALGA ] },          
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Common on smooth-barked trees, especially those in shade.',
                identification: 'Long drawn-out apothecia with appearance of hieroglyphics or handwriting.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Script_lichen"
    },
    {
        taxon: 'genus',
        name: 'Lecanora',
        names: [ { language: "en", names: ['Rim lichens']}],
        traits: [ 
            { language: "en", name: 'Associate with', values: [ SD.associate.ALGA ] },          
        ],
        descriptions: [
            {
                language: 'en',
                summary: '',
                identification: 'Roughly circular fruiting discs (apothecia) with rims of photosynthetic tissue similar to thallus.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Lecanora"
    },
    {
        taxon: 'genus',
        name: 'Ramalina',
        names: [ { language: "en", names: ['Strap lichens, Cartilage lichens']}],
        traits: [ 
            { language: "en", name: 'Associate with', values: [ SD.associate.ALGA ] },          
        ],
        descriptions: [
            {
                language: 'en',
                summary: '',
                identification: 'Lecanorine. Greenish fruticose lichens that grow in the form of flattened, strap-like branches.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Ramalina"
    },
    {
        taxon: 'genus',
        name: 'Evernia',
        names: [ { language: "en", names: ['Strap lichens, Cartilage lichens']}],
        traits: [ 
            { language: "en", name: 'Associate with', values: [ SD.associate.ALGA ] },          
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'Abundant, grows on trees. Oakmoss (Evernia prunastri) used as a fixative agent in Eau de Cologne',
                identification: 'Green on top, white on bottom, divides evenly into "forks". Very soft when wet.'
            }
        ],
        wiki: "https://en.wikipedia.org/wiki/Evernia"
    },
    {
        taxon: 'phylum',
        name: 'Ascomycota',
        names: [ { language: "en", names: ['Sac Fungi']}],
        descriptions: [
            {
                language: 'en',
                summary: '',
                identification: '',
                keyMembers: [],
                usage: []
            }
        ]
    },
    {
        taxon: 'phylum',
        name: 'Basidiomycota',
        names: [ { language: "en", names: ['Mushrooms, etc.']}],
        descriptions: [
            {
                language: 'en',
                summary: '',
                identification: '',
                keyMembers: [],
                usage: []
            }
        ]
    },
    {
        taxon: 'order',
        name: 'Carnivora',
        names: [ { language: "en", names: ['Carnivorans']}
        ],
        descriptions: [
            {
                language: 'en',
                summary: 'The most diverse in size of any mammalian order',
                identification: 'Last upper premolar (P4) and first lower molar (m1) have blade-like enamel crowns that work together as carnassial teeth to shear meat.',
                keyMembers: [],
                usage: []
            }
        ],
        families: 16,
        species: 286
    },
    {
        taxon: 'order',
        name: 'Cetacea',
        names: [ { language: "en", names: ['Cetaceans']}],
        descriptions: [
            {
                language: 'en',
                summary: 'Excellent eyesight and hearing adapted for both air and water. A layer of fat, or blubber, under the skin maintains body heat in cold water. Adept swimmers with streamlined bodies. Can teach, learn, cooperate, scheme and grieve.',
                identification: 'Forelimbs modified into flippers and internal vestigial hindlimbs. Dorsal fin common and variable.',
                keyMembers: [],
                usage: []
            }
        ],
        families: 13,
        species: 89
    },
    {
        taxon: 'order',
        name: 'Lagomorpha',
        names: [ { language: "en", names: ['Lagomorphs']}],
        descriptions: [
            {
                language: 'en',
                summary: 'Compromised of two living families: the Leporidae (hares and rabbits) and the Ochotonidae (pikas). They share a common ancestor with Rodentia (rodents). In decline.',
                identification: 'Hairy, herbivorous tetrapods with 4 incisors in the upper jaw.',
                keyMembers: [],
                usage: []
            }
        ],
        families: 2,
        species: 87
    },
    {
        taxon: 'family',
        name: 'Leporidae',
        names: [ { language: "en", names: ['Rabbits and hares']},
        { language: "fr", names:[ 'Lapins et Lièvres' ]},
        { language: "de", names:[ 'Hasen' ]},
        { language: "es", names:[ 'Conejos y Liebres' ]},
        { language: "pt", names:[ 'Leporídeos' ]},
        { language: "it", names:[ 'Leporidi' ]}],
        descriptions: [
            {
                language: 'en',
                summary: 'Widespread, rabbit and hares that are usally herbivorous and coprophagous. Rabbits use burrows for shelter.',
                identification: 'Small-moderately sized mammals, adapted for rapid movement. Long hind legs, 4 toes on each foot, and shorter fore legs, with 5 toes. Soles of feet are hairy, to improve grip, with strong claws on all toes.',
                keyMembers: [],
                usage: []
            }
        ],
        genera: 12,
        species: 60,
        wiki: 'https://en.wikipedia.org/wiki/Leporidae'
    },
    {
        taxon: 'order',
        name: 'Rodentia',
        names: [ { language: "en", names: ['Rodents']}],
        descriptions: [
            {
                language: 'en',
                summary: 'Most numerous (40%), diverse and widespread of mammals, they may be arboreal, fossorial (burrowing), or semiaquatic. Share common ancestor with Lagomorpha (rabbit, hares and pika).',
                identification: 'A single pair of continuously growing incisors in each of the upper and lower jaws. Robust bodies, short limbs, and long tails.',
                keyMembers: [],
                usage: []
            }
        ],
        families: 33,
        genera: 481,
        species: 2277
    },
];