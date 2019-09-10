import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';

export const nextLayout = (counter) => {

    setTimeout(() => { // hack so that next-lesson runs first, and updates to the next level where appropriate

        if(counter.isLessonPaused) return;

        const { lessonPlan, config } = store.getState();
    
        if(!lessonPlan || !lessonPlan.layouts) return;
    
        const layout = lessonPlan.layouts[counter.index];
    
        if(!layout) return;
    
        actions.boundNextLayout(layout);
    
        subscription.addSubs(layout, config);   
    });
};