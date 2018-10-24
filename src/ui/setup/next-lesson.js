import * as R from 'ramda';

import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { lessonPlans } from 'snapdragon/lesson-plans';

export const nextLesson = (counter) => {

    const { lessonPlan, collection, config } = store.getState();

    if(counter.isLessonPaused || config.collection.id === 0) return;
    
    let planId = config.isPortraitMode ? _collection.lessonPlanPortrait : collection.lessonPlanLandscape;
    let plan = lessonPlan || lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode);
    
    if(collection.isNextRound) {
        const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(plan, config, R.clone(collection));
        actions.boundNextLessonPlan({ lessonPlan: updatedLessonPlan, collection: updatedCollection });
    }
};