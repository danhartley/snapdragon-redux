import * as R from 'ramda';

import { store } from 'redux/store';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonPlans } from 'snapdragon/lesson-plans';
import lessonPlansTableTemplate from 'ui/screens/lists/lesson-plans-table-template.html';
import lessonPlansTemplate from 'ui/screens/lists/lesson-plans-template.html';

export const renderLessonPlans = (planId) => {

    const { config } = store.getState();

    const template = document.createElement('template');
    template.innerHTML = lessonPlansTableTemplate;

    const parent = document.querySelector('#listModal .js-modal-body');

    parent.innerHTML = ''

    renderTemplate({},template.content, parent);

    document.querySelector('#listModal .js-modal-text-title').innerHTML = 'Lesson plan';

    const lesson = lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode);
    
    const levelLayouts = lesson.levels.map(level => level.layouts);

    levelLayouts.forEach((layouts, index) => {

        const parent = document.querySelector('#listModal .js-lesson-plans');

        const level = `<tr class="table-row level${index + 1}"><td>Level ${index + 1}</td></tr>`;

        parent.innerHTML += level;

        layouts.forEach(layout => {

            const template = document.createElement('template');
            template.innerHTML = lessonPlansTemplate;
            
            renderTemplate({ layout },template.content, parent);       
            
            document.querySelectorAll('.lp-kind').forEach(kind => {
                switch(kind.innerHTML) {
                    case 'S':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-chalkboard"></i></i></span>`;
                        break;
                    case 'MC':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-check-circle"></i></span>`;
                        break;
                    case 'T':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-edit"></i></span>`;
                        break;
                    default:
                }
            });
        });
    });
    
};