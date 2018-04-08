import { DOM } from 'ui/dom';
import { renderSpeciesTiles } from 'ui/screens/right/species-tiles';
import { renderSpecimenTiles } from 'ui/screens/left/specimen-tiles';
import { renderSpeciesCards } from 'ui/screens/right/species-binomial-cards';
import { renderSpeciesCardRight } from 'ui/screens/right/species-card-right';
import { renderSpeciesCardLeft } from 'ui/screens/left/species-card-left';
import { renderTextEntry } from 'ui/screens/right/species-text-entry';
import { renderSpeciesNamesCards } from 'ui/screens/right/species-vernacular-cards';
import { renderSpeciesNamesStrips } from 'ui/screens/right/species-vernacular-strips';
import { renderSpeciesStrips } from 'ui/screens/right/species-binomial-strips';

import { renderSpeciesSummary } from 'ui/progress/species-summary';
import { renderHistory } from 'ui/progress/history';

const specimen = {
  name: 'specimen',
  render: renderSpecimenTiles,
  domain: 'item',
  parent: DOM.leftBody,
  template: 'js-specimen-template'     
};

const cards = {
  name: 'species-binomial-cards',
  render: renderSpeciesCards,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-cards-template',
  taxon: 'name',
  header: 'Click the matching species'
};

const binomialStrips = {
  name: 'species-binomial-strips',
  render: renderSpeciesStrips,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-strips-template',
  taxon: 'name',
  header: 'Click the matching species'
};

const card = {
  name: 'species-card',
  render: renderSpeciesCardRight,
  domain: 'card',
  parent: DOM.rightBody ,
  template: 'js-card-template'
};

const name = {
  name: 'species-card-left',
  render: renderSpeciesCardLeft,
  domain: 'card',
  parent: DOM.leftBody,
  template: 'js-card-left-template'  
};

const scientific = {
  name: 'species-card-left',
  render: renderSpeciesCardLeft,
  domain: 'card',
  parent: DOM.leftBody,
  template: 'js-scientific-template'  
}

const names = {
  name: 'species-vernacular-cards',
  render: renderSpeciesNamesCards,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-cards-template'  ,
  taxon: 'name'
};

const strips = {
  name: 'species-vernacular-strips',
  render: renderSpeciesNamesStrips,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-strips-template'  ,
  taxon: 'name'
};

const tiles = {
  name: 'tiles',
  render: renderSpeciesTiles,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-tiles-template',
  taxon: 'name',
  header: 'Click the image'
};

const text = {
  name: 'text-entry',
  render: renderTextEntry,
  domain: 'card',
  parent: DOM.rightBody,
  header: 'Give the species name'
};

const progress = { 
  name: 'progress', 
  domain: 'index', 
  parent: DOM.rightBody,
  render: renderSpeciesSummary,
  template: 'js-progress-template'
};

const history = { 
  name: 'history', 
  domain: 'history', 
  parent: DOM.leftBody,
  render: renderHistory,
  template: 'js-history-template'
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

  export const progressScreen = progress;
  export const historyScreen = history;