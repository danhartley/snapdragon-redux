import { DOM } from 'ui/dom';

const renderResponse = response => {
    const rectangle = document.createElement('div');
    rectangle.setAttribute('class', 'rectangle');            
    const answer = document.createElement('div');
    answer.setAttribute('class', 'answer');
    const name = document.createElement('p');
    name.textContent = response;
    answer.appendChild(name);
    rectangle.appendChild(answer);
    return rectangle;
};

export const renderPasses = (passes) => {
    const rectangles = document.createElement('div');
    passes.forEach(pass => rectangles.appendChild(renderResponse(pass)));
    return rectangles;
};

export const renderFails = (fails) => {
    const rectangles = document.createElement('div');
    fails.forEach(fail => rectangles.appendChild(renderResponse(fail)));
    return rectangles;
};