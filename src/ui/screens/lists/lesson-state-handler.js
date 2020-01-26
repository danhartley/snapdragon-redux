import { stats } from 'ui/helpers/stats';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { collectionHandler } from 'ui/helpers/collection-handler';

const beginOrResumeLesson = async reviewLessonId  => {

  console.log('2. beginOrResumeLesson');

  const { collections, collection: currentCollection, config, score } = store.getState();

  const resumeCurrentLesson = currentCollection.id > 0 && currentCollection.id === parseInt(reviewLessonId) && config.collection.id !== 0;

  const collectionToLoad = resumeCurrentLesson ? currentCollection : collections.find(c => c.id === parseInt(reviewLessonId));

  const collection = await loadCollection(collectionToLoad, config, collections);

  const lessonState = score.collectionId === collection.id 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  changeState(lessonState, collection, config); 
};

const renderLessonSpeciesList = async (collectionToLoad, container) => {

  const { config, collections, counter } = store.getState();

  const collection = await loadCollection(collectionToLoad, config, collections);

  renderSpeciesList(collection, { callingParentContainer: container });
};

const saveCurrentLesson = async collection => {

  console.log('5. saveCurrentLesson');

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config, lessons } = store.getState();
  
  config.collection.id = collection.id;

  if(!layout) return;

  layout.fromSaved = true;

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums
  };
  
  actions.boundSaveLesson(savedLesson);

  const initialisedConfig = await initialiseConfig(config);

  actions.boundUpdateConfig(initialisedConfig);

  return savedLesson;
};

const loadCollection = async (collectionToLoad, config, collections) => {

  console.log('3. loadCollection');

  const { counter, lessons } = store.getState();

  const restoredLesson = lessons.find(l => l.name === collectionToLoad.name);

  let lesson;

  if(restoredLesson) {
    // actions.boundRemoveSavedLesson(restoredLesson);
    lesson = restoredLesson;
  } else {
    lesson = { collection: collectionToLoad, counter: { ...counter, index: 0} };
    console.log('4. get new collection');
    await collectionHandler(lesson.collection, config, lesson.counter, collections);
  }

  console.log('5. lesson and collection ready');

  if(lesson.collection.items.length > 0) {
    actions.boundNewCollection({ lesson });
  }
  
  if(!collections.find(c => c.id === lesson.collection.id)) {
    if(lesson.collection.items.length > 0) {
      actions.boundUpdateCollections(lesson.collection);
    }
  }

  return lesson.collection;
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

  console.log('counter.index after change state: ', counter.index);
  console.log('counter.isLessonPaused change state: ', counter.isLessonPaused);

  return { index };
};

const changeState = async (lessonState, collection, config) => {    

  let savedLesson, lesson;

  switch(lessonState) {
      case enums.lessonState.BEGIN_LESSON: {
          actions.boundStopStartLesson({ index: 0, isLessonPaused: false });
          break;
      }
      case enums.lessonState.PAUSE_LESSON: {
          if(collection.items) {
            lesson = await saveCurrentLesson(collection);
              const { index } = getLatestCounter(collection);
              actions.boundStopStartLesson({ index: 0, isLessonPaused: true, log: { index: index, collection: collection.id  } });
          }
          break;
      }
      case enums.lessonState.RESUME_LESSON: {
          actions.boundStopStartLesson({ ...getLatestCounter(collection), isLessonPaused: false });
          break;
      }
      case enums.lessonState.NEXT_ROUND: {
          savedLesson = store.getState().lessons.find(l => l.collection.id === parseInt(collection.id));
          lesson = savedLesson.lesson;
          const itemsToReview = stats.getItemsForRevision(collection, lesson.history, 1);
          const mode = getMode(config.mode, lesson.isLevelComplete, itemsToReview);
          config.mode = mode;

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

export const lessonStateHandler = {
  beginOrResumeLesson,
  renderLessonSpeciesList,
  loadCollection,
  getMode,
  changeState,    
  purgeLesson
};
