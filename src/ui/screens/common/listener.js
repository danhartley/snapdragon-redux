import { DOM } from 'ui/dom';

export const listening = (score) => {

    let savingLesson = 'Saving lesson...';
    let lessonSaved = 'Lesson saved';

    if (window.matchMedia("(min-width: 1024px)").matches || window.matchMedia("(min-width: 1200px)").matches){
        savingLesson = 'Saving lesson progress...';
        lessonSaved = 'Lesson progress saved';
    }
    else DOM.moreSpecimensBtn.style.display = 'none';

    DOM.stateChangeAlertTxt.innerHTML = savingLesson;
    setTimeout(()=>{
        DOM.stateChangeAlertTxt.innerHTML = lessonSaved;
    },1000);
    
}