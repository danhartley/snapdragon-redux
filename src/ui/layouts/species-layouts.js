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

// LEFT

const specimen = {
  name: 'specimen-images',
  domain: 'collection',
  render: renderSpecimenTiles,
  parent: DOM.leftBody,
  template: 'js-specimen-images-template'     
};

const name = {
  name: 'species-card',
  domain: 'collection',
  render: renderCard,
  parent: DOM.leftBody,
  template: 'js-card-name-template'  
};

const scientific = {
  name: 'species-card',
  domain: 'collection',
  render: renderCard,
  parent: DOM.leftBody,
  template: 'js-card-scientific-template'  
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
  domain: 'collection',
  render: renderScientifics,
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const vernaculars = {
  name: 'species-vernaculars',
  domain: 'collection',
  render: renderVernaculars,
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const species = {
  name: 'species-images',
  domain: 'collection',
  render: renderSpeciesTiles,
  parent: DOM.rightBody,
  template: 'js-tiles-template',
  taxon: 'name'
};

const text = {
  name: 'text-entry',
  domain: 'collection',
  render: renderTextEntry,
  parent: DOM.rightBody
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
    template: 'js-letters-template'
  }
}

export const screens = {
  specimen,
  name,
  scientific,
  history,

  revision,
  scientifics,
  vernaculars,
  species,
  text,
  summary,

  command
};