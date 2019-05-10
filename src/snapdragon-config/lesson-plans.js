import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

import { landscapeDefault } from 'snapdragon-config/plans/landscape/landscape-default';
import { portraitDefault } from 'snapdragon-config/plans/portrait/portrait-default';
import { landscapeFungi, landscapeLichens } from 'snapdragon-config/plans/landscape/landscape-fungi';
import { landscapeLeaf } from 'snapdragon-config/plans/landscape/landscape-leaf';

const landscapeBirds = { ...R.clone(landscapeDefault), id: 5 }; // simply a copy of default

const portraitLeaf = { ...R.clone(landscapeLeaf), id: 102, portrait: true };
const portraitFungi = { ...R.clone(portraitDefault), id: 101, portrait: true };
// const portraitFungi = { ...R.clone(landscapeFungi), id: 103, portrait: true };
const portraitLichens = { ...R.clone(landscapeLichens), id: 104, portrait: true };

const portraitBirds = { ...R.clone(portraitDefault), id: 105 };
      portraitBirds.levels[0].layouts.push(L.mediaMatch); 

export const lessonPlans = [

    landscapeDefault,
    landscapeFungi,    
    landscapeLichens,
    landscapeLeaf,
    landscapeBirds,
    
    portraitDefault,
    portraitFungi,    
    portraitLichens,
    portraitLeaf,
    portraitBirds
];