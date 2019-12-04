import { DOM } from 'ui/dom';
import { renderIcon } from 'ui/helpers/icon-handler';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { renderTemplate } from 'ui/helpers/templating';

import testCardTemplate from 'ui/screens/cards/test-card-template.html';

export const renderTestCardTemplate = (collection, context) => {

    const template = document.createElement('template');
          template.innerHTML = testCardTemplate;

    const parent = DOM.rightBody;
          parent.innerHTML = '';

    context.className = context.className || '';
    context.headerClassName = context.headerClassName || '';

    context.statement = context.statement || '';
    context.providerQuestion = context.providerQuestion || '';

    renderTemplate(context, template.content, parent);

    const testCardContainer = document.querySelector('.js-test-card-container');
    const testCard = document.querySelector('.js-test-card-container');
    const testCardIcon = testCard.querySelector('.js-card-link');

    const item = collection.nextItem || collection.items[context.bonus.itemIndex];

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
              icon.classList.remove('disabled-icon');

        return { card, icon };
    }

    testCardIcon.addEventListener('click', async event => {
        
        const speciesContainer = document.querySelector('.js-species-container');
        const taxonContainer = document.querySelector('.js-taxon-container');

        const renderSpeciesCard = async () => {

            renderCard(collection, 'SWAP_OUT', item, speciesContainer, false);
                    
            setTimeout(() => {            

                hideCurrentCard(testCardContainer, testCard);

                const { card: speciesCard, icon: speciesIcon } = showNextCard(speciesContainer, '.js-species-card');

                speciesIcon.addEventListener('click', async event => {

                    item.lichen 
                        ? renderNonTaxonCard('SWAP_OUT', item.keyTrait, taxonContainer, item.images.find(i => i.starred) ? item.images.find(i => i.starred).url : item.images[0].url)
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

            }, 500);
        };

        await renderSpeciesCard();

        // setTimeout(() => {
        //     if(item.lichen) {
        //         const cardName = document.querySelector('.js-species-card .js-card-link > span:nth-child(1)');
        //               cardName.innerHTML = 'Group';
        //     }   
        // }, 500);
    });

    renderIcon(item.taxonomy, document);

    const testContentParent = document.querySelector('.js-test-card-content');

    return testContentParent;
};