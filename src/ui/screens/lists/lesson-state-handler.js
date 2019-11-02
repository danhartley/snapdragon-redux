import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';

import { renderSpeciesList } from 'ui/screens/lists/species-list';

import { lessonHandler } from 'ui/helpers/lesson-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { collectionHandler } from 'ui/helpers/collection-handler';

const beginOrResumeLesson = async (newCollectionId, currentCollection)  => {

  const { collections, config, history, score, counter } = store.getState();

  const requireSpecies = !(collection && collection.id === newCollectionId && collection.items && collection.items.length > 0);

  const collection = requireSpecies ? await collectionHandler(collections, currentCollection, config, counter) : currentCollection;
  
  const lessonState = score.collectionId === collection.id 
          ? enums.lessonState.RESUME_LESSON
          : enums.lessonState.BEGIN_LESSON;

  lessonHandler.changeState(lessonState, collection, config, history); 
};

const saveCurrentLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums, config } = store.getState();
  
  if(collection.id === 0 || collection.items.length === 0 || !score || score.total === 0) return;

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums
  };
  
  actions.boundSaveLesson(savedLesson);
  actions.boundPauseLesson();

  const initialisedConfig = await initialiseConfig(config);

  actions.boundUpdateConfig(initialisedConfig);
};

const loadLessonViewStates = (savedLessons, collections, videoPlayer, score) => {

  const savedLessonNames = savedLessons.map(collection => collection.name);

  return collections.map(collection => {
    collection.isPaused = R.contains(collection.name, savedLessonNames);
    return loadLessonViewState(collection, videoPlayer, score);
  });
};

const beginIntro = async args => {

  const { lesson, container, isInCarousel, requireSpecies } = args;
  const { config, counter, collections } = store.getState();

  if(requireSpecies) {
    config.collection = { id: lesson.id };
    const collection = await collectionHandler(collections, lesson, config, counter);
    renderSpeciesList(collection, { callingParentContainer: container, isInCarousel });
  }

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

export const lessonStateHandler = {
  loadLessonViewState,
  loadLessonViewStates,
  beginOrResumeLesson,
  beginIntro,
  saveCurrentLesson
}