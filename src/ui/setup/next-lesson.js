import * as R from 'ramda';

import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { lessonPlans } from 'snapdragon/lesson-plans';
import { listenToItemChanges } from 'ui/helpers/item-handler';

export const nextLesson = (counter) => {

    const { lessonPlans: userEditedPlan, collection, config } = store.getState();

    if(counter.isLessonPaused || config.collection.id === 0) return;

    const planId = config.isPortraitMode ? collection.lessonPlanPortrait : collection.lessonPlanLandscape;    
    const plan = R.clone(userEditedPlan) || R.clone(lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode));
    
    if(collection.isNextRound) {
        const { updatedLessonPlan, updatedCollection } = lessonPlanner.createLessonPlan(plan, config, R.clone(collection));
        actions.boundNextLessonPlan({ lessonPlan: updatedLessonPlan, collection: updatedCollection });
    }
};