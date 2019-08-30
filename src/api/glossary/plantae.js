export const plantae = [
    {
        term: "Type species",
        definition: "Species with which the name of a genus or subgenus is associated.",
        wiki: "https://en.wikipedia.org/wiki/Type_species"
    },
    {
        term: "Entomophily",
        definition: "Pollination of plants, particularly flowering plants, by insects.",
        wiki: "https://en.wikipedia.org/wiki/Entomophily"
    },
    {
        term: "Anemophily",
        definition: "Pollination whereby pollen is distributed by wind.",
        wiki: "https://en.wikipedia.org/wiki/Anemophily",
        characteristics: 'Anemophilous, or wind pollinated flowers, are usually small and inconspicuous, and do not possess a scent or produce nectar. The anthers may produce a large number of pollen grains, while the stamens are generally long and protrude out of flower.'
    },
    {
        term: "Hydrophily",
        definition: "Distribution of pollen by the flow of waters, particularly in rivers and streams.",
        wiki: "https://en.wikipedia.org/wiki/Hydrophily",
        characteristics: 'Flowers tend to be small and inconspicuous with lots of pollen grains and large, feathery stigmas to catch the pollen.'
    },
    {
        term: "Ambophily",
        definition: "Pollination of flowers by both wind and insects."
    },
    {
        term: "Apomixis",
        definition: "Asexual reproduction, without fertilisation."
    },
    {
        term: "Nectar (floral) guides",
        definition: 'Marking or pattern seen in flowers that guide pollinators to rewards (nectar/pollen).'
    },
    {
        term: "Melittophily",
        definition: "Pollination of flowers by bees.",
        characteristics: 'Flowers may be open and bowl-shaped (radially symmetrical) or more complex and non-radially symmetric ("zygomorphic"), as is the case with many peas and foxgloves.'
    },
    {
        term: "Psychophily",
        definition: "Pollination of flowers by butterflies.",
        characteristics: 'Butterfly-pollinated flowers tend to be large and showy, pink or lavender in colour, frequently have a landing area, and are usually scented. The reward is almost always nectar. The flowers have simple nectar guides with the nectaries usually hidden in narrow tubes or spurs, reached by the long tongue of the butterflies.'
    },
    {
        term: "Phalaenophily",
        definition: "Pollination of flowers by moths.",
        characteristics: 'Most are nocturnal or crepuscular. So moth-pollinated flowers tend to be white, night-opening, large and showy with tubular corollas and a strong, sweet scent produced in the evening, night or early morning. A lot of nectar is produced to fuel the high metabolic rates needed to power their flight.',
        examples: ['Sphingidae (Hawk moths)']
    },
    {
        term: 'Zygomorphic',
        definition: 'Having only one plane of symmetry, as in a pea; bilaterally symmetrical.'
    },
    {
        term: 'Myophily',
        definition: 'Pollination of flowers by flies that normally visit dung or dead animals.',
        characteristics: 'Mimic odour of dung or dead animals.'
    },
    {
        term: 'Ornithophily',
        definition: 'Pollination of flowers by birds.',
        characteristics: 'Large red or orange tubes with a lot of dilute nectar, secreted during the day; odourless.',
        examples: ['Hummingbirds']
    },
    {
        term: 'Chiropterophily',
        definition: 'Pollination of flowers by bats.',
        characteristics: 'Large and showy, white or light coloured, open at night and have strong musty odours. They are often large and bell-shaped or a ball of stamens. Flowers are typically borne away from the trunk or other obstructions. Sight, smell, and echo-location are used to initially find the flowers, and excellent spatial memory is used to visit them repeatedly.'        
    },
    {
        term: 'Cantharophily',
        definition: 'Pollination of flowers by beetles.',
        characteristics: 'Large, greenish or off-white in color and heavily scented. Scents may be spicy, fruity, or similar to decaying organic material. Most beetle-pollinated flowers are flattened or dish shaped, with pollen easily accessible.'        
    },
    {
        term: 'Sapromyophily',
        definition: 'Pollination of flowers by flies feeding on nectar.',
        characteristics: 'Tend not to emit a strong scent, are typically purple, violet, blue, and white, and have open dishes or tubes. High-altitude and high-latitude.',
        examples: ['Bombyliidae', 'Syrphidae']
    },
    // {
    //     term: "Aetherolea",
    //     definition: "Aetherolea also known as volatile oils or essential oils are concentrated hydrophobic liquids that contain volatile aroma compounds from plants which evaporate when exposed to air and are thus capable of distillation.",
    //     wiki: "https://en.wikipedia.org/wiki/Essential_oil"
    // },

    {
        term: "Pollination",
        definition: "The transfer of pollen (male gametes) between the male and female parts of flowers."
    },
    // {
    //     term: "Model organism",
    //     definition: "A species studied to understand particular biological phenomena, with the expectation that discoveries will provide insight into the workings of other organisms.",
    //     wiki: "https://en.wikipedia.org/wiki/Model_organism",
    //     examples: ['Escherichia coli', 'Drosophila melanogaster', 'Arabidopsis thaliana', 'Saccharomyces cerevisiae', 'Mus musculus']
    // },

    {
        term: "Dehiscence",
        definition: "The natural opening of fruits, etc. along line of natural weakness releasing seeds/pollen."
    },
    {
        term: "Cultivar",
        definition: "A plant variety that has been produced in cultivation by selective breeding."
    },
    {
        term: "Variety",
        definition: "A naturally occurring, stable variation on a species."
    },
    {
        term: 'Herbaceous',
        definition: 'Plants that have no persistent woody stem above ground.'
    },
    {
        term: 'Angiosperm',
        definition: 'Flowering plants.'
    },
    {
        term: 'Gymnosperm',
        definition: 'Group of plants whose seeds are not enclosed in a ovary.'
    },
    {
        term: 'Sonication',
        definition: 'The release of pollen by rapid movement of the flight muscles of solitary bees (Bumblebees).',
        wiki: 'https://en.wikipedia.org/wiki/Buzz_pollination',
        examples: ['Solanaceae', 'Solanum lycopersicum', 'Solanum melongena', 'Solanum tuberosum', 'Vaccinium']
    },
    {
        term: 'Stamen',
        definition: 'Pollen-producing organ of a flower. Consists of a filament and pollen-carrying anther.',
        wiki: 'https://en.wikipedia.org/wiki/Stamen',
        parent: 'Flower'
    },
    {
        term: 'Flower',
        definition: 'The reproductive structure found in flowering plants (angiosperms).',
        wiki: 'https://en.wikipedia.org/wiki/Flower',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Mature_flower_diagram.svg/1280px-Mature_flower_diagram.svg.png'
        }
    },
    {
        term: 'Fruit',
        definition: 'The seed-bearing structure in flowering plants formed from the ovary after flowering.',
        wiki: 'https://en.wikipedia.org/wiki/Fruit'
    },
    {
        term: 'Perianth',
        definition: 'Non-reproductive part of flower around sexual organs: calyx (sepals) and corolla (petals).',
        wiki: 'https://en.wikipedia.org/wiki/Perianth'
    },
    {
        term: 'Petal',
        definition: 'A modified leaf that surrounds the reproductive parts of flowers.',
        wiki: 'https://en.wikipedia.org/wiki/Petal'
    },
    {
        term: 'Corolla',
        definition: 'All the petals of a flower.',
        wiki: 'https://en.wikipedia.org/wiki/Petal#Corolla',
        parent: 'Flower'
    },
    {
        term: 'Perennial',
        definition: 'A plant that lives more than two years. Not a tree or shrub.',
        wiki: 'https://en.wikipedia.org/wiki/Perennial_plant'
    },
    {
        term: 'Annual',
        definition: 'A plant that completes its life cycle within one year, and then dies.',
        wiki: 'https://en.wikipedia.org/wiki/Annual_plant'
    },
    {
        term: 'Pioneer',
        definition: 'Hardy species which are the first to colonise barren environments or previously biodiverse steady-state ecosystems that have been disrupted, such as by fire.',
        wiki: 'https://en.wikipedia.org/wiki/Pioneer_species'
    },
    {
        term: 'Biennial',
        definition: 'A flowering plant that takes two years to complete its biological lifecycle.',
        wiki: 'https://en.wikipedia.org/wiki/Biennial_plant'
    },
    {
        term: 'Evergreen',
        definition: 'Non-herbaceous perennials which retain a mantle of leaves throughout the year.',
        wiki: 'https://en.wikipedia.org/wiki/Evergreen'
    },
    {
        term: 'Valvate',
        definition: '(Of flowers) twice divided.'
    },
    {
        term: 'Dicotyledon (dicot)',
        definition : "Plant group where seed has two embryonic leaves (cotyledons)."
    },
    {
        term : "Monocotyledon (monocot)",
        definition : "Plant group where seed has one embryonic leaf (cotyledon)."
    },
    {
        term: 'Self-pollination',
        definition: 'Process by which pollen from the same plant arrives at the stigma of a flower (angiosperms) or at the ovule (gymnosperms).'
    },
    {
        term: 'Pseudanthium',
        definition: 'A "false flower" made up of several true flowers.'
    },    
    {
        term: 'Green manure',
        definition: 'Created by leaving uprooted or sown crop parts to wither on a field so that they serve as a mulch.',
        wiki: 'https://en.wikipedia.org/wiki/Green_manure'
    },    
    {
        term: 'Taproot',
        definition: 'Large, central, and dominant root from which other roots sprout laterally in dicots, e.g. carrot.',
        wiki: 'https://en.wikipedia.org/wiki/Taproot'
    },    
    {
        term: 'Pome',
        definition: 'Type of fruit produced by flowering plants in the subtribe Malinae of the family Rosaceae.',
        wiki: 'https://en.wikipedia.org/wiki/Pome'
    },
    {
        term: 'Drupe',
        definition: 'Indehiscent fruit in which an outer fleshy part surrounds a single shell of hardened endocarp with a seed inside.',
        wiki: 'https://en.wikipedia.org/wiki/Drupe',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Drupe_fruit_diagram-en.svg/1024px-Drupe_fruit_diagram-en.svg.png'
        }
    },
    {
        term: 'Berry',
        definition: 'A fruit produced from the ovary of a single flower in which the outer layer of the ovary wall develops into an edible fleshy portion.',
        wiki: 'https://en.wikipedia.org/wiki/Berry'
    },
    {
        term: 'Baccate, bacciferous',
        definition: 'Plant bearing berries.',
    },
    {
        term: 'Aggregate fruit',
        definition: 'A fruit that develops from the merger of several ovaries that were separate in a single flower.',
        wiki: 'https://en.wikipedia.org/wiki/Aggregate_fruit'
    },
    {
        term: 'Legume',
        definition: 'Fruit from the Fabaceae family (also pulse).',
        wiki: 'https://en.wikipedia.org/wiki/Legume'
    },
    {
        term: 'Capsule',
        definition: 'Simple, dry, though rarely fleshy dehiscent fruit produced by many species of angiosperms.',
        wiki: 'https://en.wikipedia.org/wiki/Capsule_(fruit)'
    },
    {
        term: 'Xylem',
        definition: 'Tissue which transports water and nutrients from roots to shoots and leaves.'
    },
    {
        term: 'Phloem',
        definition: 'Tissue which transports products of photosynthesis ( e.g. sugars) throughout vascular plants (translocation).'
    },
    {
        term: 'Dehiscence',
        definition: 'Splitting along a built-in line of weakness in a plant structure in order to release its contents, common among fruits, anthers and sporangia.',
        wiki: 'https://en.wikipedia.org/wiki/Dehiscence_(botany)'
    },
    {
        term: 'Nut',
        definition: 'Fruit composed of an inedible hard shell and a seed, which is generally edible.',
        wiki: 'https://en.wikipedia.org/wiki/Nut_(fruit)'
    },
    {
        term: 'Grain',
        definition: 'Small, hard, dry seed, with or without an attached hull or fruit layer, harvested for human or animal consumption.',
        wiki: 'https://en.wikipedia.org/wiki/Grain'
    },
    {
        term: 'Multiple fruit',
        definition: 'Fruiting bodies formed from a cluster of fruiting flowers, the inflorescence.',
        wiki: 'https://en.wikipedia.org/wiki/Multiple_fruit'
    },
    {
        term: 'Allochory',
        definition: 'Seed dispersal by vector or secondary agent.',
        wiki: 'https://en.wikipedia.org/wiki/Seed_dispersal#Allochory'
    },
    {
        term: 'Anemochory',
        definition: 'Seed dispersal by wind.',
        wiki: 'https://en.wikipedia.org/wiki/Seed_dispersal#Allochory'
    },
    {
        term: 'Anemochory',
        definition: 'Seed dispersal by wind.',
        wiki: 'https://en.wikipedia.org/wiki/Seed_dispersal#Allochory'
    },
    {
        term: 'Hydrochory',
        definition: 'Seed dispersal by water.',
        wiki: 'https://en.wikipedia.org/wiki/Seed_dispersal#Allochory'
    },
    {
        term: 'Zoochory',
        definition: 'Seed dispersal by animals.',
        wiki: 'https://en.wikipedia.org/wiki/Seed_dispersal#Allochory'
    },
    {
        term: 'Anthropochory',
        definition: 'Seed dispersal by humans.',
        wiki: 'https://en.wikipedia.org/wiki/Seed_dispersal#Allochory'
    },
    {
        term: 'Inflorescence',
        definition: 'Group or cluster of flowers arranged on a stem composed of a main branch or complicated arrangement of branches.',
        wiki: 'https://en.wikipedia.org/wiki/Inflorescence'
    },
    {
        term: 'Cymose',
        definition: 'Category of inflorescence (determinate) where the oldest (and largest) flowers are located at the top or centre. Opposite of racemose. e.g Daucus, Allium.',
        wiki: 'https://en.wikipedia.org/wiki/Inflorescence#Determinate_or_cymose'
    },
    {
        term: 'Racemose',
        definition: 'Category of inflorescence (indeterminate) where the youngest (and smallest) flowers are located at the top or centre. Opposite of cymose.',
        wiki: 'https://en.wikipedia.org/wiki/Inflorescence#Indeterminate_or_racemose'
    },
    {
        term: 'Spadix',
        definition: 'Type of spike inflorescence having small flowers borne on a fleshy stem.',
        wiki: 'https://en.wikipedia.org/wiki/Spadix_(botany)'
    },
    {
        term: 'Spathe',
        definition: 'Large bract or pair of bracts forming a sheath to enclose the flower cluster (Arums, Irises, Crocuses)',
        wiki: 'https://en.wikipedia.org/wiki/Bract#Spathe'
    },
    {
        term: "Aristate",
        definition: "Having a spiny or bristly tip (of leaf).",
        wiki: "https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#aristate"
    },
    {
        term: "leaf sheath",
        definition: "A structure at the base of a leaf's petiole that partly surrounds or protect the stem or another organ that it subtends.",
        wiki: "https://en.wiktionary.org/wiki/leaf_sheath"
    },
    {
        term: "C3 carbon fixation",
        definition: "C3 plants tend to thrive in areas where sunlight intensity and temperatures are moderate.",
        wiki: "https://en.wikipedia.org/wiki/C3_carbon_fixation",
        examples: ['Cirsium arvense']
    },
    {
        term: "Ruderal species",
        definition: "Plant species that is first to colonise disturbed lands.",
        wiki: "https://en.wikipedia.org/wiki/Ruderal_species",
        examples: ['Cirsium arvense']
    },
    {
        term: "Supertramp",
        definition: "Animal which follows strategy of high dispersion among different habitats where it is not specialised.",
        wiki: "https://en.wikipedia.org/wiki/Supertramp_(ecology)",
    },
    {
        term: "Capsule",
        definition: "A type of simple, dry, though rarely fleshy dehiscent fruit produced by many species of angiosperms.",
        wiki: "https://en.wikipedia.org/wiki/Capsule_(fruit)",
    },
    {
        term: "Allelopathy",
        definition: "Biological phenomenon by which an organism produces biochemicals that influence germination, growth, survival, and reproduction of other organisms.",
        wiki: "https://en.wikipedia.org/wiki/Allelopathy",
    },
    {
        term: 'Monandrous (plants)',
        definition: 'Having a single stamen.',
        wiki: 'https://en.wikipedia.org/wiki/Monandrous'
    },
    {
        term: 'Dioecy',
        definition: '(Of a species), having distinct male and female individual organisms.',
        wiki: 'https://en.wikipedia.org/wiki/Dioecy'
    },
    {
        term: 'Companion planting',
        definition: 'Planting crops in proximity for reasons including pest control, pollination, providing habitat for beneficial creatures to increase crop productivity.',
        wiki: 'https://en.wikipedia.org/wiki/Companion_planting'
    },
    {
        term: 'Allogamy (cross-fertilisation)',
        definition: 'The fertilization of an ovum from one individual with the spermatozoa of another.',
        wiki: 'https://en.wikipedia.org/wiki/Allogamy'
    },
    {
        term: 'Tomentose',
        definition: 'Description of surfaces that are velvety or covered in (often matted) hairs.',
        wiki: 'https://en.wikipedia.org/wiki/Tomentose'
    },
    {
        term: 'Decumbent',
        definition: 'Of a plant, which lies on the ground with tips turned upwards.',
        wiki: 'https://en.wikipedia.org/wiki/decumbent'
    },
    {
        term: 'Nyctinasty',
        definition: 'Change or (nastic) movement of higher plants in response to the onset of darkness.',
        wiki: 'https://en.wikipedia.org/wiki/Nyctinasty'
    },
    {
        term: 'Turgor pressure',
        definition: 'Turgor pressure is the force within the cell that pushes the plasma (cell) membrane against the cell wall.',
        wiki: 'https://en.wikipedia.org/wiki/Turgor_pressure'
    },
    {
        term: 'Nastic movement',
        definition: 'Nastic movements are directional responses to stimuli (e.g. temperature, humidity, light irradiance), and are usually associated with plants.',
        wiki: 'https://en.wikipedia.org/wiki/Nastic_movements'
    },
    {
        term: 'Tropism',
        definition: 'A tropism (from Greek τρόπος, tropos, "a turning") is a biological phenomenon, indicating growth or turning movement of a biological organism, usually a plant, in response to an environmental stimulus.',
        wiki: 'https://en.wikipedia.org/wiki/Tropism'
    },
    {
        term: 'Cauliflory',
        definition: 'Plants that flower and fruit from their main stems or woody trunks rather than from new growth and shoots.',
        wiki: 'https://en.wikipedia.org/wiki/Cauliflory'
    },
    {
        term: 'Ramiflory',
        definition: 'Production of fruit and flowers on the woody branches of a plant, formed in a previous season.',
        wiki: 'https://en.wikipedia.org/wiki/Ramiflory'
    },
    {
        term: 'Glaucous',
        definition: 'Covered with a greyish, bluish, or whitish waxy coating or bloom that is easily rubbed off.',
        wiki: 'https://en.wikipedia.org/wiki/Glaucous'
    },
    {
        term: 'Farinose',
        definition: 'Covered with a whitish powder or waxy coating.',
    },
    {
        term: 'Scurfy',
        definition: 'Covered with small scalelike particles.',
    },
    {
        term: 'Viscous',
        definition: 'Covered with sticky or resinous secretion.',
    },
    {
        term: 'Punctate',
        definition: 'Dotted with minute pits or translucent dots.',
    },
    {
        term: 'Papillate',
        definition: 'Having minute, pimplelike protuberances.',
    },
    {
        term: 'Tuberculate',
        definition: 'Having tubercles or warty protuberances.',
    },
    {
        term: 'Rugose',
        definition: 'Wrinkled.',
        wiki: 'https://en.wikipedia.org/wiki/Rugose'
    },
    {
        term: 'Glabrous',
        definition: 'Smooth, hairless, bald.',
        wiki: 'https://en.wikipedia.org/wiki/Glabrous'
    },
    {
        term: 'Pubescent',
        definition: 'Hairy or downy.',
        wiki: 'https://en.wikipedia.org/wiki/Pubescent'
    },
    {
        term: 'Aerial roots',
        definition: 'Roots above the ground. They are almost always adventitious.',
        wiki: 'https://en.wikipedia.org/wiki/Aerial_root'
    },
    {
        term: 'Perfect',
        definition: 'A flower that has both stamens and a pistil.',
    },
    {
        term: 'Complete',
        definition: 'A flower having sepals, petals, stamens, and pistils.',
    },
    {
        term: 'Adventitious',
        definition: 'Plant structures, including, roots, buds, and shoots, that develop in unusual locations.',
    },
    {
        term: 'Alternate',
        definition: '(Of leaves) occurring individually at nodes and on opposite sides of the stem. Also, a spiral arrangement of leaves on a stem, with one leaf at a node (whorl).',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/en/4/4f/Alternate.png'
        }
    },
    {
        term: 'Opposite',
        definition: '(Of leaves) when two leaves emerge from the opposite sides of the stem at the same node.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/en/c/c4/Opposite.png'
        }
    },
    {
        term: 'Basal',
        definition: '(Of leaves) arising from the base of the stem.',
    },
    {
        term : "Phyllotaxis",
        definition : "Arrangement of leaveson a plant stem.",
        wiki: 'https://en.wikipedia.org/wiki/Phyllotaxis'
    },
    {
        term : "Siliceous",
        definition : "Soils formed from rocks that have silica (SiO2) as a principal constituent. Generally relatively acidic.",
        wiki: 'https://en.wikipedia.org/wiki/Siliceous_soil'
    },
    {
        term : "Calcareous",
        definition : "'Mostly or partly composed of calcium carbonate', in other words, containing lime or being chalky. Generally relatively alkaline or base.",
        wiki: 'https://en.wikipedia.org/wiki/Calcareous'
    },
    {
        term : "Aril",
        definition : "Specialised outgrowth from a seed that partly or completely covers the seed.",
        wiki: 'https://en.wikipedia.org/wiki/Aril'
    },
    {
        term : "Epicormic shoot",
        definition : "A shoot growing from an epicormic bud, which lies underneath the bark of a trunk, stem, or branch of a plant.",
        wiki: 'https://en.wikipedia.org/wiki/Epicormic_shoot'
    },
    {
        term : "Deciduous",
        definition : "The term means 'falling off at maturity' or 'tending to fall off', in reference to trees and shrubs that seasonally shed leaves; to the shedding of petals, after flowering; and to the shedding of ripe fruit.",
        wiki: 'https://en.wikipedia.org/wiki/Deciduous'
    },
    {
        term : "Buttress root",
        definition : "Large, wide roots on all sides of a shallowly rooted tree. Typically found in nutrient-poor tropical forest soils that may not be deep.",
        wiki: 'https://en.wikipedia.org/wiki/Buttress_root'
    },
    {
        term : "Syconium",
        definition : "Type of inflorescence borne by figs (genus Ficus), formed by an enlarged, fleshy, hollow receptacle with multiple ovaries on the inside surface.",
        wiki: 'https://en.wikipedia.org/wiki/syconium'
    },
    {
        term : "Xeromorphic",
        definition : "Of, relating to, or characteristic of the xerophytes, especially having the ability to store water in leaves and stems.",
        wiki: 'https://en.wikipedia.org/wiki/xeromorphic'
    },
    {
        term : "Chamaephyte",
        definition : "Any low perennial plant whose buds overwinter just above soil level.",
        wiki: 'https://en.wiktionary.org/wiki/chamaephyte'
    },
    {
        term : "Spike",
        definition : "(Infloresence) a type of raceme with flowers that do not have a pedicel.",
        wiki: 'https://en.wikipedia.org/wiki/Inflorescence',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Inflorescences_Spike_Kwiatostan_K%C5%82os.svg'
        }
    },
    {
        term : "Achene",
        definition : "Contains a single seed that nearly fills the pericarp, but does not adhere to it. In many species, the 'seed' is an achene, a fruit containing the seed. The seed-like appearance is owed to the hardening of the fruit wall (pericarp), which encloses the solitary seed so closely as to seem like a seed coat.",
        wiki: 'https://en.wikipedia.org/wiki/Achene'
    },
    {
        term : "Raceme",
        definition : "An unbranched, indeterminate inflorescence with pedicellate (having short floral stalks) flowers along the axis.",
        wiki: 'https://en.wikipedia.org/wiki/Raceme',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Traube_(inflorescence).svg/320px-Traube_(inflorescence).svg.png'
        }
    },
    {
        term : "Corymb",
        definition : "An inflorescence with the flowers growing in such a fashion that the outermost are borne on longer pedicels than the inner, bringing all flowers up to a common level.",
        wiki: 'https://en.wikipedia.org/wiki/Corymb',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Schirmtraube_%28inflorescence%29.svg'
        }
    },
    {
        term : "Entire",
        definition : "(Of leaf) even; with a smooth margin; without toothing.",
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#Leaf_and_leaflet_shapes',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Leaf_morphology_entire.png'
        }
    },
    {
        term : "Oblong",
        definition : "(Of leaf) having an elongated form with slightly parallel sides, roughly rectangular.",
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#Leaf_and_leaflet_shapes',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Leaf_morphology_oblong.png'
        }
    },
    {
        term : "Dentate",
        definition : "(Of leaf) toothed.",
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#Leaf_and_leaflet_shapes',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Leaf_morphology_dentate.png'
        }
    },
    {
        term : "Lanceolate",
        definition : "(Of leaf) long, wider in the middle, shaped like a lance tip.",
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#Leaf_and_leaflet_shapes',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Leaf_morphology_lanceolate.png'
        }
    },
    {
        term : "Simple",
        definition : "Leaf blade in one continuous section, without leaflets (not compound).",
    },
    {
        term : "Pyramidal",
        definition : "(Tree shape) wide and cone-shaped canopies, branches expand at the base and narrow towards the top e.g. magnolia, oak.",
    },
    {
        term : "Open head irregular",
        definition : "(Tree shape) non-uniform branches forming an irregular canopy e.g. ash, catalpa, sycamore.",
    },
    {
        term : "Weeping",
        definition : "(Tree shape) with branches hanging down e.g. cherry, birch, willow, larch, hemlock.",
    },
    {
        term : "Dioecious",
        definition : "(Botany) species with 'male' and 'female' reproductive structures on separate plants. Opposite monoicous.",
        wiki: 'https://en.wikipedia.org/wiki/Dioecy'
    },
    {
        term : "Monoicous",
        definition : "(Botany) species with 'male' and 'female' reproductive structures on the same plant. Opposite dioecious.",
        wiki: 'https://en.wikipedia.org/wiki/Monoicous'
    },
    {
        term : "Synoecious",
        definition : "(Botany) species with 'male' and 'female' reproductive organs in the same structure.",
        wiki: 'https://en.wiktionary.org/wiki/synoecious'
    },
    {
        term : "Follicle",
        definition : "(Botany) a dry unilocular fruit formed from one carpel, containing two or more seeds. Dehisces by a suture in order to release seeds e.g peony.",
        wiki: 'https://en.wikipedia.org/wiki/Follicle_(fruit)'
    },
    {
        term : "Globe",
        definition : "(Tree shape) uniform round shape e.g. hackberry, floering dogwood, American hornbeam.",
    },
    {
        term : "Fastigiate",
        definition : "(Tree shape) having the branches more or less parallel to the main stem.",
    },
    {
        term : "Vase",
        definition : "(Tree shape) branches develop upward from the trunk e.g. hawthorn, elm, boxelder.",
    },
    {
        term : "Stem",
        definition : "The plant axis that bears buds and shoots with leaves and, at its basal end, roots. It conducts water, minerals, and food to other parts of the plant.",
        wiki: 'https://en.wikipedia.org/wiki/Plant_stem'
    },
    {
        term : "Stalk",
        definition : "Attaches the leaf blade to the stem (petiole).",
        wiki: 'https://en.wikipedia.org/wiki/Stalk'
    },
    {
        term : "Columnar",
        definition : "(Tree shape) branches of consistent length througout e.g. Lombardy poplars, cherry.",
    },
    {
        term : "Horizontal spreading",
        definition : "(Tree shape) branches spread horizontally throughout e.g. beech, fir, hornbeam, honeylocust.",
    },
    {
        term : "Ovate",
        definition : "(Of leaf) oval, egg-shaped, with a tapering point and the widest portion near the petiole.",
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#Leaf_and_leaflet_shapes',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Leaf_morphology_ovale.png'
        }
    },
    {
        term : "Serrate",
        definition : "(Of leaf) saw-toothed; with asymmetrical teeth pointing forward.",
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#Leaf_and_leaflet_shapes',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Leaf_morphology_serrate.png'
        }
    },
    {
        term: 'Pinnate',
        definition: 'Arrangement of discrete structures (such as leaflets, veins, lobes, branches, or appendages) arising at multiple points along a common axis e.g. once-divided leaf blades having leaflets arranged on both sides of a rachis are pinnately compound leaves.',
    },
    {
        term: 'Bipinnate',
        definition: 'The leaflets are themselves pinnately-compound; twice pinnate.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Leaf_morphology_bipinnate.png',
            thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Leaf_morphology_bipinnate.png/64px-Leaf_morphology_bipinnate.png',
            author: 'By Maksim CC BY-SA 3.0',
            attribution: 'https://commons.wikimedia.org/w/index.php?curid=6559049',        
        }
    },
    {
        term: 'Compound Bipinnate',
        definition: 'Leaves are twice divided: the leaflets are arranged along a secondary vein that is one of several branching off the rachis. Each leaflet is called a pinnule.'
    },
    {
        term: 'bifoliolate',
        definition: 'Having two leaflets',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Leaf_morphology_Bifoliolate.png',
            thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Leaf_morphology_Bifoliolate.png/64px-Leaf_morphology_Bifoliolate.png',
            author: 'Wasp32 CC BY-SA 4.0',
            attribution: 'https://commons.wikimedia.org/w/index.php?curid=49634194',
        }
    },
    {
        term: 'bigeminate',
        definition: 'Having two leaflets, each leaflet being bifoliolate',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Leaf_morphology_Bigeminate.png',
            thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Leaf_morphology_Bigeminate.png/64px-Leaf_morphology_Bigeminate.png',
            author: 'Wasp32 CC BY-SA 4.0',
            attribution: 'https://commons.wikimedia.org/w/index.php?curid=49634191',
        }
    },
    {
        term: 'acicular',
        definition: 'Slender and pointed, needle-like.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Leaf_morphology_acicular.png',
            thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Leaf_morphology_acicular.png/64px-Leaf_morphology_acicular.png',
            author: 'Maksim CC BY-SA 3.0',
            attribution: 'https://commons.wikimedia.org/w/index.php?curid=6545745',
            refers: 'entire leaf'
        }
    },
    {
        term: 'acuminate',
        definition: 'Tapering to a long point in a concave manner.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Leaf_morphology_acuminate.png',
            thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Leaf_morphology_acuminate.png/64px-Leaf_morphology_acuminate.png',
            author: 'Maksim CC BY-SA 3.0',
            attribution: 'https://commons.wikimedia.org/w/index.php?curid=6531351',
            refers: 'leaf tip',
        }
    },
    {
        term: 'acute',
        definition: 'Pointed, having a short sharp apex angled less than 90°.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Leaf_morphology_Acute.png',
            thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Leaf_morphology_Acute.png/64px-Leaf_morphology_Acute.png',
            author: 'Wasp32 CC BY-SA 4.0',                
            attribution: 'https://commons.wikimedia.org/w/index.php?curid=49633346',
            refers: 'leaf tip or base'
        }
    },
    {
        term: 'apiculate',
        definition: 'Tapering and ending in a short, slender point.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Leaf_morphology_Apiculate.png',
            thumb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Leaf_morphology_Apiculate.png/64px-Leaf_morphology_Apiculate.png',
            author: 'Wasp32 CC BY-SA 4.0',
            attribution: 'https://commons.wikimedia.org/w/index.php?curid=49633342',
            refers: 'leaf tip'
        }
    },
    {
        term: 'Compound Palmate',
        definition: 'Consisting of leaflets all radiating from one point.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Leaf_morphology_Palmately_compound.png'
        },
        wiki: 'https://en.wiktionary.org/wiki/palmate'
    },
    {
        term: 'Palmately lobed',
        definition: 'Lobes spread radially from a point.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Palmatilobé.svg'
        },
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology#Leaf_and_leaflet_shapes'
    },
    {
        term: 'Trifoliate',
        definition: 'With three leaflets.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Leaf_morphology_trifoliolate.png'
        },
        wiki: 'https://en.wiktionary.org/wiki/trifoliate'
    },
    {
        term: 'Odd pinnate',
        definition: '(Imparipinnate) with an odd number of leaflets, pinnate with a terminal leaflet (the opposite of paripinnate).',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Leaf_morphology_odd_pinnate.png'
        },
        wiki: 'https://en.wiktionary.org/wiki/imparipinnate'
    },
    {
        term: 'Even pinnate',
        definition: '(Paripinnate) pinnate with an even number of leaflets, lacking a terminal leaflet (the opposite of imparipinnate).',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Leaf_morphology_even_pinnate.png'
        },
        wiki: 'https://en.wiktionary.org/wiki/paripinnate'
    },
    {
        term: 'Panicle',
        definition: 'A much-branched inflorescence, often racemes. A panicle may have determinate or indeterminate growth. Typical of grasses such as oat.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Inflorescences_Panicle_Kwiatostan_Wiecha.svg/800px-Inflorescences_Panicle_Kwiatostan_Wiecha.svg.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Panicle'
    },
    {
        term: 'Arcuate',
        definition: 'Secondary arching toward the apex.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Leaf_morphology_arcuate.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Leaf#Venation'
    },
    {
        term: 'Dichotomous',
        definition: 'Veins splitting in two.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Leaf_morphology_dichotomous.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Leaf#Venation'
    },
    {
        term: 'Longitudinal',
        definition: 'All veins aligned mostly with the midvein.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Leaf_morphology_longitudinal.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Leaf#Venation'
    },
    {
        term: 'Parallel',
        definition: 'All veins parallel and not intersecting.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Leaf_morphology_parallel.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Leaf#Venation'
    },
    {
        term: 'Reticulate',
        definition: 'All veins branching repeatedly, net veined.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Leaf_morphology_reticulate.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Leaf#Venation'
    },
    {
        term: 'Rotate',
        definition: 'Veins coming from the center of the leaf and radiating toward the edges.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Leaf_morphology_rotate.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Leaf#Venation'
    },
    {
        term: 'Transverse',
        definition: 'Veins coming from the center of the leaf and radiating toward the edges.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Leaf_morphology_cross_venulate.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Leaf#Venation'
    },
    {
        term: 'Sagittate',
        definition: 'Arrowhead-shaped with the lower lobes folded, or curled downward.',
        img: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Leaf_morphology_spear-shaped.png'
        },
        wiki: 'https://en.wikipedia.org/wiki/Glossary_of_leaf_morphology'
    },
    {
        term: 'Succulent',
        definition: '(Plants) that have some parts that are more than normally thickened and fleshy, usually to retain water in arid climates or soil conditions.',
        wiki: 'https://en.wikipedia.org/wiki/Succulent_plant'
    },
    {
        term: 'Monocarpic',
        definition: '(Plants) whose flowers, set seed then die.',
        wiki: 'https://en.wikipedia.org/wiki/Monocarpic'
    },
    {
        term: 'Polycarpic',
        definition: '(Plants) are those that flower and set seeds many times before dying.',
        wiki: 'https://en.wikipedia.org/wiki/Polycarpic'
    },
    {
        term: 'Apical dominance',
        definition: 'Phenomenon whereby the main, central stem of the plant is dominant over other side stems; on a branch the main stem of the branch is further dominant over its own side branchlets.',
        wiki: 'https://en.wikipedia.org/wiki/Apical_dominance'
    },
    {
        term: 'Monopodial',
        definition: '(Vascular plants) that grow upward from a single point, adding leaves to the apex each year with the stem growing longer accordingly.',
        wiki: 'https://en.wikipedia.org/wiki/Monopodial'
    },
    {
        term: 'Fascicle',
        definition: 'A bundle of leaves or flowers growing crowded together.',
        wiki: 'https://en.wikipedia.org/wiki/Fascicle_(botany)'
    },
    {
        term: 'Decussate',
        definition: '(Of opposite leaves) where successive leaf pairs are at right angles.',
        wiki: 'https://en.wikipedia.org/wiki/Decussation'
    },
    {
        term: 'Pyrophytic',
        definition: 'Species benefiting from the effects of fire e.g pine cone bursting (Aleppo Pine, Lodgepole Pine, European Black Pine).',
        wiki: 'https://en.wikipedia.org/wiki/Pyrophyte'
    },
    {
        term: 'Serotinous',
        definition: 'Releasing seeds in response to an environmental trigger.',
        wiki: 'https://en.wikipedia.org/wiki/Serotiny'
    },
];