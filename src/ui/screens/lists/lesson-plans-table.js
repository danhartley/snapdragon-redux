import * as R from 'ramda';

import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { lessonPlans } from 'snapdragon/lesson-plans';
import lessonPlansTableTemplate from 'ui/screens/lists/lesson-plans-table-template.html';
import lessonPlansTemplate from 'ui/screens/lists/lesson-plans-template.html';

export const renderLessonPlans = (lessonPlanId) => {

    const { config } = store.getState();

    const template = document.createElement('template');
    template.innerHTML = lessonPlansTableTemplate;

    const parent = document.querySelector('#listModal .js-modal-body');

    parent.innerHTML = ''

    renderTemplate({},template.content, parent);

    document.querySelector('#listModal .js-modal-text-title').innerHTML = 'Lesson plan';

    const lessonPlan = lessonPlans.find(plan => plan.id === lessonPlanId && plan.portrait === config.isPortraitMode);
    
    const levelLayouts = lessonPlan.levels.map(level => {
        return [ ...level.layouts, ...level.wildcardLayouts ];
    });

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

    let newLessonPlan = R.clone(lessonPlan);
    let screenName;
    
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener('click', event => {
            screenName = event.target.name;
            const levelId = parseInt(event.target.dataset.levelId);                  
            if(event.target.checked) {
                const newLayouts = newLessonPlan.levels.find(level => level.id === levelId).layouts;
                newLayouts.forEach(layout => {
                    if(layout.name === screenName) {
                        const defaultLayout = lessonPlan.levels.find(level => level.id === levelId).layouts.find(layout => layout.name === screenName);
                        layout === defaultLayout;
                    }
                });                
            } else {                
                const currentLevelLayouts = newLessonPlan.levels.find(level => level.id === levelId).layouts;
                const newLayouts = currentLevelLayouts.map(layout =>  { 
                    if(layout.name === screenName) {
                        layout = { name: screenName };
                    }              
                    return layout;
                });      
                newLessonPlan.levels.find(level => level.id === levelId).layouts = newLayouts;
            }
        });
    });

    document.querySelector('.js-lesson-plan-btn-action').addEventListener('click', event => {
        newLessonPlan.levels = newLessonPlan.levels.map(level => { 
            const layouts = level.layouts.filter(layout => { 
                return layout.screens;
            });
            return { ...level, layouts: layouts };
        });
        actions.boundchangeLessonPlan(newLessonPlan);        
        event.target.classList.add('snap-success');
        event.target.innerHTML = 'Lesson plan updated';
        setTimeout(() => {
            event.target.innerHTML = 'Update lesson plan';
            event.target.classList.remove('snap-success');
        }, 1000);

    });
};