import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';

export const nextLayout = counter => {

    const { layout, lessonPlan, config, lesson, collection } = store.getState();

    const args = { layout, counter, lessonPlan, config, lesson, collection };

    if(setupHandler.isRequired(enums.nextStep.NEXT_LAYOUT, args)) {
        setupHandler.actionUpdate(enums.nextStep.NEXT_LAYOUT, { layout: lessonPlan.layouts[counter.index], config });
    }
};