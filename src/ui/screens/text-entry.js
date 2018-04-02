import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { utils } from 'utils/utils';
import { renderAnswer } from 'ui/screens/helpers-for-screens';

export const renderInput = (screen, question) => {

    const sendQandA = (answer, event) => {
        const btn = event.target;
        const right = 'rgb(44, 141, 86)'
        const wrong = 'rgb(141, 0, 5)';
        const response = { ...question, answer };
        if(response.answer === response.question) {
            btn.style.color = right;
            btn.parentNode.style.background = right;
            DOM.headerTxt.innerHTML = `${renderAnswer(response)} was the correct answer! Well done.`;
            DOM.rightHeader.style.backgroundColor = right;
        }
        else {
            btn.style.color = wrong;
            btn.parentNode.style.background = wrong;
            DOM.headerTxt.innerHTML = `Oh no! The correct answer was ${renderAnswer(response)}.`;
            DOM.rightHeader.style.backgroundColor = wrong;
        }
        setTimeout(()=>{
            actions.boundMarkAnswer({ taxon: screen.taxon, name: response.name, question: response.question, answer: response.answer });
        },2000);
    };

    const template = document.querySelector(`.${screen.template}`);

    template.content.querySelector('span.js-genus').innerHTML = question.genus;
    template.content.querySelector('span.js-species').innerHTML = question.species;

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        sendQandA(document.querySelector('.js-txt-input').value, event);
        event.target.disabled = true;
    });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    document.querySelector('.js-txt-input').focus();

    const handleEnterPress = event => {
        if(event.key === 'Enter') {            
            sendQandA(document.querySelector('.js-txt-input').value, event);
            document.removeEventListener('keypress', handleEnterPress);
            event.target.disabled = true;
        }
    };

    // document.addEventListener('keypress', handleEnterPress);
};

