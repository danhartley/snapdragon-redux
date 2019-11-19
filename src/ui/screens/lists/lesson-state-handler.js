import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';

import { renderSpeciesList } from 'ui/screens/lists/species-list';

import { lessonHandler } from 'ui/helpers/lesson-handler';
import { collectionHandler } from 'ui/helpers/collection-handler';

const beginOrResumeLesson = async reviewLessonId  => {

  const { collections, collection: custom, config, history, score, counter } = store.getState();

  const lesson = custom.id > 0 ? custom : collections.find(c => c.id === reviewLessonId);

  const collection = await loadCollection(lesson, config, counter, collections);
  
  const lessonState = score.collectionId === collection.id 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  lessonHandler.changeState(lessonState, collection, config, history); 
};

const renderLessonSpeciesList = async (lesson, container) => {

  const { config, counter, collections } = store.getState();

  const collection = await loadCollection(lesson, config, counter, collections);

  renderSpeciesList(collection, { callingParentContainer: container });
};

const saveCurrentLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config } = store.getState();
  
  if(!score || score.total === 0) return; // only save lessons that the user has started

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums
  };
  
  actions.boundSaveLesson(savedLesson);

  const initialisedConfig = await initialiseConfig(config);

  actions.boundUpdateConfig(initialisedConfig);
};

const restoreSavedLesson = lesson => {
    const savedLesson = store.getState().lessons.find(l => l.name === lesson.name);

    if(savedLesson) {
      actions.boundRemoveSavedLesson(savedLesson);
      return savedLesson.collection;
    } else {
      return null;
    }
};

const loadCollection = async (collection, config, counter, collections) => {

  saveCurrentLesson(store.getState().collection);

  collection = restoreSavedLesson(collection) || collection;

  await collectionHandler(collection, config, counter, collections);

  config.collection = { id: collection.id };

  actions.boundNewCollection({ config, collection });
  
  if(collections.find(c => c.id !== collection.id)) {
    actions.boundUpdateCollections(collection);
  }

  return collection;
} 

export const lessonStateHandler = {
  beginOrResumeLesson,
  renderLessonSpeciesList,
  loadCollection
};
