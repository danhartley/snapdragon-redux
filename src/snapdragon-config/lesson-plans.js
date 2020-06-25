import { clone } from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

import { landscapeCustom } from 'snapdragon-config/plans/landscape/landscape-custom';
import { landscapeCustom2 } from 'snapdragon-config/plans/landscape/landscape-custom';
import { landscapeFungi, landscapeLichens } from 'snapdragon-config/plans/landscape/landscape-fungi';

import { landscapeStatic, landscapeStaticTaxonGroup, landscapeStaticProviderQuestionsOnly } from 'snapdragon-config/plans/landscape/landscape-static';
import { portraitStatic, portraitStaticTaxonGroup } from 'snapdragon-config/plans/portrait/portrait-static';

const landscapeBirds = { ...clone(landscapeStatic), id: 5 };
      if(landscapeBirds.levels[0].bonusLayouts) landscapeBirds.levels[0].bonusLayouts[0].types.push('song');

const portraitBirds = { ...clone(portraitStatic), id: 105 };
      portraitBirds.levels[0].layouts.push(L.mediaMatch); 

const portraitFungi = { ...clone(landscapeFungi), id: 103, portrait: true };
      portraitFungi.levels[0].bonusLayouts = [ { ...L.traitPropertyMatch, types: [ 'definition' ] } ];

const portraitLichens = { ...clone(landscapeLichens), id: 104, portrait: true };
const portraitCustom = { ...clone(landscapeCustom), id: 101, portrait: true };
const portraitCustom2 = { ...clone(landscapeCustom2), id: 102, portrait: true };

export const lessonPlans = [

    landscapeCustom,
    landscapeCustom2,
    landscapeStatic,
    landscapeStaticTaxonGroup,
    landscapeStaticProviderQuestionsOnly,
    landscapeFungi,    
    landscapeLichens,
    landscapeBirds,
    
    portraitCustom,
    portraitCustom2,
    portraitStatic,
    portraitStaticTaxonGroup,    
    portraitFungi,    
    portraitLichens,
    portraitBirds,
    
];