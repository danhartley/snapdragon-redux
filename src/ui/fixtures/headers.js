import { store } from 'redux/store';
import { DOM } from 'ui/dom';

export const renderHeaders = counter => {
    
    const { collection, lessonPlan, config } = store.getState();

    const item = (collection && collection.items) ? collection.items[collection.itemIndex] : null;

    const title = 'Snapdragon - learn the planet';

    DOM.leftHeaderTxt.innerHTML = title;

    if(!lessonPlan) return;

    const layout = lessonPlan.layouts[counter.index];

    if(!layout) return;

    const questionCount = lessonPlan.layouts.filter(l => l.name === 'test').length;

    document.querySelector('progress').max = questionCount;

    if(layout.name === 'test') {
        const offset = lessonPlan.layouts.filter(layout => layout.name === 'revision').length;
        const question = `Question ${ layout.exerciseIndex } of ${questionCount}`;
        setTimeout(()=>{
            if(counter.lesson === 'active') {
                DOM.rightHeaderTxt.innerHTML = question;
                document.querySelector('progress').value = layout.layoutIndex - offset;
            } else {
                DOM.rightHeaderTxt.innerHTML = '';
            }
        });
    } else if(layout.name === 'revision') {
        DOM.rightHeaderTxt.innerHTML = (counter.lesson === 'active' && collection) ? collection.name : title;
    }

    if(layout.screens.find(el => el.name === 'summary')) {
        DOM.rightHeaderTxt.innerHTML = 'Lesson progress';
    }

    if(counter.index === 0 && counter.lesson === 'inactive') {
        DOM.rightHeaderTxt.innerHTML = '';
    }
  
};