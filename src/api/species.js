import { fruit } from 'api/snapdragon/fruit';
import { vegetables } from 'api/snapdragon/vegetables';
import { insects } from 'api/snapdragon/insects';
import { deciduousAndEvergreenTrees } from 'api/rhs/deciduous-evergreen-trees';

import { birds } from 'api/snapdragon/common-city-birds';
import { mushrooms } from 'api/snapdragon/mushrooms';
import { weeds } from 'api/rhs/weeds';
import { lichen } from 'api/snapdragon/lichen';

import { plants } from 'api/snapdragon/plants';
import { local } from 'api/snapdragon/local';
import { mammals } from 'api/snapdragon/mammals';


export const species = [
    ...birds,
    ...mushrooms,
    ...fruit,
    ...vegetables,
    ...insects,
    ...deciduousAndEvergreenTrees,
    ...weeds,
    ...lichen,
    ...plants,
    ...local,
    ...mammals
];