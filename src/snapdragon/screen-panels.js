const specimenImages = {
    name: 'specimen-images',
    domain: 'collection',
  };
  
  const history = { 
    name: 'history', 
    domain: 'history',
    // template: 'js-history-template'
  };
  
  const speciesCard = {
    name: 'species-card',
    domain: 'collection',
  };
  
  const definitionCard = {
    name: 'definition-card',
    domain: 'collection'
  };
  
  const scientifics = {
    name: 'species-scientifics',
    domain: 'collection',
    taxon: 'name'
    // headers: { long: 'Click the latin name to match the species', short: 'Click name to match species'},
    // question: 'Tap to match common name',
    // template: 'js-strips-template',
  };
  
  const vernaculars = {
    name: 'species-vernaculars',
    domain: 'collection',
    taxon: 'name'
    // question: 'Tap to match latin name',
    // template: 'js-strips-template',
  };
  
  const text = {
    name: 'text-entry',
    domain: 'collection'
  };
  
  const textComplete = {
    name: 'text-complete',
    domain: 'collection',
    question: 'Complete the latin name',
  };
  
  const summary = { 
    name: 'summary', 
    domain: 'history',
    // template: 'js-summary-template'
  };
  
  const mixedSpecimenQuestions = {
    name: 'mixed-specimen-questions',
    domain: 'ui'
  };
  
  const command = {
    name: 'command', 
    domain: 'collection',
    left: specimenImages,
    right: {
      cutLength: 5,
      domain: 'collection',
      // template: 'js-letters-template',
      question: 'Name puzzle'
    }
  };
  
  const leaf = {
    name: 'leaf-image',
    domain: 'collection',
    // template: 'js-leaf-image-template'     
  };
  
  const leafName = {
    name: 'leaf-text',
    domain: 'collection',
    // template: 'js-text-entry-template'     
  };
  
  const epithets = {
    name: 'epithet',
    domain: 'collection'
  };
  
  const definitions = {
    name: 'definition',
    domain: 'collection'
  };
  
  const family = {
    name: 'family',
    domain: 'collection',
    question: 'Match species family',
  };
  
  const familyStrips = {
    name: 'family-strips',
    domain: 'collection',
    question: 'Match species family',
  };
  
  const taxon = {
    name: 'taxon-card',
    domain: 'collection'
  };
  
  const nonTaxon = {
    name: 'non-taxon-card',
    domain: 'collection'
  };
  
  const nonTaxonSpecimenTiles = {
    name: 'non-taxon-specimen-tiles',
    domain: 'collection'
  };
  
  const cultivarCard = {
    name: 'cultivar-card',
    domain: 'collection'
  };
  
  const cultivar = {
    name: 'cultivar-match',
    domain: 'collection'
  };
  
  const wildcardCard = {
    name: 'wildcard-card',
    domain: 'collection'
  };
  
  const wildcard = {
    name: 'wildcard-match',
    domain: 'collection'
  };
  
  const specimenCommonMatch = {
    name: 'visual-match',
    domain: 'collection',
    type: 'vernacular'
  };
  
  const specimenLatinMatch = {
    name: 'visual-match',
    domain: 'collection',
    type: 'binomial'
  };
  
  const traitProperty = {
    name: 'trait-property',
    domain: 'collection'
  };

  const mixedSpecimensLeft = {
    name: 'mixed-specimen-question',
    domain: 'collection'
  };

  const mixedSpecimensRight = {
    name: 'mixed-specimen-images',
    domain: 'collection'
  };
  
  export const panels = {
    specimenImages,
    history,
  
    speciesCard,
    definitionCard,
    scientifics,
    vernaculars,
    text,
    summary,
  
    command,
  
    leaf,
    leafName,
  
    epithets,
    definitions,
    family,
    familyStrips,
    
    taxon,
    nonTaxon,
    nonTaxonSpecimenTiles,
    textComplete,
    cultivarCard,
    cultivar,
    wildcardCard,
    wildcard,
  
    specimenCommonMatch,
    specimenLatinMatch,
    traitProperty,
  
    mixedSpecimenQuestions,

    mixedSpecimensLeft,
    mixedSpecimensRight
  };