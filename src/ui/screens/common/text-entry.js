import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';

export const renderInput = (screen, question, callbackTime, item, renderAnswerHeader, hints) => {

    const sendQandA = (answer, event) => {
        const btn = event.target;
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

    // hints.forEach(hint => {
    //     template.content.querySelector(hint.selector).innerHTML = hint.value;  
    // });

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        sendQandA(document.querySelector('.js-txt-input').value, event);
        event.target.disabled = true;
        event.stopPropagation();
    });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    // const bgTop = document.querySelector('.letterbox div:nth-child(1)');
    // bgTop.style.backgroundImage = `url(${item.images[0]})`;
    // bgTop.style.opacity = '.1';
    
    // const bgBottom = document.querySelector('.letterbox div:nth-child(3)');
    // bgBottom.style.backgroundImage = `url(${item.images[1]})`;
    // bgBottom.style.opacity = '.1';

    document.querySelector('.js-txt-input').focus();

    const handleEnterPress = event => {
        if(event.key === 'Enter') {            
            sendQandA(document.querySelector('.js-txt-input').value, event);
            document.removeEventListener('keypress', handleEnterPress);
            event.target.disabled = true;
        }
    };
};

