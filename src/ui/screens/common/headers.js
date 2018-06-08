import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = layout => {
    
    const { config, collection } = store.getState();

    // RIGHT - landscape layouts only
    
    DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';
    DOM.rightHeaderText.style.backgroundColor = 'rgb(12, 44, 84)';
    DOM.rightHeaderText.innerHTML = 'Species preview';

    // LEFT - landscape left screen and ALL portrait screens
        
    if(config.isPortraitMode) {
        DOM.collectionTxt.innerHTML = 'Species preview';
    } else {
        DOM.collectionTxt.innerHTML = collection.name;
    }


    if(layout.name === 'test') {
        
        DOM.leftBody.style.display = 'block'; // remove by changing code in summary which converts this to a grid...

        setTimeout(()=>{
            if(config.isPortraitMode) {
                    DOM.collectionTxt.innerHTML = `Question ${ layout.layoutIndex - 1 }`,
                    document.querySelector('progress').value = layout.layoutIndex - 2
            } else {
                const screen = layout.screens[1];
                DOM.rightHeaderText.style.backgroundColor = 'rgb(12, 44, 84)';
                DOM.rightHeaderText.innerHTML = screen.headers ? screen.headers.long : 'no long header given';
            }
        });
    }

    if(layout.screens.filter(el => el.name === 'summary')[0]) {
        if(config.isPortraitMode) {
            DOM.collectionTxt.innerHTML = 'Lesson progress';
        } else {
            DOM.rightHeaderText.innerHTML = 'Lesson progress';
        }
    }
  
};