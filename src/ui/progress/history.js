import { DOM } from 'ui/dom';
import { store } from 'redux/store';

export const renderHistory = (history) => {
            
    const { collection, score, config } = store.getState();

    const template = document.querySelector('.js-history-template');

    const progress = { score, history, collection };
    
    if(!history) return;

    if(config.isPortraitMode) {
        DOM.leftGrid.style.display = 'none';
    }

    const clone = document.importNode(template.content, true);
    DOM.leftBody.style.backgroundColor = 'rgb(50, 50, 50)';
    DOM.leftBody.innerHTML = '';
        
    var ctx = new Stamp.Context();
    var expanded = Stamp.expand(clone, progress);
    Stamp.appendChildren(DOM.leftBody, expanded);

    DOM.moreSpecimensBtn.style.display = 'none';
    DOM.collectionTxt.innerHTML = collection.name;
}    