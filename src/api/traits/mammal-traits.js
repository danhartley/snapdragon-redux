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
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.ALTRICIAL },
        { name: SD.name.FEMALE, value: SD.female.VIXEN },
        { name: SD.role.HOST, value: 'Sarcoptes scabiei', type: SD.symbiosis.PARASITISM },
        { name: SD.role.PREDATOR, value: `Oryctolagus cuniculus`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: `Rodentia, Lagomorpha`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: `Reptilia, Galliformes`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: `Insecta, Gastropoda`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: `Passeriformes, Annelida`, type: SD.symbiosis.PREDATION },
        { name: SD.role.HERBIVORE, value: `${SD.foodType.NUTS}, ${SD.foodType.BERRIES}`, type: SD.symbiosis.HERBIVORY },
        { name: SD.role.PREY, value: `Canis lupus, Canis latrans`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: `Aquila chrysaetos`, type: SD.symbiosis.PREDATION },
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
        { name: SD.name.DISPLAY, value: SD.display.SEXUAL_DIMORPHISM },
        { name: SD.name.LENGTH, value: '19-20cm' },
        { name: SD.name.TAIL_LENGTH, value: '9-10cm' },
        { name: SD.name.MATING, value: `${SD.month.FEBRUARY}-${SD.month.MARCH}` },
        { name: SD.name.MATING, value: `${SD.month.JUNE}-${SD.month.JULY}` },
        { name: SD.name.LITTER_SIZE, value: `3` },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '38-39d' },
        { name: SD.name.WEANING, value: '5-7w' },
        { name: SD.name.MATURITY, value: '6-7m' },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.ALTRICIAL },
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        { name: SD.role.PREY, value: `Martes martes, Felis silvestris`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: `Mustela erminea`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: `Strigiformes, Accipiter gentilis`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: `Buteo, Vulpes vulpes`, type: SD.symbiosis.PREDATION },
        { name: SD.role.HOST, value: 'Squirrel parapoxvirus', type: SD.symbiosis.PARASITISM },
        { name: SD.role.COMPETITOR, value: 'Sciurus carolinensis', type: SD.symbiosis.COMPETITION },
        { name: SD.role.HERBIVORE, value: `${SD.foodType.SEEDS}, Corylus, Fagus`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.role.HERBIVORE, value: `Castanea, Fungi`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.OCCUPANT, value: `Pinus sylvestris, Picea abies`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.OCCUPANT, value: `Pinus sibirica`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.HOARDING },
    ] },
    { name: 'Oryctolagus cuniculus',
    symbionts: [
        { id: 'Vulpes vulpes'}, { id: 'Aquila adalberti'}, { id: 'Lynx pardinus'}, { id: 'Meles meles'},
        { id: 'Morus nigra'}, { id: 'Mustela putorius'}, { id: 'Neovison vison'}, { id: 'Strigiformes'}
    ],
    traits: [
        { name: SD.name.SHELTER, value: `${SD.shelter.BURROW}, ${SD.shelter.WARREN}` },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.ALTRICIAL },
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
        { name: SD.role.HERBIVORE, value: `Morus nigra`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.role.HERBIVORE, value: `${SD.foodType.HERBAGE}, Festuca`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.role.HERBIVORE, value: `${SD.foodType.GRASS}, ${SD.foodType.SWARD}`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.role.HOST, value: 'Myxomatosis', type: SD.symbiosis.PARASITISM },
        { name: SD.role.HOST, value: 'Rabbit haemorrhagic disease', type: SD.symbiosis.PARASITISM },
        { name: SD.role.PREY, value: 'Vulpes vulpes, Meles meles', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: 'Lynx pardinus, Aquila adalberti', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: 'Mustela putorius, Neovison vison', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: 'Strigiformes', type: SD.symbiosis.PREDATION },
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
            { name: SD.role.PREDATOR, value: `Erinaceus europaeus`, type: SD.symbiosis.PREDATION },
            { name: SD.role.PREDATOR, value: `Annelida, Insecta`, type: SD.symbiosis.PREDATION },
            { name: SD.name.MALE, value: SD.male.BOAR },
            { name: SD.name.FEMALE, value: SD.female.SOW },
        ]    
    },
    { 
        name: 'Sus scrofa',
        symbionts: [ 
            { id: 'Annelida' }, { id: 'Insecta' },
            { id: 'Querus'}, { id: 'Fagus'}, { id: 'Epilobium'}, { id: 'Pteridium aquilinum'}
        ],            
        traits: [
            { name: SD.name.LIFE_SPAN, value: '10-14a' },
            { name: SD.name.DIET, value: SD.diet.OMNIVORE },
            { name: SD.role.HERBIVORE, value: `${SD.foodType.SEEDS}, ${SD.foodType.BERRIES}, ${SD.foodType.NUTS}`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.role.HERBIVORE, value: `${SD.treeType.BEECH}, ${SD.treeType.OAK}, Pteridium aquilinum, Epilobium`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.role.HERBIVORE, value: `${SD.foodType.ROOTS}, ${SD.foodType.TUBERS}, ${SD.foodType.BULBS}, ${SD.foodType.RHIZOMES}`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.role.HERBIVORE, value: `${SD.foodType.BARK}, ${SD.foodType.LEAVES}, ${SD.foodType.BULBS}, ${SD.foodType.RHIZOMES}`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.role.PREDATOR, value: `Annelida, Insecta, Mollusca, Rodentia, Insectivora, `, type: SD.symbiosis.PREDATION },
            { name: SD.role.PREDATOR, value: `Bird's eggs, Fish, Lizards, Snakes, Frogs`, type: SD.symbiosis.PREDATION },
            { name: SD.name.MALE, value: SD.male.BOAR },
            { name: SD.name.FEMALE, value: SD.female.SOW },
            { name: SD.name.COLLECTIVE, value: SD.collective.SOUNDER },
            { name: SD.name.ORGANISATION, value: SD.organisation.MATRIARCHY },
            { name: SD.name.MATING, value: `${SD.month.NOVEMBER}-${SD.month.JANUARY}` },
            { name: SD.name.PREGNANCY, value: `${SD.month.MARCH}-${SD.month.MAY}` },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.RUTTING },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.FARROWING },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.WHELPING },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.SWIMMING },
            { name: SD.name.GESTATION, value: '114-140d' },
            { name: SD.name.LACTATION, value: '2.5-3.5m' },
            { name: SD.name.LITTER_SIZE, value: `4-6` },
            { name: SD.name.SHELTER, value: SD.shelter.NEST },
            { name: SD.name.SHELTER, value: SD.shelter.SHELTER },
            { name: SD.name.TROPHIC_LEVEL, value: SD.trophicLevel.SCAVENGER },
            { name: SD.name.ECOLOGY, value: `${SD.ecology.ROOTING}, ${SD.ecology.SCRAPING}, ${SD.ecology.DIGGING}` },
            { name: SD.name.LIFE_SPAN, value: '4-5a' },
            { name: SD.name.ECOLOGY, value: `${SD.habitat.BRUSH}, ${SD.habitat.WATER}, ${SD.habitat.NO_SNOW}`},
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.MARSHLAND}, ${SD.treeType.BEECH}, ${SD.treeType.OAK}, ${SD.treeType.PINE}`},
            { name: SD.role.PREY, value: 'Lynx pardinus', type: SD.symbiosis.PREDATION },
            { name: SD.role.PREY, value: 'Canis lupus', type: SD.symbiosis.PREDATION },
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
            { name: SD.role.PREDATOR, value: `Amphibia, Crustacea, Insecta`, type: SD.symbiosis.PREDATION },
            { name: SD.role.PREDATOR, value: `Aves, Castor fiber`, type: SD.symbiosis.PREDATION },
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
        { name: SD.role.PREDATOR, value: `Clupeidae, Engraulidae`, type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: `Merlucciidae, Cephalopoda`, type: SD.symbiosis.PREDATION },
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
        { name: SD.role.PREDATOR, value: 'Gastropod, Annelida', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: 'Coleoptera, Lepidoptera', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: 'Glomeris marginata', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: 'Tachypodoiulus niger', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREDATOR, value: 'Carabus nemoralis', type: SD.symbiosis.PREDATION },
        { name: SD.role.PREY, value: 'Meles meles', type: SD.symbiosis.PREDATION },        
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        ]    
    },
    { 
    name: 'Sciurus carolinensis',
    symbionts: [ 
        { id: 'Sciurus vulgaris'},
    ],            
    traits: [        
        { name: SD.role.COMPETITOR, value: 'Sciurus vulgaris', type: SD.symbiosis.COMPETITION },
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        { name: SD.name.DISPLAY, value: SD.display.NO_SEXUAL_DIMORPHISM },
        { name: SD.name.LENGTH, value: '23-30cm' },
        { name: SD.name.TAIL_LENGTH, value: '19-25cm' },
        { name: SD.name.WEIGHT, value: '400-600g' },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.HOARDING },
        { name: SD.name.CACHE_SIZE, value: '1000-5000' },
        { name: SD.name.SHELTER, value: SD.shelter.DREY },
        { name: SD.name.ACTIVE, value: SD.active.CREPUSCULAR },
        { name: SD.behaviour.HIBERNATION, value: SD.whether.NO },
        { name: SD.behaviour.MELANISTIC, value: SD.whether.YES },
        { name: SD.name.MATING, value: `${SD.month.DECEMBER}-${SD.month.FEBRUARY}` },
        { name: SD.name.MATING, value: `${SD.month.MAY}-${SD.month.JUNE}` },    
        { name: SD.name.LITTER_SIZE, value: `4-8` },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '44d' },
        { name: SD.name.WEANING, value: '10-16w' },
        { name: SD.name.MATURITY, value: '1-2y' },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.ALTRICIAL },
        { name: SD.name.MATING_SYSTEM, value: SD.mating.POLYGYNOUS },
        { name: SD.name.COMMUNICATION, value: SD.communication.VOCALISATION },
        { name: SD.name.COMMUNICATION, value: SD.communication.POSTURING },
        { name: SD.role.CARRIER, value: 'Squirrel parapoxvirus', type: SD.symbiosis.PARASITISM },
        { name: SD.role.PREY, value: `Martes martes`, type: SD.symbiosis.PREDATION },

        { name: SD.role.HERBIVORE, value: `${SD.foodType.SEEDS}, ${SD.foodType.NUTS}`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.role.HERBIVORE, value: 'Amanita muscaria', type: SD.symbiosis.PREDATION },
        { name: SD.role.HERBIVORE, value: 'Acer pseudoplatanus, Fagus sylvatica', type: SD.symbiosis.PREDATION },
        { name: SD.name.OCCUPANT, value: `${SD.habitat.WOODLAND}, ${SD.habitat.URBAN}`, type: SD.symbiosis.COMMENSALISM },
    ] 
    },
    { 
        name: 'Tarentola mauritanica',
        symbionts: [ 
            
        ],            
        traits: [        
            { name: SD.name.YOUNG, value: SD.young.SALAMANQUESA },
        ]
    },
]};

export const getMammalTraits = (enums) => {
    const SD = enums && Object.keys(enums).length ? enums : traitEnums.enums;
    const traits = getTraits(SD);
    // traits.forEach(species => {
    //     if(!species.traits.find(trait => trait.name === 'TROPHIC_LEVEL')) {
    //         species.traits.push({ name: SD.name.TROPHIC_LEVEL, value: '2.2' })
    //     }
    // });
    return traits;
}

