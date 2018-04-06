import { store } from 'redux/store';
import { types } from 'redux/actions/species-action-types';

const makeActionCreator = action => {
    return function (value, meta) {
      return { 
        type: action,
        data: value,
        meta: meta
      }
    }
  }

const markAnswer = makeActionCreator(types.MARK_ANSWER);
const nexItem = makeActionCreator(types.NEXT_ITEM);
const nextScreen = makeActionCreator(types.NEXT_LAYOUT);
const endLesson = makeActionCreator(types.END_LESSON);
const recordScore = makeActionCreator(types.RECORD_SCORE);
const reset = makeActionCreator(types.RESET);

const boundMarkAnswer = data => store.dispatch(markAnswer(data));
const boundNextItem = data => store.dispatch(nexItem(data,{delay:2000}));
const boundNextScreen = data => store.dispatch(nextScreen(data));
const boundEndLesson = data => store.dispatch(endLesson(data));
const boundRecordScore = data => store.dispatch(recordScore(data));
const boundReset = data => store.dispatch(reset(data));

export const actions = {
    boundMarkAnswer,
    boundNextItem,
    boundNextScreen,
    boundEndLesson,
    boundRecordScore,
    boundReset
};