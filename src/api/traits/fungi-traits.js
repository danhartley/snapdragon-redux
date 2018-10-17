import * as SD from 'api/snapdragon/trait-types';

export const fungiDescriptions = [
    {
        ids: ['Cantharellus cibarius', 'Omphalotus olearius', 'Hygrophoropsis aurantiaca'],
        type: 'lookalike',
        description: 'The false chanterelle (Hygrophoropsis aurantiaca) has a similar appearance and can be confused with the chanterelle. Distinguishing factors are color (the true chanterelle is uniform egg-yellow, while the false chanterelle is more orange in hue and graded, with darker center) and attachment of gills to the stem (the true chanterelle has ridges or wrinkles, which can be quite deep, but not true gills).'
    },
    {
        ids: ['Morchella esculenta', 'Gyromitra esculenta'],
        type: 'lookalike',
        description: 'The false morel (Gyromitra esculenta) has a wrinkled or cerebral appearance, the ridges and pit of the true morel ressemble honeycomb. The cap of the false morel is reddish-brown, purplish-brown or dark brown. Only the true morel has a hollow stem.'
    },
];

export const fungiTraits = [
    { name: 'Agaricus bisporus', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "brown", language: 'en' },
        { name: 'stipe character', value : "ring", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ ''] }
    ]},
    { name: 'Amanita virosa', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value : SD.howEdible.DEADLY, language: 'en', description: 'highly poisonous even in small quantities; symptoms delayed' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "ring and volva", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
        { name: 'flesh', value : "pure white", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.habitats.MIXED_WOODLAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.DECIDUOUS, SD.treeTypes.CONIFERS ] },
    ]},
    { name: 'Mycena rosea', traits: [
        { name: 'cap shape', value: SD.capShape.CONICAL, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value : SD.howEdible.POISONOUS, language: 'en', description: 'contains small amounts of muscarine' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "adnate", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND] },
        { name: 'symbionts', values: [ SD.treeTypes.DECIDUOUS ] },
    ]},
    { name: 'Clitocybe odora', traits: [
        { name: 'cap shape', value: SD.capShape.FLAT, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.EDIBLE, language: 'en', description: 'aniseed flavour' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND] },
        { name: 'symbionts', values: [ SD.treeTypes.DECIDUOUS ] },
    ]},
    { name: 'Amanita pantherina', traits: [
        { name: 'cap shape', value: SD.capShape.FLAT, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value : SD.howEdible.POISONOUS, language: 'en', description: 'sickness and hallucinations' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "ring and volva", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.BEECH ] },
    ]},
    { name: 'Boletus edulis', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en', description: 'tasty; high in protein, vitamins, minerals and fibre' },
        { name: 'hymenium type', value : "pores", language: 'en' },
        { name: 'spore print colour', value : "brown", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "adnate", language: 'en' },
        { name: 'flesh', value : "white, yellowing", language: 'en' }
    ], context: [
        { name: 'look-alikes', values: [ 'Tylopilus felleus' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND ]},
        { name: 'symbionts', values: [ SD.treeTypes.OAK, SD.treeTypes.BEECH, SD.treeTypes.PINE, SD.treeTypes.CHESTNUT, SD.treeTypes.CORK] }
    ]},
    { name: 'Amanita muscaria', traits: [
        { name: 'cap shape', value: SD.capShape.FLAT, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value : SD.howEdible.POISONOUS, language: 'en', description: 'deadly in quantity' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "ring and volva", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.habitats.MIXED_WOODLAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.BEECH, SD.treeTypes.PINE, SD.treeTypes.BIRCH, SD.treeTypes.DECIDUOUS, SD.treeTypes.CONIFERS ] },
    ]},
    { name: 'Laccaria amethystina', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.EDIBLE, language: 'en', description: 'not particularly tasty' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.ELDER, SD.treeTypes.DECIDUOUS ] },
    ]},
    { name: 'Scleroderma citrinum', traits: [
        { name: 'cap shape', value: SD.capShape.POTATO_SHAPED, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value : SD.howEdible.POISONOUS, language: 'en', description: 'significant stomach upsets' },
        { name: 'hymenium type', value : "gleba", language: 'en' },
        { name: 'spore print colour', value : "brown, purple-black", language: 'en' },
        { name: 'stipe character', value : "NA", language: 'en' },
        { name: 'gill attachment', value : "NA", language: 'en' },
        { name: 'flesh', value : "off-white, purple, black", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Lycoperdon perlatum' ]},
        { name: 'ecology', values: [ SD.habitats.COMMONS, SD.habitats.PASTURE, SD.habitats.HEATH, SD.treeTypes.MIXED_WOODLAND] },
        { name: 'symbionts', values: [ ] },
    ]},
    { name: 'Auricularia auricula-judae', traits: [
        { name: 'cap shape', value: SD.capShape.NA, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.EDIBLE, language: 'en', description: 'common in Chinese hot and sour soup' },
        { name: 'hymenium type', value : "smooth", language: 'en' },
        { name: 'spore print colour', value : "white, cream", language: 'en' },
        { name: 'stipe character', value : "none or very short", language: 'en' },
        { name: 'gill attachment', value : "NA", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.ELDER, SD.treeTypes.SYCAMORE, SD.treeTypes.BEECH, SD.treeTypes.ASH, SD.treeTypes.DECIDUOUS ] },
    ]},
    { name: 'Coprinus comatus', traits: [
        { name: 'cap shape', value: SD.capShape.CONICAL, language: 'en' },
        { name: 'cap colour', value: 'white, white scales', language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en', description: 'mild flavour' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "black", language: 'en' },
        { name: 'stipe character', value : "ring", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
        { name: 'flesh', value : "white", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Coprinopsis picacea' ]},
        { name: 'ecology', values: [ SD.habitats.WASTELAND, SD.habitats.LAWNS ] },
        { name: 'symbionts', values: [] },  
    ]},
    { name: 'Coprinopsis picacea', traits: [
        { name: 'cap shape', value: SD.capShape.CONICAL, language: 'en' },
        { name: 'cap colour', value: 'black, white scales', language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.POISONOUS, language: 'en', description: 'mild flavour' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "black", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
        { name: 'flesh', value : "white", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Coprinus comatus' ]},       
        { name: 'ecology', values: [] },
        { name: 'symbionts', values: [] },   
    ]},
    { name: 'Grifola frondosa', traits: [
        { name: 'cap shape', value: SD.capShape.OFFSET, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.PARASITIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "pores", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "NA", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Meripilus giganteus' ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND ] },
        { name: 'symbionts', values: [SD.treeTypes.OAK, SD.treeTypes.DECIDUOUS] },  
    ]},
    { name: 'Amanita phalloides', traits: [
        { name: 'cap shape', value: `${SD.capShape.FLAT}, ${SD.capShape.CONVEX}`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.DEADLY, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "ring and volva", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Amanita caesarea', 'Tricholoma equestre', 'Amanita muscaria' ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND ] },
        { name: 'symbionts', values: [SD.treeTypes.OAK, SD.treeTypes.PINE, SD.treeTypes.CHESTNUT] },  
    ]},
    { name: 'Lycoperdon pyriforme', traits: [
        { name: 'cap shape', value: `${SD.capShape.SPHERICAL}, ${SD.capShape.PEAR_SHAPED}`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gleba", language: 'en' },
        { name: 'spore print colour', value : "white, browning", language: 'en' },
        { name: 'stipe character', value : "short, stumpy", language: 'en' },
        { name: 'gill attachment', value : "NA", language: 'en' },
        { name: 'grouping', value : "gregarious, numerous", language: 'en' },        
        { name: 'smell', value : "unpleasant, gas-like", language: 'en' },        
    ], context: [
        { name: 'look-alikes', values: [ 'Scleroderma citrinum', 'Amanita muscaria']},
        { name: 'ecology', values: [ SD.habitats.DEAD_WOOD ] },
        { name: 'symbionts', values: [SD.treeTypes.DECIDUOUS, SD.treeTypes.CONIFERS] },  
    ]},
    { name: 'Lycoperdon perlatum', traits: [
        { name: 'cap shape', value: `${SD.capShape.SPHERICAL}, ${SD.capShape.PEAR_SHAPED}`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.EDIBLE, language: 'en' },
        { name: 'hymenium type', value : "gleba", language: 'en' },
        { name: 'spore print colour', value : "olive, brown", language: 'en' },
        { name: 'stipe character', value : "club-like, with warts", language: 'en' },
        { name: 'gill attachment', value : "NA", language: 'en' },
        { name: 'flesh', value : "white, browning", language: 'en' },
        { name: 'grouping', value : "usually gregarious", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Scleroderma citrinum', 'Amanita muscaria' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND] },
        { name: 'symbionts', values: [SD.treeTypes.DECIDUOUS] },  
    ]},
    { name: 'Pleurotus ostreatus', traits: [
        { name: 'cap shape', value: SD.capShape.OFFSET, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white, lilac", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
        { name: 'flesh', value : "white, tough in stem", language: 'en' },
        { name: 'smell', value : "mushroomy", language: 'en' },
        { name: 'grouping', value : "large clusters", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ ]},
        { name: 'ecology', values: [ SD.habitats.MIXED_WOODLAND] },
        { name: 'symbionts', values: [SD.habitats.DEAD_WOOD, SD.treeTypes.BEECH, SD.treeTypes.DECIDUOUS] },  
    ]},
    { name: 'Hericium erinaceus', traits: [
        { name: 'cap shape', value: SD.capShape.NA, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.PARASITIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "teeth", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "NA", language: 'en' },
        { name: 'gill attachment', value : "NA", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ ]},
        { name: 'ecology', values: [SD.treeTypes.BEECH] },
        { name: 'symbionts', values: [] },  
    ]},
    { name: 'Laetiporus sulphureus', traits: [
        { name: 'cap shape', value: SD.capShape.FLAT, language: 'en' },
        { name: 'ecological type', value: `${SD.ecoType.SAPROTROPHIC}, ${SD.ecoType.PARASITIC}`, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "pores", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "NA", language: 'en' },
        { name: 'gill attachment', value : "no", language: 'en' },
        { name: 'flesh', value : "yellow, orange, white", language: 'en' },
        { name: 'grouping', value : "large groups", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: ['Polyporus squamosus', 'Meripilus giganteus', 'Laetiporus huroniensis', 'Laetiporus gilbertsonii' ]},
        { name: 'ecology', values: [SD.habitats.DEAD_WOOD, SD.treeTypes.HARDWOODS, SD.treeTypes.BEECH, SD.treeTypes.OAK, SD.treeTypes.PRUNUS, SD.treeTypes.SALIX, SD.treeTypes.ROBINIA, SD.treeTypes.EUCALYPTUS, SD.treeTypes.CERATONIA] },
        { name: 'symbionts', values: [] },  
    ]},
    { name: 'Craterellus cornucopioides', traits: [
        { name: 'cap shape', value: SD.capShape.INFUNDIBULIFORM, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "ridges", language: 'en' },
        { name: 'spore print colour', value : "buff, cream", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND_LITTER, SD.treeTypes.BEECH, SD.treeTypes.OAK, SD.treeTypes.BROAD_LEAF ] },
        { name: 'symbionts', values: [ ] },
    ]},
    { name: 'Gyromitra esculenta', traits: [
        { name: 'cap shape', value: `${SD.capShape.CONVEX}, ${SD.capShape.BRAIN_LIKE}`, language: 'en' },
        { name: 'ecological type', value: `${SD.ecoType.MYCORRHIZAL}, ${SD.ecoType.PARASITIC}`, language: 'en' },
        { name: 'how edible', value: SD.howEdible.DEADLY, language: 'en' },
        { name: 'hymenium type', value : "smooth", language: 'en' },
        { name: 'spore print colour', value : "buff, yellow", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "NA", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Morchella esculenta' ]},
        { name: 'ecology', values: [ SD.habitats.WASTELAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.ELM, SD.treeTypes.ASH, SD.treeTypes.PINE, SD.treeTypes.BEECH, SD.treeTypes.SYCAMORE ] },
    ]},
    { name: 'Omphalotus olearius', traits: [
        { name: 'cap shape', value: SD.capShape.INFUNDIBULIFORM, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value : SD.howEdible.POISONOUS, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "yellow", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
        { name: 'grouping', value : "clusters", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Cantharellus cibarius', 'Hygrophoropsis aurantiaca' ]},
        { name: 'ecology', values: [ SD.habitats.ROOTS, SD.habitats.DEAD_WOOD ] },
    ]},
    { name: 'Amanita rubescens', traits: [
        { name: 'cap shape', value: SD.capShape.INFUNDIBULIFORM, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value : SD.howEdible.POISONOUS, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "yellow", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Macrolepiota procera' ]},     
        { name: 'ecology', values: [ SD.treeTypes.DECIDUOUS ] },
        { name: 'symbionts', values: [ SD.treeTypes.CONIFERS ] }
    ]},
    { name: 'Cantharellus cibarius', traits: [
        { name: 'cap shape', value: SD.capShape.INFUNDIBULIFORM, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "ridges", language: 'en' },
        { name: 'spore print colour', value : "yellow, cream", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
        { name: 'flesh', value : "white", language: 'en' },
        { name: 'smell', value : "fruity", language: 'en' },
        { name: 'vitamins', value : "C, D", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Omphalotus olearius', 'Omphalotus illudens', 'Hygrophoropsis aurantiaca' ] },
        { name: 'ecology', values: [ SD.habitats.MOSS ] },
        { name: 'symbionts', values: [ SD.treeTypes.OAK, SD.treeTypes.BEECH, SD.treeTypes.BIRCH ] }
    ]},
    { name: 'Hygrophoropsis aurantiaca', traits: [
        { name: 'cap shape', value: `${SD.capShape.INFUNDIBULIFORM}, ${SD.capShape.INFUNDIBULIFORM}`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.INEDIBLE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white, cream", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
        { name: 'flesh', value : "as cap", language: 'en' }
    ], context: [
        { name: 'look-alikes', values: [ 'Cantharellus cibarius' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.OAK, SD.treeTypes.BEECH, SD.treeTypes.BIRCH] }
    ]},
    { name: 'Agaricus xanthodermus', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value : SD.howEdible.POISONOUS, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "brown", language: 'en' },
        { name: 'stipe character', value : "ring", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
        { name: 'flesh', value : "white, bruising yellow", language: 'en' },
        { name: 'smell', value : "iodine, ink", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Agaricus campestris' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND, SD.habitats.GRASSLAND, SD.habitats.HEDGEROWS ] }
    ]},
    { name: 'Clitocybe rivulosa', traits: [
        { name: 'cap shape', value: SD.capShape.DEPRESSED, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.DEADLY, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Marasmius oreades' ]},
        { name: 'ecology', values: [ SD.habitats.LAWNS, SD.habitats.MEADOW ] },
        { name: 'symbionts', values: [ ] }
    ]},
    { name: 'Agaricus campestris', traits: [
        { name: 'cap shape', value: `${SD.capShape.FLAT}, ${SD.capShape.CONVEX}`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "chocolate brown", language: 'en' },
        { name: 'stipe character', value : "ring", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
        { name: 'flesh', value : "white, bruising pink", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Agaricus xanthodermus' ]},
        { name: 'ecology', values: [ SD.habitats.PASTURE, SD.habitats.MEADOW, SD.habitats.WASTELAND, SD.habitats.FIELDS ] }
    ]},
    { name: 'Marasmius oreades', traits: [
        { name: 'cap shape', value: `${SD.capShape.CONVEX}, ${SD.capShape.UMBONATE}`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "adnate", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Clitocybe rivulosa' ]},
        { name: 'ecology', values: [ SD.habitats.LAWNS, SD.habitats.MEADOW, SD.habitats.FIELDS, SD.habitats.DUNES ] },
        { name: 'symbionts', values: [ ] }
    ]},
    { name: 'Morchella esculenta', traits: [
        { name: 'cap shape', value: `${SD.capShape.CONICAL}, ${SD.capShape.OVATE}, ${SD.capShape.HONEYCOMB}`, language: 'en' },
        { name: 'ecological type', value: `${SD.ecoType.SAPROTROPHIC}, ${SD.ecoType.MYCORRHIZAL}`, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "smooth", language: 'en' },
        { name: 'spore print colour', value : "yellow", language: 'en' },
        { name: 'stipe character', value : "bare, hollow", language: 'en' },
        { name: 'gill attachment', value : "no", language: 'en' },
        { name: 'flesh', value : "thin, white", language: 'en' },
        { name: 'grouping', value : "scattered clusters", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Gyromitra esculenta' ]},
        { name: 'ecology', values: [ SD.habitats.ORCHARDS, SD.habitats.WOODLAND, SD.habitats.WASTELAND ] },
        { name: 'symbionts', values: [ SD.treeTypes.ELM, SD.treeTypes.ASH, SD.treeTypes.PINE, SD.treeTypes.BEECH, SD.treeTypes.SYCAMORE ] }
    ]},
    { name: 'Tylopilus felleus', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value : SD.howEdible.INEDIBLE, language: 'en' },
        { name: 'hymenium type', value : "pores", language: 'en' },
        { name: 'spore print colour', value : "pink, buff", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "adnate", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Boletus edulis' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND ]},
        { name: 'symbionts', values: [ SD.treeTypes.OAK, SD.treeTypes.BEECH] }
    ]},
    { name: 'Lactarius sanguifluus', traits: [
        { name: 'cap shape', value: SD.capShape.DEPRESSED, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "tan", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.treeTypes.CONIFERS, SD.habitats.DUNES ]},
        { name: 'symbionts', values: [ SD.treeTypes.PINE, 'Pseudotsuga menziesii', 'Onychium contiguum'] }
    ]},
    { name: 'Macrolepiota procera', traits: [
        { name: 'cap shape', value: SD.capShape.UMBONATE, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "ring", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Amanita rubescens', 'Amanitas', 'Posinous Lepiotas' ]},
    ]},
    { name: 'Amanita caesarea', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "ring and volva", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Amanita phalloides', 'Amanita muscaria' ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND ] },
        { name: 'symbionts', values: [SD.treeTypes.OAK, SD.treeTypes.CONIFERS, SD.treeTypes.PINE, SD.treeTypes.CHESTNUT] },  
    ]},
    { name: 'Lactarius deliciosus', traits: [
        { name: 'cap shape', value: SD.capShape.DEPRESSED, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "tan", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND ] },
        { name: 'symbionts', values: [SD.treeTypes.PINE, SD.treeTypes.CONIFERS] },  
    ]},
    { name: 'Fistulina hepatica', traits: [
        { name: 'cap shape', value: SD.capShape.FLAT, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.PARASITIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.EDIBLE, language: 'en' },
        { name: 'hymenium type', value : "pores", language: 'en' },
        { name: 'spore print colour', value : "pink", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ '' ]},
        { name: 'ecology', values: [ SD.habitats.DEAD_WOOD, SD.habitats.WOOD ] },
        { name: 'symbionts', values: [SD.treeTypes.OAK, SD.treeTypes.SWEET_CHESTNUT, SD.treeTypes.EUCALYPTUS, SD.treeTypes.POPLAR, SD.treeTypes.BIRCH] },  
    ]},
    { name: 'Chlorophyllum rhacodes', traits: [
        { name: 'cap shape', value: `${SD.capShape.CONVEX}, ${SD.capShape.UMBONATE}` , language: 'en' },
        { name: 'ecological type', value: SD.ecoType.SAPROTROPHIC, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "ring", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
    ]},
    { name: 'Amanita ponderosa', traits: [
        { name: 'cap shape', value: `${SD.capShape.HEMI_SPHERICAL}, ${SD.capShape.CONVEX}, ${SD.capShape.FLAT}`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "pink", language: 'en' },
        { name: 'stipe character', value : "ring and volva", language: 'en' },
        { name: 'gill attachment', value : "free", language: 'en' },
        { name: 'smell', value : "earthy", language: 'en' },
        { name: 'flesh', value : "white", language: 'en' },
        { name: 'contact air', value : "pinkish", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ 'Amanita phalloides' , 'Amanita curtipes', 'Amanita verna' ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND ] },
        { name: 'symbionts', values: [SD.treeTypes.OAK, SD.treeTypes.CORK, SD.treeTypes.PINE, SD.treeTypes.EUCALYPTUS] },  
    ]},
    { name: 'Tricholoma equestre', traits: [
        { name: 'cap shape', value: `${SD.capShape.FLAT}`, language: 'en' },
        { name: 'cap colour', value: `yellow, yellow-green, brown`, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.POISONOUS, language: 'en' },
        { name: 'hymenium type', value : "gills", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'stipe colour', value : "yellow", language: 'en' },
        { name: 'gill attachment', value : "adnexed", language: 'en' },
        { name: 'gill colour', value : "yellow", language: 'en' },
    ], context: [
        { name: 'look-alikes', values: [ ]},
        { name: 'ecology', values: [ SD.habitats.WOODLAND ] },
        { name: 'symbionts', values: [] },  
    ]},
    { name: 'Boletus pinophilus', traits: [
        { name: 'cap shape', value: SD.capShape.CONVEX, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.EDIBLE, language: 'en'},
        { name: 'hymenium type', value : "pores", language: 'en' },
        { name: 'spore print colour', value : "olive-brown", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "adnexed", language: 'en' },
        { name: 'flesh', value : "white, no change on bruising", language: 'en' },
        { name: 'smell', value : "pleasant, pork crackling", language: 'en' }
    ], context: [
        { name: 'look-alikes', values: [ 'Boletus edulis', 'Tylopilus felleus' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND ]},
        { name: 'symbionts', values: [ SD.treeTypes.PINE, SD.treeTypes.FIR, SD.treeTypes.SPRUCE] }
    ]},
    { name: 'Hydnum repandum', traits: [
        { name: 'cap shape', value: SD.capShape.DEPRESSED, language: 'en' },
        { name: 'ecological type', value: SD.ecoType.MYCORRHIZAL, language: 'en' },
        { name: 'how edible', value: SD.howEdible.CHOICE, language: 'en'},
        { name: 'hymenium type', value : "teeth", language: 'en' },
        { name: 'spore print colour', value : "white", language: 'en' },
        { name: 'stipe character', value : "bare", language: 'en' },
        { name: 'gill attachment', value : "decurrent", language: 'en' },
        { name: 'flesh', value : "white, orange on bruising", language: 'en' },
        { name: 'smell', value : "pleasant", language: 'en' }
    ], context: [
        { name: 'look-alikes', values: [ 'Hydnum umbilicatum', 'Hydnum albidum', 'Hydnum albomagnum', 'Hydnum rufescens' ]},
        { name: 'ecology', values: [ SD.treeTypes.MIXED_WOODLAND, SD.habitats.MOSS, SD.habitats.RINGS, SD.habitats.SOIL ]},
        { name: 'symbionts', values: [ SD.treeTypes.CONIFERS, SD.treeTypes.DECIDUOUS] }
    ]},
];