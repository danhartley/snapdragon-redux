import { lessonHandler } from 'ui/helpers/lesson-handler';
import { enums } from 'ui/helpers/enum-helper';

export const onChangeLessonState = actionableButton  => {

        // const beginLearningActionBtn = document.querySelector('.js-species-list-btn-action');

        actionableButton.addEventListener('click', event => {
            const { history } = store.getState();
            lessonHandler.changeState(enums.lessonState.BEGIN_LESSON, collection, config, history);
          });
};