import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/helpers/helpers-for-screens';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';

export const renderSummaryHeader = (score) => {
    DOM.headerTxt.innerHTML = 
        score.correct === 1 
            ? `You got ${score.correct} question right out of ${score.total}`
            : `You got ${score.correct} questions right out of ${score.total}`;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderSummary = (index) => {

    const { score, items, layouts } = store.getState();

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
            const fails = score.fails.map(fail => {
                return items.filter(item => item.name === fail.binomial)[0];        
            });
            const uniqueFails = fails.filter(utils.onlyUnique);            
            actions.boundReset(uniqueFails); 
        });
    } else {
        tryAgainBtn.setAttribute('disabled', 'disabled');
    }

    learnMoreBtn.addEventListener('click', event => {
        actions.boundNextSet()
    });   
};