import * as R from 'ramda';

import { store } from 'redux/store';
import { lessonPlanner } from 'snapdragon-engine/lesson-planner';
import { lessonPlans } from 'snapdragon-config/lesson-plans';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';


export const nextLesson = counter => {

    setTimeout(() => {
    
        const { lessonPlans: userEditedLessonPlans, collection, config, lesson } = store.getState();

        if(setupHandler.isRequired(enums.nextStep.NEXT_LESSON, { counter, config })) {

            const planId = config.isPortraitMode ? collection.lessonPlanPortrait : collection.lessonPlanLandscape;    
            const lessonPlan = R.clone(userEditedLessonPlans) || R.clone(lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode));

            if(setupHandler.isRequired(enums.nextStep.NEXT_ROUND, { counter, lesson, collection })) {

                // asyncFunc will return collection, lessonPlan and lesson

                const asyncFunc = lessonPlanner.createLessonPlan(lessonPlan, config, R.clone(collection), R.clone(lesson)).then(props => {
                    return { lessonPlan: props.updatedLessonPlan, collection: props.updatedCollection, lesson: props.updatedLesson };
                });

                setupHandler.actionUpdate(enums.nextStep.NEXT_LESSON, { asyncFunc });
            }
        }
    });
};