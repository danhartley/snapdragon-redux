import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

import { landscapeDefault } from 'snapdragon-config/plans/landscape/landscape-default';
import { portraitDefault } from 'snapdragon-config/plans/portrait/portrait-default';
import { landscapeFungi, landscapeLichens } from 'snapdragon-config/plans/landscape/landscape-fungi';
import { landscapeLeaf } from 'snapdragon-config/plans/landscape/landscape-leaf';

import { landscapeStatic } from 'snapdragon-config/plans/landscape/landscape-static';
import { portraitStatic } from 'snapdragon-config/plans/portrait/portrait-static';

const landscapeBirds = { ...R.clone(landscapeStatic), id: 5 };
      landscapeBirds.levels[0].bonusLayouts[0].types.push('song');

const portraitBirds = { ...R.clone(portraitDefault), id: 105 };
      portraitBirds.levels[0].layouts.push(L.mediaMatch); 

const portraitLeaf = { ...R.clone(landscapeLeaf), id: 102, portrait: true };
const portraitFungi = { ...R.clone(landscapeFungi), id: 103, portrait: true };
const portraitLichens = { ...R.clone(landscapeLichens), id: 104, portrait: true };

export const lessonPlans = [

    landscapeDefault,
    landscapeStatic,
    landscapeFungi,    
    landscapeLichens,
    landscapeLeaf,
    landscapeBirds,
    
    portraitDefault,
    portraitFungi,    
    portraitLichens,
    portraitLeaf,
    portraitBirds,
    
    portraitStatic,
    portraitFungi    
];