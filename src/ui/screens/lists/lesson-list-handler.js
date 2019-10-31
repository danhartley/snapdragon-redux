import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';
import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { enums } from 'ui/helpers/enum-helper';
import { renderLesson } from 'ui/screens/home/home-lesson-intro';

const parseLessonElement = (e, lessons) => {

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

const titleClickHandler = (title, lessons, onSpeciesListLoad, config) => {
  
  return title.addEventListener('click', e => {
    
    e.stopPropagation();
    const { title, lesson, state, speciesList, container, lessonVideoState } = parseLessonElement(e, lessons);

    if(config.isLandscapeMode) {   
      if (state.revealSpeciesList) {
        lessonStateHandler.bindAction({ state: enums.lessonState.BEGIN_INTRO, lesson });
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
        const loadSpeciesCallback = () => onSpeciesListLoad(lesson.id, loadingMessage);
        lessonStateHandler.bindAction({ state: enums.lessonState.BEGIN_INTRO, lesson, container, loadSpeciesCallback, isInCarousel: false, requireSpecies: true });
      }
    }

    if(config.isPortraitMode) {
      renderLesson(lesson);
    }
  });
};

const onSpeciesListLoad = (lessonId, loadingMessage) => {
  loadingMessage.classList.add('hide');
  lessonListScrollHandler.scrollToTitle(lessonId);
};

export const lessonListHandler = {
  titleClickHandler,
  onSpeciesListLoad
}