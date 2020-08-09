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
const userProgress = makeActionCreator(types.SAVE_USER_PROGRESS);
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
const updateUnits = makeActionCreator(types.UPDATE_UNITS);
const updateUser = makeActionCreator(types.UPDATE_USER);
const updateLesson = makeActionCreator(types.UPDATE_LESSON);
const saveLesson = makeActionCreator(types.SAVE_LESSON);
const removeSavedLesson = makeActionCreator(types.REMOVE_LESSON);
const updateVideoPlayer = makeActionCreator(types.UPDATE_VIDEO_PLAYER);
const createQuickFire = makeActionCreator(types.CREATE_QUICKFIRE);
const updateQuickFire = makeActionCreator(types.UPDATE_QUICKFIRE);
const createGlossary = makeActionCreator(types.CREATE_GLOSSARY);
const clickEvent = makeActionCreator(types.CLICK_EVENT);
const updateDecks = makeActionCreator(types.UPDATE_DECKS);
const updateDeck = makeActionCreator(types.UPDATE_DECK);
const nextDeck = makeActionCreator(types.NEXT_DECK);
const nextCard = makeActionCreator(types.NEXT_CARD);

const boundchangeLessonPlan = data => store.dispatch(changeLessonPlan(data));
const boundchangeLessonPlans = data => store.dispatch(changeLessonPlans(data));
const boundNextLesson = data => store.dispatch(nextLesson(data));
const boundAsyncNextLesson = data => store.dispatch(asyncNextLesson(data));

const asyncNextLesson = func => {
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
const boundSaveUserProgress = data => store.dispatch(userProgress(data));
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
const boundUpdateUnits = data => store.dispatch(updateUnits(data));
const boundUpdateUser = data => store.dispatch(updateUser(data));
const boundUpdateLesson = data => store.dispatch(updateLesson(data));
const boundSaveLesson = data => store.dispatch(saveLesson(data));
const boundRemoveSavedLesson = data => store.dispatch(removeSavedLesson(data));
const boundUpdateVideoPlayer = data => store.dispatch(updateVideoPlayer(data));
const boundCreateQuickFire = data => store.dispatch(createQuickFire(data));
const boundUpdateQuickFire = data => store.dispatch(updateQuickFire(data));
const boundCreateGlossary = data => store.dispatch(createGlossary(data));
const boundClickEvent = data => store.dispatch(clickEvent(data));
const boundUpdateDecks = data => store.dispatch(updateDecks(data));
const boundUpdateDeck = data => store.dispatch(updateDeck(data));
const boundNextDeck = data => store.dispatch(nextDeck(data));
const boundNextCard = data => store.dispatch(nextCard(data));

export const actions = {
    boundchangeLessonPlans,
    boundchangeLessonPlan,
    boundAsyncNextLesson,
    boundNextLesson,
    boundUpdateScore,
    boundUpdateTraitScore,
    boundNextItem,
    boundNextLayout,
    boundEndRevision,
    boundUpdateHistory,
    boundSaveUserProgress,
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
    boundUpdateUnits,
    boundUpdateLesson,
    boundSaveLesson,
    boundRemoveSavedLesson,
    boundUpdateVideoPlayer,
    boundUpdateUser,
    boundCreateQuickFire,
    boundUpdateQuickFire,
    boundCreateGlossary,
    boundClickEvent,
    boundUpdateDecks,
    boundUpdateDeck,
    boundNextDeck,
    boundNextCard
};