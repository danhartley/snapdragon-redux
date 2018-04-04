import { DOM } from 'ui/dom';
import { renderSpecies } from 'ui/screens/species-cards-ctrl';
import { renderProgress } from 'ui/screens/progress-ctrl';
import { renderTextEntry } from 'ui/screens/text-entry-ctrl';
import { renderSpecimen } from 'ui/screens/specimen-ctrl';
import { renderTile } from 'ui/screens/species-tiles-ctrl';
import { renderSpeciesCard } from 'ui/screens/species-card-ctrl';
import { renderSpeciesName } from 'ui/screens/species-name-ctrl';
import { renderSpeciesNames } from 'ui/screens/species-names-ctrl';
import { renderScientificName } from 'ui/screens/species-scientific-ctrl';

const specimen = {
  name: 'specimen',
  render: renderSpecimen,
  domain: 'item',
  parent: DOM.leftBody,
  template: 'js-specimen-template'     
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

const species = {
  name: 'species-cards',
  render: renderSpecies,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-species-template',
  taxon: 'name',
  header: 'Click the matching species'
};

const tiles = {
  name: 'species-tiles',
  render: renderTile,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-species-tiles-template',
  taxon: 'name',
  header: 'Click the image'
};

const card = {
  name: 'species-card',
  render: renderSpeciesCard,
  domain: 'card',
  parent: DOM.leftBody,
  template: 'js-genus-species-card-template'  
};

const name = {
  name: 'genus-species-names',
  render: renderSpeciesName,
  domain: 'card',
  parent: DOM.leftBody,
  template: 'js-genus-species-names-template'  
};

const scientific = {
  name: 'genus-species',
  render: renderScientificName,
  domain: 'card',
  parent: DOM.leftBody,
  template: 'js-scientific-template'  
}

const names = {
  name: 'species-names',
  render: renderSpeciesNames,
  domain: 'card',
  parent: DOM.rightBody,
  template: 'js-species-names-template'  ,
  taxon: 'name'
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
        {...species}
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
  // .filter(layout => (layout.id === 6));
  
  export const progress = [{screens:[{ name: 'progress', render: renderProgress}]}];