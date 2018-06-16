import { DOM } from 'ui/dom';

// LEFT

const specimen = {
  name: 'specimen-images',
  domain: 'collection',
  parent: DOM.leftBody,
  template: 'js-specimen-images-template'     
};

const history = { 
  name: 'history', 
  domain: 'history', 
  parent: DOM.leftBody,
  template: 'js-history-template'
};

// RIGHT

const revision = {
  name: 'species-card',
  domain: 'collection',
  parent: DOM.rightBody ,
  template: 'js-card-revision-template'
};

const scientifics = {
  name: 'species-scientifics',
  headers: { long: 'Click the latin name to match the species', short: 'Click name to match species'},
  question: 'Tap to match common name',
  domain: 'collection',
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const vernaculars = {
  name: 'species-vernaculars',
  headers: { long: 'Click the common name to match the species', short: 'Click name to match species'},
  question: 'Tap to match latin name',
  domain: 'collection',
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const species = {
  name: 'species-images',
  headers: { long: 'Click the picture to match the species', short: 'Click picture to match species'},
  question: 'Tap picture to match species',
  domain: 'collection',
  parent: DOM.rightBody,
  template: 'js-tiles-template',
  taxon: 'name'
};

const text = {
  name: 'text-entry',
  headers: { long: 'Complete the latin name', short: 'Complete the latin name'},
  domain: 'collection',
  parent: DOM.rightBody,
  question: 'Complete the latin name',
};

const summary = { 
  name: 'summary', 
  domain: 'history', 
  parent: DOM.rightBody,
  template: 'js-summary-template'
};

const command = {
  name: 'command', 
  domain: 'collection',
  left: specimen,
  right: {
    parent: DOM.rightBody,
    cutLength: 5,
    template: 'js-letters-template',
    headers: { long: 'Complete the latin name.', short: 'Complete the latin name.'},
    question: 'Name puzzle'
  }
};

const leaf = {
  name: 'leaf-image',
  headers: { long: 'Enter the name for the leaf part.', short: 'Enter the name for the leaf part.'},
  domain: 'collection',
  parent: DOM.leftBody,
  template: 'js-leaf-image-template'     
};

const leafName = {
  name: 'leaf-text',
  headers: { long: 'Enter the name for the leaf part.', short: 'Enter the name for the leaf part.'},
  domain: 'collection',
  parent: DOM.rightBody,
  template: 'js-text-entry-template'     
};


export const screens = {
  specimen,
  history,

  revision,
  scientifics,
  vernaculars,
  species,
  text,
  summary,

  command,

  leaf,
  leafName
};