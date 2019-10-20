import lessonListHeaderTemplate from 'ui/screens/lists/lesson-list-header-template.html';

export const renderLessonListHeader = parent => {

    const header = document.createElement("div");
          header.innerHTML = lessonListHeaderTemplate;

    parent = document.querySelector('.lesson-list .scrollable');
    parent.prepend(header);

    const toggleElem = document.querySelector('.js-toggle-element');
    const toggleCtrl = document.querySelector('.js-toggle-control');
          toggleCtrl.addEventListener('click', e => {

            toggleVideoFilterInputState();

            e.stopPropagation();

            const state = e.currentTarget.dataset.toggleState;
            switch(state) {
              case 'on': 
                toggleCtrl.dataset.toggleState = 'off';
                toggleElem.dataset.toggleState = 'off';
                break;
              case 'off':
                toggleCtrl.dataset.toggleState = 'on';
                toggleElem.dataset.toggleState = 'on';
                break;
            }
          });

    const videoFilter = document.querySelector('.js-filter-by-video');
          videoFilter.addEventListener('click', e => {
            const lessonsWithoutVideo = document.querySelectorAll('div[data-has-video="false"]');
            const checked = e.currentTarget.children[0].checked;
            checked 
              ? lessonsWithoutVideo.forEach(lesson => lesson.classList.remove('hide-important'))
              : lessonsWithoutVideo.forEach(lesson => lesson.classList.add('hide-important'));
          });
          videoFilter.click();
};


const toggleVideoFilterInputState = () => {
    const input = document.querySelector('#chkVideo');
    if(input.hasAttribute('disabled')) {
      input.removeAttribute('disabled');
    } else {
      input.setAttribute('disabled', 'disabled');
    }
  };