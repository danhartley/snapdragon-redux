//https://en.wikipedia.org/wiki/List_of_crop_plants_pollinated_by_bees

const symbionts = [
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Pastinaca sativa' ], taxon: 'species' },
        animals: [{names: [ 'Amphipyra tragopoginis' ] ,taxon: 'species' }]       
    },
    {
        type: [ 'pollination', 'pollen', 'shelter' ],
        plant: { names: [ 'Ficus carica' ], taxon: 'species' },
        animals: [{names: [ 'Blastophaga psenes' ], taxon: 'species' }]       
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Apiaceae' ], taxon: 'family' },
        animals: [
            { names: [ 'Xylocopinae', 'Megachilidae', 'Osmia' ], taxon: 'genus' },
            { names: [ 'Papilio polyxenes' ], taxon: 'species' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Trifolium pratense' ], taxon: 'species' },
        animals: [{names: [ 'Bombus terrestris' ], taxon: 'species' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Primula veris' ], taxon: 'species' },
        animals: [{names: [ 'Bombus terrestris' ], taxon: 'species' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Brassica napus' ], taxon: 'species' },
        animals: [{names: [ 'Bombus terrestris' ], taxon: 'species' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Campanula rotundifolia' ], taxon: 'species' },
        animals: [{names: [ 'Hylaeus' ], taxon: 'genus' }]     
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'multiple' ] },
        animals: [{names: [ 'Bombus insularis' ], type: 'species' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'multiple' ] },
        animals: [{names: [ 'Osmia lignaria' ], taxon: 'species' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Borago officinalis' ], taxon: 'species' },
        animals: [{names: [ 'Bombus pascuorum', 'Bombus pratorum', 'Bombus terrestris', 'Bombus lucorum' ], taxon: 'species' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Tanacetum vulgare' ], taxon: 'species' },
        animals: [{names: [ 'Apidae' ], taxon: 'family' }]      
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Helichrysum italicum' ], taxon: 'species' },
        animals: [{names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Allium schoenoprasum' ], taxon: 'species' },
        animals: [{names: [ 'Apidae' ], taxon: 'family' }]   
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Angelica archangelica' ], taxon: 'species' },
        animals: [{names: [ 'Insecta' ], taxon: 'class' }]
    },    
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Thymus vulgaris' ], taxon: 'species' },
        animals: [{names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Salvia officinalis' ], taxon: 'species' },
        animals: [{names: [ 'Bombus hortorum' ], taxon: 'species' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Lamiaceae' ], taxon: 'family' },
        animals: [
            {names: [ 'Insecta' ], taxon: 'class' },
            {names: [ 'Bombus' ], taxon: 'genus' },
            {names: [ 'Apidae' ], taxon: 'family' },
            {names: [ 'Bombus hortorum' ], taxon: 'species' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Digitalis purpurea' ], taxon: 'species' },
        animals: [{names: [ 'Bombus hortorum' ], taxon: 'species' }] 
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Hyssopus officinalis' ], taxon: 'species' },
        animals: [{names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Origanum vulgare' ], taxon: 'species' },
        animals: [{names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Papaver rhoeas' ], taxon: 'species' },
        animals: [{names: [ 'Bombus', 'Xylocopa' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination', 'pollen' ],
        plant: { names: [ 'Papaver rhoeas' ], taxon: 'species' },
        animals: [{names: [ 'Osmia' ], taxon: 'family' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Campanula' ], taxon: 'genus' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Lamium' ], taxon: 'genus' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Trifolium' ], taxon: 'genus' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination', 'forage' ],
        plant: { names: [ 'Rosmarinus officinalis' ], taxon: 'species' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Carduus' ], taxon: 'genus' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Geranium' ], taxon: 'genus' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Ribes' ], taxon: 'genus' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination', 'pollen' ],
        plant: { names: [ 'Rosa' ], taxon: 'genus' },
        animals: [{names: [ 'Bombus' ], taxon: 'genus' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Erica' ], taxon: 'genus' },
        animals: [{names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Menth' ], taxon: 'genus' },
        animals: [{names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Lavendula' ], taxon: 'genus' },
        animals: [{names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Pulicaria dysenterica' ], taxon: 'species' },
        animals: [{names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ 'pollination', 'nectar', 'shelter' ],
        plant: { names: [ 'Hedera helix' ], taxon: 'species' },
        animals: [{names: [ 'Apidae' ], taxon: 'family' }]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Rutaceae' ], taxon: 'family' },
        animal: [{ names: [ 'Insecta' ], taxon: 'class' }]
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Erinaceinae' ], taxon: 'subfamily' },
        target: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Coccinellidae' ], taxon: 'family' },
        target: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Coccinellidae' ], taxon: 'family' },
        target: { names: [ 'Aphidoidea', 'Coccoidea' ], taxon: 'superfamily' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Apocrita' ], taxon: 'suborder' },
        target: { names: [ 'Aphidoidea' ], taxon: 'superfamily' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Encarsia formosa' ], taxon: 'species' },
        target: { names: [ 'Trialeurodes vaporariorum' ], taxon: 'species' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Nematoda' ], taxon: 'phylum' },
        target: { names: [ 'Trialeurodes vaporariorum' ], taxon: 'species' }
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Nematoda' ], taxon: 'phylum' },
        target:{ names: [ 'Noctuidae' ], taxon: 'family' },
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Gliocladium roseum' ], taxon: 'species' },
        target:{ names: [ 'Nematoda' ], taxon: 'phylum' },
    },
    {
        type: [ 'predation' ],
        predator:{ names: [ 'Calendula officinalis' ], taxon: 'species' },
        target:{ names: [ 'Nematoda' ], taxon: 'phylum' },
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Solanum tuberosum' ], taxon: 'species' },
        animals: [ 
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Apoidea' ], taxon: 'superfamily' } 
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Allium cepa' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Calliphoridae' ], taxon: 'family' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Apium graveolens' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Beta vulgaris' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { namess: [ 'Xylocopa' ], taxon: 'genus' },
            { namess: [ 'Megachile' ], taxon: 'genus' },
            { namess: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Capsicum annuum' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Brassica nigra' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    { 
        type: [ 'pollination' ],
        plant: { names: [ 'Brassica oleracea' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Brassica rapa' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Carum carvi' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Daucus carota' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Malus domestica' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Osmia lignaria' ], taxon: 'species' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Vicia faba' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Solanum melongena' ], taxon: 'species' },
        animals: [
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Solanum lycopersicum' ], taxon: 'species' },
        animals: [
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Prunus domestica' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Prunus persica' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Prunus dulcis' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Prunus avium' ], taxon: 'species' },
        animals: [{
             names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Diptera' ], taxon: 'order' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Pyrus communis' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Rubus fruticosus' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Bombus' ], taxon: 'genus' },
            { names: [ 'Syrphidae' ], taxon: 'family' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Foeniculum vulgare' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Papilio machaon', 'Amphipyra tragopoginis' ], taxon: 'species' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Coriandrum sativum' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Cucumis sativus' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Peponapis' ], taxon: 'genus' },
            { names: [ 'Xenoglossa' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Cucurbita pepo' ], taxon: 'species' },
        animals: [
            { names: [ 'Apis' ], taxon: 'genus' },
            { names: [ 'Xylocopa' ], taxon: 'genus' },
            { names: [ 'Megachile' ], taxon: 'genus' },
            { names: [ 'Osmia' ], taxon: 'genus' },
            { names: [ 'Peponapis' ], taxon: 'genus' },
            { names: [ 'Xenoglossa' ], taxon: 'genus' }
        ]
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Citrus limon' ], taxon: 'species' },
        animals: [{ names: [ 'Apis' ], taxon: 'genus' }]
    },
];