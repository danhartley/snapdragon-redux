import { actions } from 'redux/actions/learn';
import { utils } from 'utils/utils';

let loaded = false;

export const renderInput = (screen, item, question) => {

    console.log('text-entry item: ', item);
    console.log('text-entry question: ', question);

    const sendQandA = (item, question, answer) => {
        console.log('item: ', item);
        console.log('question: ', question);
        console.log('answer: ', answer);
        actions.boundMarkAnswer({ name: item.name, question: question, answer: answer });
    };

    const template = document.querySelector(`.${screen.template}`);

    template.content.querySelector('span.js-genus').innerHTML = item.genus;
    template.content.querySelector('span.js-species').innerHTML = item.species;

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        sendQandA(item, question, document.querySelector('.js-txt-input').value);
    });

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

    document.querySelector('.js-txt-input').focus();

    const handleEnterPress = event => {
        if(event.key === 'Enter') {            
            sendQandA(item, question, document.querySelector('.js-txt-input').value);  
        }
    };

    if(!loaded) {
        window.addEventListener('keypress', handleEnterPress);
        loaded = true;
    }
};

