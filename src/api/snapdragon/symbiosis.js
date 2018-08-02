const symbionts = [
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Foeniculum vulgare' ] ,taxon: 'species' },
        animal: { names: [ 'Apidae', 'Syrphidae' ], taxon: 'family' },
        animal: { names: [ 'Papilio machaon', 'Amphipyra tragopoginis' ] ,taxon: 'species' } 
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Pastinaca sativa' ], taxon: 'species' },
        animal: { names: [ 'Amphipyra tragopoginis' ] ,taxon: 'species' }        
    },
    {
        type: [ 'pollination', 'pollen', 'shelter' ],
        plant: { names: [ 'Ficus carica' ], taxon: 'species' },
        animal: { names: [ 'Blastophaga psenes' ], taxon: 'species' }        
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Apiaceae' ], taxon: 'family' },
        animal: { names: [ 'Xylocopinae', 'Megachilidae', 'Osmia' ], taxon: 'genus' },
        animal: { names: [ 'Papilio polyxenes' ], taxon: 'species' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Trifolium pratense' ], taxon: 'species' },
        animal: { names: [ 'Bombus terrestris' ], taxon: 'species' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Primula veris' ], taxon: 'species' },
        animal: { names: [ 'Bombus terrestris' ], taxon: 'species' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Brassica napus' ], taxon: 'species' },
        animal: { names: [ 'Bombus terrestris' ], taxon: 'species' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Campanula rotundifolia' ], taxon: 'species' },
        animal: { names: [ 'Hylaeus' ], taxon: 'genus' }        
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'multiple' ] },
        animal: { names: [ 'Bombus insularis' ], type: 'species' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'multiple' ] },
        animal: { names: [ 'Osmia lignaria' ], taxon: 'species' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Borago officinalis' ], taxon: 'species' },
        animal: { names: [ 'Bombus pascuorum', 'Bombus pratorum', 'Bombus terrestris', 'Bombus lucorum' ], taxon: 'species' } 
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Tanacetum vulgare' ], taxon: 'species' },
        animal: { names: [ 'Apidae' ], taxon: 'family' }        
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Helichrysum italicum' ], taxon: 'species' },
        animal: { names: [ 'Apidae' ], taxon: 'family' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Allium schoenoprasum' ], taxon: 'species' },
        animal: { names: [ 'Apidae' ], taxon: 'family' }       
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Angelica archangelica' ], taxon: 'species' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
    },    
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Thymus vulgaris' ], taxon: 'species' },
        animal: { names: [ 'Apidae' ], taxon: 'family' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Salvia officinalis' ], taxon: 'species' },
        animal: { names: [ 'Bombus hortorum' ], taxon: 'species' }    
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Lamiaceae' ], taxon: 'family' },
        animal: { names: [ 'Insecta' ], taxon: 'class' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' },
        animal: { names: [ 'Apidae' ], taxon: 'family' },
        animal: { names: [ 'Bombus hortorum' ], taxon: 'species' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Digitalis purpurea' ], taxon: 'species' },
        animal: { names: [ 'Bombus hortorum' ], taxon: 'species' }    
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Hyssopus officinalis' ], taxon: 'species' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Origanum vulgare' ], taxon: 'species' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Papaver rhoeas' ], taxon: 'species' },
        animal: { names: [ 'Bombus', 'Xylocopa' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination', 'pollen' ],
        plant: { names: [ 'Papaver rhoeas' ], taxon: 'species' },
        animal: { names: [ 'Osmia' ], taxon: 'family' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Campanula' ], taxon: 'genus' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Lamium' ], taxon: 'genus' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Trifolium' ], taxon: 'genus' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination', 'forage' ],
        plant: { names: [ 'Rosmarinus officinalis' ], taxon: 'species' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Carduus' ], taxon: 'genus' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Geranium' ], taxon: 'genus' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Ribes' ], taxon: 'genus' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination', 'pollen' ],
        plant: { names: [ 'Rosa' ], taxon: 'genus' },
        animal: { names: [ 'Bombus' ], taxon: 'genus' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Erica' ], taxon: 'genus' },
        animal: { names: [ 'Apidae' ], taxon: 'family' }
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Menth' ], taxon: 'genus' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Lavendula' ], taxon: 'genus' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'pollination', 'nectar' ],
        plant: { names: [ 'Pulicaria dysenterica' ], taxon: 'species' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
    },
    {
        type: [ 'pollination', 'nectar', 'shelter' ],
        plant: { names: [ 'Hedera helix' ], taxon: 'species' },
        animal: { names: [ 'Apidae' ], taxon: 'family' }
    },
    {
        type: [ 'pollination' ],
        plant: { names: [ 'Rutaceae' ], taxon: 'family' },
        animal: { names: [ 'Insecta' ], taxon: 'class' }
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
];