import { getFungiTraits } from 'api/traits/fungi-traits';
import { getBirdTraits } from 'api/traits/bird-traits';

export const getTraits = enums => {
    return [ ...getBirdTraits(enums), ...getFungiTraits(enums) ]
}