import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';
import { mixedTraitHandler } from 'ui/screens/multichoice/landscape/mixed-trait/mixed-trait-handler';

import questionTemplate from 'ui/screens/multichoice/landscape/mixed-trait/right/mixed-trait-question-template.html';

export const renderMixedTraitQuestion = collection => {

    const init = async () => {

        const { layout, collection, config } = store.getState();

        const template = document.createElement('template');
              template.innerHTML = questionTemplate;
        
        const item = collection.nextItem;
        const question = 'Match the trait';
        
        const { requiredTraitValues, trait } = mixedTraitHandler.getMatchingTrait(utils.shuffleArray(layout.screens[1].traits), item.traits);

        const { traits, requiredTraits } = await mixedTraitHandler.fetchTraits(trait, requiredTraitValues, collection.glossary);
        
        const help = `Select the correct ${utils.fromCamelCase(trait)}`;
    
        const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question, help, term: '' });              

        if(config.isPortraitMode) {
            renderMultiStrips(collection, null, { traits, requiredTraits, item, question, help });
            return;
        }

        parent.innerHTML = '';
        renderTemplate({ traits: Array.from(new Set(traits.flat())), help }, template.content, parent);
        document.querySelectorAll('.js-traits-names-txt img').forEach(img => {
            if(img.src.indexOf('png') > -1) {
                img.classList.add('png');
            }
        });
    };

    init();
};