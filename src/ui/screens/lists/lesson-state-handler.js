import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';

import { renderSpeciesList } from 'ui/screens/lists/species-list';

import { lessonHandler } from 'ui/helpers/lesson-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { collectionHandler } from 'ui/helpers/collection-handler';

const beginOrResumeLesson = async reviewLessonId  => {

  const { collections, config, history, score, counter } = store.getState();

  const lesson = collections.find(c => c.id === reviewLessonId);

  const collection = await loadCollection(lesson, config, counter);
  
  const lessonState = score.collectionId === collection.id 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  lessonHandler.changeState(lessonState, collection, config, history); 
};

const loadLessonViewStates = (savedLessons, collections, videoPlayer, score) => {

  const savedLessonNames = savedLessons.map(collection => collection.name);

  return collections.map(collection => {
    collection.isPaused = R.contains(collection.name, savedLessonNames);
    return loadLessonViewState(collection, videoPlayer, score);
  });
};

const renderLessonSpeciesList = async (lesson, container) => {

  const { config, counter } = store.getState();

  const collection = await loadCollection(lesson, config, counter);

  renderSpeciesList(collection, { callingParentContainer: container });
};

const loadLessonViewState = (collection, videoPlayer, score) => {

  const savedState = collection.isPaused ? '(lesson paused)' : '';
  const taxa = collection.iconicTaxa ? collection.iconicTaxa.map(taxon => taxon.common).join(', ') : '';

  collection.taxa = taxa;
  collection.savedState = savedState;
  collection.hasVideo = collection.video ? true : false;
  collection.showVideoIconClass = collection.hasVideo ? '' : 'hide-important';
  collection.videoState = videoHandler.setVideoState(videoPlayer || [], collection);
  collection.reviewState = (!!score && score.collectionId === collection.id) ? 'Resume Review' : 'Lesson Review';

  return collection;  
};

const saveCurrentLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config } = store.getState();
  
  if(collection.id === 0 || collection.items.length === 0 || !score || score.total === 0) return;

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums
  };
  
  actions.boundSaveLesson(savedLesson);
  // actions.boundPauseLesson();

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

const loadCollection = async (collection, config, counter) => {

  saveCurrentLesson(store.getState().collection);

  collection = restoreSavedLesson(collection) || collection;

  await collectionHandler(collection, config, counter);

  config.collection = { id: collection.id };

  actions.boundNewCollection({ config, collection });

  return collection;
} 

export const lessonStateHandler = {
  loadLessonViewState,
  loadLessonViewStates,
  beginOrResumeLesson,
  renderLessonSpeciesList,
  loadCollection
};
