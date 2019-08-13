import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderIcon } from 'ui/helpers/icon-handler';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { renderTraitCard, getBonusQuestion } from 'ui/screens/cards/trait-card';
import { renderTemplate } from 'ui/helpers/templating';
import { renderMultiStrips } from 'ui/screens/multichoice/multi-strips';

import testCardTemplate from 'ui/screens/cards/test-card-template.html';

let isTraitCard = true;

export const renderTestCardTemplate = (collection, context) => {

    const template = document.createElement('template');

    template.innerHTML = testCardTemplate;

    const parent = DOM.rightBody;
    parent.innerHTML = '';

    context.className = context.className || '';
    context.headerClassName = context.headerClassName || '';

    renderTemplate(context, template.content, parent);

    const testCardContainer = document.querySelector('.js-test-card-container');
    const testCard = document.querySelector('.js-test-card-container');
    const testCardIcon = testCard.querySelector('.js-card-link');

    const hideCurrentCard = (container, card) => {

        container.classList.remove('swap-in-card');
        container.classList.add('swap-out-card');

        card.classList.add('swap-out-card');
        card.classList.remove('swap-in-card');
    };

    const showNextCard = (container, selector) => {
                
        container.classList.remove('swap-out-card');
        container.classList.add('swap-in-card');

        const card = document.querySelector(selector);
        const icon = card.querySelector('.js-card-link');

        return { card, icon };
    }

    testCardIcon.addEventListener('click', async event => {
        
        const speciesContainer = document.querySelector('.js-species-container');
        const taxonContainer = document.querySelector('.js-taxon-container');

        const item = collection.nextItem;
        
        const renderSpeciesCard = async () => {

            renderCard(collection, 'SWAP_OUT', item, speciesContainer, false);
                    
            setTimeout(() => {            

                hideCurrentCard(testCardContainer, testCard);

                const { card: speciesCard, icon: speciesIcon } = showNextCard(speciesContainer, '.js-species-card');

                speciesIcon.addEventListener('click', async event => {

                    item.lichen 
                        ? renderNonTaxonCard('SWAP_OUT', item.keyTrait, taxonContainer, item.images[0].url)
                        : renderTaxonCard(collection, 'SWAP_OUT', item, taxonContainer, false);
                    
                    hideCurrentCard(speciesContainer, speciesCard);

                    const { card: taxonCard, icon: taxonIcon } = item.lichen
                        ? showNextCard(taxonContainer, '.js-non-taxon-card')
                        : showNextCard(taxonContainer, '.js-taxon-card');

                    taxonIcon.addEventListener('click', event => {
                        hideCurrentCard(taxonContainer, taxonCard);
                        showNextCard(testCardContainer, '.js-test-card');
                    });
                });

            }, 1000); // temporary!!!
        };

        await renderSpeciesCard();
    });

    const traitCardLink = document.querySelector('.js-traits-link');

    const layout = store.getState().layout;
    
    const multichoices = [ 'species-scientifics', 'species-vernaculars', 'epithet', 'definition', 'family-strips' ];

    const item = collection.nextItem || collection.items[context.bonus.itemIndex];

    renderIcon(item.taxonomy, document);

    if(R.contains(layout.screens[1].name, multichoices)) {
        traitCardLink.classList.remove('hide-important');
        document.querySelector('.js-iconic-icon').classList.add('hide-important');
    }

    const bonus = getBonusQuestion(item || {}, []);

    if(!bonus) {
        traitCardLink.classList.add('hide-important');
        document.querySelector('.js-iconic-icon').classList.remove('hide-important');
    }

    traitCardLink.addEventListener('click', () => {
        if(isTraitCard) {            
            renderTraitCard(item);
            isTraitCard = false;
        } else {                  
            renderMultiStrips(collection);
            isTraitCard = true;
        }
    });

    const testContentParent = document.querySelector('.js-test-card-content');

    return testContentParent;
};