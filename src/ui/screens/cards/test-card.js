import * as R from 'ramda';

import { store } from 'redux/store';
import { DOM } from 'ui/dom';
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

    const handleIconAppearance = selector => {
        const icon = document.querySelector(selector);
        icon.classList.add('depressed');        
        setTimeout(() => {
            icon.classList.remove('depressed');
        }, 1000);
    };

    context.className = context.className || '';

    renderTemplate(context, template.content, parent);

    setTimeout(() => {
        document.querySelector('.js-iconic-icon').classList.remove('depressed');
    }, 1000);

    const testCardContainer = document.querySelector('.test-card-container');
    const testCard = document.querySelector('.test-card-container');
    const testCardIcon = testCard.querySelector('.iconic-icon');

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
        const icon = card.querySelector('.iconic-icon');

        return { card, icon };
    }

    testCardIcon.addEventListener('click', event => {        
        
        const speciesContainer = document.querySelector('.js-species-container');
        const taxonContainer = document.querySelector('.js-taxon-container');

        const item = collection.nextItem;
        
        renderCard(collection, 'SWAP_OUT', item, speciesContainer, false);
                
        hideCurrentCard(testCardContainer, testCard);

        const { card: speciesCard, icon: speciesIcon } = showNextCard(speciesContainer, '.js-card-card');

        handleIconAppearance('#card-header .js-iconic-icon');

        speciesIcon.addEventListener('click', event => {

            item.lichen 
                ? renderNonTaxonCard('SWAP_OUT', item.keyTrait, taxonContainer, item.images[0].url)
                : renderTaxonCard(collection, 'SWAP_OUT', item, taxonContainer, false);
            
            hideCurrentCard(speciesContainer, speciesCard);

            const { card: taxonCard, icon: taxonIcon } = item.lichen
                ? showNextCard(taxonContainer, '.js-non-taxon-card')
                : showNextCard(taxonContainer, '.js-taxon-card');

            handleIconAppearance('#taxon-card-header .js-iconic-icon');

            taxonIcon.addEventListener('click', event => {
    
                hideCurrentCard(taxonContainer, taxonCard);

                showNextCard(testCardContainer, '.js-test-card');

                handleIconAppearance('#test-card-header .js-iconic-icon');
            });
        });
    });

    const traitCardLink = document.querySelector('.js-traits-icon');

    const layout = store.getState().layout;
    
    const multichoices = [ 'species-scientifics', 'species-vernaculars', 'epithet', 'definition', 'family-strips' ];

    if(R.contains(layout.screens[1].name, multichoices)) {
        document.querySelector('.traits-icon-container').classList.remove('hide-important');
    }

    const { bonus } = getBonusQuestion(collection.nextItem || {}, []);

    if(bonus.typedItemTraits.length === 0) {
        traitCardLink.style.display = 'none';
    }

    traitCardLink.addEventListener('click', () => {
        if(isTraitCard) {            
            renderTraitCard(collection.nextItem);
            isTraitCard = false;
        } else {                  
            renderMultiStrips(collection);
            isTraitCard = true;
        }
    });

    const testContentParent = document.querySelector('.js-test-card-content');

    return testContentParent;
};