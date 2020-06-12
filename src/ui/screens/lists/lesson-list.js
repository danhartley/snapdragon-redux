import { enums } from 'ui/helpers/enum-helper';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { createGuideHandler } from 'ui/create-guide-modal/create-guide';
import { quickFireHandlers } from 'ui/quick-fire-modal/quick-fire';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { renderLesson } from 'ui/screens/lists/lesson';
import { renderCustomLesson } from 'ui/screens/lists/lesson-custom';
import { lessonListEventHandler } from 'ui/screens/lists/lesson-list-event-handler';

import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, lessons: savedLessons, videoPlayer, score } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    let lessons = lessonListEventHandler.onLoadLessonsViewState(collections.filter(collection => (collection.isActive === undefined || collection.isActive)), videoPlayer, score, config);
        lessons = lessons.sort(function(a,b){
              const tsa = a.create ? a.create.seconds : 0;
              const tsb = b.create ? b.create.seconds : 0;
            return tsb - tsa;
        });

    let parent = config.isPortraitMode ? DOM.rightBody : DOM.leftBody;
        parent.innerHTML = '';

    renderTemplate({}, template.content, parent);

      lessons.forEach(lesson => renderLesson(lesson));

      renderLessonListHeader(parent);

      const createCustomLessonBtn = parent.querySelector('.js-create-custom-lesson');          
            createCustomLessonBtn.addEventListener('click', e => {
                  createGuideHandler(1);
                  lessonListEventHandler.hideOtherContentAndRevertChevrons(0);
            });    

      const lessonTitles = document.querySelectorAll('.js-lesson-title');
            lessonTitles.forEach(title => lessonListEventHandler.onLessonTitleClickHandler(title, lessons));

      const youtubeLessonIcons = document.querySelectorAll('.js-lesson-list-youtube');
            youtubeLessonIcons.forEach(youtube => lessonListEventHandler.onLessonIconClickHandler(youtube, lessons, config, true));
      highlightActiveLesson(youtubeLessonIcons);

      const chevrons = document.querySelectorAll('.js-lesson-list-chevron');
            chevrons.forEach(chevron => lessonListEventHandler.onLessonIconClickHandler(chevron, lessons, config, false));
      highlightActiveLesson(chevrons);

      const reviews = document.querySelectorAll('.js-review-link');
            reviews.forEach(reviewLink => lessonListEventHandler.onReviewClickHandler(reviewLink));
      highlightActiveLesson(reviews);

      setTimeout(() => {      

            let terms = document.querySelectorAll('.js-terms-review-link');
                terms.forEach(term => {
                  let termsReviewLink = term.querySelector('button');
                  termsReviewLink.addEventListener('click', e => {                         
                        const lesson = lessons.find(lesson => lesson.id === parseInt(termsReviewLink.dataset.lessonId));
                        if(lesson.terms) {
                              const { glossary } = store.getState();
                              setTimeout(() => {
                                    const { quickFire } = store.getState();
                                    if(quickFire && quickFire.lessonId === lesson.id) {
                                          quickFireHandlers.questions(quickFire);
                                    } else {
                                          quickFireHandlers.questions({ ...quickFireHandlers.init(glossary, enums.quickFireType.DEFINITION, lesson), linkFromLesson: true });
                                    }
                              },150);
                        }
                });
            });
            highlightActiveLesson(terms);

      },100);

      renderCustomLesson(lessons, savedLessons, videoPlayer, score, config);      
};

const highlightActiveLesson = lessons => {
      lessons.forEach(lesson => lesson.addEventListener('click', e => {
            
            const rows = document.querySelectorAll('.js-lesson-list-carousel-item');
                  rows.forEach(row => row.classList.remove('highlighted-for-review-row'));
            const row = document.querySelector(`.js-lesson-list-carousel-item[data-lesson-id="${lesson.dataset.lessonId}"]`);
            if (row)
                  row.classList.add('highlighted-for-review-row');

            // lessonListScrollHandler.scrollToTitle(lesson.dataset.lessonId);
      }));
};

