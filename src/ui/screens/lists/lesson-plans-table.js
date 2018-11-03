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

    const descriptions = lessonPlan.levels.map(level => level.description);

    levelLayouts.forEach((layouts, index) => {

        const parent = document.querySelector('#listModal .js-lesson-plans');

        const levelId = index + 1;
        const description = descriptions[index] || '';

        const level = `<tr class="table-row level${levelId}"><td class="lp-level"><div><span>Level ${levelId}:</span><span>${description}</span></div></td></tr>`;

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
                    case 'G':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-chalkboard"></i></i></span>`;
                        if(!config.isPortraitMode) kind.innerHTML += '<span>glossary</span>'
                        kind.parentElement.parentElement.classList.add('taxon-background')
                        break;
                    case 'MC':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-check-circle"></i></span>`;
                        if(!config.isPortraitMode) kind.innerHTML += '<span>multiple choice</span>'
                        break;
                    case 'VMC':
                        kind.innerHTML = `<span class="icon"><i class="fas fa-check-circle"></i></span><span class="icon"><i class="fas fa-eye"></i></span>`;
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

    let userEditedPlan = R.clone(lessonPlan);
    let screenName;
    
    const removeLayouts = (layoutType, levelId) => {
        const currentLevelLayouts = userEditedPlan.levels.find(level => level.id === levelId)[layoutType];
        const layouts = currentLevelLayouts.map(layout =>  { 
            if(layout.name === screenName) {
                layout.isDeselected = true;
            }              
            return layout;
        });
        return layouts;
    }

    const revertLayouts = (layoutType, levelId) => {
        const layouts = userEditedPlan.levels.find(level => level.id === levelId)[layoutType];
        layouts.forEach(layout => {
            if(layout.name === screenName) {
                layout.isDeselected = false;
            }
        });
    }

    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener('click', event => {
            screenName = event.target.name;
            const levelId = parseInt(event.target.dataset.levelId);                  
            if(event.target.checked) {
                revertLayouts('layouts', levelId);
                revertLayouts('wildcardLayouts', levelId);
            } else {                
                removeLayouts('layouts', levelId);
                removeLayouts('wildcardLayouts', levelId);
            }
        });
    });

    document.querySelector('.js-lesson-plan-btn-action').addEventListener('click', event => {
        userEditedPlan.levels = userEditedPlan.levels.map(level => { 
            const layouts = level.layouts.filter(layout => { 
                return layout.screens;
            });
            return { ...level, layouts: layouts.filter(layout => !layout.isDeselected) };
        });
        userEditedPlan.levels = userEditedPlan.levels.map(level => { 
            const wildcardLayouts = level.wildcardLayouts.filter(layout => { 
                return layout.screens;
            });
            return { ...level, wildcardLayouts: wildcardLayouts.filter(layout => !layout.isDeselected) };
        });
        actions.boundchangeLessonPlans(userEditedPlan);
        event.target.classList.add('snap-success');
        event.target.innerHTML = 'Lesson plan updated';
        setTimeout(() => {
            event.target.innerHTML = 'Update lesson plan';
            event.target.classList.remove('snap-success');
        }, 1000);

    });
};