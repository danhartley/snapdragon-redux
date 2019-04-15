import * as R from 'ramda';

import { layouts as L } from 'snapdragon/screen-layouts';

import { landscapeDefault } from 'snapdragon/plans/landscape/landscape-default';
import { portraitDefault } from 'snapdragon/plans/portrait/portrait-default';
import { landscapeFungi, landscapeLichens } from 'snapdragon/plans/landscape/landscape-fungi';
import { landscapeLeaf } from 'snapdragon/plans/landscape/landscape-leaf';

const landscapeBirds = { ...R.clone(landscapeDefault), id: 5 };
      landscapeBirds.levels[0].layouts.push(L.mediaMatch);  

const portraitLeaf = { ...R.clone(landscapeLeaf), id: 102, portrait: true };
const portraitFungi = { ...R.clone(landscapeFungi), id: 103, portrait: true };
const portraitLichens = { ...R.clone(landscapeLichens), id: 104, portrait: true };

export const lessonPlans = [

    landscapeDefault,
    landscapeFungi,    
    landscapeLichens,
    landscapeLeaf,
    landscapeBirds,
    
    portraitDefault,
    portraitFungi,    
    portraitLichens,
    portraitLeaf
];