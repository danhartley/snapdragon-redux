import { DOM } from 'ui/dom';

// LEFT

const specimen = {
  name: 'specimen-images',
  domain: 'collection',
  template: 'js-specimen-images-template'     
};

const history = { 
  name: 'history', 
  domain: 'history',
  template: 'js-history-template'
};

// RIGHT

const revision = {
  name: 'species-card',
  domain: 'collection',
  template: 'js-card-revision-template'
};

const scientifics = {
  name: 'species-scientifics',
  headers: { long: 'Click the latin name to match the species', short: 'Click name to match species'},
  question: 'Tap to match common name',
  domain: 'collection',
  template: 'js-strips-template',
  taxon: 'name'
};

const vernaculars = {
  name: 'species-vernaculars',
  headers: { long: 'Click the common name to match the species', short: 'Click name to match species'},
  question: 'Tap to match latin name',
  domain: 'collection',
  template: 'js-strips-template',
  taxon: 'name'
};

const species = {
  name: 'species-images',
  headers: { long: 'Click the picture to match the species', short: 'Click picture to match species'},
  question: 'Tap picture to match species',
  domain: 'collection',
  template: 'js-tiles-template',
  taxon: 'name'
};

const text = {
  name: 'text-entry',
  headers: { long: 'Complete the latin name', short: 'Complete the latin name'},
  domain: 'collection',
  question: 'Complete the latin name',
};

const summary = { 
  name: 'summary', 
  domain: 'history',
  template: 'js-summary-template'
};

const command = {
  name: 'command', 
  domain: 'collection',
  left: specimen,
  right: {
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
  template: 'js-leaf-image-template'     
};

const leafName = {
  name: 'leaf-text',
  headers: { long: 'Enter the name for the leaf part.', short: 'Enter the name for the leaf part.'},
  domain: 'collection',
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