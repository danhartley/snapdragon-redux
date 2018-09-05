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

        const levelId = index + 1;

        const level = `<tr class="table-row level${levelId}"><td class="lp-level">Level ${levelId}</td></tr>`;

        parent.innerHTML += level;

        layouts.forEach(layout => {

            const template = document.createElement('template');
            template.innerHTML = lessonPlansTemplate;
            
            renderTemplate({ layout, levelId },template.content, parent);       
            
            document.querySelectorAll('.lp-kind').forEach(kind => {
                switch(kind.innerHTML) {
                    case 'S':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-chalkboard"></i></i></span>`;
                        if(!config.isPortraitMode) kind.innerHTML += '<span>species info</span>'
                        kind.parentElement.parentElement.classList.add('species-background')
                        break;
                    case 'F':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-chalkboard"></i></i></span>`;
                        if(!config.isPortraitMode) kind.innerHTML += '<span>family info</span>'
                        kind.parentElement.parentElement.classList.add('taxon-background')
                        break;
                    case 'MC':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-check-circle"></i></span>`;
                        if(!config.isPortraitMode) kind.innerHTML += '<span>multiple choice</span>'
                        break;
                    case 'T':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-edit"></i></span>`;
                        if(!config.isPortraitMode) kind.innerHTML += '<span>text entry</span>'
                        break;
                    default:
                }
            });
        });
    });
    
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener('click', event => {
            const screenName = event.target.name;
            const levelId = parseInt(event.target.dataset.levelId);
            const planId = config.isPortraitMode ? 3 : 1;
            const currentPlan = lessonPlans.find(lessonPlan => lessonPlan.id === planId);
            const currentLevelLayouts = currentPlan.levels.find(level => level.id === levelId).layouts;
            const index = currentLevel.
        });
    });
};