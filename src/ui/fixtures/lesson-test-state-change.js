import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { lessonHandler } from 'ui/helpers/lesson-handler';

export const onChangeLessonState = actionableLink  => {

  actionableLink.addEventListener('click', event => {
      setTimeout(() => {
        event.stopPropagation();
        const { collection, config, history } = store.getState();
        lessonHandler.changeState(enums.lessonState.BEGIN_LESSON, collection, config, history); 
      });
    });
};