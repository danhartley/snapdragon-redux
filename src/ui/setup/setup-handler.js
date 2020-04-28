import { subscription } from 'redux/subscriptions';
import { actions } from 'redux/actions/action-creators';
import { enums } from 'ui/helpers/enum-helper';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

const isRequired = (step, args) => {

    const { layout, counter, lessonPlan, config, lesson, collection } = args;

    let required = false;

    switch(step) {
        case enums.nextStep.NEXT_ITEM:
            required = layout && !layout.bonus;
            break;
        case enums.nextStep.NEXT_LAYOUT:
            if(counter.isLessonPaused) {
                required = false;
            } else {
                required = lessonPlan && lessonPlan.layouts;
                required = required && lessonPlan.layouts[counter.index] !== null;
            }
            break;
        case enums.nextStep.NEXT_LESSON:
            required =      (config.collection.id > 0 && !counter.isLessonPaused) // new lesson
                        ||  (config.collection.id > 0 && config.collection.id !== collection.id); // new lesson from new collection
            break;
        case enums.nextStep.NEXT_ROUND:
            required = counter.index === 0 && lesson.isNextRound && collection.items && collection.items.length > 0;
            break;
    }

    return required;
};

const actionUpdate = (step, args) => {

    const { layout, config, asyncFunc } = args;

    switch(step) {
        case enums.nextStep.NEXT_ITEM:
            actions.boundNextItem(layout.itemIndex);
            break;
        case enums.nextStep.NEXT_LAYOUT:
            actions.boundNextLayout(layout);
            subscription.addSubs(layout, config);
            lessonStateHandler.changeRequest({
                requestType: enums.lessonState.SAVE_LESSON_PROGRESS,
            });
            break;
        case enums.nextStep.NEXT_LESSON:
            actions.boundNextLesson(asyncFunc);
            break;
    }
}

export const setupHandler = {
    isRequired,
    actionUpdate
}