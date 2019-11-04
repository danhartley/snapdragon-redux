import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';

import scoreTemplate from 'ui/fixtures/score-template.html';

export const renderScore = (score) => {
    
    const { history, collection, config, layout, lesson } = store.getState();

    // if(config.isPortraitMode) return; // remove references below

    const template = document.createElement('template');

    const scoreText = config.isLandscape 
                        ? score.correct === 1 ? 'correct answer' : 'correct answers'
                        : score.correct === 'correct';

    const currentRound = lesson.currentRound;

    template.innerHTML = config.isPortraitMode
            ?   layout 
                    ? `<div><span>{{ score.correct }} / {{ score.total }}</span></div>`
                    : ''
            :   layout 
                    ? scoreTemplate
                    : '';

    const runningTotal = history ? { ...history } : { correct: 0, total: 0 };

    runningTotal.correct = runningTotal.correct + score.correct;
    runningTotal.total = runningTotal.total + score.total;

    const parent = config.isPortraitMode ? DOM.rightFooter.querySelector('.js-footer-score') : DOM.rightFooter;
          parent.innerHTML = '';

    renderTemplate({ score, history: runningTotal, collection, config, layout, scoreText, currentRound }, template.content, parent);

    score.mode = config.mode;

    if(!layout) return;

    if(score.total === layout.roundScoreCount) {
        actions.boundUpdateHistory(score);
    }
};