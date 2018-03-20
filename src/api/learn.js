import { DOM } from 'ui/dom';
import { renderSpecies } from 'ui/screens/species';
import { renderPasses } from 'ui/screens/passes'; 
import { renderFails } from 'ui/screens/fails';
import { renderScore } from 'ui/screens/scorectrl';
import { renderTextEntry } from 'ui/screens/text-entry';
import { renderSpecimen } from 'ui/screens/specimen';

export const learnStrategies = [
    {
      id: 1,
      active: false,
      elements: [ 
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
            header: 'Complete the binomial name'
        },
        {
          name: 'score',
          render: renderScore
        },
        { name: 'passes', render: renderPasses},
        { name: 'fails', render: renderFails}
      ]
    },
    {
      id: 2,
      active: false,
      elements: [ 
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
            header: 'Give the binomial name'
        },
        {
          name: 'score',
          render: renderScore
        },
        { name: 'passes', render: renderPasses},
        { name: 'fails', render: renderFails}
      ]
    },
    {
      id: 3,
      active: true,
      elements: [
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
        },
        {
          name: 'score',
          render: renderScore
        },
        { name: 'passes', render: renderPasses},
        { name: 'fails', render: renderFails}
      ]
    },
    {
      id: 4,
      active: false,
      elements: [ 
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
            question: 'species',
            header: 'genus the binomial name'
        },
        {
          name: 'score',
          render: renderScore
        },
        { name: 'passes', render: renderPasses},
        { name: 'fails', render: renderFails}
      ]
    },
  ];