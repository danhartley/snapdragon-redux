import { DOM } from 'ui/dom';

import { persistor } from 'redux/store';

export const listening = (score) => {

    DOM.stateChangeAlertTxt.innerHTML = 'Saving lesson score in browser...';
    setTimeout(()=>{
        DOM.stateChangeAlertTxt.innerHTML = 'Lesson score saved in browser';
    },1000);
    
    DOM.stateClearBtn.style.display = 'inline-block';
    DOM.stateClearBtn.addEventListener('click', () => {
        persistor.purge().then(res => {
            DOM.stateClearBtn.innerHTML = 'Clearing...';
            setTimeout(()=>{
                DOM.stateClearBtn.innerHTML = 'Clear lesson';
            },1000);
        });
    });
}