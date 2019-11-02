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
      if (state.revealSpeciesList) {
        lessonStateHandler.beginIntro({ lesson });
        speciesList.classList.remove('hide');
      }
      if (state.hideSpeciesList) {
        speciesList.classList.add('hide');
        lessonVideoState.innerHTML = videoHandler.setVideoState(store.getState().videoPlayer || [], lesson);
      }
      if (state.requiresSpeciesList) {
        title.dataset.selected = true;
        const loadingMessage = title.parentElement.querySelector('.js-loading-message');
              loadingMessage.classList.remove('hide');
        await lessonStateHandler.beginIntro({ lesson, container, isInCarousel: false, requireSpecies: true });

        onSpeciesListLoad(lesson.id, loadingMessage);
      }

      renderLesson(lesson);
    }

    if(config.isPortraitMode) {
      renderLesson(lesson);
      const container = DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable');
      lessonStateHandler.beginIntro({ lesson, container, isInCarousel: false, requireSpecies: true });
    }
  });
};

const onSpeciesListLoad = (lessonId, loadingMessage) => {
  loadingMessage.classList.add('hide');
  lessonListScrollHandler.scrollToTitle(lessonId);
};

const onReviewClickHandler = reviewLink => {    

  reviewLink.addEventListener('click', () => {

    const { collections, collection } = store.getState();

    const lessonId = parseInt(reviewLink.dataset.lessonId);

    const changeLesson = collection.id !== collections.find(c => c.id === lessonId).id;

    if(changeLesson) {
      lessonStateHandler.saveCurrentLesson(collection);
    }
    
    lessonStateHandler.beginOrResumeLesson(reviewLessonId, collection);
  });
};

export const lessonListEventHandler = {
  onTitleClickHandler,
  onReviewClickHandler,
  onSpeciesListLoad
}