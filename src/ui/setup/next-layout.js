import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';

export const nextLayout = counter => {

    const { layout, lessonPlan, config, lesson, collection } = store.getState();

    const args = { layout, counter, lessonPlan, config, lesson, collection };

    if(setupHandler.isRequired(enums.nextStep.NEXT_LAYOUT, args)) {
        let resumeJustPausedLesson = (layout && layout.fromSaved);
            resumeJustPausedLesson = resumeJustPausedLesson && collection.items[counter.index].name === layout.screens.speciesName;
        const nextLayout = resumeJustPausedLesson ? layout : lessonPlan.layouts[counter.index];
        setupHandler.actionUpdate(enums.nextStep.NEXT_LAYOUT, { layout: nextLayout, config });
    }
};