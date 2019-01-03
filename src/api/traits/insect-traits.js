import * as traitEnums from 'api/traits/trait-types';

export const getInsectTraits = (enums) => {
    const SD = enums || traitEnums;
        return [
        { name: 'Vanessa atalanta', traits: [
            { name: SD.name.MIGRATORY, value: SD.boolean.YES },
            { name: SD.name.FOOD, value: `${SD.foodType.ROTTEN_FRUIT}, Buddleia` },
            { name: SD.name.CATERPILLAR_FOOD, value: 'Urtica dioica' },
            { name: SD.name.HIBERNATING_STAGE, value: SD.developmentStage.ADULT },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.WHITE}, ${SD.colour.BLACK}` },
            { name: SD.name.WING_SPAN, value: '5.6-6.2cm' },
            { name: SD.name.CATERPILLAR_LENGTH, value: '2.5cm' },
            { name: SD.name.HABITAT, value: `Hedera, ${SD.habitat.WOODLAND}` },
        ] },
        { name: 'Pararge aegeria', traits: [
            { name: SD.name.MIGRATORY, value: SD.boolean.NO },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, ${SD.foodType.HONEYDEW}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `${SD.foodType.GRASS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Elymus repens, Dactylis glomerata` },
            { name: SD.name.HIBERNATING_STAGE, value: `${SD.developmentStage.CATERPILLAR}, ${SD.developmentStage.PUPA}` },
            { name: SD.name.WING_SPAN, value: '3.8-4.4cm' },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.WOODLAND}, ${SD.habitat.HEDGEROWS}` },
        ] },
        { name: 'Apis mellifera', traits: [
            
        ] },
        { name: 'Maniola jurtina', traits: [
            { name: SD.name.WING_SPAN, value: '4.0-6.0cm' },
            { name: SD.name.LOOK_ALIKES, values: [ 'Pyronia tithonus', 'Coenonympha pamphilus' ]},
            { name: SD.name.LOOK_ALIKES, values: [ 'Hyponephele lycaon' ]},
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.GREEN}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Dactylis glomerata, Poaceae` },
            { name: SD.name.HABITAT, value: `${SD.habitat.FOREST_STEPPE}, ${SD.habitat.MEADOW_STEPPE}`},
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.WOODLAND}, ${SD.habitat.ORCHARDS}`},
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Erica, Origanum` },
        ] },
        { name: 'Pieris rapae', traits: [
            { name: SD.name.WING_SPAN, value: '3.2-4.7cm' },
            { name: SD.name.HABITAT, value: `${SD.habitat.URBAN}, ${SD.habitat.VALLEYS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Brassica oleracea, Armoracia rusticana` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Raphanus raphanistrum` },
            { name: SD.name.MIGRATORY, value: SD.boolean.YES },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Brassica rapa` },
        ] },
        { name: 'Charaxes jasius', traits: [
            { name: SD.name.WING_SPAN, value: '6.5-9.0cm' },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.GREEN}, ${SD.colour.YELLOW}` },
            { name: SD.name.FOOD, value: `${SD.foodType.ROTTEN_FRUIT}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Arbutus unedo, Laurus nobilis` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Prunus persica` },
            { name: SD.name.HABITAT, value: `${SD.habitat.MAQUIS}, ${SD.habitat.SAVANNA}` },
        ] },
        { name: 'Polyommatus icarus', traits: [
            { name: SD.name.WING_SPAN, value: '2.8-3.6cm' },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.PALE_GREEN}, ${SD.colour.YELLOW}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Vicia, Leguminosae` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Trifolium, Lotus corniculatus` },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.HEATH}, ${SD.habitat.DUNES}` },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}` },
        ] },
        { name: 'Papilio machaon', traits: [
            { name: SD.name.MIGRATORY, value: SD.boolean.YES },
            { name: SD.name.WING_SPAN, value: '6.5-8.6cm' },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Daucus carota, Angelica sylvestris` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Foeniculum vulgare` },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.WHITE}, ${SD.colour.BLACK}, ${SD.colour.GREEN}` },
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.HILLS}` },
        ] },
    ];
};