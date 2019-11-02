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

const changeLessonPlans = makeActionCreator(types.CHANGE_LESSON_PLANS);
const changeLessonPlan = makeActionCreator(types.CHANGE_LESSON_PLAN);
const nextLesson = makeActionCreator(types.NEXT_LESSON);
const updateScore = makeActionCreator(types.UPDATE_SCORE);
const updateTraitScore = makeActionCreator(types.UPDATE_TRAIT_SCORE);
const nextLayout = makeActionCreator(types.NEXT_LAYOUT);
const nexItem = makeActionCreator(types.NEXT_ITEM);
const endRevision = makeActionCreator(types.END_REVISION);
const updateHistory = makeActionCreator(types.UPDATE_HISTORY)
const newCollection = makeActionCreator(types.NEW_COLLECTION);
const updateCollection = makeActionCreator(types.UPDATE_COLLECTION);
const resetCollection = makeActionCreator(types.RESET_COLLECTION);
const updateCollections = makeActionCreator(types.UPDATE_COLLECTIONS);
const changeCollectionItems = makeActionCreator(types.UPDATE_COLLECTION_ITEMS);
const nextRound = makeActionCreator(types.NEXT_ROUND);
const nextLevel = makeActionCreator(types.NEXT_LEVEL);
const updateConfig = makeActionCreator(types.UPDATE_CONFIG);
const stopStartLesson = makeActionCreator(types.STOP_START_LESSON);
const selectCollection = makeActionCreator(types.SELECT_COLLECTION);
const traitValuesHandler = makeActionCreator(types.UPDATE_LANGUAGE);
const updateEnums = makeActionCreator(types.UPDATE_ENUMS);
const updateLesson = makeActionCreator(types.UPDATE_LESSON);
const saveLesson = makeActionCreator(types.SAVE_LESSON);
const removeSavedLesson = makeActionCreator(types.REMOVE_LESSON);
const updateVideoPlayer = makeActionCreator(types.UPDATE_VIDEO_PLAYER);

const boundchangeLessonPlan = data => store.dispatch(changeLessonPlan(data));
const boundchangeLessonPlans = data => store.dispatch(changeLessonPlans(data));
const boundNextLesson = data => store.dispatch(boundAsyncNextLesson(data));

const boundAsyncNextLesson = func => {
  return function(dispatch) {
    return func.then(response => {
      return dispatch(nextLesson(response));
    })
  }  
};

const boundUpdateScore = data => store.dispatch(updateScore(data));
const boundUpdateTraitScore = data => store.dispatch(updateTraitScore(data));
const boundNextLayout = data => store.dispatch(nextLayout(data));
const boundNextItem = data => store.dispatch(nexItem(data,{delay:500}));
const boundEndRevision = data => store.dispatch(endRevision(data));
const boundUpdateHistory = data => store.dispatch(updateHistory(data));
const boundNewCollection = data => store.dispatch(newCollection(data));
const boundUpdateCollection = data => store.dispatch(updateCollection(data));
const boundResetCollection = data => store.dispatch(resetCollection(data));
const boundUpdateCollections = data => store.dispatch(updateCollections(data));
const boundUpdateCollectionItems = data => store.dispatch(changeCollectionItems(data));
const boundNextRound = data => store.dispatch(nextRound(data));
const boundNextLevel = data => store.dispatch(nextLevel(data));
const boundUpdateConfig = data => store.dispatch(updateConfig(data));
const boundStopStartLesson = data => store.dispatch(stopStartLesson(data));
const boundSelectCollection = data => store.dispatch(selectCollection(data));
const boundUpdateLanguage = data => store.dispatch(traitValuesHandler(data));
const boundUpdateEnums = data => store.dispatch(updateEnums(data));
const boundUpdateLesson = data => store.dispatch(updateLesson(data));
const boundSaveLesson = data => store.dispatch(saveLesson(data));
const boundRemoveSavedLesson = data => store.dispatch(removeSavedLesson(data));
const boundUpdateVideoPlayer = data => store.dispatch(updateVideoPlayer(data));

export const actions = {
    boundchangeLessonPlans,
    boundchangeLessonPlan,
    boundNextLesson,
    boundUpdateScore,
    boundUpdateTraitScore,
    boundNextItem,
    boundNextLayout,
    boundEndRevision,
    boundUpdateHistory,
    boundNewCollection,
    boundUpdateCollection,
    boundResetCollection,
    boundUpdateCollections,
    boundUpdateCollectionItems,
    boundNextRound,
    boundNextLevel,
    boundUpdateConfig,
    boundStopStartLesson,
    boundSelectCollection,
    boundUpdateLanguage,
    boundUpdateEnums,
    boundUpdateLesson,
    boundSaveLesson,
    boundRemoveSavedLesson,
    boundUpdateVideoPlayer
};