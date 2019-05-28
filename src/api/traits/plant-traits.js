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
            { name: SD.name.CHARACTERISTIC, value: `${SD.characteristic.ANNUAL}` },
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
            { name: SD.name.CHARACTERISTIC, value: `${SD.characteristic.PERENNIAL}` },
            { name: SD.name.LEAF_EDGE, value: `${SD.leafEdge.SMOOTH}` },
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
            { name: SD.name.USAGE, value: `${SD.usage.SPICE}, ${SD.usage.HERB}` },
            { name: SD.name.FRUIT_TYPE, value: SD.fruitType.DRUPE },
        ] },
        { name: 'Oxalis pes-caprae', traits: [
            { name: SD.name.USAGE, value: `${SD.usage.FOOD}, ${SD.usage.DYING}` },
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
            { name: SD.name.ROLE, value: SD.role.PIONEER },
        ] },
        { name: 'Daucus carota', 
        symbionts: [ 
            { id: 'Chalara elegans' }, { id: 'Rhizoctonia solani'}, { id: 'Fusarium'}
        ],
        traits: [
            { name: SD.role.HOST, value: 'Chalara elegans', description: 'Black root rot', type: SD.symbiosis.PARASITISM },
            { name: SD.role.HOST, value: 'Rhizoctonia solani', description: 'Crown rot', type: SD.symbiosis.PARASITISM },
            { name: SD.role.HOST, value: 'Fusarium', description: 'Fusarium dry rot', type: SD.symbiosis.PARASITISM },
            { name: SD.name.USAGE, value: `${SD.usage.FOOD}, ${SD.usage.DYING}` },
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE },
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
            { id: 'Papilio machaon' }, { id: 'Amphipyra tragopoginis'}
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.FOOD}` },
            { name: SD.name.FOOD, value: `Papilio machaon, Amphipyra tragopoginis`, type: SD.symbiosis.HERBIVORY },
        ] },
    { name: 'Urtica dioica',
        symbionts: [ 
            { id: 'Vanessa atalanta' }
        ], 
        traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.role.HERBIVORE, value: 'Vanessa atalanta', type: SD.symbiosis.HERBIVORY },
            { name: SD.name.CHARACTERISTIC, value: `${SD.characteristic.PERENNIAL}, ${SD.characteristic.DIOECIOUS}, ${SD.characteristic.HERBACEOUS}` },
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
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.MYCORRHIZAL },
        ] 
    },
    { name: 'Liquidambar styraciflua',
        symbionts: [ 
            { id: 'Actias luna'}
        ], 
        traits: [
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.MYCORRHIZAL },
        ] 
    },
    { name: 'Ocimum basilicum',
        symbionts: [ 
            { id: 'Solanum lycopersicum', id: 'Botrytis cinerea', id: 'Peronospora belbahrii' }
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.FOOD}` },
            { name: SD.name.CHARACTERISTIC, value: `${SD.characteristic.ANNUAL}, ${SD.characteristic.PERENNIAL}` },
            { name: SD.name.CLIMATE_CONDITIONS, value: `${SD.climate.HOT}, ${SD.climate.DRY}` },
            { name: SD.role.SYMBIONT, value: 'Solanum lycopersicum', type: SD.symbiosis.COMPANION },
            { name: SD.role.HOST, value: 'Fusarium wilt', type: SD.symbiosis.PARASITISM },
            { name: SD.role.HOST, value: 'Botrytis cinerea', type: SD.symbiosis.PARASITISM },
            { name: SD.role.HOST, value: 'Peronospora belbahrii', type: SD.symbiosis.PARASITISM },
        ] 
    },
    { name: 'Solanum lycopersicum',
        symbionts: [ 
            { id: 'Ocimum basilicum' }, { id: 'Petroselinum crispum'}, { id: 'Anthriscus sylvestris' }, { id: 'Anethum graveolens'}, { id: 'Manduca quinquemaculata'}
        ], 
        traits: [
            { name: SD.name.USAGE, value: SD.usage.FOOD },
            { name: SD.role.SYMBIONT, value: 'Ocimum basilicum, Petroselinum crispum, Anthriscus sylvestris, Anethum graveolens, Apiaceae, Lamiaceae, Allium, Taraxacum', type: SD.symbiosis.COMPANION },
            { name: SD.name.CLIMATE_CONDITIONS, value: `${SD.climate.TEMPERATE}` },
            { name: SD.name.BEHAVIOUR, value: `${SD.behaviour.DECUMBENT}, ${SD.behaviour.ETHYLENE_RIPENING}` },
            { name: SD.name.POLLINATION, value: `${SD.pollination.ALLOGAMY}, ${SD.pollination.SONICATION}, ${SD.pollination.MELITTOPHILY}` },
            { name: SD.name.CHARACTERISTIC, value: `${SD.characteristic.ANNUAL}, ${SD.characteristic.PERENNIAL}, ${SD.characteristic.DICOTYLEDON}, ${SD.characteristic.PUBESCENT}` },
            { name: SD.name.FRUIT_TYPE, value: SD.fruitType.BERRY },
            { name: SD.role.HOST, value: `Stink bugs, cutworms, tomato hornworms, aphids, Manduca quinquemaculata`, type: SD.symbiosis.PARASITISM },
        ] 
    },
    { name: 'Petroselinum crispum',
        symbionts: [ 
            { id: 'Solanum lycopersicum' }
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.FOOD}` },
            { name: SD.role.SYMBIONT, value: 'Solanum lycopersicum', type: SD.symbiosis.COMPANION },            
        ] 
    },
    { name: 'Anethum graveolens',
        symbionts: [ 
            { id: 'Solanum lycopersicum' }
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.FOOD}` },
            { name: SD.role.SYMBIONT, value: 'Solanum lycopersicum', type: SD.symbiosis.COMPANION },            
        ] 
    },
    { name: 'Thymus vulgaris',
        symbionts: [ 
            
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.MEDICINE}, ${SD.usage.FOOD}` },
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.EVERGREEN },
            { name: SD.name.SOIL_TYPE, value: SD.soilType.NUTRIENT_POOR },
            { name: SD.name.CHARACTERISTIC, value: SD.characteristic.CHAMAEPHYTE }
        ] 
    },
    { name: 'Rosmarinus officinalis',
        symbionts: [ 
            
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.PEST_CONTROL}, ${SD.usage.TEA}` },
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.EVERGREEN },
            { name: SD.name.SOIL_TYPE, value: `${SD.pHLevel.NEUTRAL}, ${SD.pHLevel.ALKALINE}, ${SD.soilType.NUTRIENT_POOR}` },
            { name: SD.name.CHARACTERISTIC, value: `${SD.characteristic.CHAMAEPHYTE}, ${SD.characteristic.PERENNIAL}, ${SD.characteristic.FIBROUS_ROOT_SYSTEM}, ${SD.characteristic.DROUGHT_TOLERANT}` },
            { name: SD.name.CLIMATE_CONDITIONS, value: `${SD.climate.TEMPERATE}, ${SD.climate.COOL}` },
        ] 
    },
    { name: 'Lavandula angustifolia',
        symbionts: [ 
            { id: 'Lavandula stoechas'}
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.MEDICINE}, ${SD.usage.PERFUMERY}, ${SD.usage.TEA}, ${SD.usage.ESSENTIAL_OIL}` },
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.EVERGREEN },
            { name: SD.name.CHARACTERISTIC, value: SD.characteristic.CHAMAEPHYTE },
            { name: SD.name.SOIL_TYPE, value: `${SD.pHLevel.NEUTRAL}, ${SD.pHLevel.ALKALINE}, ${SD.soilType.NUTRIENT_POOR}` },
            { name: SD.name.LOOK_ALIKES, values: [ 'Lavandula stoechas' ]},
        ] 
    },
    { name: 'Lavandula stoechas',
        symbionts: [ 
            { id: 'Lavandula angustifolia'}
        ], 
        traits: [
            { name: SD.name.USAGE, value: `${SD.usage.HERB}, ${SD.usage.MEDICINE}, ${SD.usage.PERFUMERY}, ${SD.usage.TEA}, ${SD.usage.ESSENTIAL_OIL}` },
            { name: SD.name.PHYSIOLOGY, value: SD.physiology.EVERGREEN },
            { name: SD.name.CHARACTERISTIC, value: SD.characteristic.CHAMAEPHYTE },
            { name: SD.name.SOIL_TYPE, value: `${SD.pHLevel.NEUTRAL}, ${SD.pHLevel.ALKALINE}, ${SD.soilType.NUTRIENT_POOR}` },
            { name: SD.name.LOOK_ALIKES, values: [ 'Lavandula angustifolia' ]},
        ] 
    },
    { name: 'Taraxacum officinale',
        symbionts: [ 
            
        ], 
        traits: [
            { name: SD.name.LOOK_ALIKES, values: [ 'Tussilago farfara' ]},
            { name: SD.name.ROLE, value: SD.role.PIONEER },
            { name: SD.name.USAGE, value: `${SD.usage.MEDICINE}, ${SD.usage.FOOD}, ${SD.usage.COFFEE}, ${SD.usage.WINE}, ${SD.usage.DYING}` },
        ] 
    },
    { name: 'Tussilago farfara',
        symbionts: [ 
            
        ], 
        traits: [
            { name: SD.name.LOOK_ALIKES, values: [ 'Taraxacum officinale' ]},
            { name: SD.name.PROPAGATION, value: [ `${SD.foodType.RHIZOMES}, ${SD.foodType.SEEDS}` ] },
            { name: SD.name.USAGE, value: `${SD.usage.MEDICINE}` },
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.TOXIC },
        ] 
    },
  ];
};

export const getPlantTraits = enums => {
    const SD = enums && Object.keys(enums).length ? enums : traitEnums.enums;
    const traits = getTraits(SD);
    // traits.forEach(species => {
    //     if(!species.traits.find(trait => trait.name === SD.name.TROPHIC_LEVEL)) {
    //         species.traits.push({ name: SD.name.TROPHIC_LEVEL, value: SD.trophicLevel.PRIMARY_PRODUCER })
    //     }
    // });
    return traits;
};