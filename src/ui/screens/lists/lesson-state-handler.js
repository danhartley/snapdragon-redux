import * as R from 'ramda';

import { firestore } from 'api/firebase/firestore';
import { progressState } from 'redux/reducers/initial-state/initial-progress-state';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { collectionHandler  } from 'ui/helpers/collection-handler';

const beginOrResumeLesson = async (reviewLessonId, isNextRound)  => {

  const { collections, collection: currentCollection, config } = store.getState();

  console.log('currentCollection: ', currentCollection);

  if(isNextRound) {
    await changeState(enums.lessonState.NEXT_ROUND, currentCollection, config);
  }

  const resumeCurrentLesson = currentCollection.id > 0 && currentCollection.id === parseInt(reviewLessonId) && config.collection.id !== 0;

  const collectionToLoad = resumeCurrentLesson ? currentCollection : collections.find(c => c.id === parseInt(reviewLessonId));

  const { collection, score } = await loadLesson(collectionToLoad, config, collections);

  const lessonState = (score && score.collectionId) === collection.id 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  changeState(lessonState, collection, config); 
};

const renderLessonSpeciesList = async (collectionToLoad, container) => {

  const { config, collections, counter } = store.getState();

  const { collection } = await loadLesson(collectionToLoad, config, collections);

  renderSpeciesList(collection, { callingParentContainer: container });
};

const saveCurrentLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config, lessons } = store.getState();
  
  config.collection.id = collection.id;

  if(!layout) return;
 
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

  const { counter, lessons, user } = store.getState();

  const restoredLesson = lessons.find(l => l.name === collectionToLoad.name);

  let lesson;

  if(restoredLesson) {
    lesson = restoredLesson;
    if(lesson.lesson.isNextRound) {
      lesson.score = R.clone(progressState.score);
    }
  } else {
    lesson = { 
      collection: collectionToLoad, 
      counter: { ...counter, index: 0}, 
      lesson: { currentRound: 1, rounds: 0, isNextRound: true },
      layout: null,
      history: null,
      score: R.clone(progressState.score)
    };
  }

  console.log('collectionToLoad: ', collectionToLoad);

  const requiresCollection = 
      (!!collectionToLoad.items && collectionToLoad.items.length === 0) ||
      (!collectionToLoad.items && !!collectionToLoad.species);

  console.log('requiresCollection: ', requiresCollection);

  if(requiresCollection) {
    await collectionHandler.loadCollection(lesson.collection, config, lesson.counter, collections);
    actions.boundNewCollection({ lesson });
  } else {
    actions.boundNewCollection({ lesson });  
  }
  
  const requiresAddingToCollections = !collections.filter(collection => collection.isActive).find(c => c.id === lesson.collection.id);

  console.log('requiresAddingToCollections: ', requiresAddingToCollections);

  if(requiresAddingToCollections) {
    if(lesson.collection.items.length > 0) {
      firestore.addCollection(lesson.collection, user);
      actions.boundUpdateCollections([lesson.collection]);
    }
  }

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

const changeState = async (lessonState, collection, config) => {    

  let lesson;

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
          const currentLesson = await saveCurrentLesson(collection);
          lesson = currentLesson.lesson;

          const mode = 'learn';

          switch(mode) {  
              case 'learn': {
                  if(lesson.isLevelComplete) {
                      actions.boundNextLevel({ index: 0, lesson });
                  } else if(lesson.isNextRound) {
                      actions.boundNextRound({ index: 0, lesson });
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
  }
  return lesson;
};

const purgeLesson = () => {

  persistor.purge();
  window.location.reload(true);
};

const addExtraSpeciesSelection = async (config, collection, species) => {
    
  const items = await collectionHandler.getSnapdragonSpeciesData(species);
  const collectionExtension = await collectionHandler.loadCollectionItemProperties({ items }, config);
  collection.items = [...collection.items, ...collectionExtension.items];
  const lesson = {
      collection,
      counter: { ...store.getState().counter, index: 0 },
      lesson: { currentRound: 1, rounds: 0, isNextRound: true },
      layout: null,
      history: null,
      score: R.clone(progressState.score)
  };
  actions.boundNewCollection({ lesson });
  console.log('boundNewCollection');
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
      season: {},
      extraSpecies: []
  };
  actions.boundUpdateConfig(config);
};

export const lessonStateHandler = {
  beginOrResumeLesson,
  renderLessonSpeciesList,
  loadLesson,
  getMode,
  changeState,    
  purgeLesson,
  addExtraSpeciesSelection,
  clearGuide
};
