
import { DOM } from 'ui/dom';
import { store } from 'redux/store';

export const renderScore = (score) => {
    
    const { history } = store.getState();

    const template = document.querySelector('.js-score-template');

    const txtCorrect = template.content.querySelector('.js-txt-correct');
    const txtTotal = template.content.querySelector('.js-txt-total');
    const txtHistoryCorrect = template.content.querySelector('.js-txt-history-correct');
    const txtHistoryTotal = template.content.querySelector('.js-txt-history-total');
    
    txtCorrect.innerHTML = score.correct;
    txtTotal.innerHTML = score.total;

    let historyCorrect = score.correct;
    let historyTotal = score.total;

    if(history) {
        history.map(round => {
            historyCorrect += round.correct;
            historyTotal += round.total;
        });
    }

    txtHistoryCorrect.innerHTML = historyCorrect;
    txtHistoryTotal.innerHTML = historyTotal;

    const clone = document.importNode(template.content, true);

    DOM.rightFooter.innerHTML = '';
    DOM.rightFooter.appendChild(clone);
};