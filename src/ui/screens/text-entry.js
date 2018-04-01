import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';
import { utils } from 'utils/utils';

export const renderInput = (screen, item, question) => {

    const sendQandA = (answer, event) => {
        const btn = event.target;
        const right = 'rgb(44, 141, 86)'
        const wrong = 'rgb(141, 0, 5)';
        if(answer === question) {
            btn.style.color = right;
            btn.parentNode.style.background = right;
            DOM.headerTxt.innerHTML = `${answer} was the correct answer! Well done.`;
            DOM.rightHeader.style.backgroundColor = right;
        }
        else {
            btn.style.color = wrong;
            btn.parentNode.style.background = wrong;
            DOM.headerTxt.innerHTML = `Oh no! The correct answer was ${item.name}.`;
            DOM.rightHeader.style.backgroundColor = wrong;
        }
        setTimeout(()=>{
            actions.boundMarkAnswer({ taxon: screen.taxon, name: item.name, question: question, answer: answer });
        },2000);
    };

    const template = document.querySelector(`.${screen.template}`);

    template.content.querySelector('span.js-genus').innerHTML = item.genus;
    template.content.querySelector('span.js-species').innerHTML = item.species;

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

