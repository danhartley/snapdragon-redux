import { DOM } from 'ui/dom';

export const listening = (score) => {

    let savingLesson = 'Saving lesson...';
    let lessonSaved = 'Lesson saved';

    if (window.matchMedia("(min-width: 1024px)").matches || window.matchMedia("(min-width: 1200px)").matches){
        savingLesson = 'Saving lesson progress...';
        lessonSaved = 'Lesson progress saved';
    }

    const displaySavingLessonNotice = () => {
        DOM.stateChangeAlertTxt.innerHTML = savingLesson;
        setTimeout(()=>{
            DOM.menuIcon.style.display = 'none';
            DOM.stateChangeAlertTxt.innerHTML = lessonSaved;
            setTimeout(()=>{
                DOM.stateChangeAlertTxt.innerHTML = '';
                DOM.menuIcon.style.display = 'block';
            },1500);
        },1000);
    };
}