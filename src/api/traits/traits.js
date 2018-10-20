import { getFungiTraits } from 'api/traits/fungi-traits';
import { birdTraits } from 'api/traits/bird-traits';

export const traits = [ ...birdTraits, ...getFungiTraits() ]