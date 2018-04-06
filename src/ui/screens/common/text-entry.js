import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { renderAnswerHeader } from 'ui/helpers/helpers-for-screens';

export const renderInput = (screen, question) => {

    const sendQandA = (answer, event) => {
        const btn = event.target;
        const right = 'rgb(44, 141, 86)'
        const wrong = 'rgb(141, 0, 5)';
        const response = { ...question, answer };
        
        const { text, colour } = renderAnswerHeader(response);

        DOM.headerTxt.innerHTML = text;
        DOM.rightHeader.style.backgroundColor = colour;
        
        btn.style.color = colour;
        btn.parentNode.style.background = colour;

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

