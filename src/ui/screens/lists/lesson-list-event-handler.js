import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';
import { enums } from 'ui/helpers/enum-helper';
import { renderLessonIntro } from 'ui/screens/home/home-lesson-intro';
import { renderEditLesson } from 'ui/screens/lists/lesson-edit';
import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
import { videoHandler } from 'ui/screens/lists/video-handler';
import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';

const onLoadLessonViewState = (collection, videoPlayer, score, config) => {

  const taxa = collection.iconicTaxa ? collection.iconicTaxa.map(taxon => taxon.common).join(', ') : '';
  const isCurrentLessonPaused = (!!score && score.collectionId === collection.id);
  const isStoredLessonPaused = store.getState().lessons.find(lesson => lesson.collection.id === collection.id);
  const isPaused = isCurrentLessonPaused || isStoredLessonPaused;
  const isLessonComplete = store.getState().lesson.isLessonComplete;

  collection.taxa = taxa;
  collection.hasVideo = collection.video ? true : false;
  collection.showVideoIconClass = collection.hasVideo ? '' : 'hide-important';
  collection.videoState = videoHandler.setVideoState(videoPlayer || [], collection);


  const length = collection.species ? collection.species.length : collection.items.length;
  const plan = config.isLandscapeMode ? collection.lessonPlanLandscape : collection.lessonPlanPortrait;
  const shortReviews = [2,102];

  collection.reviewState = 
    isLessonComplete 
    ? `Lesson complete`
    : isPaused ? 'Resume Review' : 
      R.contains(plan, shortReviews)
        ? `${length} x 30 Second Reviews`
        : `${length} x 2 Minute Reviews`;

  collection.hasTermsClass = !!collection.terms ? '' : 'hide-important';
  collection.isCollectionEditableClass = !!collection.isPrivate ? 'underline-link' : '';

  return collection;  
};

const onLoadLessonsViewState = (collections, videoPlayer, score, config) => {
  return collections.map(collection => {
    return onLoadLessonViewState(collection, videoPlayer, score, config);
  });
};

const onClickViewState = (e, lessons) => {

  const icon = e.currentTarget;
  const isYoutubeIcon = elem.hasClass(icon, 'js-lesson-list-youtube');
  const row = icon.parentElement.parentElement;
  const lessonId = parseInt(icon.dataset.lessonId);
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  const reviewLink = document.querySelector(`.js-review-link[data-lesson-id="${lessonId}"]`);
  const upChevrons = Array.from(document.querySelectorAll('.js-lesson-list-chevron .fa-chevron-up'));

  // console.log('onclick view state icon: ', icon);

  const action =  isYoutubeIcon ? enums.userEvent.START_LESSON : enums.userEvent.TOGGLE_SPECIES_LIST;
  lessonStateHandler.recordUserAction(action);

  hideOtherContentAndRevertChevrons(upChevrons, lessonId);

  let reviewLinks = document.querySelectorAll('.js-review-link');
      reviewLinks.forEach(link => {
        const isPaused = store.getState().lessons.find(lesson => lesson.collection.id === parseInt(link.dataset.lessonId));
        if(isPaused) {
          link.innerHTML = 'Resume Review';
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

  // console.log('on click state: ', state);

  return { icon, lesson, state, speciesList, container, lessonVideoState, reviewLink, row, isYoutubeIcon };
};

const onLessonIconClickHandler = (icon, lessons, config, startLesson) => {
  
  return icon.addEventListener('click', async e => {      

    e.stopPropagation();

    const { icon, lesson, state, speciesList, container, lessonVideoState, row, isYoutubeIcon } = onClickViewState(e, lessons);

    const isItemActive = item => {
      if(item.hasOwnProperty('isActive')) {
        return item.isActive;
      } else {
        return true;
      }
    };

    lesson.items = lesson.items.filter(item => isItemActive(item));

    if(config.isLandscapeMode) {

      const lessonYoutubeIcons = document.querySelectorAll('.lesson-list-selected-lesson .youtube-icon');
            lessonYoutubeIcons.forEach(icon => icon.parentElement.classList.remove('youtube-green-fg'));

      if(icon.dataset.lessonIsYoutubeIcon) {
        icon.classList.add('youtube-green-fg');
      }

      let siblingChevron;

      if(state.requiresSpeciesList) {
        // console.log('state.requiresSpeciesList');
        await loadAndDisplaySpeciesList(icon, lesson, container);
      }

      if(startLesson) {
        renderLessonIntro(lesson);
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

      if(state.requiresSpeciesList) {
        await loadAndDisplaySpeciesList(icon, lesson, container);
      }

      renderLessonIntro(lesson);
      
      lessonStateHandler.renderLessonSpeciesList(lesson, DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable'));
    }

    row.classList.add('lesson-list-selected-lesson');
  });
};

const onLessonTitleClickHandler = (title, lessons) => {
    title.addEventListener('click', e => {
          const lesson = lessons.find(lesson => lesson.id === parseInt(title.dataset.lessonId));
          renderEditLesson(lesson);
    });
};

const onReviewClickHandler = reviewLink => {    

  reviewLink.addEventListener('click', async e => {

    lessonStateHandler.recordUserAction(enums.userEvent.START_LESSON_REVIEW);

    const loadingMessage = reviewLink.nextElementSibling
          loadingMessage.classList.remove('hide');

          setTimeout(() => {
            loadingMessage.classList.add('hide');
          }, 10000);

    const { lesson } = store.getState();

    lessonStateHandler.beginOrResumeLesson(reviewLink.dataset.lessonId, lesson.isNextRound);
  });
};

const hideOtherContentAndRevertChevrons = (upChevrons, selectedLessonId) => {

  upChevrons.forEach(chevron => {
    
    const chevronLessonId = parseInt(chevron.dataset.lessonId);
    
    if (chevronLessonId !== selectedLessonId) {
      chevron.classList.remove('fa-chevron-up');
      chevron.classList.add('fa-chevron-down');
      const speciesTableToHide = document.getElementById(`species_list_id_${chevronLessonId}`);
      speciesTableToHide.classList.add('hide');
    }
  });
};

const loadAndDisplaySpeciesList = async(icon, lesson, container) => {

  Array.from(icon.parentElement.children).forEach(child => child.dataset.selected = true);

  const loadingMessage = icon.parentElement.parentElement.parentElement.querySelector('.js-loading-message');
        loadingMessage.classList.remove('hide');

  await lessonStateHandler.renderLessonSpeciesList(lesson, container);
  
        loadingMessage.classList.add('hide');
  
        lessonListScrollHandler.scrollToTitle(lesson.id);
};

export const lessonListEventHandler = {
  onLoadLessonViewState,
  onLoadLessonsViewState,
  onLessonIconClickHandler,
  onReviewClickHandler,
  onLessonTitleClickHandler,
  hideOtherContentAndRevertChevrons
};