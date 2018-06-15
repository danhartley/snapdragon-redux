import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
export const renderScore = (score) => {
    
    const { history, collection, config, layout } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = config.isPortraitMode
            ?   `<div> Score: {{ score.correct }}/{{ score.total }}</div>`
            :   `<div class="score-footer">
                    Score: {{ score.correct }}/{{ score.total }}
                    History: {{ history.correct }}/{{ history.total }}
                </div>`;

    if(!layout) return;

    const endOfRound = (score.total === layout.roundScoreCount); 

    const runningTotal = history ? { ...history } : { correct: 0, total: 0 };

    if(!endOfRound) {
        runningTotal.correct = runningTotal.correct + score.correct;
        runningTotal.total = runningTotal.total + score.total;
    }

    const parent = config.isPortraitMode ? DOM.leftFooter.querySelector('.js-left-footer-score') : DOM.rightFooter;

    parent.innerHTML = '';

    renderTemplate({ score, history: runningTotal, collection, config }, template.content, parent);

    if(endOfRound)
        actions.boundUpdateHistory(score);
};