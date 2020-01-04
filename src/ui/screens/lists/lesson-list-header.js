import lessonListHeaderTemplate from 'ui/screens/lists/lesson-list-header-template.html';

export const renderLessonListHeader = parent => {

    const header = document.createElement("div");
          header.innerHTML = lessonListHeaderTemplate;

    const sibling = document.querySelector('.lesson-list .scrollable');

    parent = document.querySelector('.lesson-list');
    parent.insertBefore(header, sibling);

    // const toggleElem = document.querySelector('.js-toggle-element');
    // const toggleCtrl = document.querySelector('.js-toggle-control');
          
    // toggleCtrl.addEventListener('click', e => {

    //     e.stopPropagation();

    //     const state = e.currentTarget.dataset.toggleState;
    //     switch(state) {
    //       case 'on': 
    //         toggleCtrl.dataset.toggleState = 'off';
    //         toggleElem.dataset.toggleState = 'off';
    //         break;
    //       case 'off':
    //         toggleCtrl.dataset.toggleState = 'on';
    //         toggleElem.dataset.toggleState = 'on';
    //         break;
    //     }
    // });
};