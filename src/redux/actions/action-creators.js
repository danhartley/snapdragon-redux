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

const nextLesson = makeActionCreator(types.NEXT_LESSON);
const updateScore = makeActionCreator(types.UPDATE_SCORE);
const nextLayout = makeActionCreator(types.NEXT_LAYOUT);
const nexItem = makeActionCreator(types.NEXT_ITEM);
const endRevision = makeActionCreator(types.END_REVISION);
const updateHistory = makeActionCreator(types.UPDATE_HISTORY);
const reset = makeActionCreator(types.RESET);
const changeCollection = makeActionCreator(types.CHANGE_COLLECTION);

const boundNextLesson = data => store.dispatch(nextLesson(data));
const boundUpdateScore = data => store.dispatch(updateScore(data));
const boundNextLayout = data => store.dispatch(nextLayout(data));
const boundNextItem = data => store.dispatch(nexItem(data,{delay:500}));
const boundEndRevision = data => store.dispatch(endRevision(data));
const boundUpdateHistory = data => store.dispatch(updateHistory(data));
const boundReset = data => store.dispatch(reset(data));
const boundChangeCollection = data => store.dispatch(changeCollection(data));

export const actions = {
    boundNextLesson,
    boundUpdateScore,
    boundNextItem,
    boundNextLayout,
    boundEndRevision,
    boundUpdateHistory,
    boundReset,
    boundChangeCollection
};