import * as traitEnums from 'api/traits/trait-types';

const getTraits = SD => {    
        return [
        { name: 'Vanessa atalanta', 
        symbionts: [ 
            { id: 'Urtica dioica' }, { id: 'Buddleia'}, { id: 'Hedera'} ], 
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
        symbionts: [ 
            { id: 'Elymus repens' }, { id: 'Dactylis glomerata'} ], 
        traits: [
            { name: SD.name.MIGRATORY, value: SD.whether.NO },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, ${SD.foodType.HONEYDEW}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `${SD.foodType.GRASS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Elymus repens, Dactylis glomerata`, type: SD.symbiosis.HERBIVORY },
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
            { name: SD.name.CATERPILLAR_FOOD, value: `Dactylis glomerata, Poaceae`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.HABITAT, value: `${SD.habitat.FOREST_STEPPE}, ${SD.habitat.MEADOW_STEPPE}`},
            { name: SD.name.HABITAT, value: `${SD.habitat.MEADOW}, ${SD.habitat.WOODLAND}, ${SD.habitat.ORCHARDS}`},
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Erica, Origanum`, type: SD.symbiosis.MUTUALISM },
        ] },
        { name: 'Pieris rapae', 
        symbionts: [ 
            { id: 'Brassica oleracea'}, { id: 'Armoracia rusticana'}, { id: 'Raphanus raphanistrum'}, 
            { id: 'Brassica rapa'}, { id: 'Sinapis alba'} ],
        traits: [
            { name: SD.name.WING_SPAN, value: '3.2-4.7cm' },
            { name: SD.name.HABITAT, value: `${SD.habitat.URBAN}, ${SD.habitat.VALLEYS}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Brassica oleracea, Armoracia rusticana`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CATERPILLAR_FOOD, value: `Raphanus raphanistrum`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.MIGRATORY, value: SD.whether.YES },
            { name: SD.name.FOOD, value: `${SD.foodType.NECTAR}, Brassica rapa`, type: SD.symbiosis.MUTUALISM },
        ] },
        { name: 'Charaxes jasius', 
        symbionts: [ { id: 'Arbutus unedo'}, { id: 'Laurus nobilis'}, { id: 'Prunus persica'} ],
        traits: [
            { name: SD.name.WING_SPAN, value: '6.5-9.0cm' },
            { name: SD.name.CATERPILLAR_COLOUR, value: `${SD.colour.GREEN}, ${SD.colour.YELLOW}` },
            { name: SD.name.FOOD, value: `${SD.foodType.ROTTEN_FRUIT}` },
            { name: SD.name.CATERPILLAR_FOOD, value: `Arbutus unedo, Laurus nobilis`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CATERPILLAR_FOOD, value: `Prunus persica`, type: SD.symbiosis.HERBIVORY },
            { name: SD.name.HABITAT, value: `${SD.habitat.MAQUIS}, ${SD.habitat.SAVANNA}` },
        ] },
        { name: 'Polyommatus icarus', 
        symbionts: [ { id: 'Vicia'}, { id: 'Leguminosae'}, { id: 'Trifolium'}, { id: 'Lotus corniculatus'} ],
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
                { id: 'Daucus carota' }, { id: 'Angelica sylvestris'}, { id: 'Foeniculum vulgare'} ], 
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
        symbionts: [
            { id: 'Varroa mite'}
        ],
        traits: [
            { name: SD.name.ORGANISATION, value: SD.organisation.EUSOCIAL },
            { name: SD.name.POLLINATION, value: 'Plantae' },
            { name: SD.name.HOST, value: 'Varroa mite', type: SD.symbiosis.PARASITISM },
            { name: SD.name.HOST, value: 'Colony collapse disorder', type: SD.symbiosis.PARASITISM },
        ] },
    ];
};

export const getInsectTraits = (enums) => {
    const SD = enums || traitEnums;
    const traits = getTraits(SD);
    traits.forEach(species => {
        if(!species.traits.find(trait => trait.name === 'TROPHIC_LEVEL')) {
            species.traits.push({ name: SD.name.TROPHIC_LEVEL, value: '2.2' })
        }
    });
    return traits;
}