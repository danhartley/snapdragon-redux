import { DOM } from 'ui/dom';

import { renderCard } from 'ui/screens/common/card';

import { renderSpecimenTiles } from 'ui/screens/left/specimen-tiles';

import { renderSpeciesTiles } from 'ui/screens/right/species-tiles';
import { renderVernaculars } from 'ui/screens/right/species-vernaculars';
import { renderScientifics } from 'ui/screens/right/species-scientifics';
import { renderTextEntry } from 'ui/screens/right/species-text-entry';

import { renderSummary } from 'ui/progress/summary';
import { renderHistory } from 'ui/progress/history';

import { renderLetters } from 'ui/screens/common/letters';
import { runTask } from 'ui/screens/command';

import { renderLeafTile } from 'ui/screens/left/leaf-tile';
import { renderNameEntry } from 'ui/screens/right/leaf-text-entry';

// LEFT

const specimen = {
  name: 'specimen-images',
  domain: 'collection',
  render: renderSpecimenTiles,
  parent: DOM.leftBody,
  template: 'js-specimen-images-template'     
};

const history = { 
  name: 'history', 
  domain: 'history', 
  parent: DOM.leftBody,
  render: renderHistory,
  template: 'js-history-template'
};

// RIGHT

const revision = {
  name: 'species-card',
  domain: 'collection',
  render: renderCard,
  parent: DOM.rightBody ,
  template: 'js-card-revision-template'
};

const scientifics = {
  name: 'species-scientifics',
  headers: { long: 'Click the latin name to match the species.', short: 'Click name to match species.'},
  question: 'Tap the matching latin name.',
  domain: 'collection',
  render: renderScientifics,
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const vernaculars = {
  name: 'species-vernaculars',
  headers: { long: 'Click the common name to match the species.', short: 'Click name to match species.'},
  question: 'Tap the matching common name.',
  domain: 'collection',
  render: renderVernaculars,
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const species = {
  name: 'species-images',
  headers: { long: 'Click the picture to match the species.', short: 'Click picture to match species.'},
  question: 'Which picture matches the name? Tap to find out.',
  domain: 'collection',
  render: renderSpeciesTiles,
  parent: DOM.rightBody,
  template: 'js-tiles-template',
  taxon: 'name'
};

const text = {
  name: 'text-entry',
  headers: { long: 'Complete the latin name.', short: 'Complete the latin name.'},
  domain: 'collection',
  render: renderTextEntry,
  parent: DOM.rightBody,
  question: 'Complete the latin name',
};

const summary = { 
  name: 'summary', 
  domain: 'index', 
  parent: DOM.rightBody,
  render: renderSummary,
  template: 'js-summary-template'
};

const command = {
  name: 'command', 
  domain: 'collection',
  render: runTask,
  left: specimen,
  right: {
    parent: DOM.rightBody,
    render: renderLetters,
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
  render: renderLeafTile,
  parent: DOM.leftBody,
  template: 'js-leaf-image-template'     
};

const leafName = {
  name: 'leaf-text',
  headers: { long: 'Enter the name for the leaf part.', short: 'Enter the name for the leaf part.'},
  domain: 'collection',
  render: renderNameEntry,
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