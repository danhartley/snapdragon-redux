import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';

import scoreTemplate from 'ui/fixtures/score-template.html';

export const renderScore = score => {
    
    const { history, collection, config, layout, lesson, lessonPlan } = store.getState();

    score.mode = config.mode;

    if(!layout) return;

    if(score.total === layout.roundScoreCount) {
        actions.boundUpdateHistory(score);
    }

    return;

    const template = document.createElement('template');

    const scoreText = config.isLandscape 
                        ? score.correct === 1 ? 'correct answer' : 'correct answers'
                        : score.correct === 'correct';

    template.innerHTML = config.isPortraitMode
            ?   layout 
                    ? ''
                    // ? `<div><span>{{ score.correct }} / {{ score.total }}</span></div>`
                    : ''
            :   layout 
                    ? scoreTemplate
                    : '';

    const runningTotal = history ? { ...history } : { correct: 0, total: 0 };

    runningTotal.correct = runningTotal.correct + score.correct;
    runningTotal.total = runningTotal.total + score.total;

    const parent = config.isPortraitMode ? DOM.rightFooter.querySelector('.js-footer-score') : DOM.rightFooter;
          parent.innerHTML = '';

    let questionCount, questionFormat = '';

    if(lessonPlan) {
        questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
        questionFormat = `Question ${ layout.roundProgressIndex } of ${questionCount}`;
    }

    if(config.isPortraitMode) {
        DOM.rightHeaderTxt.innerHTML = score.total === 0
            ? 'Learn the planet'
            : questionFormat;

        DOM.rightHeaderScoreTxt.innerHTML = score.total === 0
            ? config.isLandscapeMode
                    ? '<span class="margin-right">Learn the planet</span>'
                    : '<span class="margin-right"></span>'
            : `<span class="margin-left">${score.correct}/${score.total}</span>`;
    }    

    renderTemplate({ score, history: runningTotal, collection, config, layout, scoreText, currentRound: lesson.currentRound, questionFormat }, template.content, parent);

    // score.mode = config.mode;

    // if(!layout) return;

    // if(score.total === layout.roundScoreCount) {
    //     actions.boundUpdateHistory(score);
    // }
};