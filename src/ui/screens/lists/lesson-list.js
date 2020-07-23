import { enums } from 'ui/helpers/enum-helper';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { renderLessonListHeader } from 'ui/screens/lists/lesson-list-header';
import { renderLesson } from 'ui/screens/lists/lesson';
import { renderCustomLesson } from 'ui/screens/lists/lesson-custom';
import { onLoadLessonsViewState } from 'ui/screens/lists/lesson-list-event-handler';

import lessonListTemplate from 'ui/screens/lists/lesson-list-template.html';

export const renderLessons = () => {

    let { config, collections, videoPlayer } = store.getState();

    const template = document.createElement('template');
          template.innerHTML = lessonListTemplate;

    let lessons = onLoadLessonsViewState(collections.filter(collection => (collection.isActive === undefined || collection.isActive)), videoPlayer);

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
              import('ui/create-guide-modal/create-guide').then(module => {
                module.createGuideHandler(1);
              });
              import('ui/screens/lists/lesson-list-event-handler').then(module => {
                module.lessonListEventHandler.hideOtherContentAndRevertChevrons(0);
              });              
            });    

      const youtubeLessonIcons = document.querySelectorAll('.js-lesson-list-youtube');      
            youtubeLessonIcons.forEach(youtube => {
              import('ui/screens/lists/lesson-list-event-handler').then(module => {
                module.lessonListEventHandler.onLessonIconClickHandler(youtube, lessons, config, true);
              });
            });
      highlightActiveLessonHandler(youtubeLessonIcons);

      const chevrons = document.querySelectorAll('.js-lesson-list-chevron');
            chevrons.forEach(chevron => {
              import('ui/screens/lists/lesson-list-event-handler').then(module => {
                module.lessonListEventHandler.onLessonIconClickHandler(chevron, lessons, config, false);
              });              
            });
      highlightActiveLessonHandler(chevrons);

      const reviews = document.querySelectorAll('.js-review-link');
            reviews.forEach(reviewLink => {
              import('ui/screens/lists/lesson-list-event-handler').then(module => {
                module.lessonListEventHandler.onReviewClickHandler(reviewLink, config);
              });
            });
      highlightActiveLessonHandler(reviews);

      setTimeout(() => {      

            let terms = document.querySelectorAll('.js-terms-review-link');
                terms.forEach(term => {
                  term.addEventListener('click', e => {                         
                        const lesson = lessons.find(lesson => lesson.id === parseInt(term.dataset.lessonId));
                        if(lesson.terms) {
                              const { glossary } = store.getState();
                              setTimeout(() => {
                                    const { quickFire } = store.getState();
                                    if(quickFire && quickFire.lessonId === lesson.id) {
                                          import('ui/quick-fire-modal/quick-fire').then(module => {
                                            module.quickFireHandlers.questions(quickFire);
                                          });
                                    } else {
                                          import('ui/quick-fire-modal/quick-fire').then(module => {
                                            const quickFireState = { ...module.quickFireHandlers.init(glossary, enums.quickFireType.DEFINITION, lesson), linkFromLesson: true }
                                            module.quickFireHandlers.questions(quickFireState);
                                          });
                                    }
                              },150);
                        }
                });
            });
            highlightActiveLessonHandler(terms);

      },100);

      renderCustomLesson(lessons, videoPlayer, config);      
};

const highlightActiveLessonHandler = lessons => {
      lessons.forEach(lesson => lesson.addEventListener('click', e => {            
        import('ui/screens/lists/lesson-list-event-handler').then(module => {
          module.lessonListEventHandler.highlightActiveLesson(lesson.dataset.lessonId);
        });          
      }));
};
