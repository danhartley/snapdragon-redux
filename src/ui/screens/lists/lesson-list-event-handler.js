import { isEmpty } from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { utils } from 'utils/utils';
import { enums } from 'ui/helpers/enum-helper';
import { renderLessonIntro } from 'ui/screens/home/home-lesson-intro';
import { renderEditLesson } from 'ui/screens/lists/lesson-edit';
import { videoHandler } from 'ui/screens/lists/video-handler';

export const onLoadLessonViewState = (collection, videoPlayer) => {

  const taxa = collection.iconicTaxa ? collection.iconicTaxa.map(taxon => taxon.common).join(', ') : '';

  collection.taxa = taxa;
  collection.hasVideo = collection.hasVideo || collection.video && !isEmpty(collection.video) ? true : false;
  collection.showVideoIconClass = collection.hasVideo ? '' : 'hide-important';
  collection.videoState = videoHandler.setVideoState(videoPlayer || [], collection);
  collection.reviewState = 'Lesson quiz';

  collection.hasTermsClass = collection.terms && Array.isArray(collection.terms) && collection.terms.length > 0 ? '' : 'hide-important';
  collection.isCollectionEditableClass = '';

  return collection;  
};

export const onLoadLessonsViewState = (collections, videoPlayer) => {
  return collections.map(collection => {
    return onLoadLessonViewState(collection, videoPlayer);
  });
};

const onClickViewState = (e, lessons) => {

  const icon = e.currentTarget;
  const isYoutubeIcon = utils.hasClass(icon, 'js-lesson-list-youtube');
  const isChevronIcon = utils.hasClass(icon, 'js-lesson-list-chevron');
  const row = icon.parentElement.parentElement;
  const lessonId = parseInt(icon.dataset.lessonId);
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  const reviewLink = document.querySelector(`.js-review-link[data-lesson-id="${lessonId}"]`);

  // snapLog('onClickViewState', {});

  hideOtherContentAndRevertChevrons(lessonId);

  const isSpeciesListAvailable = !!speciesList;
  const isSpeciesListHidden = utils.hasClass(speciesList, 'hide');

  const lessonVideoState = document.querySelector(`.js-lesson-video-state[data-lesson-id="${lessonId}"]`);
  const iconIsChevron = !icon.dataset.lessonIsYoutubeIcon;

  const state = {
    requiresSpeciesList: !isSpeciesListAvailable,
    revealSpeciesList: isSpeciesListAvailable && isSpeciesListHidden,
    hideSpeciesList: isSpeciesListAvailable && !isSpeciesListHidden && iconIsChevron
  };

  return { icon, lesson, state, speciesList, container, lessonVideoState, reviewLink, row, isYoutubeIcon };
};

const onLessonIconClickHandler = (icon, lessons, config, startLesson) => {
  
  return icon.addEventListener('click', async e => {      

    const { icon, lesson, state, speciesList, container, lessonVideoState, row, isYoutubeIcon } = onClickViewState(e, lessons);

    // snapLog('onLessonIconClickHandler', {});

    const isItemActive = item => {
      if(item.hasOwnProperty('isActive')) {
        return item.isActive;
      } else {
        return true;
      }
    };

    lesson.items = lesson.items.filter(item => isItemActive(item));

    const lessonYoutubeIcons = document.querySelectorAll('.lesson-list-selected-lesson .youtube-icon');
          lessonYoutubeIcons.forEach(icon => icon.parentElement.classList.remove('youtube-green-fg'));

    if(icon.dataset.lessonIsYoutubeIcon) {
      icon.classList.add('youtube-green-fg');
      const chevron = document.querySelector(`.js-lesson-list-chevron[data-lesson-id="${icon.dataset.lessonId}"]`);
            chevron.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
    }

    let siblingChevron;

    if(startLesson) {
      renderLessonIntro(lesson);
      siblingChevron = icon.parentElement.parentElement.parentElement.children[1].children[0].children[1];
      if(isYoutubeIcon) {
        await import('ui/screens/lists/lesson-state-handler').then(module => {
          module.lessonStateHandler.recordUserAction(isYoutubeIcon ? enums.userEvent.PLAY_LESSON_VIDEO : enums.userEvent.TOGGLE_SPECIES_LIST);
        });
        if(state.hideSpeciesList) {
          siblingChevron.innerHTML = `<i class="fas fa-chevron-down" data-lesson-id="${lesson.id}"></i>`;
        }
      }
    } else {
      if(!isYoutubeIcon) {
        if(state.hideSpeciesList) {
          icon.innerHTML = `<i class="fas fa-chevron-down" data-lesson-id="${lesson.id}"></i>`;
        } else if(!state.revealSpeciesList) {
          icon.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
        }
        // load intro text
        if(config.isLandscapeMode) {
          renderLessonIntro(lesson, true);
          await import('ui/screens/lists/lesson-state-handler').then(module => {
            module.lessonStateHandler.recordUserAction(enums.userEvent.TOGGLE_SPECIES_LIST);
          });
          // load intro text
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

    if(state.requiresSpeciesList) {
      await loadAndDisplaySpeciesList(config, icon, lesson, (config.isPortraitMode && isYoutubeIcon) ? DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable') : container, isYoutubeIcon);
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

const onReviewClickHandler = (reviewLink, config) => {    

  const reviewLinkHandler = async e => {

    const spinner = document.querySelector(`.review-spinner[data-lesson-id="${reviewLink.dataset.lessonId}"]`);
    if(spinner) spinner.classList.remove('hide');
    setTimeout(() => {
      if(spinner) spinner.classList.add('hide');
    }, config.isPortraitMode ? 5000 : 2500);

    import('ui/screens/lists/lesson-state-handler').then(module => {
      module.lessonStateHandler.recordUserAction(enums.userEvent.START_LESSON_REVIEW);
      module.lessonStateHandler.changeRequest({        
        requestType: enums.lessonState.BEGIN_OR_RESUME_LESSON,
        requestArgs: {
          id: reviewLink.dataset.lessonId
        }
      });
    });
  }

  reviewLink.addEventListener('click', reviewLinkHandler);
};

const hideOtherContentAndRevertChevrons = selectedLessonId => {

  const upChevrons = Array.from(document.querySelectorAll('.js-lesson-list-chevron .fa-chevron-up'));

  upChevrons.forEach(chevron => {
    
    const chevronLessonId = parseInt(chevron.dataset.lessonId);

    if(chevronLessonId !== selectedLessonId) {
      
      chevron.parentElement.click();
        
      const lesson = document.querySelector(`.js-lesson-list-carousel-item[data-lesson-id="${chevronLessonId}"]`);
            lesson.classList.remove('highlighted-for-review-row');
    }
  });
};

const loadAndDisplaySpeciesList = async(config, icon, lesson, container, isYoutubeIcon) => {

  Array.from(icon.parentElement.children).forEach(child => child.dataset.selected = true);

  await import('ui/screens/lists/lesson-state-handler').then(module => {
    module.lessonStateHandler.changeRequest({
      requestType: enums.lessonState.RENDER_SPECIES_LIST,
      requestArgs: { lesson, container }
    });
  });

  // if(config.isPortraitMode) lessonListScrollHandler.scrollToTitle(lesson.id);
};

const highlightActiveLesson = lessonId => {
  const rows = document.querySelectorAll('.js-lesson-list-carousel-item');
  rows.forEach(row => row.classList.remove('highlighted-for-review-row'));
  const row = document.querySelector(`.js-lesson-list-carousel-item[data-lesson-id="${lessonId}"]`);
  if (row)
    row.classList.add('highlighted-for-review-row');
  // lessonListScrollHandler.scrollToTitle(lesson.dataset.lessonId);
};

export const lessonListEventHandler = {
  onLoadLessonViewState,
  onLoadLessonsViewState,
  onLessonIconClickHandler,
  onReviewClickHandler,
  onLessonTitleClickHandler,
  hideOtherContentAndRevertChevrons,
  highlightActiveLesson
};