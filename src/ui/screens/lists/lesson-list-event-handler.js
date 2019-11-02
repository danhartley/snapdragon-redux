import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';

import { renderLesson } from 'ui/screens/home/home-lesson-intro';

import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

const checkLessonViewState = (e, lessons) => {

  const title = e.currentTarget;
  const lessonId = parseInt(title.dataset.lessonId);
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  const reviewLink = document.querySelector(`.js-lesson-review[data-review-link="${lessonId}"]`);

  // record this state change, if necessary to pause lesson review (or save lesson on pause? but what if happens after reload…?!)
  let otherSpecies = Array.from(document.querySelectorAll('.js-species-container'));
      otherSpecies = otherSpecies.filter(container => container.id !== `container_${lessonId}`);
      otherSpecies.forEach(container => container.innerHTML = '');

  const isSpeciesListAvailable = !!title.dataset.selected && !!speciesList; 
  const isSpeciesListHidden = elem.hasClass(speciesList, 'hide');

  const lessonVideoState = document.querySelector(`.js-lesson-video-state[data-lesson-id="${lessonId}"]`);

  const state = {
    requiresSpeciesList: !isSpeciesListAvailable,
    revealSpeciesList: isSpeciesListAvailable && isSpeciesListHidden,
    hideSpeciesList: isSpeciesListAvailable && !isSpeciesListHidden
  };

  return { title, lesson, state, speciesList, container, lessonVideoState, reviewLink };
};

const onTitleClickHandler = (title, lessons, config) => {
  
  return title.addEventListener('click', async e => {
    
    e.stopPropagation();

    const { title, lesson, state, speciesList, container, lessonVideoState } = checkLessonViewState(e, lessons);

    if(config.isLandscapeMode) {

      renderLesson(lesson);

      if(state.revealSpeciesList) {        
        speciesList.classList.remove('hide');
      }
      if(state.hideSpeciesList) {
        speciesList.classList.add('hide');
        lessonVideoState.innerHTML = videoHandler.setVideoState(store.getState().videoPlayer || [], lesson);
      }
      if(state.requiresSpeciesList) {

        title.dataset.selected = true;
        
        const loadingMessage = title.parentElement.querySelector('.js-loading-message');
              
              loadingMessage.classList.remove('hide'); // will also need to change state of active lesson, if there is one

        await lessonStateHandler.renderLessonSpeciesList(lesson, container);

              loadingMessage.classList.add('hide');
        
        lessonListScrollHandler.scrollToTitle(lesson.id);
      }      
    }

    if(config.isPortraitMode) {

      renderLesson(lesson);
      
      lessonStateHandler.renderLessonSpeciesList(lesson, DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable'));
    }
  });
};

const onReviewClickHandler = reviewLink => {    

  reviewLink.addEventListener('click', async e => {

    e.stopPropagation();

    lessonStateHandler.beginOrResumeLesson(parseInt(reviewLink.dataset.lessonId));
  });
};

export const lessonListEventHandler = {
  onTitleClickHandler,
  onReviewClickHandler
}