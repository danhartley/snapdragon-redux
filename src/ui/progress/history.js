import { DOM } from 'ui/dom';
import { store } from 'redux/store';

export const renderHistory = (history) => {
            
    const { collection, score } = store.getState();

    const template = document.querySelector('.js-history-template');

    DOM.leftBody.style.backgroundColor = 'rgb(50, 50, 50)';
    DOM.moreSpecimensBtn.style.display = 'none';

    const progress = { score, history, collection };

    const clone = document.importNode(template.content, true);
    DOM.leftBody.innerHTML = '';
    
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, progress);
    Stamp.appendChildren(DOM.leftBody, expanded);
}