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

  collection.taxa = taxa;
  collection.hasVideo = collection.video ? true : false;
  collection.showVideoIconClass = collection.hasVideo ? '' : 'hide-important';
  collection.videoState = videoHandler.setVideoState(videoPlayer || [], collection);
  collection.reviewState = 'Quiz';

  collection.hasTermsClass = !!collection.terms ? '' : 'hide-important';
  collection.isCollectionEditableClass = '';

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
  const isChevronIcon = elem.hasClass(icon, 'js-lesson-list-chevron');
  const row = icon.parentElement.parentElement;
  const lessonId = parseInt(icon.dataset.lessonId);
  const lesson = lessons.find(l => l.id === lessonId);
  const container = document.querySelector(`.js-species-container[data-container-id="${lessonId}"]`);
  const speciesList = document.querySelector(`#species_list_id_${lessonId}`);
  const reviewLink = document.querySelector(`.js-review-link[data-lesson-id="${lessonId}"]`);

  let action = isYoutubeIcon ? enums.userEvent.START_LESSON : isChevronIcon ? enums.userEvent.TOGGLE_SPECIES_LIST : enums.userEvent.DEFAULT;
  lessonStateHandler.recordUserAction(action);

  hideOtherContentAndRevertChevrons(lessonId);

  const isSpeciesListAvailable = !!speciesList;
  const isSpeciesListHidden = elem.hasClass(speciesList, 'hide');

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
        const chevron = document.querySelector(`div.js-lesson-list-chevron[data-lesson-id="${icon.dataset.lessonId}"]`);
              chevron.innerHTML = `<i class="fas fa-chevron-up" data-lesson-id="${lesson.id}"></i>`;
      }

      let siblingChevron;

      if(state.requiresSpeciesList) {
        await loadAndDisplaySpeciesList(icon, lesson, container);
      }

      if(startLesson) {
        renderLessonIntro(lesson);
        siblingChevron = icon.parentElement.parentElement.parentElement.children[1].children[0].children[1];
        if(isYoutubeIcon) {
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
      
      lessonStateHandler.changeRequest({
        requestType: enums.lessonState.RENDER_SPECIES_LIST,
        requestArgs: { lesson, container: DOM.rightBody.querySelector('.js-home-scrolling-container .scrollable') }
      });
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

    const lessonId = reviewLink.dataset.lessonId;
    const loadingMessage = document.querySelector(`.js-loading-review-message[data-lesson-id="${lessonId}"]`);
          loadingMessage.classList.remove('hide');

          setTimeout(() => {
            loadingMessage.classList.add('hide');
          }, 2000);

    const { lesson } = store.getState();

    lessonStateHandler.changeRequest({
      requestType: enums.lessonState.BEGIN_OR_RESUME_LESSON,
      requestArgs: {
        id: reviewLink.dataset.lessonId
      }
    });
  });
};

const hideOtherContentAndRevertChevrons = selectedLessonId => {

  const upChevrons = Array.from(document.querySelectorAll('.js-lesson-list-chevron .fa-chevron-up'));

  upChevrons.forEach(chevron => {
    
    const chevronLessonId = parseInt(chevron.dataset.lessonId);

    if(chevronLessonId !== selectedLessonId) {
      
      chevron.click();
        
      const lesson = document.querySelector(`div.js-lesson-list-carousel-item[data-lesson-id="${chevronLessonId}"]`);
            lesson.classList.remove('highlighted-for-review-row');
    }
  });
};

const loadAndDisplaySpeciesList = async(icon, lesson, container) => {

  Array.from(icon.parentElement.children).forEach(child => child.dataset.selected = true);

  if(userAction && userAction.name === enums.userEvent.START_LESSON.name) { return; }

  const { userAction, config } = store.getState();

  await lessonStateHandler.changeRequest({
    requestType: enums.lessonState.RENDER_SPECIES_LIST,
    requestArgs: { lesson, container }
  });

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