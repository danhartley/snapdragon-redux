import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { collectionHandler } from 'ui/helpers/collection-handler';

const onBeginLesson = (target, state)  => {

  const beginLesson = event => {
    event.stopPropagation();
    const { collection, config, history } = store.getState();
    lessonHandler.changeState(state, collection, config, history); 
  };

  target.removeEventListener('click', beginLesson);

  target.addEventListener('click', beginLesson);
};

const saveLesson = async collection => {

  const { counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums } = store.getState();

  const savedLesson = { 
      name: collection.name,
      config, collection, counter, lessonPlan, lessonPlans, layout, lesson, score, history, bonusLayout, enums
  };
  
  actions.boundSaveLesson(savedLesson);
  actions.boundPauseLesson();

  const initialisedConfig = await initialiseConfig(config);

  actions.boundUpdateConfig(initialisedConfig);
};

const loadLessons = (savedLessons, collections, videoPlayer, score) => {

  const savedLessonNames = savedLessons.map(collection => collection.name);

  return collections.filter(collection => !collection.default).map(collection => loadLesson(collection, savedLessonNames, videoPlayer, score));
};

const bindAction = args => {
  
  const { state, target, lesson, container, isInCarousel, requireSpecies, loadSpeciesCallback } = args;
  switch(state) {
    case enums.lessonState.BEGIN_LESSON:
      onBeginLesson(target, state);
      break;     
    case enums.lessonState.BEGIN_INTRO:
      if(requireSpecies) {
        const { config, counter } = store.getState();
        config.collection = { id: lesson.id };
        const callback = (collection, config) => {
          renderSpeciesList(collection, { callingParentContainer: container, isInCarousel });
          loadSpeciesCallback();
        };
        collectionHandler(lesson, config, counter, callback, ()=>{});        
      }
      renderLesson(lesson);
      break;
    // case enums.lessonState.GET_SPECIES:
    //   break;
  }
};

const loadLesson = (collection, savedLessonNames, videoPlayer, score) => {

  const isPaused = R.contains(collection.name, savedLessonNames);
  const savedState = isPaused ? '(lesson paused)' : '';
  const taxa = collection.iconicTaxa ? collection.iconicTaxa.map(taxon => taxon.common).join(', ') : '';

  collection.taxa = taxa;
  collection.savedState = savedState;
  collection.isPaused = isPaused;
  collection.hasVideo = collection.video ? true : false;
  collection.videoState = videoHandler.setVideoState(videoPlayer || [], collection);
  collection.reviewState = (!!score && score.collectionId === collection.id) ? 'Resume Review' : 'Lesson Review';
  return collection;  
};


export const lessonStateHandler = {
  loadLesson,
  loadLessons,
  bindAction
}