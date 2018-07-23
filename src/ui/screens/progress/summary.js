import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/screens/progress/summary-template.html';

export const renderSummary = (history) => {

    document.querySelector('progress').value = 0;

    const { score, layouts, collection, config: currentConfig } = store.getState();

    const config = { ...currentConfig };

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const levelComplete = collection.currentRound === collection.rounds;
    const lastLevel = config.isPortraitMode ? 4 : 5;
    const collectionComplete = config.lesson.level.id === lastLevel;

    let summary; 
    if(!levelComplete) {
        summary = 'Keep going...';
    }
    if(levelComplete && !collectionComplete) {
        summary = `Congratulations! You have completed level ${config.lesson.level.id}. 
             Continue with the lesson to learn more species from ${collection.name}.` 
    }
    if(levelComplete && collectionComplete) {
        summary = `You have completed the collection. Well done! 
             Begin a new collection, review questions you got wrong, or consolidate what you have just learnt.`
    }

    renderTemplate({ score, history, collection, config, summary }, template.content, parent);
    
    const learnMoreBtn = document.querySelector('.js-lesson-btn-action');

    const handleBtnClickEvent = () => {
        
        const lessonName = layouts[0].lessonName;
        const levelName = layouts[0].levelName;        

        config.excludeRevision = levelName === 'Level 1' ? false : true;

        if(levelComplete) {
            config.excludeRevision = true;
            const level = lessonPlanner.nextLevel(lessonName, levelName, config.isPortraitMode);
            config.lesson.level = level;
            actions.boundUpdateConfig(config);
            actions.boundNextLevel({ index: 0, lesson: 'active' });
        } else {
            actions.boundNextRound({ index: 0, lesson: 'active' });            
            setTimeout(() => {
                actions.boundUpdateConfig(config);    
            });
        }

        config.moduleSize = collection.moduleSize;        
    };

    learnMoreBtn.addEventListener('click', handleBtnClickEvent);
};

