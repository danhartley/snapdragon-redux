import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';

export const nextItem = layout => {

    const { counter, lessonPlan, config, lesson, collection, userAction } = store.getState();

    if(userAction && userAction.name === enums.userEvent.START_LESSON.name) return;

    const args = { layout, counter, lessonPlan, config, lesson, collection };

    if(setupHandler.isRequired(enums.nextStep.NEXT_ITEM, args)) {
        setupHandler.actionUpdate(enums.nextStep.NEXT_ITEM, { layout });
    }
};