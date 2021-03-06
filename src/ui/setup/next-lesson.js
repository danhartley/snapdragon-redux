import { clone } from 'ramda';

import { store } from 'redux/store';
import { lessonPlanner } from 'snapdragon-engine/lesson-planner';
import { lessonPlans } from 'snapdragon-config/lesson-plans';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';


export const nextLesson = counter => {

    const { layout, config, lesson, collection, userAction } = store.getState();

    const args = { layout, counter, config, lesson, collection, userAction };

    if(setupHandler.isRequired(enums.nextStep.NEXT_LESSON, args)) {

        const planId = config.isPortraitMode ? collection.lessonPlanPortrait : collection.lessonPlanLandscape;    
        const lessonPlan = clone(lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode));

        args.lessonPlan = lessonPlan;

        if(setupHandler.isRequired(enums.nextStep.NEXT_ROUND, args)) {

            // asyncFunc will return collection, lessonPlan and lesson

            const asyncFunc = lessonPlanner.createLessonPlan(lessonPlan, config, clone(collection), clone(lesson)).then(props => {
                if(!props) return;
                return { lessonPlan: props.updatedLessonPlan, collection: props.updatedCollection, lesson: props.updatedLesson };
            });

            if(asyncFunc === null) return;

            setupHandler.actionUpdate(enums.nextStep.NEXT_LESSON, { config, asyncFunc });
        }
    }
};