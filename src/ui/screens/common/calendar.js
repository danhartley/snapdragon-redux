import { renderTemplate } from 'ui/helpers/templating';
import calendarTemplate from 'ui/screens/common/calendar-template.html';

export const renderCalendar = (parent, item, config) => {

    const template = document.createElement('template');

    template.innerHTML = calendarTemplate;

    parent.innerHTML = '';


    const data = [
        [ 'J','F', 'M', 'A' ],
        [ 'M','J', 'J', 'A' ],
        [ 'S','O', 'N', 'D' ],
      ]

    renderTemplate({ data }, template.content, parent);
};