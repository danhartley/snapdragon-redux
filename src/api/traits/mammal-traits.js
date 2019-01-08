import * as traitEnums from 'api/traits/trait-types';

const getTraits = SD => {    
    return [
    { name: 'Sciurus vulgaris', 
    symbionts: [ 
        { id: 'Corylus' }, { id: 'Fagus'}, { id: 'Castanea'}, { id: 'Fungi'},
        { id: 'Pinus sylvestris'}, { id: 'Picea abies'}, { id: 'Pinus sibirica'},
        { id: 'Martes martes'}, { id: 'Felis silvestris'}, { id: 'Mustela erminea'},
        { id: 'Strigiformes'}, { id: 'Accipiter gentilis'}, { id: 'Buteo'},
        { id: 'Vulpes vulpes'}, { id: 'Squirrel parapoxvirus'}, { id: 'Sciurus carolinensis'},
    ], 
    traits: [            
        { name: SD.name.FOOD, value: `${SD.foodType.SEEDS}, Corylus, Fagus`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.FOOD, value: `${SD.foodType.SEEDS}, Castanea, Fungi`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.HABITAT, value: `${SD.habitat.BOREAL}, ${SD.treeType.CONIFERS}, ${SD.treeType.BROAD_LEAF}`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.HABITAT, value: `Pinus sylvestris, Picea abies`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.HABITAT, value: `Pinus sibirica`, type: SD.symbiosis.COMMENSALISM },
        { name: SD.name.LIFE_SPAN, value: '3-7a' },
        { name: SD.name.SHELTER, value: SD.shelter.DREY },
        { name: SD.name.ACTIVE, value: SD.active.CREPUSCULAR },
        { name: SD.name.PREDATOR, value: `Martes martes, Felis silvestris`, type: SD.symbiosis.PREDATION },
        { name: SD.name.PREDATOR, value: `Mustela erminea`, type: SD.symbiosis.PREDATION },
        { name: SD.name.PREDATOR, value: `Strigiformes, Accipiter gentilis`, type: SD.symbiosis.PREDATION },
        { name: SD.name.PREDATOR, value: `Buteo, Vulpes vulpes`, type: SD.symbiosis.PREDATION },
        { name: SD.name.DISEASE, value: 'Squirrel parapoxvirus', type: SD.symbiosis.PREDATION },
        { name: SD.name.THREAT, value: 'Sciurus carolinensis', type: SD.symbiosis.COMPETITION },
        { name: SD.name.SEXUAL_DIMORPHISM, value: SD.boolean.NO },
        { name: SD.name.LENGTH, value: '19-20cm' },
        { name: SD.name.MATING, value: `${SD.month.FEBRUARY}-${SD.month.MARCH}` },
        { name: SD.name.MATING, value: `${SD.month.JUNE}-${SD.month.JULY}` },
        { name: SD.name.LITTER_SIZE, value: `3` },
        { name: SD.name.YOUNG, value: SD.young.KIT },
        { name: SD.name.GESTATION, value: '38-39d' },
        { name: SD.name.WEANING, value: '8-10w' },
    ] },
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

