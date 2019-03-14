import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';

export const renderScore = (score) => {
    
    const { history, collection, config, layout } = store.getState();

    const template = document.createElement('template');

    const scoreText = score.correct === 1 ? 'correct answer' : 'correct answers';

    template.innerHTML = config.isPortraitMode
            ?   `<div><span>Score: {{ score.correct }} / {{ score.total }}</span></div>`
            :   `<div class="round-footer">{{ layout.levelName }}, round {{ collection.currentRound }}</div>
                <div class="score-footer">
                    <span>{{ score.correct }} {{ scoreText }}</span>
                    <span style="display:none;">Score: {{ score.correct }} / {{ score.total }}</span>
                    <span style="display:none;">History: {{ history.correct }} / {{ history.total }}</span>
                </div>`;

    if(!layout) return;

    const runningTotal = history ? { ...history } : { correct: 0, total: 0 };

    runningTotal.correct = runningTotal.correct + score.correct;
    runningTotal.total = runningTotal.total + score.total;

    const parent = config.isPortraitMode ? DOM.rightFooter.querySelector('.js-footer-score') : DOM.rightFooter;

    parent.innerHTML = '';

    renderTemplate({ score, history: runningTotal, collection, config, layout, scoreText }, template.content, parent);

    score.mode = config.mode;

    if(score.total === layout.roundScoreCount) {
        actions.boundUpdateHistory(score);
    }
};