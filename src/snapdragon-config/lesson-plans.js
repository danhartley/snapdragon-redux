import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

import { landscapeCustom } from 'snapdragon-config/plans/landscape/landscape-custom';
import { landscapeFungi, landscapeLichens } from 'snapdragon-config/plans/landscape/landscape-fungi';

import { landscapeStatic, landscapeStaticTaxonGroup, landscapeStaticProviderQuestionsOnly } from 'snapdragon-config/plans/landscape/landscape-static';
import { portraitStatic, portraitStaticTaxonGroup } from 'snapdragon-config/plans/portrait/portrait-static';

const landscapeBirds = { ...R.clone(landscapeStatic), id: 5 };
      landscapeBirds.levels[0].bonusLayouts[0].types.push('song');

const portraitBirds = { ...R.clone(portraitStatic), id: 105 };
      portraitBirds.levels[0].layouts.push(L.mediaMatch); 

const portraitFungi = { ...R.clone(landscapeFungi), id: 103, portrait: true };
      portraitFungi.levels[0].bonusLayouts = [ { ...L.traitPropertyMatch, types: [ 'definition' ] } ];

const portraitLichens = { ...R.clone(landscapeLichens), id: 104, portrait: true };
const portraitCustom = { ...R.clone(landscapeCustom), id: 101, portrait: true };

export const lessonPlans = [

    landscapeCustom,
    landscapeStatic,
    landscapeStaticTaxonGroup,
    landscapeStaticProviderQuestionsOnly,
    landscapeFungi,    
    landscapeLichens,
    landscapeBirds,
    
    portraitCustom,
    portraitStatic,
    portraitStaticTaxonGroup,    
    portraitFungi,    
    portraitLichens,
    portraitBirds,
    
];