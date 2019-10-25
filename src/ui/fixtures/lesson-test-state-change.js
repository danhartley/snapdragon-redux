import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { lessonHandler } from 'ui/helpers/lesson-handler';

export const onChangeLessonState = actionableLink  => {

  const beginLesson = event => {
    event.stopPropagation();
    const { collection, config, history } = store.getState();
    lessonHandler.changeState(enums.lessonState.BEGIN_LESSON, collection, config, history); 
  };

  actionableLink.removeEventListener('click', beginLesson);

  actionableLink.addEventListener('click', beginLesson);
};