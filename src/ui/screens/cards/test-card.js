import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderIcon } from 'ui/helpers/icon-handler';
import { renderCard } from 'ui/screens/cards/card';
import { renderTaxonCard } from 'ui/screens/cards/taxon-card';
import { renderNonTaxonCard } from 'ui/screens/cards/non-taxon-card';
import { renderTemplate } from 'ui/helpers/templating';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';

import testCardTemplate from 'ui/screens/cards/test-card-template.html';

export const renderTestCardTemplate = (collection, context) => {

    const template = document.createElement('template');
          template.innerHTML = testCardTemplate;

    const { config } = store.getState();

    const modal = document.querySelector('#lessonModal');

    const parent = config.isLandscapeMode 
                        ? modal.querySelector('.js-modal-text')
                        : DOM.rightBody ;
          parent.innerHTML = '';

    const header = modal.querySelector('.js-modal-text-title');
          header.innerHTML = collection.name;

    context.className = context.className || '';
    context.headerClassName = context.headerClassName || '';

    context.statement = context.statement || '';
    context.providerQuestion = context.providerQuestion || '';

    renderTemplate(context, template.content, parent);

    const progressLink = modal.querySelector('.js-review-progress');
          progressLink.addEventListener('click', e => {

            const summaryContainer = modal.querySelector('.js-summary-container');

            const renderSummaryCard = () => {

                renderScoreSummary(collection.id, summaryContainer);

                const toggleScreens = (screenOne, screenTwo) => {
                    hideCurrentCard(screenOne);
                    screenTwo.classList.remove('swap-out-card');
                    progressLink.addEventListener('click', e => {
                        toggleScreens(screenTwo, screenOne);
                    }, { once: true });
                };

                toggleScreens(testCardContainer, summaryContainer);
            };

            renderSummaryCard();

          }, { once: true });

    toggleStatementAndQuestion(config);

    const testCardContainer = modal.querySelector('.js-test-card-container');
    const testCard = modal.querySelector('.js-test-card-container');
    const testCardIcon = testCard.querySelector('.js-card-link');

    const item = collection.nextItem || collection.items[context.bonus.itemIndex];

    const hideCurrentCard = (container, card) => {

        container.classList.add('swap-out-card');
        container.classList.remove('swap-in-card');

        if(card) {
            card.classList.add('swap-out-card');
            card.classList.remove('swap-in-card');
        }
    };

    const showNextCard = (container, selector) => {
                
        container.classList.remove('swap-out-card');
        // container.classList.add('swap-in-card');

        const card = modal.querySelector(selector);
        const icon = card.querySelector('.js-card-link');
              icon.classList.remove('disabled-icon');

        return { card, icon };
    }

    testCardIcon.addEventListener('click', async event => {
        
        const speciesContainer = modal.querySelector('.js-species-container');
        const taxonContainer = modal.querySelector('.js-taxon-container');

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
    });

    renderIcon(item.taxonomy, modal);

    let testContentParent = modal.querySelector('.js-test-card-content');

    return testContentParent;
};

const toggleStatementAndQuestion = config => {

    if(config.isLandscapeMode) return;
    
    const statement = modal.querySelector('.js-statement-para');
    const question = modal.querySelector('.js-question-para');

    question.classList.add('hide');

    var iterations = 20;
    var i = 0;

    var interval = setInterval(function() { 
            if(i % 2) {
                question.classList.add('hide');
                statement.classList.remove('hide');
            } else {
                question.classList.remove('hide');
                statement.classList.add('hide');
            }
            i++; 
            if(i >= iterations) clearInterval(interval);
    }, 5000);

};
