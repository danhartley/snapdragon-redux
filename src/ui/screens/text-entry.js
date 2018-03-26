import { actions } from 'redux/actions/learn';
import { utils } from 'utils/utils';

export const renderInput = (screen, item, question) => {

    const sendQandA = (answer) => {
        actions.boundMarkAnswer({ name: item.name, question: question, answer: answer });
    };

    const template = document.querySelector(`.${screen.template}`);

    template.content.querySelector('span.js-genus').innerHTML = item.genus;
    template.content.querySelector('span.js-species').innerHTML = item.species;

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        sendQandA(document.querySelector('.js-txt-input').value);
    });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    document.querySelector('.js-txt-input').focus();

    const handleEnterPress = event => {
        if(event.key === 'Enter') {            
            sendQandA(document.querySelector('.js-txt-input').value);
            window.removeEventListener('keypress', handleEnterPress);
        }
    };

    window.addEventListener('keypress', handleEnterPress);
};

