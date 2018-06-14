import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { renderCollections } from 'ui/screens/left/collections';
import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/progress/summary-template.html';

export const renderSummary = (history) => {

    document.querySelector('progress').value = 0;

    const { score, layouts, collection, config } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    parent.innerHTML = '';

    const clone = document.importNode(template.content, true);
    renderTemplate({ score, history, collection }, template.content, parent, clone);
    
    const learnMoreBtn = document.querySelector('.js-learn-more-btn');   
    const nextLevelBtn = document.querySelector('.js-next-level-btn');
    const collectionsBtn = document.querySelector('.js-change-collection-btn');

    const handleBtnClickEvent = event => {
        
        const btn = event.target;
        
        let lessonName = layouts.lessonName;
        let levelName = layouts.levelName;
        let index = 0;
        let goToNextLevel = false;

        switch(btn) {
            case learnMoreBtn:
                config.excludeRevision = levelName === 'Level 1' ? false : true;
                if(collection.currentRound === collection.rounds) {
                    goToNextLevel = true;
                    config.excludeRevision = true;
                    const level = lessonPlanner.nextLevel(lessonName, levelName, config.isPortraitMode);
                    config.lesson.level = level;
                    config.lessonName = level.lessonName;
                    config.levelName = level.name;    
                } else 
                    actions.boundNextRound(index);
                break;
            case nextLevelBtn:
                goToNextLevel = true;
                config.excludeRevision = true;
                const level = lessonPlanner.nextLevel(lessonName, levelName, config.isPortraitMode);
                config.lesson.level = level;
                config.lessonName = level.lessonName;
                config.levelName = level.name;                
                break;
        }

        config.moduleSize = collection.moduleSize;

        const nextLayouts = lessonPlanner.createLessonPlan(config);

        actions.boundNextLesson(nextLayouts);

        if(goToNextLevel) actions.boundNextLevel();
    };

    learnMoreBtn.addEventListener('click', handleBtnClickEvent);

    nextLevelBtn.addEventListener('click', handleBtnClickEvent);

    const handleCollectionsClick = () => {
        renderCollections();
        renderSnapdragon();
    };

    collectionsBtn.addEventListener('click', handleCollectionsClick);
};

