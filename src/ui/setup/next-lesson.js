import * as R from 'ramda';

import { store } from 'redux/store';
import { lessonPlanner } from 'snapdragon-engine/lesson-planner';
import { lessonPlans } from 'snapdragon-config/lesson-plans';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';


export const nextLesson = counter => {

    const { layout, lessonPlan, config, lesson, collection } = store.getState();

    const args = { layout, counter, lessonPlan, config, lesson, collection };

    if(setupHandler.isRequired(enums.nextStep.NEXT_LESSON, args)) {

        const planId = config.isPortraitMode ? collection.lessonPlanPortrait : collection.lessonPlanLandscape;    
        const lessonPlan = R.clone(lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode));

        args.lessonPlan = lessonPlan;

        if(setupHandler.isRequired(enums.nextStep.NEXT_ROUND, args)) {

            // asyncFunc will return collection, lessonPlan and lesson

            const asyncFunc = lessonPlanner.createLessonPlan(lessonPlan, config, R.clone(collection), R.clone(lesson)).then(props => {
                if(!props) return;
                return { lessonPlan: props.updatedLessonPlan, collection: props.updatedCollection, lesson: props.updatedLesson };
            });

            console.log('asyncFunc: ', asyncFunc);

            if(asyncFunc === null) return;

            setupHandler.actionUpdate(enums.nextStep.NEXT_LESSON, { asyncFunc });
        }
    }
};