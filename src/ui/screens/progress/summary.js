import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/screens/progress/summary-template.html';

export const renderSummary = (history) => {

    const { score, collection, config: currentConfig } = store.getState();

    const config = { ...currentConfig };

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const levelComplete = collection.currentRound === collection.rounds;
    const lastLevel = 4;
    const collectionComplete = config.lesson.level.id === lastLevel;
    const speciesCount = collection.items.length;
    const speciesTestedCount = collection.currentRound * config.moduleSize;
    const speciesUntestedCount = speciesCount - speciesTestedCount;

    let summary; 
    if(!levelComplete) {
        summary = `There are ${speciesUntestedCount} more species to learn in this lesson.`;
    }
    if(levelComplete) {
        summary = 'Continue to the next level...';
    }
    if(levelComplete && !collectionComplete) {
        summary = `Congratulations! You have completed level ${config.lesson.level.id}. 
             Continue with the lesson to learn more species from ${collection.name}.` 
    }
    if(levelComplete && collectionComplete) {
        summary = `You have completed the collection. Well done! 
             Begin a new collection, review questions you got wrong, or consolidate what you have just learnt.`
    }

    score.correct = score.correct;
    score.incorrect = score.total - score.correct;
    history.incorrect = history.total - history.correct;

    renderTemplate({ score, history, collection, config, summary }, template.content, parent);
    
    const learnMoreBtn = document.querySelector('.js-summmary-btn-action');

    const handleBtnClickEvent = event => {
        
        const lessonName = config.lesson.name;
        const levelName = config.lesson.level.name;

        config.excludeRevision = levelName === 'Level 1' ? false : true;

        if(levelComplete) {
            config.excludeRevision = true;
            const level = lessonPlanner.nextLevel(lessonName, levelName, config.isPortraitMode);
            config.lesson.level = level;
            actions.boundNextLevel({ index: 0, lesson: 'inactive' });
            setTimeout(() => {
                actions.boundUpdateConfig(config);
                actions.boundNextLevel({ index: 0, lesson: 'active' });
            });
        } else {
            actions.boundNextRound({ index: 0, lesson: 'active' });            
            setTimeout(() => {
                actions.boundUpdateConfig(config);    
            });
        }

        config.moduleSize = collection.moduleSize;        
    };

    learnMoreBtn.removeEventListener('click', handleBtnClickEvent);
    learnMoreBtn.addEventListener('click', handleBtnClickEvent);
};

