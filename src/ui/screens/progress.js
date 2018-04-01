import { DOM } from 'ui/dom';

export const renderProgressHeader = (score) => {
    DOM.headerTxt.innerHTML = 
        score.correct === 1 
            ? `You got ${score.correct} question right:`
            : `You got ${score.correct} questions right:`;
    DOM.rightHeader.style.backgroundColor = 'rgb(44, 141, 86)';
};

const renderResponse = response => {
    const answer = document.createElement('ul');
    const name = document.createElement('li');
    name.textContent = response;
    answer.appendChild(name);
    return answer;
};

const renderPasses = (passes) => {
    const answers = document.createElement('div');
    answers.innerText = 'Right answers:'
    passes.forEach(pass => answers.appendChild(renderResponse(pass)));
    return answers;
};

const renderFails = (fails) => {
    const answers = document.createElement('div');
    answers.innerText = 'Wrong answers:'
    fails.forEach(fail => answers.appendChild(renderResponse(fail)));
    return answers;
};

export const renderProgressScreen = (score) => {
        const template = document.querySelector('.js-progress-template');
        const rightRptrProgress = template.content.querySelector('.js-rptr-progress');
        const rightBodyTop = template.content.querySelector('.js-right-body-top');
        const rightBodyBottom = template.content.querySelector('.js-right-body-bottom');    

        rightBodyTop.innerHTML = '';
        rightBodyTop.appendChild(renderPasses(score.passes));
        rightBodyBottom.innerHTML = '';
        rightBodyBottom.appendChild(renderFails(score.fails));

        const clone = document.importNode(template.content, true);
        DOM.rightBody.innerHTML = '';
        DOM.rightBody.appendChild(clone);
};