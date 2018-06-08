import { DOM } from 'ui/dom';
import { persistor } from 'redux/store';

export const listening = (score) => {

    let savingLesson = 'Saving lesson...';
    let lessonSaved = 'Lesson saved';

    if (window.matchMedia("(min-width: 1024px)").matches || window.matchMedia("(min-width: 1200px)").matches){
        savingLesson = 'Saving lesson progress...';
        lessonSaved = 'Lesson progress saved';
    }
    // else DOM.moreSpecimensBtn.style.display = 'none';

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
 
    DOM.menuIcon.addEventListener('click', () => {
        persistor.purge();
        window.location.reload(true);
    });
}