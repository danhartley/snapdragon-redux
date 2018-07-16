import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import snapdragonTemplate from 'ui/screens/cards/snapdragon-template.html';

export const renderSnapdragon = (counter) => {

    const { config } = store.getState();

    const renderWelcome = () => {
        console.log('Welcome back, Dan!');
    };

    const returningUser = localStorage.getItem('returningUser') ? new Boolean(localStorage.getItem('returningUser')) : false;
    returningUser ? renderWelcome() : localStorage.setItem('returningUser', true);

    if(returningUser && config.isPortraitMode) return;

    const template = document.createElement('template');

    template.innerHTML = snapdragonTemplate;

    const clone = document.importNode(template.content, true);

    DOM.leftBody.innerHTML = '';
    DOM.leftBody.appendChild(clone);

    const startLearningBtn = document.querySelector('.js-start-learning-btn');

    if(startLearningBtn) {
        startLearningBtn.addEventListener('click', () => {
            actions.boundToggleLesson({ lesson: 'inactive' });
        });
    }
};