import { getFungiTraits } from 'api/traits/fungi-traits';
import { getBirdTraits } from 'api/traits/bird-traits';
import { getPlantTraits } from 'api/traits/plant-traits';
import { getInsectTraits } from 'api/traits/insect-traits';
import { getMammalTraits } from 'api/traits/mammal-traits';

export const getTraits = (enums) => {

    let traits = [ 
        ...getBirdTraits(enums), ...getFungiTraits(enums), ...getPlantTraits(enums), 
        ...getInsectTraits(enums), ...getMammalTraits(enums)
    ];

    return traits;
}