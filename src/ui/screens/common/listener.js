import { DOM } from 'ui/dom';

import { persistor } from 'redux/store';

export const listening = (score) => {

    let savingLesson = 'Saving lesson...';
    let lessonSaved = 'Lesson saved';

    if (window.matchMedia("(min-width: 1024px)").matches || window.matchMedia("(min-width: 1200px)").matches){
        savingLesson = 'Saving lesson score in browser...';
        lessonSaved = 'Lesson score saved in browser';
    }
    else DOM.moreSpecimensBtn.style.display = 'none';

    DOM.stateChangeAlertTxt.innerHTML = savingLesson;
    setTimeout(()=>{
        DOM.stateChangeAlertTxt.innerHTML = lessonSaved;
    },1000);
    
    DOM.stateClearBtn.style.display = 'inline-block';
    DOM.stateClearBtn.addEventListener('click', () => {
        persistor.purge().then(res => {
            DOM.stateClearBtn.innerHTML = 'Clearing...';
            setTimeout(()=>{
                DOM.stateClearBtn.innerHTML = 'Clear lesson';
                window.location.reload(true);
            },1000);
        });
    });
}