import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';

import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';
import { renderLesson } from 'ui/screens/lists/lesson';
import { renderCustomLesson } from 'ui/screens/lists/lesson-custom';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';

import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons, videoPlayer, score } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    let lessons = lessonListEventHandler.onLoadLessonsViewState(collections, videoPlayer, score);
        lessons = [ ...lessons.filter(l => l.hasVideo), ...lessons.filter(l => !l.hasVideo) ];

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
        parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

      lessons.forEach(lesson => renderLesson(lesson));

      renderLessonListHeader(parent);

      const createCustomLessonBtn = parent.querySelector('.js-create-custom-lesson');          
            createCustomLessonBtn.addEventListener('click', e => {
                  createGuideHandler(1);

                  // close all open lessons
                  const upChevrons = Array.from(document.querySelectorAll('.js-lesson-list-chevron .fa-chevron-up'));
                  lessonListEventHandler.hideOtherContentAndRevertChevrons(upChevrons, 0);

            });    

      const youtubeLessonIcons = document.querySelectorAll('.js-lesson-list-youtube');
            youtubeLessonIcons.forEach(youtube => lessonListEventHandler.onTitleClickHandler(youtube, lessons, config, true));

      const chevrons = document.querySelectorAll('.js-lesson-list-chevron');
            chevrons.forEach(chevron => lessonListEventHandler.onTitleClickHandler(chevron, lessons, config, false));

      const reviews = document.querySelectorAll('.js-lesson-review');
            reviews.forEach(reviewLink => lessonListEventHandler.onReviewClickHandler(reviewLink, lessons));

      const summaries = Array.from(document.querySelectorAll('.js-review-summary'));
            summaries.forEach(summary => renderScoreSummary(summary.dataset.lessonId));

      renderCustomLesson(lessons, savedLessons, videoPlayer, score, config);
};
