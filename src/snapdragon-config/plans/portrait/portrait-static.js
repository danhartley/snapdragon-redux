import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

const propertyTrait = (traitPropertyMatch, trait) => {
    const layout = R.clone(traitPropertyMatch);
    layout.screens[0].trait = trait;
    layout.screens[1].trait = trait;
    return layout;
};

export const portraitStatic = {
    id: 110,
    name:'Lesson 110',
    portrait: true,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [                          
                        L.mixedSpecimenImages, L.latinToCommonMatch, L.commonEntry,
                        L.commonToLatinMatch,
                        L.textCompleteGenus, L.genusEntry,                        
                        L.textCompleteSpecies, L.speciesEntry,
                        propertyTrait(L.mixedTraitImages, ['capShape', 'gillAttachment', 'leafShape', 'leafDivision', 'inflorescence', 'leafMargin']),
                        L.speciesGenusEntry,
                        L.familyMatch , L.familyStripsMatch
                    ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'lookalikes', 'definition' ] } ]
        }
    ]
};

export const portraitStaticTaxonGroup = {
    id: 111,
    name:'Lesson 111',
    portrait: true,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [                          
                        L.mixedSpecimenImages, L.latinToCommonMatch, L.commonEntry,
                        L.commonToLatinMatch,
                        L.textCompleteGenus, L.genusEntry,                        
                        L.textCompleteSpecies, L.speciesEntry,
                        L.speciesGenusEntry
                    ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'lookalikes', 'definition' ] } ]
        }
    ]
};
