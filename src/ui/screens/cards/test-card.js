import { DOM } from 'ui/dom';
import { renderCard } from 'ui/screens/cards/card';
import { renderTemplate } from 'ui/helpers/templating';
import testCardTemplate from 'ui/screens/cards/test-card-template.html';

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

    renderTemplate(context, template.content, parent);

    const testCard = document.querySelector('.test-card-container');
    const testCardIcon = testCard.querySelector('.iconic-icon');

    let speciesCard, speciesCardIcon;

    testCardIcon.addEventListener('click', event => {        
        
        const speciesContainer = document.querySelector('.js-species-container');

        const item = collection.nextItem;
        
        renderCard(collection, 'SWAP_OUT', item, speciesContainer, false);
        
        testCard.classList.add('swap-out-card');
        testCard.classList.remove('swap-in-card');
        
        speciesContainer.classList.add('swap-in-card');
        speciesContainer.classList.remove('swap-out-card');
        
        speciesCard = document.querySelector('.card');
        speciesCardIcon = speciesCard.querySelector('.iconic-icon');

        handleIconAppearance('#card-header .js-iconic-icon');

        speciesCardIcon.addEventListener('click', event => {
            testCard.classList.add('swap-in-card');
            testCard.classList.remove('swap-out-card');
            speciesContainer.classList.add('swap-out-card');
            speciesContainer.classList.remove('swap-in-card');

            handleIconAppearance('#test-card-header .js-iconic-icon');
        });

    });

    const testContentParent = document.querySelector('.js-test-card');

    return testContentParent;
};