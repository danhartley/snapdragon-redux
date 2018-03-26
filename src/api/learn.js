import { DOM } from 'ui/dom';
import { renderSpecies } from 'ui/screens/species-ctrl';
import { renderProgress } from 'ui/screens/progress-ctrl';
import { renderTextEntry } from 'ui/screens/text-entry-ctrl';
import { renderSpecimen } from 'ui/screens/specimen-ctrl';

export const learnLayouts = [
    {
      id: 1,
      active: false,
      screens: [ 
        {
          name: 'specimen',
          render: renderSpecimen,
          parent: DOM.leftBody,
          template: 'js-specimen-template'        
        }, 
        {
            name: 'text-entry',
            render: renderTextEntry,
            parent: DOM.rightBody,
            template: 'js-species-entry-template',
            question: 'species',
            header: 'Give the species name'
        }
      ]
    },
    {
      id: 2,
      active: false,
      screens: [ 
        {
          name: 'specimen',
          render: renderSpecimen,
          parent: DOM.leftBody,
          template: 'js-specimen-template'
        }, 
        {
            name: 'text-entry',
            render: renderTextEntry,
            parent: DOM.rightBody,
            template: 'js-species-genus-entry-template',
            question: 'name',
            header: 'Give the genus and species name'
        }
      ]
    },
    {
      id: 3,
      active: true,
      screens: [
        {
          name: 'specimen',
          render: renderSpecimen,
          parent: DOM.leftBody,
          template: 'js-specimen-template'
        }, 
        {
            name: 'species',
            render: renderSpecies,
            parent: DOM.rightBody,
            template: 'js-species-template',
            question: 'name',
            header: 'Click the matching species'
        }
      ]
    },
    {
      id: 4,
      active: false,
      screens: [ 
        {
          name: 'specimen',
          render: renderSpecimen,
          parent: DOM.leftBody,
          template: 'js-specimen-template'        
        }, 
        {
            name: 'text-entry',
            render: renderTextEntry,
            parent: DOM.rightBody,
            template: 'js-genus-entry-template',
            question: 'genus',
            header: 'Give the genus'
        }
      ]
    },
  ];
  
  export const progress = { name: 'progress', render: renderProgress};