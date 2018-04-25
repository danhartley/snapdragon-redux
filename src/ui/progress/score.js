import { DOM } from 'ui/dom';
import { store } from 'redux/store';

export const renderScore = (score) => {
    
    const { history, collection } = store.getState();

    const template = document.querySelector('.js-score-template');

    const running = history 
        ? {
            correct: history.correct + score.correct,
            total: history.total + score.total
        } 
        : {
            correct: score.correct,
            total: score.total
        };

    const progress = { score, running, collection };

    const clone = document.importNode(template.content, true);

    DOM.rightFooter.innerHTML = '';

    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, progress);
    Stamp.appendChildren(DOM.rightFooter, expanded);
};