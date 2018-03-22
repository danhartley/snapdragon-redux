import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { actions } from 'redux/actions/learn';
import { utils } from 'utils/utils';

let loaded = false;

const sendQandA = () => {
    const { strategy, item } = store.getState();
    const question = item[strategy.elements.filter(el => el.name === 'text-entry')[0].question];
    if(!document.querySelector('.js-txt-input')) return;
    const answer = document.querySelector('.js-txt-input').value;
    const qandA = { name: item.name, question: question, answer: answer }
    actions.boundMarkAnswer(qandA);
};

let currItem = null;

export const renderTextEntry = () => {

    const { strategy, item } = store.getState();

    if(item === currItem) return;

    currItem = item;

    const element = strategy.elements.filter(el => el.name === 'text-entry')[0];

    if(!element) return;

    const template = document.querySelector(`.${element.template}`);

    template.content.querySelector('span.js-genus').innerHTML = item.genus;
    template.content.querySelector('span.js-species').innerHTML = item.species;

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        sendQandA();
    });

    element.parent.innerHTML = '';
    element.parent.appendChild(clone);

    document.querySelector('.js-txt-input').focus();

    const handleEnterPress = event => {
        if(event.key === 'Enter') {
            sendQandA();                
        }
    };

    if(!loaded) {
        window.addEventListener('keypress', handleEnterPress);
        loaded = true;
    }
};

