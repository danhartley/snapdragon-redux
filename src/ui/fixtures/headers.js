import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = counter => {
    
    const { collection, layouts, config } = store.getState();

    const item = (collection && collection.items) ? collection.items[collection.itemIndex] : null;

    const title = 'Snapdragon - learn the planet';

    DOM.leftHeaderTxt.innerHTML = (counter.lesson === 'active' && collection) ? collection.name : title;

    if(!layouts) return;

    const layout = layouts[counter.index];

    if(!layout) return;

    if(layout.name === 'test') {
        const offset = layouts.filter(layout => layout.name === 'revision').length;
        const question = `Question ${ layout.exerciseIndex } of ${layouts.length - config.moduleSize - 1}`;
        setTimeout(()=>{
            if(counter.lesson === 'active') {
                DOM.rightHeaderTxt.innerHTML = question;
                document.querySelector('progress').value = layout.layoutIndex - offset;
            } else {
                DOM.rightHeaderTxt.innerHTML = '';
            }
        });
    } else if(layout.name === 'revision') {
        DOM.rightHeaderTxt.innerHTML = item ? item.name : '';
    }

    if(layout.screens.find(el => el.name === 'summary')) {
        DOM.rightHeaderTxt.innerHTML = 'Lesson progress';
    }

    if(counter.index === 0 && counter.lesson === 'inactive') {
        DOM.rightHeaderTxt.innerHTML = '';
    }
  
};