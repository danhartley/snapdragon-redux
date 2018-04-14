import { DOM } from 'ui/dom';
import { store } from 'redux/store';

export const renderHistory = (history) => {
            
    const { items, score } = store.getState();

    const template = document.querySelector('.js-history-template');

    DOM.leftBody.style.backgroundColor = 'rgb(50, 50, 50)';
    DOM.moreSpecimensBtn.style.display = 'none';

    const txtRounds = template.content.querySelector('.js-history-rounds');
    const txtAnswered = template.content.querySelector('.js-history-answered');
    const txtScore = template.content.querySelector('.js-history-score');
    
    txtRounds.innerHTML = `You have completed ${items.currentRound} of ${items.rounds} rounds`;
    txtAnswered.innerHTML = `You answered ${score.correct} out of ${score.total} correctly in the last round`;
    txtScore.innerHTML = `Your score is ${history.correct} out of ${history.total} for this lesson`

    const clone = document.importNode(template.content, true);
    DOM.leftBody.innerHTML = '';
    DOM.leftBody.appendChild(clone);
}