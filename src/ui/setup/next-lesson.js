import * as R from 'ramda';

import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { lessonPlans } from 'snapdragon/lesson-plans';

export const nextLesson = (counter) => {

    const { lessonPlans: userEditedPlan, collection, config } = store.getState();

    if(counter.isLessonPaused || config.collection.id === 0) return;

    let planId = config.isPortraitMode ? collection.lessonPlanPortrait : collection.lessonPlanLandscape;
    
    const lessonPlan = userEditedPlan || lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode);
    
    if(collection.isNextRound) {
        const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(lessonPlan, config, R.clone(collection));
        actions.boundNextLessonPlan({ lessonPlan: updatedLessonPlan, collection: updatedCollection });
    }
};