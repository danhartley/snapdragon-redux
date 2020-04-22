import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';
import { persistor } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { collectionHandler  } from 'ui/helpers/collection-handler';

const getCollectionToLoad = (collection, collections, config, selectedLessonId)  => {

  const id = parseInt(selectedLessonId);

  const resumeCurrentLesson = collection.id > 0 && collection.id === id && config.collection.id !== 0;

  const collectionToLoad = resumeCurrentLesson ? collection : collections.find(c => c.id === id);

  return collectionToLoad;
};

const getCurrentLessonState = (isNextRound, config) => {
  return enums.lessonState.NEXT_ROUND;
  // return isNextRound && config.collection.id > 0 ? null : enums.lessonState.NEXT_ROUND;
};

const beginOrResumeLesson = async (selectedLessonId, isNextRound)  => {

  const { collections, collection: currentCollection, config } = store.getState();

  const collectionToLoad = getCollectionToLoad(currentCollection, collections, config, selectedLessonId);

  await changeLessonState(getCurrentLessonState(isNextRound, config), currentCollection, config);

  const { collection, score } = await loadLesson(collectionToLoad, config, collections);

  const lessonState = (score && score.collectionId === collection.id) 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  changeLessonState(lessonState, collection, config); 
};

const renderLessonSpeciesList = async (collectionToLoad, container) => {

  const { config, collections } = store.getState();

  const { collection } = await loadLesson(collectionToLoad, config, collections);

  renderSpeciesList(collection, { callingParentContainer: container });
};

const saveCurrentLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config } = store.getState();
  
  config.collection.id = collection.id;

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score: R.clone(score), history, bonusLayout, enums
  };

  actions.boundSaveLesson(savedLesson);

  const initialisedConfig = await initialiseConfig(config);

  actions.boundUpdateConfig(initialisedConfig);

  return savedLesson;
};

const loadLesson = async (collectionToLoad, config, collections) => {

  const { counter, lessons, lesson: savedLesson } = store.getState();

  let restoredLesson = lessons.find(l => l.name === collectionToLoad.name);

  let lesson;

  if(restoredLesson) {
    lesson = restoredLesson;
    if(lesson.lesson.isNextRound) {
      lesson.score = R.clone(progressState.score);
    }
  } else {
    lesson = { 
      collection: collectionToLoad, 
      counter: { ...counter, index: 0 },
      lesson: savedLesson || { currentRound: 1, rounds: 0, isNextRound: true },
      layout: null,
      history: null,
      score: R.clone(progressState.score)
    };
  }

  const collection = await collectionHandler.loadCollection(lesson.collection, config, lesson.counter, collections);

  setActiveCollection(lesson);

  return lesson;
};

const getMode = (mode, isLevelComplete, itemsToReview) => {    
  const _mode = (mode === 'learn' && isLevelComplete && itemsToReview.length > 0)
          ? 'review'
          : mode === 'review' ? 'learn-again' : 'learn';
  return _mode;
}

const getLatestCounter = collection => { 
  const { counter, lessons } = store.getState();
  const log = counter.log;
  const index = log ? log.index : 
              lessons.find(l => l.collection.id === collection.id)
                  ? lessons.find(l => l.collection.id === collection.id).counter.index
                  : counter.index;

  return { index };
};

const changeLessonState = async (lessonState, collection, config) => {    

  let lesson = {};

  switch(lessonState) {
      case enums.lessonState.BEGIN_LESSON: {
          actions.boundStopStartLesson({ index: 0, isLessonPaused: false });
          break;
      }
      case enums.lessonState.PAUSE_LESSON: {
          if(collection.items) {
              lesson = await saveCurrentLesson(collection);
              const { index } = getLatestCounter(collection);
              actions.boundStopStartLesson({ index, isLessonPaused: true, log: { index: index, collection: collection.id  } });
          }
          break;
      }
      case enums.lessonState.RESUME_LESSON: {
          actions.boundStopStartLesson({ ...getLatestCounter(collection), isLessonPaused: false });
          break;
      }
      case enums.lessonState.NEXT_ROUND: {

          const isLayoutReady = !!store.getState().layout;

          if(isLayoutReady) {
            const currentLesson = await saveCurrentLesson(collection);
            lesson = currentLesson.lesson;
          }

          const mode = 'learn';

          switch(mode) {  
              case 'learn': {
                  if(lesson.isLevelComplete) {
                      actions.boundNextLevel({ index: 0, lesson });
                  } else if(lesson.isNextRound) {
                      actions.boundNextRound({ index: 0, lesson: { ...lesson, currentRound: lesson.currentRound + 1 } });
                  };
                  break;
              }
              case 'review' : {
                  
                  lesson.isLevelComplete = false;
                  lesson.moduleSize = (lesson.moduleSize > itemsToReview.length) ? itemsToReview.length : lesson.moduleSize;
                  lesson.rounds = Math.ceil(itemsToReview.length / lesson.moduleSize);
                  
                  actions.boundUpdateLesson(lesson);

                  collection.itemIndex = 0;
                  collection.allItems = collection.items;
                  collection.items = itemsToReview;
                  
                  actions.boundUpdateCollection({ config, collection });

                  actions.boundNextRound({ index: 0, lesson });
                  break;
              }
              case 'learn-again': {
                  collection.items = collection.allItems;
                  lesson.moduleSize = collection.moduleSize || config.moduleSize;
                  actions.boundUpdateLesson(lesson);
                  actions.boundUpdateCollection({ config, collection });
              }
          }            
          break;      
      }
      default: {
        return null;
      }
  }
  return lesson;
};

const purgeLesson = () => {
  persistor.purge();
  window.location.reload(true);
};

const addExtraSpeciesSelection = async (config, collection) => {

  if(!collection.items) return;

  const extraSpecies = config.guide.species.filter(s => !R.contains(s.name, collection.items.map(i => i.name)));
  const items = await collectionHandler.getSnapdragonSpeciesData(extraSpecies);
  const collectionExtension = await collectionHandler.loadCollectionItemProperties({ items }, config);
  collection.items = [ ...collection.items, ...collectionExtension.items];
  const lesson = {
      collection,
      counter: { ...store.getState().counter, index: 0 },
      lesson: { currentRound: 1, rounds: 0, isNextRound: true },
      layout: null,
      history: null,
      score: R.clone(progressState.score)
  };
  setActiveCollection(lesson);
};

const clearGuide = () => {
  const config = store.getState().config;
  config.guide = {
      iconicTaxa: null,
      locationLongLat: '',
      locationPlace: '',
      locationType: null,
      place: {
          id: 1,
          name: ''
      },
      speciesRange: 10,
      inatId: { key: '', type: '', param: 'user_id' },
      season: {}
  };
  actions.boundUpdateConfig(config);
};

const updateCollection = (config, collection) => {
  actions.boundUpdateCollection({ config, collection });
};

const setActiveCollection = lesson => {
  lesson.counter = lesson.counter || { };
  actions.boundSetActiveCollection({ lesson });
  const { user } = store.getState();
  firestore.addCollection(lesson.collection, user);
};

const recordUserAction = action => {
  actions.boundClickEvent(action);
};

const getIsReviewingLesson = (userAction, config) => {

  let isNotReviewingLesson = true;

  if (userAction) {
      if (config.isLandscapeMode) {
          isNotReviewingLesson = isNotReviewingLesson && (userAction.name === enums.userEvent.START_LESSON.name || userAction.name === enums.userEvent.TOGGLE_SPECIES_LIST.name);
      }
      else {
          isNotReviewingLesson = isNotReviewingLesson && (userAction.name === enums.userEvent.START_LESSON.name);
      }
  }

  // console.log('isReviewingLesson: ', !isNotReviewingLesson);

  return !isNotReviewingLesson;
};

const overrideLesson = (userAction, config) => {
  return !getIsReviewingLesson(userAction, config);
};

export const lessonStateHandler = {
  beginOrResumeLesson,
  renderLessonSpeciesList,
  loadLesson,
  getMode,
  changeLessonState,    
  purgeLesson,
  addExtraSpeciesSelection,
  clearGuide,
  updateCollection,
  recordUserAction,
  overrideLesson,
  getIsReviewingLesson
};