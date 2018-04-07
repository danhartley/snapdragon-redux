import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer, createNewCollection } from 'ui/helpers/helpers-for-screens';
import { actions } from 'redux/actions/action-creators';

export const renderSummaryHeader = (correct, total) => {
    DOM.headerTxt.innerHTML = 
        correct === 1 
            ? `You got ${correct} question right out of ${total}`
            : `You got ${correct} questions right out of ${total}`;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderSummary = (screen, score, items) => {

    const template = document.querySelector('.js-progress-template');

    const clone = document.importNode(template.content, true);
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

    const startOverBtn = document.querySelector('.js-start-over-btn');
    const tryAgainBtn = document.querySelector('.js-try-again-btn');
    const newCollectionBtn = document.querySelector('.js-new-collection-btn');   

    startOverBtn.addEventListener('click', event => {
        actions.boundReset(items);
    });

    if(score.fails.length > 0) {
        tryAgainBtn.addEventListener('click', event => {            
            const newCollection = createNewCollection(items, score.fails);
            actions.boundReset(newCollection); 
        });
    } else {
        tryAgainBtn.setAttribute('disabled', 'disabled');
    }

};