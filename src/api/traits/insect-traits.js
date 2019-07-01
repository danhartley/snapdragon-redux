import * as traitEnums from 'api/traits/trait-types';

export const getInsectTraits = enums => {    
    const SD = enums && Object.keys(enums).length ? enums : traitEnums.enums;
    return [
        { name: 'Vanessa atalanta', 
        symbionts: [ 'Urtica dioica', 'Buddleia', 'Hedera' ], 
        traits: [            
            { name: SD.name.MIGRATORY, value: SD.whether.YES },
            { name: SD.name.FOOD, value: `${SD.foodType.ROTTEN_FRUIT}, Buddleia`, type: SD.symbiosis.COMMENSALISM },
            { name: SD.name.CATERPILLAR_FOOD, value: 'Urtica dioica', type: SD.symbiosis.HERBIVORY },
            { name: SD.name.HIBERNATING_STAGE, value: SD.developmentStage.ADULT },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.WHITE}, ${SD.colour.BLACK}` },
            { name: SD.name.WING_SPAN, value: '5.6-6.2cm' },
            { name: SD.name.CATERPILLAR_LENGTH, value: '2.5cm' },
            { name: SD.name.HABITAT, value: `Hedera, ${SD.habitat.WOODLAND}`, type: SD.symbiosis.COMMENSALISM },
        ] },
        { name: 'Pararge aegeria', 
        symbionts: [  'Elymus repens', 'Dactylis glomerata' ], 
        traits: [
            { name: SD.name.MIGRATORY, value: SD.whether.NO },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, ${SD.foodType.HONEYDEW}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `${SD.foodType.GRASS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Elymus repens, Dactylis glomerata`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.HIBERNATING_STAGE, value: `${SD.developmentStage.CATERPILLAR}, ${SD.developmentStage.PUPA}` },
            { name: SD.name.WING_SPAN, value: '3.8-4.4cm' },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.WOODLAND}, ${SD.habitat.HEDGEROWS}` },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.MONANDROUS },
        ] },
        { name: 'Maniola jurtina', 
        symbionts: [ 
            'Pyronia tithonus', 'Coenonympha pamphilus', 'Hyponephele lycaon', 
            'Dactylis glomerata', 'Poaceae', 'Erica', 'Origanum' ], 
        traits: [
            { name: SD.name.WING_SPAN, value: '4.0-6.0cm' },
            { name: SD.name.LOOK_ALIKES, values: [ 'Pyronia tithonus' ]},
            { name: SD.name.LOOK_ALIKES, values: [ 'Coenonympha pamphilus' ]},
            { name: SD.name.LOOK_ALIKES, values: [ 'Hyponephele lycaon' ]},
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.GREEN}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Dactylis glomerata, Poaceae`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.HABITAT, value: `${SD.habitat.FOREST_STEPPE}, ${SD.habitat.MEADOW_STEPPE}`},
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.WOODLAND}, ${SD.habitat.ORCHARDS}`},
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Erica, Origanum`, type: SD.symbiosis.MUTUALISM },
        ] },
        { name: 'Pieris rapae', 
        symbionts: [ 
            'Brassica oleracea', 'Armoracia rusticana', 'Raphanus raphanistrum', 
            'Brassica rapa', 'Sinapis alba' ],
        traits: [
            { name: SD.name.WING_SPAN, value: '3.2-4.7cm' },
            { name: SD.name.HABITAT, value: `${SD.habitat.URBAN}, ${SD.habitat.VALLEYS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Brassica oleracea, Armoracia rusticana`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CATERPILLAR_FOOD, value: `Raphanus raphanistrum`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.MIGRATORY, value: SD.whether.YES },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Brassica rapa`, type: SD.symbiosis.MUTUALISM },
        ] },
        { name: 'Charaxes jasius', 
        symbionts: [ 'Arbutus unedo', 'Laurus nobilis', 'Prunus persica' ],
        traits: [
            { name: SD.name.WING_SPAN, value: '6.5-9.0cm' },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.GREEN}, ${SD.colour.YELLOW}` },
            { name: SD.name.FOOD, value: `${SD.foodType.ROTTEN_FRUIT}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Arbutus unedo, Laurus nobilis`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CATERPILLAR_FOOD, value: `Prunus persica`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.HABITAT, value: `${SD.habitat.MAQUIS}, ${SD.habitat.SAVANNA}` },
        ] },
        { name: 'Polyommatus icarus', 
        symbionts: [ 'Vicia', 'Leguminosae', 'Trifolium', 'Lotus corniculatus' ],
        traits: [
            { name: SD.name.WING_SPAN, value: '2.8-3.6cm' },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.PALE_GREEN}, ${SD.colour.YELLOW}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Vicia, Leguminosae`, type: SD.symbiosis.HERBIVORY, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CATERPILLAR_FOOD, value: `Trifolium, Lotus corniculatus`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.HEATH}, ${SD.habitat.DUNES}` },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}` },
        ] },

        { name: 'Papilio machaon', 
            symbionts: [ 
                'Daucus carota', 'Angelica sylvestris', 'Foeniculum vulgare' ], 
            traits: [            
            { name: SD.name.MIGRATORY, value: SD.whether.YES },
            { name: SD.name.WING_SPAN, value: '6.5-8.6cm' },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Daucus carota, Angelica sylvestris`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CATERPILLAR_FOOD, value: `Foeniculum vulgare`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.WHITE}, ${SD.colour.BLACK}, ${SD.colour.GREEN}` },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.HILLS}` },
        ] },
        { name: 'Apis mellifera', 
        symbionts: [ 'Varroa mite' ],
        traits: [
            { name: SD.name.ORGANISATION, value: SD.organisation.EUSOCIAL },
            { name: SD.name.POLLINATION, value: 'Plantae' },
            { name: SD.role.HOST, value: 'Varroa mite', type: SD.symbiosis.PARASITISM },
            { name: SD.role.HOST, value: 'Colony collapse disorder', type: SD.symbiosis.PARASITISM },
        ] },
        { name: 'Mantis Religiosa', 
        symbionts: [
            'Caelifera', 'Gryllidae', 'Blattodea'
        ],
        traits: [
            { name: SD.name.DISPLAY, value: SD.display.DIEMATIC },
            { name: SD.name.DISPLAY, value: SD.display.SEXUAL_DIMORPHISM },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.SEXUAL_CANNIBALISM },
            { name: SD.name.TROPHIC_LEVEL, value: SD.trophicLevel.SECONDARY_CONSUMER },
            { name: SD.role.PREY, value: 'Caelifera', type: SD.symbiosis.PREDATION },
            { name: SD.role.PREY, value: 'Gryllidae', type: SD.symbiosis.PREDATION },
            { name: SD.role.PREY, value: 'Blattodea', type: SD.symbiosis.PREDATION },
            { name: SD.name.SENSORY_ACUITY, value: SD.sense.SIGHT },
            { name: SD.name.SENSORY_ACUITY, value: SD.sense.MOVEMENT },
        ] },
        { name: 'Bombus terrestris', 
        symbionts: [
            'Primula veris', 'Brassica napus', 'Trifolium pratense'
        ],
        traits: [
            { name: SD.name.ORGANISATION, value: SD.organisation.EUSOCIAL },
            { name: SD.role.POLLINATOR, value: 'Primula veris', type: SD.symbiosis.MUTUALISM },
            { name: SD.role.POLLINATOR, value: 'Brassica napus', type: SD.symbiosis.MUTUALISM },
            { name: SD.role.POLLINATOR, value: 'Trifolium pratense', type: SD.symbiosis.MUTUALISM },
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.MONANDROUS },
        ] },
        { name: 'Bombus pratorum', 
        symbionts: [
            
        ],
        traits: [
            { name: SD.name.BEHAVIOUR, value: SD.behaviour.MONANDROUS },
        ] },
    ];
};