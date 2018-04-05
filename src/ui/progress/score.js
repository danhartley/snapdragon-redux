
import { DOM } from 'ui/dom';

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