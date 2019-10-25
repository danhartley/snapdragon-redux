import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';
import { lessonHandler } from 'ui/helpers/collection-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';

export const onChangeLessonState = actionableLink  => {

  const beginLesson = event => {
    event.stopPropagation();
    const { collection, config, history } = store.getState();
    lessonHandler.changeState(enums.lessonState.BEGIN_LESSON, collection, config, history); 
  };

  actionableLink.removeEventListener('click', beginLesson);

  actionableLink.addEventListener('click', beginLesson);
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
  
  // const { collection } = args;



  // renderSpeciesList(collection, { tableParent: container, loadSpeciesCallback, isInCarousel: false });
  // renderLesson(collection);
  

};

export const lessonStateHandler = {
  loadLessons,
  onClick
}