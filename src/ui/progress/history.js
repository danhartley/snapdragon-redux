import { DOM } from 'ui/dom';
import { store } from 'redux/store';

export const renderHistory = (history) => {
            
    const { collection, score, config } = store.getState();

    const template = document.querySelector('.js-history-template');

    const progress = { score, history, collection };
    
    if(!history) return;

    const clone = document.importNode(template.content, true);
    DOM.leftBody.innerHTML = '';
        
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, progress);
    Stamp.appendChildren(DOM.leftBody, expanded);
}    