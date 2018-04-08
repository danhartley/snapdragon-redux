import { DOM } from 'ui/dom';

export const renderHistory = (history) => {
            
    const template = document.querySelector('.js-history-template');

    DOM.leftBody.style.backgroundColor = 'rgb(50, 50, 50)';

    const historyText = template.content.querySelector('.js-history');
    
    let html = '';

    history.forEach((score, index) => {
         html+=
            `<div>
                <span>Round ${ index + 1}</span>
                <p><span>total: ${score.total}</span> <span>correct: ${score.correct}</span></p>
            </div>`;
    });

    historyText.innerHTML = html;

    const clone = document.importNode(template.content, true);
    DOM.leftBody.innerHTML = '';
    DOM.leftBody.appendChild(clone);
}