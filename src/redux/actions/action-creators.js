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
const updateHistory = makeActionCreator(types.UPDATE_HISTORY)
const changeCollection = makeActionCreator(types.CHANGE_COLLECTION);
const nextRound = makeActionCreator(types.NEXT_ROUND);
const nextLevel = makeActionCreator(types.NEXT_LEVEL);
const updateConfig = makeActionCreator(types.UPDATE_CONFIG);

const boundNextLesson = data => store.dispatch(nextLesson(data));
const boundUpdateScore = data => store.dispatch(updateScore(data));
const boundNextLayout = data => store.dispatch(nextLayout(data));
const boundNextItem = data => store.dispatch(nexItem(data,{delay:500}));
const boundEndRevision = data => store.dispatch(endRevision(data));
const boundUpdateHistory = data => store.dispatch(updateHistory(data));
const boundChangeCollection = data => store.dispatch(changeCollection(data));
const boundNextRound = data => store.dispatch(nextRound(data));
const boundNextLevel = data => store.dispatch(nextLevel(data));
const boundUpdateConfig = data => store.dispatch(updateConfig(data));

export const actions = {
    boundNextLesson,
    boundUpdateScore,
    boundNextItem,
    boundNextLayout,
    boundEndRevision,
    boundUpdateHistory,
    boundChangeCollection,
    boundNextRound,
    boundNextLevel,
    boundUpdateConfig
};