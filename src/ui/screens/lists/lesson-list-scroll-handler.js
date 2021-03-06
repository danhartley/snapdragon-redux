const siblingsBefore = lessonId => {
        
    let siblings = document.querySelectorAll('.js-lesson-list-item:not(.hide-important)');
    let sibling = siblings[0];
    let index = 0;

    const before = [];
    
    while(sibling) {
      index++;
      if(parseInt(sibling.dataset.lessonId) !== lessonId) {
        before.push(sibling);
        sibling = siblings[index];
      } else {
        sibling = null;
      }
    }

    return before.length;
  };

const scrollToTitle = lessonId => {
  setTimeout(() => {
    const standardBlock = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vhRow').replace('px', ''));
    const rows = siblingsBefore(lessonId);
    const top = standardBlock * (rows);

    const scroll = document.querySelector('.lesson-list .scrollable');
    if(scroll) scroll.scrollTop = top;
  });
};

export const lessonListScrollHandler = {
  scrollToTitle
}