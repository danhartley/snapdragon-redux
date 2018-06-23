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

    renderTemplate({ score, history, collection, config }, template.content, parent);
    
    const learnMoreBtn = document.querySelector('.js-learn-more-btn');
    const nextLevelTxt = document.querySelector('.js-next-level-txt');
    const endOfCollectionTxt = document.querySelector('.js-end-collection-txt');

    const levelComplete = collection.currentRound === collection.rounds;
    const levels = config.isPortraitMode ? 4 : 5;
    const collectionComplete = config.lesson.level.id === levels;

    (levelComplete && !collectionComplete) ? nextLevelTxt.style.display = 'inline-block' : nextLevelTxt.style.display = 'none';
    collectionComplete ? endOfCollectionTxt.style.display = 'inline-block' : endOfCollectionTxt.style.display = 'none';

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
            actions.boundNextLevel({ index: 0, lesson: 'active' });
        } else {            
            actions.boundUpdateConfig(config);
            actions.boundNextRound({ index: 0, lesson: 'active' });
        }

        config.moduleSize = collection.moduleSize;        
    };

    learnMoreBtn.addEventListener('click', handleBtnClickEvent);
};

