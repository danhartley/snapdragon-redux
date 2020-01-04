import lessonListHeaderTemplate from 'ui/screens/lists/lesson-list-header-template.html';

export const renderLessonListHeader = parent => {

    const header = document.createElement("div");
          header.innerHTML = lessonListHeaderTemplate;

    const sibling = document.querySelector('.lesson-list .scrollable');

    parent = document.querySelector('.lesson-list');
    parent.insertBefore(header, sibling);
};