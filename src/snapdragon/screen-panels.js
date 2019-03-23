const specimenImages = {
    name: 'specimen-images',
    domain: 'collection',
  };
  
  const history = { 
    name: 'history', 
    domain: 'history'
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
  };
  
  const vernaculars = {
    name: 'species-vernaculars',
    domain: 'collection',
    taxon: 'name'
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
    domain: 'history' 
  };
  
  const mixedSpecimenQuestions = {
    name: 'mixed-specimen-questions',
    domain: 'collection'
  };
  
  const command = {
    name: 'command', 
    domain: 'collection',
    left: specimenImages,
    right: {
      cutLength: 5,
      domain: 'collection',
      question: 'Name puzzle'
    }
  };
  
  const leaf = {
    name: 'leaf-image',
    domain: 'collection'
  };
  
  const leafName = {
    name: 'leaf-text',
    domain: 'collection'
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