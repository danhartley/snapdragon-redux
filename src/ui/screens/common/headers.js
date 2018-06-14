import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = layout => {
    
    const { config, collection, layouts } = store.getState();

    // Right hand side screen - landscape layouts only
    
    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';
    DOM.rightHeaderText.style.backgroundColor = 'rgb(12, 44, 84)';
    // DOM.rightHeaderText.innerHTML = 'Species preview';

    // Left hand side screen - landscape left screen and all portrait screens
        
    // if(config.isPortraitMode) {
    //     DOM.collectionTxt.innerHTML = 'Species preview';
    // } else {
    //     DOM.collectionTxt.innerHTML = collection.name;
    // }

    DOM.collectionTxt.innerHTML = collection ? collection.name : 'Snapdragon';

    if(!layout) return;

    if(layout.name === 'test') {
        
        setTimeout(()=>{
            if(config.isPortraitMode) {
                    const offset = layouts.filter(layout => layout.name === 'revision').length;
                    DOM.collectionTxt.innerHTML = `Question ${ layout.layoutIndex - offset + 1 }`;
                    document.querySelector('progress').value = layout.layoutIndex - offset;
            } else {
                const screen = layout.screens[1];
                DOM.rightHeaderText.style.backgroundColor = 'rgb(12, 44, 84)';
                DOM.rightHeaderText.innerHTML = screen.headers ? screen.headers.long : 'no long header given';
            }
        });
    }

    if(layout.screens.filter(el => el.name === 'summary')[0]) {
        if(config.isPortraitMode) {
            DOM.collectionTxt.innerHTML = collection.name;
        } else {
            DOM.rightHeaderText.innerHTML = 'Lesson progress';
        }
    }
  
};