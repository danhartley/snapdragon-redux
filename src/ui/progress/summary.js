import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/helpers/helpers-for-screens';
import { actions } from 'redux/actions/action-creators';
import { batchUnIdentifiedItems, batchNextItems } from 'ui/helpers/helpers-for-screens';

export const renderSummaryHeader = (score) => {
    DOM.headerTxt.innerHTML = 
        score.correct === 1 
            ? `You got ${score.correct} question right out of ${score.total}`
            : `You got ${score.correct} questions right out of ${score.total}`;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderSummary = (index) => {

    const { score, items, layouts, pool } = store.getState();

    if(index !== layouts.length) return;
    
    renderSummaryHeader(score);

    actions.boundUpdateHistory(score);

    const template = document.querySelector('.js-summary-template');

    const clone = document.importNode(template.content, true);
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

    const startOverBtn = document.querySelector('.js-start-over-btn');
    const tryAgainBtn = document.querySelector('.js-try-again-btn');
    const learnMoreBtn = document.querySelector('.js-learn-more-btn');   

    startOverBtn.addEventListener('click', event => {
        actions.boundReset(items);
    });

    if(score.fails.length > 0) {
        tryAgainBtn.addEventListener('click', event => {            
            batchUnIdentifiedItems(score, items);    
            actions.boundReset(unIdentifiedItems);
        });
    } else {
        tryAgainBtn.setAttribute('disabled', 'disabled');
    }

    if(items.poolIndex + items.moduleSize <= items.poolCount) {
        learnMoreBtn.addEventListener('click', event => {
            const newItemsBatch = batchNextItems(items, pool);        
            actions.boundReset(newItemsBatch);
        });
    } else {
        learnMoreBtn.setAttribute('disabled', 'disabled');
    }
};