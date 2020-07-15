import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = collection => {

    DOM.leftHeaderTxt.innerHTML = 'Learn the planet';
    DOM.rightHeaderTxt.innerHTML = 'Learn the planet';

    setTimeout(() => {
        
        const { layout, lessonPlan } = store.getState();
        const progressBar = document.querySelector('.js-main-lesson-grid progress');

        if(lessonPlan && layout) {

            const questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
        
            progressBar.max = questionCount;
            progressBar.value = layout.roundProgressIndex || progressBar.value;
        }
    });
};