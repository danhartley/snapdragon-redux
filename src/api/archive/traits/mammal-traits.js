import * as traitEnums from 'api/traits/trait-types';

export const getMammalTraits = enums => {    
    const SD = enums && Object.keys(enums).length ? enums : traitEnums.enums;
    return [
    { name: 'Vulpes vulpes',
    traits: [
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.LENGTH, value: '45–90', unit: 'cm' },
        { name: SD.name.TAIL_LENGTH, value: '30-55', unit: 'cm' },
        { name: SD.name.MAX_SPEED, value: '50', unit: 'km/h' },
        { name: SD.name.MATING, value: `${SD.month.FEBRUARY}`, unit: 'MM' },
        { name: SD.name.SHELTER, value: `${SD.shelter.BURROW}, ${SD.shelter.DEN}, ${SD.shelter.VEGETATION}` },
        { name: SD.name.LITTER_SIZE, value: `4-6`, unit: '' },
        { name: SD.name.LIFE_SPAN, value: '5', unit: 'YY' },
        { name: SD.name.WEANING, value: '6-7', unit: 'MM' },
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        { name: SD.name.ACTIVE, value: SD.active.CREPUSCULAR },
        { name: SD.name.ACTIVE, value: SD.active.NOCTURNAL },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.ALTRICIAL },
        { name: SD.name.FEMALE, value: SD.female.VIXEN },
        { name: SD.name.ROLE, role: SD.role.HOST, value: 'Sarcoptes scabiei', type: SD.symbiosis.PARASITISM },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Oryctolagus cuniculus`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Rodentia, Lagomorpha`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Reptilia, Galliformes`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Insecta, Gastropoda`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Passeriformes, Annelida`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.NUTS}, ${SD.food.BERRIES}`, type: SD.symbiosis.HERBIVORY },
        { name: SD.name.ROLE, role: SD.role.PREY, value: `Canis lupus, Canis latrans`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: `Aquila chrysaetos`, type: SD.symbiosis.PREDATION },
        { name: SD.name.USAGE, value: `${SD.usage.FUR}`, type: SD.symbiosis.PREDATION },
        { name: SD.name.CHARACTERISTIC, value: SD.characteristic.KIN_SELECTION, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.COLLECTIVE, value: SD.collective.PACK },
    ]
    },
    { name: 'Sciurus vulgaris', 
    traits: [            
        { name: SD.name.HABITAT, value: `${SD.habitat.BOREAL}, ${SD.habitat.CONIFERS}, ${SD.habitat.BROAD_LEAF}`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.LIFE_SPAN, value: '3-7', unit: 'YY' },
        { name: SD.name.SHELTER, value: SD.shelter.DREY },
        { name: SD.name.ACTIVE, value: SD.active.CREPUSCULAR },        
        { name: SD.name.DISPLAY, value: SD.display.SEXUAL_DIMORPHISM },
        { name: SD.name.LENGTH, value: '19-20', unit: 'cm' },
        { name: SD.name.TAIL_LENGTH, value: '9-10', unit: 'cm' },
        { name: SD.name.MATING, value: `${SD.month.FEBRUARY}-${SD.month.MARCH}`, unit: 'MM' },
        { name: SD.name.MATING, value: `${SD.month.JUNE}-${SD.month.JULY}`, unit: 'MM' },
        { name: SD.name.LITTER_SIZE, value: `3`, unit: '' },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '38-39', unit: 'DD' },
        { name: SD.name.WEANING, value: '5-7', unit: 'WW' },
        { name: SD.name.MATURITY, value: '6-7', unit: 'MM' },
        { name: SD.name.BEHAVIOUR, value: `${SD.behaviour.ALTRICIAL}, ${SD.behaviour.HOARDING}` },
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        { name: SD.name.ROLE, role: SD.role.PREY, value: `Martes martes, Felis silvestris`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: `Mustela erminea`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: `Strigiformes, Accipiter gentilis`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: `Buteo, Vulpes vulpes`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.HOST, value: 'Squirrel parapoxvirus', type: SD.symbiosis.PARASITISM },
        { name: SD.name.ROLE, role: SD.role.COMPETITOR, value: 'Sciurus carolinensis', type: SD.symbiosis.COMPETITION },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.SEEDS}, Corylus, Fagus`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `Castanea, Fungi`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.ROLE, role: SD.role.OCCUPANT, value: `Pinus sylvestris, Picea abies`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.ROLE, role: SD.role.OCCUPANT, value: `Pinus sibirica`, type: SD.symbiosis.COMMENSALISM },
    ] 
    },
    { name: 'Oryctolagus cuniculus',
    traits: [
        { name: SD.name.SHELTER, value: `${SD.shelter.BURROW}, ${SD.shelter.WARREN}` },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.ALTRICIAL },
        { name: SD.name.LENGTH, value: '40', unit: 'cm' },
        { name: SD.name.FEMALE, value: SD.female.DOE },
        { name: SD.name.MALE, value: SD.male.BUCK },
        { name: SD.name.MOULTING, value: `${SD.month.MARCH}-${SD.month.NOVEMBER}`, unit: 'MM' },
        { name: SD.name.MATING, value: `${SD.month.JANUARY}-${SD.month.AUGUST}`, unit: 'MM' },
        { name: SD.name.LITTER_SIZE, value: '3-7', unit: '' },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '30', unit: 'DD' },
        { name: SD.name.WEANING, value: '18', unit: 'DD' },
        { name: SD.name.MATURITY, value: '8-10', unit: 'WW' },
        { name: SD.name.HABITAT, value: `${SD.habitat.WOODLAND}, ${SD.habitat.GRASSLAND}, ${SD.habitat.SCRUB}` },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `Morus nigra`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.HERBAGE}, Festuca`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.GRASS}, ${SD.food.SWARD}`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.ROLE, role: SD.role.HOST, value: 'Myxomatosis', type: SD.symbiosis.PARASITISM },
        { name: SD.name.ROLE, role: SD.role.HOST, value: 'Rabbit haemorrhagic disease', type: SD.symbiosis.PARASITISM },
        { name: SD.name.ROLE, role: SD.role.PREY, value: 'Vulpes vulpes, Meles meles', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: 'Lynx pardinus, Aquila adalberti', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: 'Mustela putorius, Neovison vison', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: 'Strigiformes', type: SD.symbiosis.PREDATION },
    ]
    },
    { name: 'Phocoena phocoena',     
    traits: [
        { name: SD.name.LIFE_SPAN, value: '8-13', unit: 'YY' },
        { name: SD.name.LENGTH, value: '1.4-1.9', unit: 'm' },
        { name: SD.name.LOOK_ALIKES, values: [ 'Delphinus delphis' ]},
    ]    
},
    { 
        name: 'Meles meles',
        traits: [
            { name: SD.name.SHELTER, value: `${SD.shelter.BURROW}, ${SD.shelter.SETT}` },
            { name: SD.name.DIET, value: SD.diet.OMNIVORE },
            { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Erinaceus europaeus`, type: SD.symbiosis.PREDATION },
            { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Annelida, Insecta`, type: SD.symbiosis.PREDATION },
            { name: SD.name.MALE, value: SD.male.BOAR },
            { name: SD.name.FEMALE, value: SD.female.SOW },
        ]    
    },
    { 
        name: 'Sus scrofa', 
        traits: [
            { name: SD.name.LIFE_SPAN, value: '10-14', unit: 'YY' },
            { name: SD.name.DIET, value: SD.diet.OMNIVORE },
            { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.SEEDS}, ${SD.food.BERRIES}, ${SD.food.NUTS}`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.treeType.BEECH}, ${SD.treeType.OAK}, Pteridium aquilinum, Epilobium`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.ROOTS}, ${SD.food.TUBERS}, ${SD.food.BULBS}, ${SD.food.RHIZOMES}`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.BARK}, ${SD.food.LEAVES}, ${SD.food.BULBS}, ${SD.food.RHIZOMES}`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Annelida, Insecta, Mollusca, Rodentia, Insectivora, `, type: SD.symbiosis.PREDATION },
            { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Bird's eggs, Fish, Lizards, Snakes, Frogs`, type: SD.symbiosis.PREDATION },
            { name: SD.name.MALE, value: SD.male.BOAR },
            { name: SD.name.FEMALE, value: SD.female.SOW },
            { name: SD.name.COLLECTIVE, value: SD.collective.SOUNDER },
            { name: SD.name.ORGANISATION, value: SD.organisation.MATRIARCHY },
            { name: SD.name.MATING, value: `${SD.month.NOVEMBER}-${SD.month.JANUARY}`, unit: 'MM' },
            { name: SD.name.PREGNANCY, value: `${SD.month.MARCH}-${SD.month.MAY}`, unit: 'MM' },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.RUTTING },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.FARROWING },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.WHELPING },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.SWIMMING },
            { name: SD.name.GESTATION, value: '114-140', unit: 'DD' },
            { name: SD.name.LACTATION, value: '2.5-3.5', unit: 'MM' },
            { name: SD.name.LITTER_SIZE, value: `4-6`, unit: '' },
            { name: SD.name.SHELTER, value: SD.shelter.NEST },
            { name: SD.name.SHELTER, value: SD.shelter.SHELTER },
            { name: SD.name.ECOLOGY, value: `${SD.ecology.ROOTING}, ${SD.ecology.SCRAPING}, ${SD.ecology.DIGGING}, ${SD.ecology.SCAVENGING}` },
            { name: SD.name.LIFE_SPAN, value: '4-5', unit: 'YY' },
            { name: SD.name.ECOLOGY, value: `${SD.habitat.BRUSH}, ${SD.habitat.WATER}, ${SD.habitat.NO_SNOW}`},
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.MARSHLAND}, ${SD.habitat.BEECH}, ${SD.habitat.OAK}, ${SD.habitat.PINE}`},
            { name: SD.name.ROLE, role: SD.role.PREY, value: 'Lynx pardinus', type: SD.symbiosis.PREDATION },
            { name: SD.name.ROLE, role: SD.role.PREY, value: 'Canis lupus', type: SD.symbiosis.PREDATION },
        ]    
    },
    { 
    name: 'Lutra lutra',
    traits: [        
            { name: SD.name.LENGTH, value: '57-95', unit: 'cm' },
            { name: SD.name.TAIL_LENGTH, value: '35-45', unit: 'cm' },
            { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Amphibia, Crustacea, Insecta`, type: SD.symbiosis.PREDATION },
            { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Aves, Castor fiber`, type: SD.symbiosis.PREDATION },
        ]    
    },
    { 
    name: 'Delphinus delphis',
    traits: [        
        { name: SD.name.LOOK_ALIKES, values: [ 'Phocoena phocoena' ]},
        { name: SD.name.LENGTH, value: '1.5-2.4', unit: 'm' },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Clupeidae, Engraulidae`, type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: `Merlucciidae, Cephalopoda`, type: SD.symbiosis.PREDATION },
        ]    
    },
    { 
    name: 'Erinaceus europaeus',
    traits: [        
        { name: SD.name.LENGTH, value: '20-26', unit: 'cm' },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: 'Gastropod, Annelida', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: 'Coleoptera, Lepidoptera', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: 'Glomeris marginata', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: 'Tachypodoiulus niger', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREDATOR, value: 'Carabus nemoralis', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.PREY, value: 'Meles meles', type: SD.symbiosis.PREDATION },        
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        ]    
    },
    { 
    name: 'Sciurus carolinensis',
    traits: [        
        { name: SD.name.DIET, value: SD.diet.OMNIVORE },
        { name: SD.name.DISPLAY, value: SD.display.NO_SEXUAL_DIMORPHISM },
        { name: SD.name.LENGTH, value: '23-30', unit: 'cm' },
        { name: SD.name.TAIL_LENGTH, value: '19-25', unit: 'cm' },
        { name: SD.name.WEIGHT, value: '400-600', unit: 'g' },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.HOARDING },
        { name: SD.name.CACHE_SIZE, value: '1000-5000', unit: 'nuts' },
        { name: SD.name.SHELTER, value: SD.shelter.DREY },
        { name: SD.name.ACTIVE, value: SD.active.CREPUSCULAR },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.HIBERNATION },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.MELANISTIC },
        { name: SD.name.MATING, value: `${SD.month.DECEMBER}-${SD.month.FEBRUARY}`, unit: 'MM' },
        { name: SD.name.MATING, value: `${SD.month.MAY}-${SD.month.JUNE}`, unit: 'MM' },    
        { name: SD.name.LITTER_SIZE, value: `4-8`, unit: '' },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '44', unit: 'DD' },
        { name: SD.name.WEANING, value: '10-16', unit: 'WW' },
        { name: SD.name.MATURITY, value: '1-2', unit: 'YY' },
        { name: SD.name.BEHAVIOUR, value: SD.behaviour.ALTRICIAL },
        { name: SD.name.MATING_SYSTEM, value: SD.matingSystem.POLYGYNOUS },
        { name: SD.name.COMMUNICATION, value: SD.communication.VOCALISATION },
        { name: SD.name.COMMUNICATION, value: SD.communication.POSTURING },
        { name: SD.name.ROLE, role: SD.role.CARRIER, value: 'Squirrel parapoxvirus', type: SD.symbiosis.PARASITISM },
        { name: SD.name.ROLE, role: SD.role.PREY, value: `Martes martes`, type: SD.symbiosis.PREDATION },        
        { name: SD.name.ROLE, role: SD.role.COMPETITOR, value: 'Sciurus vulgaris', type: SD.symbiosis.COMPETITION },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: `${SD.food.SEEDS}, ${SD.food.NUTS}`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: 'Amanita muscaria', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.HERBIVORE, value: 'Acer pseudoplatanus, Fagus sylvatica', type: SD.symbiosis.PREDATION },
        { name: SD.name.ROLE, role: SD.role.OCCUPANT, value: `${SD.habitat.WOODLAND}, ${SD.habitat.URBAN}`, type: SD.symbiosis.COMMENSALISM },
    ] 
    },
    { 
        name: 'Tarentola mauritanica',
        traits: [        
            { name: SD.name.YOUNG, value: SD.young.SALAMANQUESA },
        ]
    },
]
};
