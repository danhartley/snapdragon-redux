import { store } from 'redux/store';
import { types } from 'redux/actions/action-types';

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
const nextLayout = makeActionCreator(types.NEXT_LAYOUT);
const nexItem = makeActionCreator(types.NEXT_ITEM);
const endLesson = makeActionCreator(types.END_LESSON);
const updateHistory = makeActionCreator(types.UPDATE_HISTORY);
const reset = makeActionCreator(types.RESET);
const nextSet = makeActionCreator(types.NEXT_SET);

const boundMarkAnswer = data => store.dispatch(markAnswer(data));
const boundNextLayout = data => store.dispatch(nextLayout(data));
const boundNextItem = data => store.dispatch(nexItem(data,{delay:500}));
const boundEndLesson = data => store.dispatch(endLesson(data));
const boundUpdateHistory = data => store.dispatch(updateHistory(data));
const boundReset = data => store.dispatch(reset(data));
const boundNextSet = data => store.dispatch(nextSet(data));

export const actions = {
    boundMarkAnswer,
    boundNextItem,
    boundNextLayout,
    boundEndLesson,
    boundUpdateHistory,
    boundReset,
    boundNextSet
};