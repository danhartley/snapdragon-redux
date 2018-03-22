import { store } from 'redux/store';
import { renderFails, renderPasses } from 'ui/screens/progress';
import { DOM } from 'ui/dom';

export const renderProgress = () => {

    const template = document.querySelector('.js-progress-template');
    const rightRptrProgress = template.content.querySelector('.js-rptr-progress');
    const rightBodyTop = template.content.querySelector('.js-right-body-top');
    const rightBodyBottom = template.content.querySelector('.js-right-body-bottom');

    const { score, items } = store.getState();

    if(score.total === items.length) {

        DOM.headerTxt.innerHTML = 
        score.correct === 1 
            ? `You got ${score.correct} question right:`
            : `You got ${score.correct} questions right:`;
        DOM.rightHeader.style.backgroundColor = 'rgb(44, 141, 86)';

        rightBodyTop.innerHTML = '';
        rightBodyTop.appendChild(renderPasses(score.passes));
        rightBodyBottom.innerHTML = '';
        rightBodyBottom.appendChild(renderFails(score.fails));

        const clone = document.importNode(template.content, true);
        DOM.rightBody.innerHTML = '';
        DOM.rightBody.appendChild(clone);
    }
};