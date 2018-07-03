import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { addClassName } from 'ui/helpers/response-formatting';

export const renderHeaders = counter => {
    
    const { config, collection, layouts } = store.getState();

    const item = (collection && collection.items) ? collection.items[collection.itemIndex] : null;

    const title = config.isPortraitMode ? 'Snapdragon' : 'Snapdragon - species recognition and recall';

    DOM.leftHeaderTxt.innerHTML = (counter.lesson === 'active' && collection) ? collection.name : title;

    if(!layouts) return;

    const layout = layouts[counter.index];

    if(!layout) return;

    if(layout.name === 'test') {
        const offset = layouts.filter(layout => layout.name === 'revision').length;
        const question = `Question ${ layout.layoutIndex - offset + 1 }`;
        setTimeout(()=>{
            if(config.isPortraitMode) {
                if(counter.lesson === 'active') {                    
                    DOM.leftHeaderTxt.innerHTML = question;
                    document.querySelector('progress').value = layout.layoutIndex - offset;
                }
            } else {
                if(counter.lesson === 'active') {
                    const screen = layout.screens.length === 2 ?layout.screens[1] : layout.screens[0].right;
                    // addClassName(DOM.rightHeaderTxt, '', ['snap-correct', 'snap-alert']);
                    DOM.rightHeaderTxt.innerHTML = question;
                } else {
                    DOM.rightHeaderTxt.innerHTML = '';
                }
            }
        });
    } else if(layout.name === 'revision') {
        if(!config.isPortraitMode) {
            DOM.rightHeaderTxt.innerHTML = item ? item.name : '';
        }
    }

    if(layout.screens.find(el => el.name === 'summary')) {
        if(config.isPortraitMode) {
            DOM.leftHeaderTxt.innerHTML = collection.name;
        } else {
            DOM.rightHeaderTxt.innerHTML = 'Lesson progress';
        }
    }

    if(counter.index === 0 && counter.lesson === 'inactive') {
        DOM.rightHeaderTxt.innerHTML = '';
    }
  
};