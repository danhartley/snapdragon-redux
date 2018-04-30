import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const renderInput = (screen, question, callbackTime, item) => {

    const sendQandA = (answer, event) => {
        const btn = event.target;
        const right = 'rgb(44, 141, 86)'
        const wrong = 'rgb(141, 0, 5)';
        const response = { ...question, answer };
        
        const { text, colour, correct } = renderAnswerHeader(response);

        DOM.headerTxt.innerHTML = text;
        DOM.rightHeader.style.backgroundColor = colour;
        
        btn.style.color = colour;
        btn.parentNode.style.background = colour;

        response.success = correct;

        setTimeout(()=>{
            actions.boundUpdateScore(response);
        }, callbackTime);
    };

    const template = document.querySelector(`.${screen.template}`);

    template.content.querySelector('span.js-genus').innerHTML = question.genus;
    template.content.querySelector('span.js-species').innerHTML = question.species;

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        sendQandA(document.querySelector('.js-txt-input').value, event);
        event.target.disabled = true;
        event.stopPropagation();
    });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    const bgTop = document.querySelector('.letterbox div:nth-child(1)');
    bgTop.style.backgroundImage = `url(${item.images[0]})`;
    bgTop.style.opacity = '.1';
    
    const bgBottom = document.querySelector('.letterbox div:nth-child(3)');
    bgBottom.style.backgroundImage = `url(${item.images[1]})`;
    bgBottom.style.opacity = '.1';

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

