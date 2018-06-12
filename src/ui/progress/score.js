import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
export const renderScore = (score) => {
    
    const { history, collection, config, layout } = store.getState();

    const template = document.querySelector('.js-score-template');

    const scoreCounted = (score.total === layout.roundScoreCount); 

    const running = history 
        ? {
            correct: scoreCounted ? history.correct : history.correct + score.correct,
            total: scoreCounted ? history.total : history.total + score.total
        } 
        : {
            correct: score.correct,
            total: score.total
        };

    DOM.rightFooter.innerHTML = '';

    renderTemplate({ score, running, collection, config }, template.content, DOM.rightFooter);
};