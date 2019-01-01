import { getFungiTraits } from 'api/traits/fungi-traits';
import { getBirdTraits } from 'api/traits/bird-traits';
import { getPlantTraits } from 'api/traits/plant-traits';

export const getTraits = enums => {
    return [ ...getBirdTraits(enums), ...getFungiTraits(enums), ...getPlantTraits(enums) ];
}