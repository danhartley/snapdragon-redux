import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import historyTemplate from 'ui/progress/history-template.html';

export const renderHistory = (history) => {
            
    const { collection, score, config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = historyTemplate;

    if(!history) return;
    
    DOM.leftBody.innerHTML = '';
    const clone = document.importNode(template.content, true);
    renderTemplate({ score, history, collection }, template.content, DOM.leftBody, clone);
}    