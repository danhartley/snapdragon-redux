import { DOM } from 'ui/dom';
import { renderSpeciesTiles } from 'ui/screens/right/species-tiles';
import { renderSpecimen } from 'ui/screens/left/specimen-tiles';
import { renderSpeciesCards } from 'ui/screens/right/species-cards';
import { renderSpeciesCardRight } from 'ui/screens/right/species-card-right';

import { renderSpeciesCardLeft } from 'ui/screens/left/species-card-left';
import { renderSpeciesSummary } from 'ui/progress/species-summary';

import { renderTextEntry } from 'ui/screens/right/species-text-entry';
import { renderSpeciesNamesCards } from 'ui/screens/right/species-names-cards';

const specimen = {
  name: 'specimen',
  render: renderSpecimen,
  domain: 'item',
  parent: DOM.leftBody,
  template: 'js-specimen-template'     
};

const cards = {
  name: 'species-cards',
  render: renderSpeciesCards,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-cards-template',
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
  name: 'species-names-cards',
  render: renderSpeciesNamesCards,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-cards-template'  ,
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
  template: 'js-species-entry-template',
  taxon: 'species',
  header: 'Give the species name'
};

export const learnLayouts = [
    {
      id: 1,
      active: false,
      screens: [ 
        {...specimen}, 
        {...text}
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
        {...cards}
      ]
    },
    {
      id: 5,
      active: false,
      screens: [ 
        {...specimen, next:{...name}},
        {...tiles}
      ]
    },
    {
      id: 6,
      active: false,
      screens: [ 
        {...specimen, next:{...scientific}},
        {...names}
      ]
    }
  ]
  // .filter(layout => (layout.id === 3 || layout.id === 5));
  // .filter(layout => (layout.id !== 1 && layout.id !== 2 && layout.id !== 3));
  .filter(layout => (layout.id === 5));
  
  export const progressLayout = [
    {
      screens:[
        { name: 'progress', domain: 'index', render: renderSpeciesSummary }
      ]
    }
  ];