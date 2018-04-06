import { DOM } from 'ui/dom';

export const renderHistory = (history) => {
            
    const template = document.querySelector('.js-score-template');

    const historyText = template.content.querySelector('.js-history');

    // let scoreHistory = '';

    history.forEach((score, index) => {
        historyText.innerHTML +=
            `<div>
                <span>Round ${ index + 1}</span>
                <p><span>total: ${score.total}</span> <span>correct: ${score.correct}</span></p>
            </div>`;
    });
    // historyText.innerHTML = scoreHistory;   

    const clone = document.importNode(template.content, true);
    DOM.leftBody.innerHTML = '';
    DOM.leftBody.appendChild(clone);
}