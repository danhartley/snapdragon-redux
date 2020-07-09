import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { setupHandler } from 'ui/setup/setup-handler';

export const nextLayout = counter => {

  const init = () => {

    const { layout, lessonPlan, config, lesson, collection, userAction } = store.getState();

    const args = { layout, counter, lessonPlan, config, lesson, collection, userAction };

    const isRequired = setupHandler.isRequired(enums.nextStep.NEXT_LAYOUT, args);

    if(isRequired) {
        const nextLayout = lessonPlan.layouts[counter.index];
        setupHandler.actionUpdate(enums.nextStep.NEXT_LAYOUT, { layout: nextLayout, config });
    }
  };

  setTimeout(() => {
   init(); // to sure ensure in a race, nextLesson wins 
  });
};