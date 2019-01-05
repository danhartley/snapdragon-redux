import * as traitEnums from 'api/traits/trait-types';

export const getInsectTraits = (enums) => {
    const SD = enums || traitEnums;
        return [
        { name: 'Vanessa atalanta', 
        symbionts: [ 
            { id: 'Urtica dioica' }, { id: 'Buddleia'}, { id: 'Hedera'} ], 
        traits: [            
            { name: SD.name.MIGRATORY, value: SD.boolean.YES },
            { name: SD.name.FOOD, value: `${SD.foodType.ROTTEN_FRUIT}, Buddleia` },
            { name: SD.name.CATERPILLAR_FOOD, value: 'Urtica dioica' },
            { name: SD.name.HIBERNATING_STAGE, value: SD.developmentStage.ADULT },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.WHITE}, ${SD.colour.BLACK}` },
            { name: SD.name.WING_SPAN, value: '5.6-6.2cm' },
            { name: SD.name.CATERPILLAR_LENGTH, value: '2.5cm' },
            { name: SD.name.HABITAT, value: `Hedera, ${SD.habitat.WOODLAND}` },
        ] },
        { name: 'Pararge aegeria', 
        symbionts: [ 
            { id: 'Elymus repens' }, { id: 'Dactylis glomerata'} ], 
        traits: [
            { name: SD.name.MIGRATORY, value: SD.boolean.NO },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, ${SD.foodType.HONEYDEW}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `${SD.foodType.GRASS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Elymus repens, Dactylis glomerata` },
            { name: SD.name.HIBERNATING_STAGE, value: `${SD.developmentStage.CATERPILLAR}, ${SD.developmentStage.PUPA}` },
            { name: SD.name.WING_SPAN, value: '3.8-4.4cm' },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.WOODLAND}, ${SD.habitat.HEDGEROWS}` },
        ] },
        { name: 'Maniola jurtina', 
        symbionts: [ 
            { id: 'Pyronia tithonus' }, { id: 'Coenonympha pamphilus'}, { id: 'Hyponephele lycaon'}, 
            { id: 'Dactylis glomerata'}, { id: 'Poaceae'}, { id: 'Erica'}, { id: 'Origanum'} ], 
        traits: [
            { name: SD.name.WING_SPAN, value: '4.0-6.0cm' },
            { name: SD.name.LOOK_ALIKES, values: [ 'Pyronia tithonus' ]},
            { name: SD.name.LOOK_ALIKES, values: [ 'Coenonympha pamphilus' ]},
            { name: SD.name.LOOK_ALIKES, values: [ 'Hyponephele lycaon' ]},
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.GREEN}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Dactylis glomerata, Poaceae` },
            { name: SD.name.HABITAT, value: `${SD.habitat.FOREST_STEPPE}, ${SD.habitat.MEADOW_STEPPE}`},
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.WOODLAND}, ${SD.habitat.ORCHARDS}`},
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Erica, Origanum` },
        ] },
        { name: 'Pieris rapae', 
        symbionts: [ 
            { id: 'Brassica oleracea'}, { id: 'Armoracia rusticana'}, { id: 'Raphanus raphanistrum'}, 
            { id: 'Brassica rapa'}, { id: 'Sinapis alba'} ],
        traits: [
            { name: SD.name.WING_SPAN, value: '3.2-4.7cm' },
            { name: SD.name.HABITAT, value: `${SD.habitat.URBAN}, ${SD.habitat.VALLEYS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Brassica oleracea, Armoracia rusticana` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Raphanus raphanistrum` },
            { name: SD.name.MIGRATORY, value: SD.boolean.YES },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Brassica rapa` },
        ] },
        { name: 'Charaxes jasius', 
        symbionts: [ { id: 'Arbutus unedo'}, { id: 'Laurus nobilis'}, { id: 'Prunus persica'} ],
        traits: [
            { name: SD.name.WING_SPAN, value: '6.5-9.0cm' },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.GREEN}, ${SD.colour.YELLOW}` },
            { name: SD.name.FOOD, value: `${SD.foodType.ROTTEN_FRUIT}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Arbutus unedo, Laurus nobilis` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Prunus persica` },
            { name: SD.name.HABITAT, value: `${SD.habitat.MAQUIS}, ${SD.habitat.SAVANNA}` },
        ] },
        { name: 'Polyommatus icarus', 
        symbionts: [ { id: 'Vicia'}, { id: 'Leguminosae'}, { id: 'Trifolium'}, { id: 'Lotus corniculatus    '} ],
        traits: [
            { name: SD.name.WING_SPAN, value: '2.8-3.6cm' },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.PALE_GREEN}, ${SD.colour.YELLOW}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Vicia, Leguminosae` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Trifolium, Lotus corniculatus` },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.HEATH}, ${SD.habitat.DUNES}` },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}` },
        ] },

        { name: 'Papilio machaon', 
            symbionts: [ 
                { id: 'Daucus carota' }, { id: 'Angelica sylvestris'}, { id: 'Foeniculum vulgare'} ], 
            traits: [            
            { name: SD.name.MIGRATORY, value: SD.boolean.YES },
            { name: SD.name.WING_SPAN, value: '6.5-8.6cm' },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Daucus carota, Angelica sylvestris` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Foeniculum vulgare` },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.WHITE}, ${SD.colour.BLACK}, ${SD.colour.GREEN}` },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.HILLS}` },
        ] },
        { name: 'Apis mellifera', traits: [
            
        ] },
    ];
};