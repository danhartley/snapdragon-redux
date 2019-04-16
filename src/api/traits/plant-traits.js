import * as traitEnums from 'api/traits/trait-types';

export const getTraits = SD => {
        return [
        { name: 'Sinapis alba', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE },
            { name: SD.name.USAGE, value: `${SD.usage.FODDER}, ${SD.usage.GREEN_MANURE}, ${SD.usage.FOOD}` },
            { name: SD.name.HEIGHT, value: '30-100cm' },
            { name: SD.name.BLADE, value: `${SD.blade.COMPOUND}` },
            { name: SD.name.COMPOUND, value: `${SD.leafType.PINNATE}` },
            { name: SD.name.LEAF_SHAPE, value: `${SD.leafShape.OVATE}, ${SD.leafShape.OBLANCEOLATE}, ${SD.leafShape.OBOVATE}` },
            { name: SD.name.STEM_ARRANGEMENT, value: `${SD.stemArrangement.ALTERNATE}` },
            { name: SD.name.LONGEVITY, value: `${SD.longevity.ANNUAL}` },
            { name: SD.name.LEAF_EDGE, value: `${SD.leafEdge.DENTATE}` },
        ] },
        { name: 'Allium sativum', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE },
            { name: SD.name.USAGE, value: `${SD.usage.MEDICINE}, ${SD.usage.FOOD}` },
            { name: SD.name.HEIGHT, value: '<100cm' },
            { name: SD.name.REPRODUCTION, value: `${SD.sex.HERMAPHRODITE}` },
            { name: SD.name.BLADE, value: `${SD.blade.SIMPLE}` },
            { name: SD.name.LEAF_SHAPE, value: `${SD.leafShape.LINEAR}` },
            { name: SD.name.STEM_ARRANGEMENT, value: `${SD.stemArrangement.BASAL}` },
            { name: SD.name.LONGEVITY, value: `${SD.longevity.PERENNIAL}` },
            { name: SD.name.LEAF_EDGE, value: `${SD.leafEdge.SMOOTH}` },
        ] },
        { name: 'Daucus carota', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE },
        ] },
        { name: 'Pastinaca sativa', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE },
        ] },
        { name: 'Conium maculatum', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.POISONOUS },
        ] },
        { name: 'Allium ursinum', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE },
        ] },
        { name: 'Toxicoscordion fremontii', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.POISONOUS },
        ] },
        { name: 'Sambucus nigra', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE  },
        ] },
        { name: 'Laurus nobilis', traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.name.FRUIT_TYPE, value: SD.fruitType.DRUPE },
        ] },
        { name: 'Oxalis pes-caprae', traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.role.INVASIVE, value: 'US, Australia, Europe, Israel' },
        ] },
        { name: 'Robinia pseudoacacia', 
        symbionts: [ 
            { id: 'Odontota dorsalis' }
        ],
        traits: [
            { name: SD.role.HOST, value: 'Odontota dorsalis', type: SD.symbiosis.PARASITISM },
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.POISONOUS },
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.NITROGEN_FIXING },
            { name: SD.name.USAGE, value: SD.usage.TIMBER },
            { name: SD.name.FRUIT_TYPE, value: SD.fruitType.LEGUME} ,
            { name: SD.name.SEED_COUNT, value: '4-8' },
            { name: SD.name.PH_TOLERANCE, value: '4.6-8.2' },
            { name: SD.name.ROLE, value: SD.role.PIONEEER },
            { name: SD.name.USAGE, value: SD.usage.TIMBER },
        ] },
        { name: 'Daucus carota', 
        symbionts: [ 
            { id: 'Odontota dorsalis' }
        ],
        traits: [
            { name: SD.role.HOST, value: 'Chalara elegans', description: 'Black root rot', type: SD.symbiosis.PARASITISM },
            { name: SD.role.HOST, value: 'Rhizoctonia solani', description: 'Crown rot', type: SD.symbiosis.PARASITISM },
            { name: SD.role.HOST, value: 'Fusarium', description: 'Fusarium dry rot', type: SD.symbiosis.PARASITISM },
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.name.USAGE, value: SD.usage.DYING },
        ] },
        { name: 'Bellis perennis',
        traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
        ] },
        { name: 'Gleditsia triacanthos',
        traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE },
            { name: SD.name.FRUIT_TYPE, value: SD.fruitType.LEGUME} ,
            { name: SD.name.USAGE, value: SD.usage.TIMBER },
            { name: SD.role.INVASIVE , value: 'Australia'},
        ] },
        { name: 'Foeniculum vulgare',
        symbionts: [ 
            { id: 'Papilio machaon' }
        ], 
        traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.name.FOOD, value: `Papilio machaon`, type: SD.symbiosis.HERBIVORY },
        ] },
    { name: 'Urtica dioica',
        symbionts: [ 
            { id: 'Vanessa atalanta' }
        ], 
        traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.role.HERBIVORE, value: 'Vanessa atalanta', type: SD.symbiosis.HERBIVORY },
        ] },
    { name: 'Pinus pinea',
        symbionts: [ 
            { id: 'Sciurus vulgaris' }
        ], 
        traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.role.HERBIVORE, value: 'Sciurus vulgaris', type: SD.symbiosis.HERBIVORY },
            { name: SD.name.ALLOCHORY, value: SD.allochory.ANEMOCHORY },
            { name: SD.name.REPRODUCTIVE_CONTAINER, value: SD.reproductiveContainer.CONE }
        ] },
    { name: 'Cirsium arvense',
        symbionts: [ 
            {}
        ], 
        traits: [
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.C3_CARBON_FIXATION },
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.HERBACEOUS },
            { name: SD.name.LONGEVITY, value: `${SD.longevity.PERENNIAL}` },
            { name: SD.role.RUDERAL, value: 'Everywhere' },
        ] },
    ];
};

export const getPlantTraits = (enums) => {
    const SD = Object.keys(enums).length ? enums : traitEnums.enums;
    const traits = getTraits(SD);
    traits.forEach(species => {
        if(!species.traits.find(trait => trait.name === SD.name.TROPHIC_LEVEL)) {
            species.traits.push({ name: SD.name.TROPHIC_LEVEL, value: SD.trophicLevel.PRIMARY_PRODUCER })
        }
    });
    return traits;
};