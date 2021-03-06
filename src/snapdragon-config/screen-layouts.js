import { clone } from 'ramda';

import { panels } from 'snapdragon-config/screen-panels';

const { 
    specimenImages, speciesCard, vernaculars, scientifics, text, 
    leaf, leafName, 
    family, familyStrips, taxon, nonTaxon, textComplete, cultivar, cultivarCard, 
    epithets, definitions, 
    specimenCommonMatch, specimenLatinMatch,
    definitionCard, 
    traitProperty, symbioticProperty
    , lookalikeProperty
    , traitImages,
    nonTaxonSpecimenTiles,
    mixedSpecimenQuestions,
    mixedSpecimensLeft,
    mixedSpecimensRight,
    history, summary, 
    birdsong, mediaPlayers,
    mixedTraitLeft,
    mixedTraitRight,
    providerHorizontalStripQuestions,
    speciesIdentification } = panels;

const mixedSpeciesMatch = {
    name: 'screen-mixed-species-match',
    type: 'test',
    score: 1,
    kind: 'VMC',
    points: 3,
    given: 'Given species name',    
    requirement: 'Select species image',
    screens: [
        { ...specimenImages },
        { ...mixedSpecimenQuestions }
    ]
};

const speciesRevision = {
    name: 'screen-species-card',
    type: 'revision',
    score: 0,
    kind: 'S',
    points: 0,
    given: 'Given species summary',
    requirement: 'Study species',
    screens: [
        { ...specimenImages },
        { ...speciesCard }
    ]
};

const taxonRevision = {
    name: 'screen-taxon-card',
    type:'revision',
    score: 0,
    kind: 'F',
    points: 0,
    given: 'Study',
    requirement: 'Family summary',
    screens: [
        { ...specimenImages },
        { ...taxon }
    ]
};

const nonTaxonRevision = {
    name: 'screen-non-taxon-card',
    type:'revision',
    score: 0,
    kind: 'GR',
    points: 0,
    given: 'Group summary',
    requirement: 'Study',
    screens: [
        { ...nonTaxonSpecimenTiles },
        { ...nonTaxon }
    ]
};

const definitionRevision = {
    name: 'screen-definition-card',
    type:'revision',
    score: 0,
    kind: 'G',
    points: 0,
    given: 'Given glossary',
    requirement: 'Study definitions',
    screens: [
        { ...specimenImages },
        { ...definitionCard }
    ]
};

const latinToCommonMatch = {
    name: 'screen-latin-to-common',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given latin name',
    requirement: 'Select common name',
    screens: [
        { ...specimenImages },
        { ...vernaculars }
    ]
};

const commonToLatinMatch = {
    name: 'screen-common-to-latin',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given common name',
    requirement: 'Select latin name',
    screens: [
        { ...specimenImages },
        { ...scientifics }
    ]
};

const speciesIdentificationMatch = {
    name: 'screen-species-identification',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given species name',
    requirement: 'Select identification',
    screens: [
        { ...specimenImages },
        { ...speciesIdentification }
    ]
};

const textCompleteGenus = {
    name: 'screen-genus-completion',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given species name',
    requirement: 'Select genus name',
    screens: [
        { ...specimenImages },
        { ...textComplete, type: 'text-complete-genus'  }
    ]
};

const multiSpecimenCommonMatch = {
    name: 'screen-specimens-common-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'VMC',
    given: 'Given specimenImages images',
    requirement: 'Select common name',
    screens: [
        { ...specimenImages },
        { ...specimenCommonMatch }
    ]
};

const multiSpecimenLatinMatch = {
    name: 'screen-specimens-latin-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'VMC',
    given: 'Given specimenImages images',
    requirement: 'Select latin name',
    screens: [
        { ...specimenImages },
        { ...specimenLatinMatch }
    ]
};

const traitPropertyMatch = {
    name: 'trait-property-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    bonus: true,
    given: 'Given traitImages images',
    requirement: 'Select trait value',
    screens: [
        { ...traitImages },
        { ...traitProperty }
    ]
};

const lookalikePropertyMatch = {
    name: 'lookalike-property-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    bonus: true,
    given: 'Given traitImages images',
    requirement: 'Select trait value',
    screens: [
        { ...traitImages },
        { ...lookalikeProperty }
    ]
};

const symbioticPropertyMatch = {
    name: 'symbiotic-property-match',
    type:'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Given specimenImages images',
    requirement: 'Select symbiotic match',
    screens: [
        { ...specimenImages },
        { ...symbioticProperty }
    ]
};

const familyMatch = {
    name: 'screen-species-to-family',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Species name',
    requirement: 'List families',
    screens: [
        { ...specimenImages },
        { ...family }
    ]
};

const cultivarMatch = {
    name: 'screen-cultivar-to-species',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Cultivar name',
    requirement: 'List species',
    screens: [
        { ...specimenImages },
        { ...cultivar }
    ]
};

const familyStripsMatch = {
    name: 'screen-family-to-description',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Family description',
    requirement: 'List families',
    screens: [
        { ...specimenImages },
        { ...familyStrips }
    ]
};

const genusEntry = {
    name: 'screen-genus-entry',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Given species name',
    requirement: 'Enter genus name',
    screens: [
        { ...specimenImages },
        { ...text, taxon: 'genus'}
    ]
};

const speciesEntry = {
    name: 'screen-species-entry',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Given genus name',
    requirement: 'Enter species name',
    screens: [
        { ...specimenImages },
        { ...text, taxon: 'species'}
    ]
};

const speciesGenusEntry = {
    name: 'screen-binomial-entry',
    type:'test',
    score: 1,
    points: 4,
    kind: 'T',
    given: 'Given common name',
    requirement: 'Enter latin name',
    screens: [
        { ...specimenImages },
        { ...text, taxon: 'name'}
    ]
};

const leafEntry = {
    type:'test',
    score: 1,
    points: 3,
    kind: 'T',
    screens: [
        { ...leaf },
        { ...leafName }
    ]
};

const textCompleteSpecies = {
    name: 'screen-species-completion',
    type:'test',
    score: 1,
    points: 2,
    kind: 'MC',
    given: 'Given genus name',
    requirement: 'Select species name',
    screens: [
        { ...specimenImages },
        { ...textComplete, type: 'text-complete-species' }
    ]
};

const commonEntry = {
    name: 'screen-common-entry',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Species latin name',
    requirement: 'Enter common name',
    screens: [
        { ...specimenImages },
        { ...text, taxon: 'vernacular'  }
    ]
};

const latinEpithets = {
    name: 'screen-epithets',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'Epithet',
    requirement: 'List epithet definitions',
    screens: [
        { ...specimenImages },
        { ...epithets }
    ]
};

const glossaryTerms = {
    name: 'screen-definitions',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'T',
    given: 'Given glossary term',
    requirement: 'Select definition',
    screens: [
        { ...specimenImages },
        { ...definitions }
    ]
};

const cultivars = {
    name: 'screen-cultivars',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'T',
    given: 'List of cultivars',
    requirement: 'List of species',
    screens: [
        { ...specimenImages },
        { ...cultivarCard },
        { ...cultivar }
    ]
};

const mixedSpecimenImages = {
  name: 'mixed-specimen-images',
  type:'test',
  score: 1,
  points: 2,
  kind: 'T',
  given: 'Specimen images',
  requirement: 'Select species image',
  screens: [
      { ...mixedSpecimensLeft },
      { ...mixedSpecimensRight }
  ]
};

const mediaMatch = {
    name: 'media-match',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Species song',
    requirement: 'Select species',
    screens: [
        { ...specimenImages },
        { ...birdsong }
    ]
};

const mixedTraitImages = {
    name: 'mixed-trait-images',
    type:'test',
    kind: 'T',
    score: 1,
    points: 2,
    given: 'Trait images',
    requirement: 'Select trait image',
    screens: [
        { ...mixedTraitLeft },
        { ...mixedTraitRight }
    ]
  };  

const providerHorizontalStrip = {
    name: 'provider-horizontal-strip',
    type: 'test',
    score: 1,
    screens: [
        { ...specimenImages },
        { ...providerHorizontalStripQuestions }
    ]
};

const propertyTrait = (traitPropertyMatch, traits) => {
    const layout = clone(traitPropertyMatch);
    layout.screens[0].traits = traits;
    layout.screens[1].traits = traits;
    return layout;
};

export const layouts = {
  mixedSpeciesMatch,
  speciesRevision,
  taxonRevision,
  nonTaxonRevision,
  definitionRevision,
  
  latinToCommonMatch,
  commonToLatinMatch,
  textCompleteGenus,
  multiSpecimenCommonMatch,
  multiSpecimenLatinMatch,
  traitPropertyMatch,
  lookalikePropertyMatch,
  symbioticPropertyMatch,
  familyMatch,
  cultivarMatch,
  familyStripsMatch,
  genusEntry,
  speciesEntry,
  speciesGenusEntry,
  textCompleteSpecies,
  commonEntry,
  leafEntry,
  glossaryTerms,
  latinEpithets,
  cultivars,
  mixedSpecimenImages,
  history,
  summary,
  mediaMatch,
  mixedTraitImages,
  providerHorizontalStrip,
  speciesIdentificationMatch,
  propertyTrait
}