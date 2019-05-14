import { insects } from 'api/snapdragon/insects';
import { deciduousAndEvergreenTrees } from 'api/rhs/deciduous-evergreen-trees';
import { deciduousAndEvergreenTrees2 } from 'api/rhs/deciduous-evergreen-trees2';

import { birds } from 'api/snapdragon/birds';
import { mushrooms } from 'api/snapdragon/mushrooms';
import { mushrooms2 } from 'api/snapdragon/mushrooms2';
import { weeds } from 'api/rhs/weeds';
import { lichen } from 'api/snapdragon/lichen';

import { plants } from 'api/snapdragon/plants';
import { local } from 'api/snapdragon/local';
import { mammals } from 'api/snapdragon/mammals';
import { reptiles } from 'api/snapdragon/reptiles';
import { amphibians } from 'api/snapdragon/amphibians';

export const species = [
    ...birds,
    ...mushrooms,
    ...mushrooms2,
    ...insects,
    ...deciduousAndEvergreenTrees,
    ...deciduousAndEvergreenTrees2,
    ...weeds,
    ...lichen,
    ...plants,
    ...local,
    ...mammals,
    ...reptiles,
    ...amphibians
].filter(s => s.name);