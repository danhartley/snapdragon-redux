import * as R from 'ramda';

import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { enums } from 'ui/helpers/enum-helper';
import { initialiseConfig } from 'ui/helpers/location-helper';
import { renderSpeciesList } from 'ui/screens/lists/species-list';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';
import { lessonHandler } from 'ui/helpers/lesson-handler';
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

const loadLessons = (savedLessons, lessons, videoPlayer) => {

  const savedLessonNames = savedLessons.map(lesson => lesson.name);

  lessons.forEach((lesson, index) => {
    const isPaused = R.contains(lesson.name, savedLessonNames); 
    lesson.taxa = lesson.iconicTaxa.map(taxon => taxon.common).join(', ');
    lesson.savedState = isPaused
        ? '(lesson paused)'
        : '';
    lesson.isPaused = isPaused;
    lesson.hasVideo = lesson.video ? true : false;        
    lesson.state = videoHandler.getLessonState(videoPlayer || [], lesson);
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