import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { mixedTraitHandler } from 'ui/screens/multichoice/landscape/mixed-trait/mixed-trait-handler';

import questionTemplate from 'ui/screens/multichoice/landscape/mixed-trait/right/mixed-trait-question-template.html';

export const renderMixedTraitQuestion = collection => {

    const init = async () => {

        const { layout } = store.getState();

        const template = document.createElement('template');
        template.innerHTML = questionTemplate;
        
        const item = collection.nextItem;
        const trait = layout.screens[1].trait;
        const question = 'Find the species';
        const help = '(Click on the matching trait value.)';

        mixedTraitHandler.fetchTraits(trait, item.traits);
    
        const parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question, help, term: '' });

        mixedTraitHandler.onTraitsReady((traits, requiredTrait) => {            
            renderTemplate({ traits }, template.content, parent);
        });
    };

    init();
};