import { DOM } from 'ui/dom';

const renderResponse = response => {
    const answer = document.createElement('ul');
    const name = document.createElement('li');
    name.textContent = response;
    answer.appendChild(name);
    return answer;
};

export const renderPasses = (passes) => {
    const answers = document.createElement('div');
    answers.innerText = 'Right answers:'
    passes.forEach(pass => answers.appendChild(renderResponse(pass)));
    return answers;
};

export const renderFails = (fails) => {
    const answers = document.createElement('div');
    answers.innerText = 'Wrong answers:'
    fails.forEach(fail => answers.appendChild(renderResponse(fail)));
    return answers;
};