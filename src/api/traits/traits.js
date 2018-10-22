import { getFungiTraits } from 'api/traits/fungi-traits';
import { birdTraits } from 'api/traits/bird-traits';

export const getTraits = enums => {
    return [ ...birdTraits, ...getFungiTraits(enums) ]
}