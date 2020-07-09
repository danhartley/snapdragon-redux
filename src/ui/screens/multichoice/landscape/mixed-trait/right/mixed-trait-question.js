import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';

import questionTemplate from 'ui/screens/multichoice/landscape/mixed-trait/right/mixed-trait-question-template.html';

export const renderMixedTraitQuestion = collection => {

    const init = async () => {

        const { layout, collection, config } = store.getState();

        const template = document.createElement('template');
              template.innerHTML = questionTemplate;
        
        const item = collection.nextItem;
        const question = 'Match the trait';
        const help = `Select the correct ${utils.fromCamelCase(layout.trait)}`;
    
        const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question, help, term: '' });              

        renderMultiStrips(collection, null, { traits: layout.traits, requiredTraits: layout.requiredTraits, item, question, help });
    };

    init();
};