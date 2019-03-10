import * as traitEnums from 'api/traits/trait-types';

const getTraits = SD => {    
    return [
    { name: 'Vulpes vulpes',
    symbionts: [
        { id: 'Rodentia' }, { id: 'Lagomorpha' }, { id: 'Reptilia' },
        { id: 'Galliformes' }, { id: 'Rosaceae' }, { id: 'Quercus' },
        { id: 'Passeriformes' }, { id: 'Annelida' }, { id: 'Canis lupus' },
        { id: 'Canis latrans' }, { id: 'Aquila chrysaetos' }, { id: 'Sarcoptes scabiei'},
        { id: 'Oryctolagus cuniculus' }
    ],
    traits: [
        { name: SD.name.YOUNG, value: SD.young.KIT },        
        { name: SD.name.LENGTH, value: '45–90cm' },
        { name: SD.name.TAIL_LENGTH, value: '30-55cm' },
        { name: SD.name.MAX_SPEED, value: '50 km/h' },
        { name: SD.name.MATING, value: `${SD.month.FEBRUARY}` },
        { name: SD.name.SHELTER, value: `${SD.shelter.BURROW}, ${SD.shelter.DEN}, ${SD.habitat.VEGETATION}` },
        { name: SD.name.LITTER_SIZE, value: `4-6` },
        { name: SD.name.LIFE_SPAN, value: '5a' },
        { name: SD.name.WEANING, value: '6-7m' },
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        { name: SD.name.ACTIVE, value: SD.active.CREPUSCULAR },
        { name: SD.name.ACTIVE, value: SD.active.NOCTURNAL },
        { name: SD.name.ALTRICIAL, value: SD.boolean.YES },
        { name: SD.name.FEMALE, value: SD.female.VIXEN },
        { name: SD.name.DISEASE, role: SD.name.HOST, value: 'Sarcoptes scabiei', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Oryctolagus cuniculus`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Rodentia, Lagomorpha`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Reptilia, Galliformes`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Insecta, Gastropoda`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Passeriformes, Annelida`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.HERBIVORE, value: `${SD.foodType.NUTS}, ${SD.foodType.BERRIES}`, type: SD.symbiosis.HERBIVORY },
        { name: SD.name.FOOD, role: SD.name.PREY, value: `Canis lupus, Canis latrans`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: `Aquila chrysaetos`, type: SD.symbiosis.PREDATION },
        { name: SD.name.USAGE, value: `${SD.usage.FUR}`, type: SD.symbiosis.PREDATION },
        { name: SD.name.KIN_SELECTION, value: SD.boolean.YES, type: SD.symbiosis.COMMENSALISM },
    ]
    },
    { name: 'Sciurus vulgaris', 
    symbionts: [ 
        { id: 'Corylus' }, { id: 'Fagus'}, { id: 'Castanea'}, { id: 'Fungi'},
        { id: 'Pinus sylvestris'}, { id: 'Picea abies'}, { id: 'Pinus sibirica'},
        { id: 'Martes martes'}, { id: 'Felis silvestris'}, { id: 'Mustela erminea'},
        { id: 'Strigiformes'}, { id: 'Accipiter gentilis'}, { id: 'Buteo'},
        { id: 'Vulpes vulpes'}, { id: 'Squirrel parapoxvirus'}, { id: 'Sciurus carolinensis'},
    ], 
    traits: [            
        { name: SD.name.HABITAT, value: `${SD.habitat.BOREAL}, ${SD.treeType.CONIFERS}, ${SD.treeType.BROAD_LEAF}`, type: SD.symbiosis.COMMENSALISM },        
        { name: SD.name.LIFE_SPAN, value: '3-7a' },
        { name: SD.name.SHELTER, value: SD.shelter.DREY },
        { name: SD.name.ACTIVE, value: SD.active.CREPUSCULAR },        
        { name: SD.name.SEXUAL_DIMORPHISM, value: SD.boolean.NO },
        { name: SD.name.LENGTH, value: '19-20cm' },
        { name: SD.name.TAIL_LENGTH, value: '9-10cm' },
        { name: SD.name.MATING, value: `${SD.month.FEBRUARY}-${SD.month.MARCH}` },
        { name: SD.name.MATING, value: `${SD.month.JUNE}-${SD.month.JULY}` },
        { name: SD.name.LITTER_SIZE, value: `3` },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '38-39d' },
        { name: SD.name.WEANING, value: '5-7w' },
        { name: SD.name.MATURITY, value: '6-7m' },
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        { name: SD.name.ALTRICIAL, value: SD.boolean.YES },
        { name: SD.name.FOOD, role: SD.name.PREY, value: `Martes martes, Felis silvestris`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: `Mustela erminea`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: `Strigiformes, Accipiter gentilis`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: `Buteo, Vulpes vulpes`, type: SD.symbiosis.PREDATION },
        { name: SD.name.DISEASE, role: SD.name.PREY, value: 'Squirrel parapoxvirus', type: SD.symbiosis.PREDATION },
        { name: SD.name.THREAT, role: SD.name.COMPETITOR, value: 'Sciurus carolinensis', type: SD.symbiosis.COMPETITION },
        { name: SD.name.FOOD, role: SD.name.HERBIVORE, value: `${SD.foodType.SEEDS}, Corylus, Fagus`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.FOOD, role: SD.name.HERBIVORE, value: `Castanea, Fungi`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.HABITAT, role: SD.name.OCCUPANT, value: `Pinus sylvestris, Picea abies`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.HABITAT, role: SD.name.OCCUPANT, value: `Pinus sibirica`, type: SD.symbiosis.COMMENSALISM },
    ] },
    { name: 'Oryctolagus cuniculus',
    symbionts: [
        { id: 'Vulpes vulpes'}, { id: 'Aquila adalberti'}, { id: 'Lynx pardinus'}, { id: 'Meles meles'},
        { id: 'Morus nigra'}, { id: 'Mustela putorius'}, { id: 'Neovison vison'}, { id: 'Strigiformes'}
    ],
    traits: [
        { name: SD.name.SHELTER, value: `${SD.shelter.BURROW}, ${SD.shelter.WARREN}` },
        { name: SD.name.ALTRICIAL, value: SD.boolean.YES },
        { name: SD.name.LENGTH, value: '40cm' },
        { name: SD.name.FEMALE, value: SD.female.DOE },
        { name: SD.name.MALE, value: SD.male.BUCK },
        { name: SD.name.MOULTING, value: `${SD.month.MARCH}-${SD.month.NOVEMBER}` },
        { name: SD.name.MATING, value: `${SD.month.JANUARY}-${SD.month.AUGUST}` },
        { name: SD.name.LITTER_SIZE, value: '3-7' },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '30d' },
        { name: SD.name.WEANING, value: '18d' },
        { name: SD.name.MATURITY, value: '8-10w' },
        { name: SD.name.HABITAT, value: `${SD.habitat.WOODLAND}, ${SD.habitat.GRASSLAND}, ${SD.habitat.SCRUB}` },
        { name: SD.name.FOOD, role: SD.name.HERBIVORE, value: `Morus nigra`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.FOOD, role: SD.name.HERBIVORE, value: `${SD.foodType.HERBAGE}, Festuca`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.FOOD, role: SD.name.HERBIVORE, value: `${SD.foodType.GRASS}, ${SD.foodType.SWARD}`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.DISEASE, value: 'Myxomatosis', type: SD.symbiosis.PREDATION },
        { name: SD.name.DISEASE, value: 'Rabbit haemorrhagic disease', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: 'Vulpes vulpes, Meles meles', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: 'Lynx pardinus, Aquila adalberti', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: 'Mustela putorius, Neovison vison', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: 'Strigiformes', type: SD.symbiosis.PREDATION },
    ]
    },
    { name: 'Phocoena phocoena',
    symbionts: [ 
        // { id: 'Delphinus delphis' }
    ],            
    traits: [
        { name: SD.name.LIFE_SPAN, value: '8-13a' },
        { name: SD.name.LENGTH, value: '1.4-1.9m' },
        { name: SD.name.LOOK_ALIKES, values: [ 'Delphinus delphis' ]},
    ]    
},
    { 
        name: 'Meles meles',
        symbionts: [ 
            { id: 'Annelida' }, { id: 'Insecta' }, { id: 'Erinaceus europaeus' }
        ],            
        traits: [
            { name: SD.name.SHELTER, value: `${SD.shelter.BURROW}, ${SD.shelter.SETT}` },
            { name: SD.name.DIET, value: SD.diet.OMNIVORE },
            { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Erinaceus europaeus`, type: SD.symbiosis.PREDATION },
            { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Annelida, Insecta`, type: SD.symbiosis.PREDATION },
        ]    
    },
    { 
        name: 'Sus scrofa',
        symbionts: [ 
            { id: 'Annelida' }, { id: 'Insecta' },
        ],            
        traits: [
            { name: SD.name.LIFE_SPAN, value: '10-14a' },
            { name: SD.name.DIET, value: SD.diet.OMNIVORE },
            { name: SD.name.FOOD, role: SD.name.HERBIVORE, value: `${SD.foodType.SEEDS}, ${SD.foodType.BERRIES}, ${SD.foodType.NUTS}`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Annelida, Insecta`, type: SD.symbiosis.PREDATION },
        ]    
    },
    { 
    name: 'Lutra lutra',
    symbionts: [ 
        { id: 'Castor fiber' }
    ],            
    traits: [        
            { name: SD.name.LENGTH, value: '57-95cm' },
            { name: SD.name.TAIL_LENGTH, value: '35-45cm' },
            { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Amphibia, Crustacea, Insecta`, type: SD.symbiosis.PREDATION },
            { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Aves, Castor fiber`, type: SD.symbiosis.PREDATION },
        ]    
    },
    { 
    name: 'Delphinus delphis',
    symbionts: [ 
        { id: 'Clupeidae' }, { id: 'Engraulidae' }, { id: 'Merlucciidae' },
        { id: 'Cephalopoda' },
    ],            
    traits: [        
        { name: SD.name.LOOK_ALIKES, values: [ 'Phocoena phocoena' ]},
        { name: SD.name.LENGTH, value: '1.5-2.4m' },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Clupeidae, Engraulidae`, type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: `Merlucciidae, Cephalopoda`, type: SD.symbiosis.PREDATION },
        ]    
    },
    { 
    name: 'Erinaceus europaeus',
    symbionts: [ 
        { id: 'Gastropod '}, { id: 'Annelida '}, { id: 'Coleoptera '}, { id: 'Lepidoptera '},
        { id: 'Carabus nemoralis' }, { id: 'Tachypodoiulus niger' }, { id: 'Carabus nemoralis '},
        { id: 'Meles meles' }
    ],            
    traits: [        
        { name: SD.name.LENGTH, value: '20-26cm' },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: 'Gastropod, Annelida', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: 'Coleoptera, Lepidoptera', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: 'Glomeris marginata', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: 'Tachypodoiulus niger', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREDATOR, value: 'Carabus nemoralis', type: SD.symbiosis.PREDATION },
        { name: SD.name.FOOD, role: SD.name.PREY, value: 'Meles meles', type: SD.symbiosis.PREDATION },
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        ]    
    },
]};

export const getMammalTraits = (enums) => {
    const SD = enums || traitEnums;
    const traits = getTraits(SD);
    // traits.forEach(species => {
    //     if(!species.traits.find(trait => trait.name === 'TROPHIC_LEVEL')) {
    //         species.traits.push({ name: SD.name.TROPHIC_LEVEL, value: '2.2' })
    //     }
    // });
    return traits;
}

