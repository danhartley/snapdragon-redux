import { DOM } from 'ui/dom';

import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import { renderCollections } from 'ui/screens/left/collections';

export const listening = (score) => {

    DOM.stateChangeAlertTxt.innerHTML = 'Saving current lesson score...';
    setTimeout(()=>{
        DOM.stateChangeAlertTxt.innerHTML = 'Lesson score saved';
    },1000);
}