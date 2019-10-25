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

  export const scrollToTitle = lessonId => {
    setTimeout(() => {
      const standardBlock = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vhRow').replace('px', ''));
      const unit = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--vh').replace('px', ''));
      const rows = siblingsBefore(lessonId);
      const top = (standardBlock * rows) - unit;

      const scroll = document.querySelector('.lesson-list .scrollable');
      scroll.scrollTop = top;
    });
  };