import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/progress/summary-template.html';

export const renderSummary = (history) => {

    document.querySelector('progress').value = 0;

    const { score, layouts, collection, config: currentConfig } = store.getState();

    const config = { ...currentConfig };

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    parent.innerHTML = '';

    renderTemplate({ score, history, collection }, template.content, parent);
    
    const learnMoreBtn = document.querySelector('.js-learn-more-btn');
    const nextLevelTxt = document.querySelector('.js-next-level-txt');

    const levelComplete = collection.currentRound === collection.rounds;

    levelComplete ? nextLevelTxt.style.display = 'inline-block' : nextLevelTxt.style.display = 'none';

    const handleBtnClickEvent = () => {
        
        const lessonName = layouts[0].lessonName;
        const levelName = layouts[0].levelName;        

        config.excludeRevision = levelName === 'Level 1' ? false : true;

        if(levelComplete) {
            config.excludeRevision = true;
            const level = lessonPlanner.nextLevel(lessonName, levelName, config.isPortraitMode);
            config.lesson.level = level;
            config.lessonName = level.lessonName;
            config.levelName = level.name;
            actions.boundUpdateConfig(config);
            actions.boundNextLevel({ index: 0, state: 'active' }); // triggers next layout before new layouts are ready, so starts with card...
        } else {            
            actions.boundUpdateConfig(config);
            actions.boundNextRound({ index: 0, state: 'active' });
        }

        config.moduleSize = collection.moduleSize;        
    };

    learnMoreBtn.addEventListener('click', handleBtnClickEvent);
};

