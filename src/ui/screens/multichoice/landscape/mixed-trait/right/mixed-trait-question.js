import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { mixedTraitHandler } from 'ui/screens/multichoice/landscape/mixed-trait/mixed-trait-handler';

import questionTemplate from 'ui/screens/multichoice/landscape/mixed-trait/right/mixed-trait-question-template.html';

export const renderMixedTraitQuestion = collection => {

    const init = async () => {

        const { layout, collection } = store.getState();

        const template = document.createElement('template');
              template.innerHTML = questionTemplate;
        
        const item = collection.nextItem;
        const trait = layout.screens[1].trait;
        const question = 'Match the trait';
        const help = `(${utils.fromCamelCase(trait)}.)`;

        mixedTraitHandler.fetchTraits(trait, item.traits, collection.glossary);
    
        const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question, help, term: '' });              

        mixedTraitHandler.onTraitsReady((traits, requiredTraits) => {            
            parent.innerHTML = '';
            renderTemplate({ traits: Array.from(new Set(traits.flat())) }, template.content, parent);
            document.querySelectorAll('.js-traits-names-txt img').forEach(img => {
                if(img.src.indexOf('png') > -1) {
                    img.classList.add('png');
                }
            });
        });
    };

    init();
};