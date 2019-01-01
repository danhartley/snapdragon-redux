import * as traitEnums from 'api/traits/trait-types';

export const getPlantTraits = (enums) => {
    const SD = enums || traitEnums;
        return [
        { name: 'Sinapis alba', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE},
            { name: SD.name.USAGE, value: `${SD.usage.FODDER}, ${SD.usage.GREEN_MANURE}, ${SD.usage.FOOD}`},
            { name: SD.name.HEIGHT, value: '30-100cm'},
            { name: SD.name.BLADE, value: `${SD.blade.COMPOUND}`},
            { name: SD.name.COMPOUND, value: `${SD.leafType.PINNATE}` },
            { name: SD.name.LEAF_SHAPE, value: `${SD.leafShape.OVATE}, ${SD.leafShape.OBLANCEOLATE}, ${SD.leafShape.OBOVATE}` },
            { name: SD.name.STEM_ARRANGEMENT, value: `${SD.stemArrangement.ALTERNATE}` },
            { name: SD.name.LONGEVITY, value: `${SD.longevity.ANNUAL}` },
            { name: SD.name.LEAF_EDGE, value: `${SD.leafEdge.DENTATE}` },
        ] },
        { name: 'Allium sativum', traits: [
            { name: SD.name.HOW_EDIBLE, value: SD.howEdible.EDIBLE},
            { name: SD.name.USAGE, value: `${SD.usage.MEDICINE}, ${SD.usage.FOOD}`},
            { name: SD.name.HEIGHT, value: '<100cm'},
            { name: SD.name.REPRODUCTION, value: `${SD.sex.HERMAPHRODITE}` },
            { name: SD.name.BLADE, value: `${SD.blade.SIMPLE}` },
            { name: SD.name.LEAF_SHAPE, value: `${SD.leafShape.LINEAR}` },
            { name: SD.name.STEM_ARRANGEMENT, value: `${SD.stemArrangement.BASAL}` },
            { name: SD.name.LONGEVITY, value: `${SD.longevity.PERENNIAL}` },
            { name: SD.name.LEAF_EDGE, value: `${SD.leafEdge.SMOOTH}` },
        ] },
    ];
};