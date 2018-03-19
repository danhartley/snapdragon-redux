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
const newScreen = makeActionCreator(types.NEW_SCREEN);

const boundMarkAnswer = data => store.dispatch(markAnswerAction(data));
const boundNewScreen = data => store.dispatch(newScreen(data,{delay:2000}));

export const actions = {
    boundMarkAnswer,
    boundNewScreen
};