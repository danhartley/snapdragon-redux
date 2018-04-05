import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer, createNewCollection } from 'ui/helpers/helpers-for-screens';
import { actions } from 'redux/actions/learn';

export const renderSummaryHeader = (correct, total) => {
    DOM.headerTxt.innerHTML = 
        correct === 1 
            ? `You got ${correct} question right out of ${total}`
            : `You got ${correct} questions right out of ${total}`;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

const renderResponse = response => {
    const answer = document.createElement('ul');
    const name = document.createElement('li');
    name.innerHTML = renderAnswer(response);
    answer.appendChild(name);
    return answer;
};

const renderPasses = (passes) => {
    const answers = document.createElement('div');
    answers.innerText = '<p>Right answers:</p>'
    passes.forEach(pass => answers.appendChild(renderResponse(pass)));
    return answers;
};

const renderFails = (fails) => {
    const answers = document.createElement('div');
    answers.innerHTML = '<p>Wrong answers:</p>'
    fails.forEach(fail => answers.appendChild(renderResponse(fail)));
    return answers;
};

export const renderSummary = (score, items) => {

        const template = document.querySelector('.js-progress-template');
        const rightRptrProgress = template.content.querySelector('.js-rptr-progress');
        const rightBodyTop = template.content.querySelector('.js-right-body-top');
        const rightBodyBottom = template.content.querySelector('.js-right-body-bottom');
        const historyText = template.content.querySelector('.js-progress-history');
        
        // rightBodyTop.innerHTML = '';
        // rightBodyTop.appendChild(renderPasses(score.passes));
        // rightBodyBottom.innerHTML = '';
        // rightBodyBottom.appendChild(renderFails(score.fails));

        let scoreHistory = '';

        setTimeout(()=>{
            const { progress } = store.getState();            
            progress.forEach((score, index) => {
                scoreHistory +=
                    `<div>
                        <span>Round ${ index + 1}</span>
                        <p><span>total: ${score.total}</span> <span>correct: ${score.correct}</span></p>
                    </div>`;
            });
            historyText.innerHTML = scoreHistory;            
        

        const clone = document.importNode(template.content, true);
        DOM.rightBody.innerHTML = '';
        DOM.rightBody.appendChild(clone);

        const startOverBtn = document.querySelector('.js-start-over-btn');
        const tryAgainBtn = document.querySelector('.js-try-again-btn');
        const newCollectionBtn = document.querySelector('.js-new-collection-btn');   

        startOverBtn.addEventListener('click', event => {
            actions.boundReset(items);
        });

        if(score.fails.length > 0) {
            tryAgainBtn.addEventListener('click', event => {            
                const newCollection = createNewCollection(items, score.fails);
                actions.boundReset(newCollection);            
            });
        } else {
            tryAgainBtn.setAttribute('disabled', 'disabled');
        }

    },500);        
};