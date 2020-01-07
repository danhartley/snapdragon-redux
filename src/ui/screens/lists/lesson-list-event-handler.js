import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';

import { renderLesson } from 'ui/screens/home/home-lesson-intro';

import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

const onLoadLessonViewState = (collection, videoPlayer, score) => {

  const taxa = collection.iconicTaxa ? collection.iconicTaxa.map(taxon => taxon.common).join(', ') : '';
  const isPaused = (!!score && score.collectionId === collection.id) || store.getState().lessons.find(lesson => lesson.collection.id === collection.id);

  collection.taxa = taxa;
  collection.hasVideo = collection.video ? true : false;
  collection.showVideoIconClass = collection.hasVideo ? '' : 'hide-important';
  collection.videoState = videoHandler.setVideoState(videoPlayer || [], collection);
  collection.reviewState = isPaused ? 'Resume Review' : 
      collection.species 
        ? `${collection.species.length} x 2 Minute Reviews`
        : `${collection.items.length} x 2 Minute Reviews`;

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

  const icon = e.currentTarget;
  const row = icon.parentElement.parentElement;
  const lessonId = parseInt(icon.dataset.lessonId);
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  const reviewLink = document.querySelector(`.js-lesson-review[data-review-link="${lessonId}"]`);
  const upChevrons = Array.from(document.querySelectorAll('.js-lesson-list-chevron .fa-chevron-up'));

  hideOtherContentAndRevertChevrons(upChevrons, lessonId);

  let reviewLinks = document.querySelectorAll('.js-lesson-review');
      reviewLinks.forEach(link => {
        const isPaused = store.getState().lessons.find(lesson => lesson.collection.id === parseInt(link.dataset.lessonId));
        if(isPaused) {
          link.querySelector('.underline-link').innerHTML = 'Resume Review';
        }
      });

  const isSpeciesListAvailable = !!speciesList;
  const isSpeciesListHidden = elem.hasClass(speciesList, 'hide');

  const lessonVideoState = document.querySelector(`.js-lesson-video-state[data-lesson-id="${lessonId}"]`);
  const iconIsChevron = !icon.dataset.lessonIsYoutubeIcon;

  const state = {
    requiresSpeciesList: !isSpeciesListAvailable,
    revealSpeciesList: isSpeciesListAvailable && isSpeciesListHidden,
    hideSpeciesList: isSpeciesListAvailable && !isSpeciesListHidden && iconIsChevron
  };

  const isYoutubeIcon = elem.hasClass(icon, 'js-lesson-list-youtube');

  return { icon, lesson, state, speciesList, container, lessonVideoState, reviewLink, row, isYoutubeIcon };
};

const onTitleClickHandler = (icon, lessons, config, startLesson) => {
  
  return icon.addEventListener('click', async e => {    

    const { icon, lesson, state, speciesList, container, lessonVideoState, row, isYoutubeIcon } = onTitleClickViewState(e, lessons);

    if(config.isLandscapeMode) {

      const lessonYoutubeIcons = document.querySelectorAll('.lesson-list-selected-lesson .youtube-icon');
            lessonYoutubeIcons.forEach(icon => icon.parentElement.classList.remove('youtube-green-fg'));

      if(icon.dataset.lessonIsYoutubeIcon) {
        icon.classList.add('youtube-green-fg');
      }

      let siblingChevron;

      if(state.requiresSpeciesList) {
        await loadAndDisplaySpeciesList(icon, lesson, container);
      }

      if(startLesson) {
        renderLesson(lesson);
        siblingChevron = icon.parentElement.parentElement.parentElement.children[1].children[0].children[1];
        if(isYoutubeIcon) {
          if(state.hideSpeciesList) {
            siblingChevron.innerHTML = `<i class="fas fa-chevron-down" data-lesson-id="${lesson.id}"></i>`;
          } else if(!state.revealSpeciesList) {
            siblingChevron.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
          }
        }
      } else {
        if(!isYoutubeIcon) {
          if(state.hideSpeciesList) {
            icon.innerHTML = `<i class="fas fa-chevron-down" data-lesson-id="${lesson.id}"></i>`;
          } else if(!state.revealSpeciesList) {
            icon.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
          }
        }
      }

      if(state.revealSpeciesList) {        
        speciesList.classList.remove('hide');
        if(!isYoutubeIcon) {
          icon.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
        }
      }
      if(state.hideSpeciesList) {
        speciesList.classList.add('hide');
        lessonVideoState.innerHTML = videoHandler.setVideoState(store.getState().videoPlayer || [], lesson);
      }
    }

    if(config.isPortraitMode) {

      renderLesson(lesson);
      
      lessonStateHandler.renderLessonSpeciesList(lesson, DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable'));
    }

    row.classList.add('lesson-list-selected-lesson');
  });
};

const onReviewClickHandler = (reviewLink, lessons) => {    

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

function hideOtherContentAndRevertChevrons(upChevrons, selectedLessonId) {

  upChevrons.forEach(chevron => {
    
    const chevronLessonId = parseInt(chevron.dataset.lessonId);
    
    if (chevronLessonId !== selectedLessonId) {
      chevron.classList.remove('fa-chevron-up');
      chevron.classList.add('fa-chevron-down');
      const speciesTableToHide = document.getElementById(`species_list_id_${chevronLessonId}`);
      speciesTableToHide.classList.add('hide');
    }
  });
}

async function loadAndDisplaySpeciesList(icon, lesson, container) {
  // icon.dataset.selected = true;

  Array.from(icon.parentElement.children).forEach(child => child.dataset.selected = true);

  const loadingMessage = icon.parentElement.parentElement.parentElement.querySelector('.js-loading-message');
  loadingMessage.classList.remove('hide');
  await lessonStateHandler.renderLessonSpeciesList(lesson, container);
  loadingMessage.classList.add('hide');
  lessonListScrollHandler.scrollToTitle(lesson.id);
}
