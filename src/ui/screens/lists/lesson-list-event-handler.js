import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';

import { renderLesson } from 'ui/screens/home/home-lesson-intro';

import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

const onLoadLessonViewState = (collection, videoPlayer, score) => {

  const savedState = collection.isPaused ? '(lesson paused)' : '';
  const taxa = collection.iconicTaxa ? collection.iconicTaxa.map(taxon => taxon.common).join(', ') : '';
  const isPaused = (!!score && score.collectionId === collection.id) || store.getState().lessons.find(lesson => lesson.collection.id === collection.id);

  collection.taxa = taxa;
  collection.savedState = savedState;
  collection.hasVideo = collection.video ? true : false;
  collection.showVideoIconClass = collection.hasVideo ? '' : 'hide-important';
  collection.videoState = videoHandler.setVideoState(videoPlayer || [], collection);
  collection.reviewState = isPaused ? 'Resume Review' : 'Lesson Review';

  return collection;  
};

const onLoadLessonsViewState = (savedLessons, collections, videoPlayer, score) => {

  const savedLessonNames = savedLessons.map(collection => collection.name);

  return collections.map(collection => {
    collection.isPaused = R.contains(collection.name, savedLessonNames);
    return onLoadLessonViewState(collection, videoPlayer, score);
  });
};

const onTitleClickViewState = (e, lessons) => {

  const title = e.currentTarget;
  const row = title.parentElement.parentElement;
  const lessonId = parseInt(title.dataset.lessonId);
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  const reviewLink = document.querySelector(`.js-lesson-review[data-review-link="${lessonId}"]`);

  // alternative to this manipulation is to reload the list

  let otherSpecies = Array.from(document.querySelectorAll('.js-species-container'));
      otherSpecies = otherSpecies.filter(container => container.id !== `container_${lessonId}`);
      otherSpecies.forEach(container => container.innerHTML = '');

  let rows = document.querySelectorAll('.js-lesson-list-item');
      rows.forEach(row => {
        const isPaused = store.getState().lessons.find(lesson => lesson.collection.id === parseInt(row.dataset.lessonId));
        row.classList.remove('lesson-list-selected-lesson');
        const speciesVideoState = row.querySelector('.js-lesson-saved-state');
        if(speciesVideoState) speciesVideoState.innerHTML = !!isPaused ? '(lesson paused)' : '';
      });

  let reviewLinks = document.querySelectorAll('.js-lesson-review');
      reviewLinks.forEach(link => {
        const isPaused = store.getState().lessons.find(lesson => lesson.collection.id === parseInt(link.dataset.lessonId));
        if(isPaused) {
          link.querySelector('.underline-link').innerHTML = 'Resume Review';
        }
      });

  const isSpeciesListAvailable = !!title.dataset.selected && !!speciesList; 
  const isSpeciesListHidden = elem.hasClass(speciesList, 'hide');

  const lessonVideoState = document.querySelector(`.js-lesson-video-state[data-lesson-id="${lessonId}"]`);

  const state = {
    requiresSpeciesList: !isSpeciesListAvailable,
    revealSpeciesList: isSpeciesListAvailable && isSpeciesListHidden,
    hideSpeciesList: isSpeciesListAvailable && !isSpeciesListHidden
  };

  return { title, lesson, state, speciesList, container, lessonVideoState, reviewLink, row };
};

const onTitleClickHandler = (title, lessons, config, startLesson) => {
  
  return title.addEventListener('click', async e => {
    
    e.stopPropagation();

    const { title, lesson, state, speciesList, container, lessonVideoState, row } = onTitleClickViewState(e, lessons);

    if(config.isLandscapeMode) {

      const lessonYoutubeIcons = document.querySelectorAll('.lesson-list-selected-lesson .youtube-icon');
            lessonYoutubeIcons.forEach(icon => icon.classList.remove('youtube-green-fg'));

      if(title.dataset.lessonIsYoutubeIcon) {
        title.classList.add('youtube-green-fg');
      }

      let siblingChevron;

      if(startLesson) {
        renderLesson(lesson);
        // siblingChevron = title.parentElement.parentElement.parentElement.children[1];
        siblingChevron = title.parentElement.parentElement.parentElement.children[1].children[0].children[1];
        if(state.hideSpeciesList) {
          siblingChevron.innerHTML = `<i class="fas fa-chevron-down" data-lesson-id="${lesson.id}"></i>`;
        } else if(!state.revealSpeciesList) {
          siblingChevron.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
        }
      } else {
        if(state.hideSpeciesList) {
          title.innerHTML = `<i class="fas fa-chevron-down" data-lesson-id="${lesson.id}"></i>`;
        } else if(!state.revealSpeciesList) {
          title.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
        }
      }

      if(state.revealSpeciesList) {        
        speciesList.classList.remove('hide');
      }
      if(state.hideSpeciesList) {
        speciesList.classList.add('hide');
        lessonVideoState.innerHTML = videoHandler.setVideoState(store.getState().videoPlayer || [], lesson);
      }
      if(state.requiresSpeciesList) {

        title.dataset.selected = true;
        
        // const loadingMessage = title.parentElement.querySelector('.js-loading-message');
        const loadingMessage = title.parentElement.parentElement.parentElement.querySelector('.js-loading-message');
              
              loadingMessage.classList.remove('hide');

        await lessonStateHandler.renderLessonSpeciesList(lesson, container);

              loadingMessage.classList.add('hide');
        
        lessonListScrollHandler.scrollToTitle(lesson.id);
      }      
    }

    if(config.isPortraitMode) {

      renderLesson(lesson);
      
      lessonStateHandler.renderLessonSpeciesList(lesson, DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable'));
    }

    row.classList.add('lesson-list-selected-lesson');
  });
};

const onReviewClickHandler = reviewLink => {    

  reviewLink.addEventListener('click', async e => {

    e.stopPropagation();

    const loadingMessage = reviewLink.parentElement.querySelector('.js-loading-message');
              
          loadingMessage.classList.remove('hide');
          setTimeout(() => {
            loadingMessage.classList.add('hide');
          }, 3000);

    lessonStateHandler.beginOrResumeLesson(parseInt(reviewLink.dataset.lessonId));          
  });
};

export const lessonListEventHandler = {
  onLoadLessonViewState,
  onLoadLessonsViewState,
  onTitleClickHandler,
  onReviewClickHandler
}