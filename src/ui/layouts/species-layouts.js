import { DOM } from 'ui/dom';
import { renderSpeciesTiles } from 'ui/screens/right/species-tiles';
import { renderSpecimenTiles } from 'ui/screens/left/specimen-tiles';
import { renderCard } from 'ui/screens/common/card';
import { renderTextEntry } from 'ui/screens/right/species-text-entry';
import { renderSpeciesNamesStrips } from 'ui/screens/right/species-vernacular-strips';
import { renderSpeciesStrips } from 'ui/screens/right/species-binomial-strips';

import { renderSummary } from 'ui/progress/summary';
import { renderHistory } from 'ui/progress/history';

// LEFT

const specimen = {
  name: 'specimen-images',
  domain: 'item',
  render: renderSpecimenTiles,
  parent: DOM.leftBody,
  template: 'js-specimen-images-template'     
};

const name = {
  name: 'species-card',
  domain: 'item',
  render: renderCard,
  parent: DOM.leftBody,
  template: 'js-card-name-template'  
};

const scientific = {
  name: 'species-card',
  domain: 'item',
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

const binomialStrips = {
  name: 'species-binomial-strips',
  domain: 'item',
  render: renderSpeciesStrips,
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const revision = {
  name: 'species-card',
  domain: 'item',
  render: renderCard,
  parent: DOM.rightBody ,
  template: 'js-card-revision-template'
};

const strips = {
  name: 'species-vernacular-strips',
  domain: 'item',
  render: renderSpeciesNamesStrips,
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name'
};

const tiles = {
  name: 'species-images',
  domain: 'item',
  render: renderSpeciesTiles,
  parent: DOM.rightBody,
  template: 'js-tiles-template',
  taxon: 'name'
};

const text = {
  name: 'text-entry',
  domain: 'item',
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

export const screens = {
  specimen,
  name,
  revision,
  scientific,
  history,
  summary,
  tiles,
  text,
  strips, 
  binomialStrips
};

export const speciesLayouts = [
    {
      id: 1,
      active: false,
      screens: [ 
        {...specimen}, 
        {...text, template: 'js-species-genus-entry-template', taxon: 'name'}
      ]
    },
    {
      id: 2,
      active: false,
      screens: [ 
        {...specimen},
        {...text, template: 'js-genus-entry-template', taxon: 'genus'}
      ]
    },
    {
      id: 3,
      active: false,
      screens: [ 
        {...specimen},
        {...text, template: 'js-species-entry-template', taxon: 'species'}
      ]
    },
    {
      id: 4,
      active: true,
      screens: [
        {...specimen},
        {...binomialStrips}
      ]
    },
    {
      id: 5,
      active: false,
      screens: [
        {...specimen},
        {...name},
        {...tiles}
      ]
    },
    {
      id: 6,
      active: false,
      screens: [
        {...specimen},
        {...scientific},
        {...strips}
      ]
    }
  ];

  export const summaryScreen = summary;
  export const historyScreen = history;