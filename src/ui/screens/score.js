
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/screens/helpers-for-screens';

export const renderScoreHeader = (score) => {
    
    if(score.success) { 
        DOM.headerTxt.innerHTML = `${renderAnswer(score)} was the correct answer! Well done.`;
        DOM.rightHeader.style.backgroundColor = 'rgb(44, 141, 86)';
    } 
    else if(score.total > 0) {
        DOM.headerTxt.innerHTML = `Oh no! The correct answer was ${renderAnswer(score)}.`;
        DOM.rightHeader.style.backgroundColor = 'rgb(141, 0, 5)';
    }
};

export const renderScoreFooter = (score) => {
    
    const template = document.querySelector('.js-score-template');

    const txtCorrect = template.content.querySelector('.js-txt-correct');
    const txtTotal = template.content.querySelector('.js-txt-total');
    
    txtTotal.innerHTML = score.total;
    txtCorrect.innerHTML = score.correct;

    const clone = document.importNode(template.content, true);

    DOM.rightFooter.innerHTML = '';
    DOM.rightFooter.appendChild(clone);
};