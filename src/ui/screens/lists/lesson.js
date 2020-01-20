import { renderTemplate } from 'ui/helpers/templating';

import lessonTemplate from 'ui/screens/lists/lesson-template.html';

export const renderLesson = (lesson, config, savedLessons, layout) => {

    const template = document.createElement('template');
          template.innerHTML = lessonTemplate;

    lesson.hideVideoClass = lesson.hasVideo ? '' : 'hide-important';

    const savedLesson = savedLessons.find(saved => saved.collection.id === lesson.id);

    lesson.isPaused = !!savedLesson || config.collection.id === lesson.id;

    renderTemplate({ lesson }, template.content, document.querySelector('.js-lesson-container'));

    if(!lesson.hasVideo) {
          const chevron = document.querySelector(`div.js-lesson-list-chevron[data-lesson-id="${lesson.id}"]`);
                chevron.classList.remove('landscape');                                  
    }

    if(lesson.isPaused) {

          const savedLesson = savedLessons.find(saved => saved.collection.id === lesson.id);

          if(savedLesson && savedLesson.layout) {

                const progressBar = document.querySelector(`div.js-lesson-review[data-lesson-id="${lesson.id}"]  progress`);
                      progressBar.classList.remove('hide');
                      progressBar.max = savedLesson.layout.roundScoreCount;
                      progressBar.value = savedLesson.layout.roundProgressIndex || progressBar.value;
          }

          if(config.collection.id === lesson.id) {

                // current lesson

                if(layout && layout.roundScoreCount) {
                      const progressBar = document.querySelector(`div.js-lesson-review[data-lesson-id="${lesson.id}"] progress`);
                            progressBar.parentElement.classList.remove('hide');
                            progressBar.max = layout.roundScoreCount;
                            progressBar.value = layout.roundProgressIndex || progressBar.value;
                      const tasksIcon = document.querySelector(`div.js-lesson-review[data-lesson-id="${lesson.id}"] i`);
                            tasksIcon.classList.add('progress-icon');
                }

                const row = document.querySelector(`.lesson-list-carousel-item[data-lesson-id="${lesson.id}"]`)
                      row.classList.add('review-summary');
          }
    }
}; 