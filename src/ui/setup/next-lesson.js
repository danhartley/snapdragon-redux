import * as R from 'ramda';

import { store } from 'redux/store';
import { lessonPlanner } from 'snapdragon-engine/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { lessonPlans } from 'snapdragon-config/lesson-plans';

export const nextLesson = counter => {

    const { lessonPlans: userEditedLessonPlans, collection, config, lesson } = store.getState();

    if(counter.isLessonPaused || config.collection.id === 0) return;

    const planId = config.isPortraitMode ? collection.lessonPlanPortrait : collection.lessonPlanLandscape;    
    const lessonPlan = R.clone(userEditedLessonPlans) || R.clone(lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode));
    
    if(lesson.isNextRound && counter.index === 0) {
        if(collection.items.length > 0) {
            const asyncFunc = lessonPlanner.createLessonPlan(lessonPlan, config, R.clone(collection), R.clone(lesson)).then(props => {
                return { lessonPlan: props.updatedLessonPlan, collection: props.updatedCollection, lesson: props.updatedLesson };
            });
            actions.boundNextLesson(asyncFunc);
        } else {
            console.log("There are no items in the Snapdragon collection");
        }            
    }
};