import { store } from 'redux/store';
import { types } from 'redux/types/learn';

const makeActionCreator = action => {
    return function (value, meta) {
      return { 
        type: action,
        data: value,
        meta: meta
      }
    }
  }

const markAnswerAction = makeActionCreator(types.MARK_ANSWER);
const nexItem = makeActionCreator(types.NEXT_ITEM);
const nextScreen = makeActionCreator(types.NEXT_LAYOUT);
const endLesson = makeActionCreator(types.END_LESSON);

const boundMarkAnswer = data => store.dispatch(markAnswerAction(data));
const boundNextItem = data => store.dispatch(nexItem(data,{delay:2000}));
const boundNextScreen = data => store.dispatch(nextScreen(data));
const boundEndLesson = data => store.dispatch(endLesson(data));

export const actions = {
    boundMarkAnswer,
    boundNextItem,
    boundNextScreen,
    boundEndLesson
};