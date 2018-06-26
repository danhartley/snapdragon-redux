import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = counter => {
    
    const { config, collection, layouts } = store.getState();

    const item = (collection && collection.items) ? collection.items[collection.itemIndex] : null;
    
    const primary = 'rgb(2, 43, 84)';

    DOM.rightHeader.style.backgroundColor = primary;
    DOM.rightHeaderText.style.backgroundColor = primary;

    const title = config.isPortraitMode ? 'Snapdragon' : 'Snapdragon - species recognition and recall';

    DOM.collectionTxt.innerHTML = (counter.lesson === 'active' && collection) ? collection.name : title;

    if(!layouts) return;

    const layout = layouts[counter.index];

    if(!layout) return;

    if(layout.name === 'test') {        
        setTimeout(()=>{
            if(config.isPortraitMode) {
                if(counter.lesson === 'active') {
                    const offset = layouts.filter(layout => layout.name === 'revision').length;
                    DOM.collectionTxt.innerHTML = `Question ${ layout.layoutIndex - offset + 1 }`;
                    document.querySelector('progress').value = layout.layoutIndex - offset;
                }
            } else {
                if(counter.lesson === 'active') {
                    const screen = layout.screens.length === 2 ?layout.screens[1] : layout.screens[0].right;
                    DOM.rightHeaderText.style.backgroundColor = primary;
                    DOM.rightHeaderText.innerHTML = screen.headers ? screen.headers.long : 'no long header given';
                } else {
                    DOM.rightHeaderText.innerHTML = '';
                }
            }
        });
    } else if(layout.name === 'revision') {
        if(!config.isPortraitMode) {
            DOM.rightHeaderText.innerHTML = item ? item.name : '';
        }
    }

    if(layout.screens.find(el => el.name === 'summary')) {
        if(config.isPortraitMode) {
            DOM.collectionTxt.innerHTML = collection.name;
        } else {
            DOM.rightHeaderText.innerHTML = 'Lesson progress';
        }
    }

    if(counter.index === 0 && counter.lesson === 'inactive') {
        DOM.rightHeaderText.innerHTML = '';
    }
  
};