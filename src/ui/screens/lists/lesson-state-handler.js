import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';

import { renderSpeciesList } from 'ui/screens/lists/species-list';

import { lessonHandler } from 'ui/helpers/lesson-handler';
import { collectionHandler } from 'ui/helpers/collection-handler';

const beginOrResumeLesson = async reviewLessonId  => {

  const { collections, collection: currentCollection, config, history, score } = store.getState();

  const resumeLesson = currentCollection.id > 0 && currentCollection.id === reviewLessonId && config.collection.id !== 0;

  const collectionToLoad = resumeLesson ? currentCollection : collections.find(c => c.id === reviewLessonId);

  const collection = await loadCollection(collectionToLoad, config, collections);
  
  const lessonState = score.collectionId === collection.id 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  lessonHandler.changeState(lessonState, collection, config, history); 
};

const renderLessonSpeciesList = async (collectionToLoad, container) => {

  const { config, collections } = store.getState();

  const collection = await loadCollection(collectionToLoad, config, collections);

  renderSpeciesList(collection, { callingParentContainer: container });
};

const saveCurrentLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config } = store.getState();
  
  if(!collection || collection.id === 0) return; // ignore default lesson

  config.collection.id = collection.id;
  layout.fromSaved = true;

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums
  };
  
  actions.boundSaveLesson(savedLesson);

  const initialisedConfig = await initialiseConfig(config);

  actions.boundUpdateConfig(initialisedConfig);
};

const restoreSavedLessonOrReturnNewOne = collectionToLoad => {

    const { counter, lessons, score, collection } = store.getState();

    if(score.total > 0 && collection.id > 0 && collection.id !== collectionToLoad.id) {
      saveCurrentLesson(collection);
    }

    const restoredLesson = lessons.find(l => l.name === collectionToLoad.name);

    let lesson;

    if(restoredLesson) {
      actions.boundRemoveSavedLesson(restoredLesson);
      lesson = restoredLesson;
    } else {
      lesson = { collection: collectionToLoad, counter: { ...counter, index: 0} };
    }

    return new Promise(resolve => resolve(lesson));
};

const loadCollection = async (collectionToLoad, config, collections) => {

  const lesson = await restoreSavedLessonOrReturnNewOne(collectionToLoad);

  await collectionHandler(lesson.collection, config, lesson.counter, collections);

  if(lesson.collection.items.length > 0) {
    actions.boundNewCollection({ lesson });
  }
  
  if(!collections.find(c => c.id === lesson.collection.id)) {
    if(lesson.collection.items.length > 0) {
      actions.boundUpdateCollections(lesson.collection);
    }
  }

  return lesson.collection;
} 

export const lessonStateHandler = {
  beginOrResumeLesson,
  renderLessonSpeciesList,
  loadCollection,
  saveCurrentLesson
};
