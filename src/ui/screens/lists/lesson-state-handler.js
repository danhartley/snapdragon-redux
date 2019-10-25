import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';

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

const loadLessons = (savedLessons, collections, videoPlayer) => {

  const savedLessonNames = savedLessons.map(collection => collection.name);

  return collections.filter(collection => !collection.default).map((collection, index) => {
    const isPaused = R.contains(collection.name, savedLessonNames); 
    collection.taxa = collection.iconicTaxa.map(taxon => taxon.common).join(', ');
    collection.savedState = isPaused
        ? '(lesson paused)'
        : '';
    collection.isPaused = isPaused;
    collection.hasVideo = collection.video ? true : false;        
    collection.state = videoHandler.getLessonState(videoPlayer || [], collection);
    return collection;
  });
};

const onClick = args => {
  
  const { state, target, lesson, container, loadSpeciesCallback, isInCarousel, requireSpecies } = args;

  switch(state) {
    case enums.lessonState.BEGIN_LESSON:
      onBeginLesson(target, state);
      break;     
    case enums.lessonState.BEGIN_INTRO:
      if(requireSpecies) {
        renderSpeciesList(lesson, { callingParentContainer: container, loadSpeciesCallback, isInCarousel });
      }
      renderLesson(lesson);
      break;
  }



  // renderSpeciesList(collection, { callingParentContainer: container, loadSpeciesCallback, isInCarousel: false });
  // renderLesson(collection);
  

};

export const lessonStateHandler = {
  loadLessons,
  onClick
}