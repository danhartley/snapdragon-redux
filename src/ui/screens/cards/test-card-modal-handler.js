import { lessonListScrollHandler } from 'ui/screens/lists/lesson-list-scroll-handler';
import { renderLessons } from 'ui/screens/lists/lesson-list';

const onCloseModal = () => {

    const modal = document.querySelector('#lessonModal');
    const closer = modal.querySelector('.js-modal-footer');
          closer.addEventListener('click', e => {
            const contents = modal.querySelector('.js-modal-text');
                  contents.innerHTML = `
                    <div class="lesson-spinner double-centred-block">
                        <div class="icon"><i class="fas fa-sun slow-spin"></i></div>
                    </div>
                  `;
            renderLessons();
            const activeLesson = document.querySelector('.highlighted-for-review-row');
            lessonListScrollHandler.scrollToTitle(activeLesson.dataset.lessonId);
          });

      // remove subscriptions? e.g. renderScoreSummary

};

export const lessonModalHandler = {
    onCloseModal
};