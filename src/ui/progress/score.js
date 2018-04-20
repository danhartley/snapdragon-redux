
import { DOM } from 'ui/dom';
import { store } from 'redux/store';

export const renderScore = (score) => {
    
    const { history, collection } = store.getState();

    const template = document.querySelector('.js-score-template');

    const txtCorrect = template.content.querySelector('.js-txt-correct');
    const txtTotal = template.content.querySelector('.js-txt-total');
    const txtHistoryCorrect = template.content.querySelector('.js-txt-history-correct');
    const txtHistoryTotal = template.content.querySelector('.js-txt-history-total');
    const txtLessonRound = template.content.querySelector('.js-txt-lesson-round');
    const txtLessonRounds = template.content.querySelector('.js-txt-lesson-rounds');
    
    txtCorrect.innerHTML = score.correct;
    txtTotal.innerHTML = score.total;

    txtHistoryCorrect.innerHTML = history ? history.correct + score.correct : score.correct;
    txtHistoryTotal.innerHTML = history ? history.total + score.total : score.total;

    txtLessonRound.innerHTML = collection.currentRound + 1;
    txtLessonRounds.innerHTML = collection.rounds;

    const clone = document.importNode(template.content, true);

    DOM.rightFooter.innerHTML = '';
    DOM.rightFooter.appendChild(clone);
};