import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

// import { landscapeDefault } from 'snapdragon-config/plans/landscape/landscape-default';
// import { portraitDefault } from 'snapdragon-config/plans/portrait/portrait-default';
import { landscapeFungi, landscapeLichens } from 'snapdragon-config/plans/landscape/landscape-fungi';

import { landscapeStatic, landscapeStaticTaxonGroup } from 'snapdragon-config/plans/landscape/landscape-static';
import { portraitStatic, portraitStaticTaxonGroup } from 'snapdragon-config/plans/portrait/portrait-static';

const landscapeBirds = { ...R.clone(landscapeStatic), id: 5 };
      landscapeBirds.levels[0].bonusLayouts[0].types.push('song');

const portraitBirds = { ...R.clone(portraitStatic), id: 105 };
      portraitBirds.levels[0].layouts.push(L.mediaMatch); 

const portraitFungi = { ...R.clone(landscapeFungi), id: 103, portrait: true };
const portraitLichens = { ...R.clone(landscapeLichens), id: 104, portrait: true };

export const lessonPlans = [

    // landscapeDefault,
    landscapeStatic,
    landscapeStaticTaxonGroup,
    landscapeFungi,    
    landscapeLichens,
    landscapeBirds,
    
    // portraitDefault,
    portraitStatic,
    portraitStaticTaxonGroup,    
    portraitFungi,    
    portraitLichens,
    portraitBirds,
    
];