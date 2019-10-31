import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';

export const nextLayout = counter => {

    setTimeout(() => { // hack so that next-lesson runs first, and updates to the next level where appropriate

        const { lessonPlan, config } = store.getState();

        if(setupHandler.isRequired(enums.nextStep.NEXT_LAYOUT, { counter, lessonPlan, config })) {
            setupHandler.actionUpdate(enums.nextStep.NEXT_LAYOUT, { layout: lessonPlan.layouts[counter.index], config });
        }

    });
};