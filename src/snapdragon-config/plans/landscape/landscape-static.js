import * as R from 'ramda';

import { layouts as L } from 'snapdragon-config/screen-layouts';

const propertyTrait = (traitPropertyMatch, trait) => {
    const layout = R.clone(traitPropertyMatch);
    layout.screens[0].trait = trait;
    layout.screens[1].trait = trait;
    return layout;
};

export const landscapeStatic = {
    id: 10,
    name:'Lesson 1',
    portrait: false,
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

export const landscapeStaticTaxonGroup = {
    id: 11,
    name:'Lesson 11',
    portrait: false,
    default: true,
    levels: [
        {   id: 1,
            name:'Level 1',
            layouts: [                          
                        L.speciesIdentificationMatch,
                        L.mixedSpecimenImages, 
                        L.latinToCommonMatch, L.commonEntry,
                        L.commonToLatinMatch,
                        L.textCompleteGenus, 
                        L.genusEntry,                        
                        L.textCompleteSpecies, L.speciesEntry,
                        L.speciesGenusEntry,
                    ],
            bonusLayouts: [ { ...L.traitPropertyMatch, types: [ 'lookalikes', 'definition' ] } ]
        }
    ]
};