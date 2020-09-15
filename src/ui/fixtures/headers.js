import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = collection => {

    setTimeout(() => {
        
        const { layout, lessonPlan, config } = store.getState();

        DOM.leftHeaderTxt.innerHTML = 'Learn the planet';
        // DOM.rightHeaderTxt.innerHTML = config.isLandscapeMode ? '' : 'Learn the planet';

        const progressBar = document.querySelector('.js-main-lesson-grid progress');

        if(lessonPlan && layout) {

            const questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
        
            progressBar.max = questionCount;
            progressBar.value = layout.roundProgressIndex || progressBar.value;
        }
    });
};