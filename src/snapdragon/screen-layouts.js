import { panels } from 'snapdragon/screen-panels';

const { 
    specimenImages, speciesCard, vernaculars, scientifics, text, 
    command, leaf, leafName, 
    family, familyStrips, taxon, nonTaxon, textComplete, cultivar, cultivarCard, 
    epithets, wildcardCard, wildcard, definitions, 
    specimenCommonMatch, specimenLatinMatch,
    definitionCard, traitProperty,
    nonTaxonSpecimenTiles,
    mixedSpecimenQuestions,
    mixedSpecimensLeft,
    mixedSpecimensRight } = panels;

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
    given: 'Given specimenImages images',
    requirement: 'Select trait value',
    screens: [
        { ...specimenImages },
        { ...traitProperty }
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
        { ...text, template: 'js-genus-entry-template', taxon: 'genus'}
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
        { ...text, template: 'js-species-entry-template', taxon: 'species'}
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
        { ...text, template: 'js-species-genus-entry-template', taxon: 'name'}
    ]
};

const commandLayout = {
    name: 'screen-command',
    type:'test',
    score: 1,
    points: 2,
    kind: 'T',
    given: 'Various',
    requirement: 'various',
    screens: [
        { ...command },
    ]
};

const leafEntry = {
    type:'test',
    score: 1,
    points: 3,
    kind: 'T',
    screens: [
        { ...leaf },
        { ...leafName, template: 'js-text-entry-template' }
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
        { ...text, template: 'js-vernacular-entry-template', taxon: 'vernacular', headers: { long: 'Enter the common name', short: 'Enter the common name'}}
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

const connections = {
    name: 'screen-connections',
    type: 'test',
    score: 1,
    points: 1,
    kind: 'MC',
    given: 'List of traits',
    requirement: 'List of species',
    screens: [
        { ...specimenImages },
        { ...wildcardCard },
        { ...wildcard }
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
  familyMatch,
  cultivarMatch,
  familyStripsMatch,
  genusEntry,
  speciesEntry,
  speciesGenusEntry,
  textCompleteSpecies,
  commonEntry,
  connections,
  leafEntry,
  glossaryTerms,
  latinEpithets,
  cultivars,
  mixedSpecimenImages
}