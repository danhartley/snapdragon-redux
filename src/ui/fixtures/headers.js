import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = counter => {
    
    const { collection, lessonPlan, config } = store.getState();

    const title = 'Snapdragon - learn the planet';

    DOM.leftHeaderTxt.innerHTML = title;

    if(config.isPortraitMode) DOM.rightHeaderTxt.innerHTML = title;

    if(!lessonPlan) return;

    const layout = lessonPlan.layouts[counter.index];

    if(!layout) return;

    const questionCount = lessonPlan.layouts.filter(layout => layout.type === 'test').length;
    const progressBar = document.querySelector('.js-right-grid progress');

    progressBar.max = questionCount;
    progressBar.value = layout.progressIndex || progressBar.value;

    if(layout.type === 'test') {
        const question = `Question ${ layout.progressIndex } of ${questionCount}`;
        setTimeout(() => {
            DOM.rightHeaderTxt.innerHTML = counter.lesson === 'active' ? question : '';
        });
    } else if(layout.type === 'revision') {
        DOM.rightHeaderTxt.innerHTML = (counter.lesson === 'active' && collection) ? collection.name : title;
    }
    if(layout.screens.find(el => el.name === 'summary')) {
        DOM.rightHeaderTxt.innerHTML = 'Lesson progress';
    }
    if(counter.index === 0 && counter.lesson === 'inactive') {
        DOM.rightHeaderTxt.innerHTML = '';
    }
};