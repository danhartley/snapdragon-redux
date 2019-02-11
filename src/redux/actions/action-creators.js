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
const nextLayout = makeActionCreator(types.NEXT_LAYOUT);
const nexItem = makeActionCreator(types.NEXT_ITEM);
const endRevision = makeActionCreator(types.END_REVISION);
const updateHistory = makeActionCreator(types.UPDATE_HISTORY)
const changeCollection = makeActionCreator(types.CHANGE_COLLECTION);
const changeCollectionItems = makeActionCreator(types.CHANGE_COLLECTION_ITEMS);
const nextRound = makeActionCreator(types.NEXT_ROUND);
const nextLevel = makeActionCreator(types.NEXT_LEVEL);
const updateConfig = makeActionCreator(types.UPDATE_CONFIG);
const toggleLesson = makeActionCreator(types.STOP_START_LESSON);
const selectCollection = makeActionCreator(types.SELECT_COLLECTION);
const selectStudyMethod = makeActionCreator(types.SELECT_STUDY_METHOD);
const updateLanguage = makeActionCreator(types.UPDATE_LANGUAGE);
const newPage = makeActionCreator(types.CHANGE_PAGE);
const updateUI = makeActionCreator(types.UPDATE_UI);
const updateEnums = makeActionCreator(types.UPDATE_ENUMS);

const boundchangeLessonPlan = data => store.dispatch(changeLessonPlan(data));
const boundchangeLessonPlans = data => store.dispatch(changeLessonPlans(data));
const boundNextLessonPlan = data => store.dispatch(nextLesson(data));
const boundUpdateScore = data => store.dispatch(updateScore(data));
const boundNextLayout = data => store.dispatch(nextLayout(data));
const boundNextItem = data => store.dispatch(nexItem(data,{delay:500}));
const boundEndRevision = data => store.dispatch(endRevision(data));
const boundUpdateHistory = data => store.dispatch(updateHistory(data));
const boundChangeCollection = data => store.dispatch(changeCollection(data));
const boundChangeCollectionItems = data => store.dispatch(changeCollectionItems(data));
const boundNextRound = data => store.dispatch(nextRound(data));
const boundNextLevel = data => store.dispatch(nextLevel(data));
const boundUpdateConfig = data => store.dispatch(updateConfig(data));
const boundToggleLesson = data => store.dispatch(toggleLesson(data));
const boundSelectCollection = data => store.dispatch(selectCollection(data));
const boundSelectStudyMethod = data => store.dispatch(selectStudyMethod(data));
const boundUpdateLanguage = data => store.dispatch(updateLanguage(data));
const boundNewPage = data => store.dispatch(newPage(data));
const boundUpdateUI = data => store.dispatch(updateUI(data));
const boundUpdateEnums = data => store.dispatch(updateEnums(data));

export const actions = {
    boundchangeLessonPlans,
    boundchangeLessonPlan,
    boundNextLessonPlan,
    boundUpdateScore,
    boundNextItem,
    boundNextLayout,
    boundEndRevision,
    boundUpdateHistory,
    boundChangeCollection,
    boundChangeCollectionItems,
    boundNextRound,
    boundNextLevel,
    boundUpdateConfig,
    boundToggleLesson,
    boundSelectCollection,
    boundSelectStudyMethod,
    boundUpdateLanguage,
    boundNewPage,
    boundUpdateUI,
    boundUpdateEnums
};