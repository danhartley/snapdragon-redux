const symbionts = [
    {
        type: ['pollination'],
        plant: { name: "Foeniculum vulgare", taxon:'species'},
        animal: { name: "Papilio machaon", taxon:'species'} 
    },
    {
        type: ['pollination'],
        plant: {name: "Foeniculum vulgare", taxon:'species' },
        animal: {name: "Amphipyra tragopoginis", taxon:'species'}        
    },
    {
        type: ['pollination'],
        plant: {name: "Pastinaca sativa", taxon:'species' },
        animal: {name: "Amphipyra tragopoginis", taxon:'species'}        
    },
    {
        type: ['pollination', 'pollen', 'shelter'],
        plant: {name: "Ficus carica", taxon:'species'},
        animal: {name: "Blastophaga psenes", taxon:'species'}        
    },
    {
        type: ['pollination'],
        plant: {name: 'Apiaceae', taxon: 'family'},
        animal: {name: 'Papilio polyxenes', taxon:'species'}
    },
    {
        type: ['pollination'],
        plant: {name: 'Apiaceae', taxon: 'family'},
        animal: {name: 'Xylocopinae', taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant: {name: 'Apiaceae', taxon: 'family'},
        animal: {name: 'Megachilidae', taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant: {name: 'Apiaceae', taxon: 'family'},
        animal: {name: 'Osmia', taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant: {name:'Trifolium pratense',taxon:'species'},
        animal: {name: 'Bombus terrestris', taxon:'species'}
    },
    {
        type: ['pollination'],
        plant: {name:'Primula veris', taxon:'species'},
        animal: {name:'Bombus terrestris', taxon:'species'}
    },
    {
        type: ['pollination'],
        plant: {name:'Brassica napus', taxon:'species'},
        animal: {name:'Bombus terrestris', taxon:'species'}
    },
    {
        type: ['pollination'],
        plant: {name:'Campanula rotundifolia',taxon:'species'},
        animal: {name:'Hylaeus',taxon:'genus'}        
    },
    {
        type: ['pollination'],
        plant: {name:'multiple'},
        animal: {name:'Bombus insularis',type:'species'}
    },
    {
        type: ['pollination'],
        plant: {name:'multiple'},
        animal: {name:'Osmia lignaria',taxon:'species'}
    },
    {
        type: ['pollination'],
        plant: {name:'Borago officinalis',taxon:'species'},
        animal: {name:'Bombus pascuorum',taxon:'species'} 
    },
    {
        type: ['pollination'],
        plant: {name:'Borago officinalis',taxon:'species'},
        animal: {name:'Bombus pratorum',taxon:'species'} 
    },
    {
        type: ['pollination'],
        plant: {name:'Borago officinalis',taxon:'species'},
        animal: {name:'Bombus terrestris',taxon:'species'} 
    },
    {
        type: ['pollination'],
        plant: {name:'Borago officinalis',taxon:'species'},
        animal: {name:'Bombus lucorum',taxon:'species'} 
    },
    {
        type: 'pollinator',        
        plant: 'Lamiaceae',
        taxon: 'family'
    },
    {
        type: ['pollination'],
        plant: {name:'Tanacetum vulgare',taxon:'species'},
        animal: {name:'Apidae',taxon:'family'}        
    },
    {
        type: ['pollination'],
        plant: {name:'Helichrysum italicum',taxon:'species'},
        animal: {name:'Apidae',taxon:'family'}
    },
    {
        type: ['pollination'],
        plant: {name:'Allium schoenoprasum',taxon:'species'},
        animal: {name:'Apidae',taxon:'family'}       
    },
    {
        type: ['pollination'],
        plant:{name:'Angelica archangelica',taxon:'species'},
        animal: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['pollination'],
        plant:{name:'Foeniculum vulgare',taxon:'species'},
        animal: {name:'Apidae',taxon:'family'}    
    },
    {
        type: ['pollination'],
        plant:{name:'Thymus vulgaris',taxon:'species'},
        animal: {name:'Apidae',taxon:'family'}
    },
    {
        type: ['pollination'],
        plant:{name:'Foeniculum vulgare',taxon:'species'},
        animal: {name:'Syrphidae',taxon:'family'}    
    },
    {
        type: ['pollination'],
        plant:{name:'Salvia officinalis',taxon:'species'},
        animal: {name:'Bombus hortorum',taxon:'species'}    
    },
    {
        type: ['pollination'],
        plant:{name:'Digitalis purpurea',taxon:'species'},
        animal: {name:'Bombus hortorum',taxon:'species'}    
    },
    {
        type: ['pollination'],
        plant:{name:'Hyssopus officinalis',taxon:'species'},
        animal: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['pollination'],
        plant:{name:'Origanum vulgare',taxon:'species'},
        animal: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['pollination'],
        plant:{name:'Papaver rhoeas',taxon:'species'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant:{name:'Papaver rhoeas',taxon:'species'},
        animal: {name:'Xylocopa',taxon:'genus'}
    },
    {
        type: ['pollination', 'pollen'],
        plant:{name:'Papaver rhoeas',taxon:'species'},
        animal: {name:'Osmia',taxon:'family'}
    },
    {
        type: ['pollination'],
        plant:{name:'Campanula',taxon:'genus'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant:{name:'Lamium',taxon:'genus'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant:{name:'Trifolium',taxon:'genus'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination', 'forage'],
        plant:{name:'Rosmarinus officinalis',taxon:'species'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant:{name:'Carduus',taxon:'genus'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination', 'nectar'],
        plant:{name:'Geranium',taxon:'genus'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination', 'nectar'],
        plant:{name:'Ribes',taxon:'genus'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination', 'pollen'],
        plant:{name:'Rosa',taxon:'genus'},
        animal: {name:'Bombus',taxon:'genus'}
    },
    {
        type: ['pollination'],
        plant:{name:'Erica',taxon:'genus'},
        animal: {name:'Apidae',taxon:'family'}
    },
    {
        type: ['pollination', 'nectar'],
        plant:{name:'Menth',taxon:'genus'},
        animal: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['pollination', 'nectar'],
        plant:{name:'Lavendula',taxon:'genus'},
        animal: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['pollination', 'nectar'],
        plant:{name:'Pulicaria dysenterica',taxon:'species'},
        animal: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['pollination', 'nectar', 'shelter'],
        plant:{name:'Hedera helix',taxon:'species'},
        animal: {name:'Apidae',taxon:'family'}
    },
    {
        type: ['pollination'],
        plant:{name:'Rutaceae',taxon:'family'},
        animal: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['predation'],
        predator:{name:'Erinaceinae',taxon:'subfamily'},
        target: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['predation'],
        predator:{name:'Coccinellidae',taxon:'family'},
        target: {name:'Insecta',taxon:'class'}
    },
    {
        type: ['predation'],
        predator:{name:'Coccinellidae',taxon:'family'},
        target: {name:'Aphidoidea',taxon:'superfamily'}
    },
    {
        type: ['predation'],
        predator:{name:'Coccinellidae',taxon:'family'},
        target: {name:'Coccoidea',taxon:'superfamily'}
    },
    {
        type: ['predation'],
        predator:{name:'Apocrita',taxon:'suborder'},
        target: {name:'Aphidoidea',taxon:'superfamily'}
    },
    {
        type: ['predation'],
        predator:{name:'Encarsia formosa',taxon:'species'},
        target: {name:'Trialeurodes vaporariorum',taxon:'species'}
    },
    {
        type: ['predation'],
        predator:{name:'Nematoda',taxon:'phylum'},
        target: {name:'Trialeurodes vaporariorum',taxon:'species'}
    },
    {
        type: ['predation'],
        predator:{name:'Nematoda',taxon:'phylum'},
        target:{name:'Noctuidae',taxon:'family'},
    },
    {
        type: ['predation'],
        predator:{name:'Gliocladium roseum',taxon:'species'},
        target:{name:'Nematoda',taxon:'phylum'},
    },
    {
        type: ['predation'],
        predator:{name:'Calendula officinalis',taxon:'species'},
        target:{name:'Nematoda',taxon:'phylum'},
    },
];