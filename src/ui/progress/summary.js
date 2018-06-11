import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/helpers/response-formatting';
import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { renderCollections } from 'ui/screens/left/collections';
import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/progress/summary-template.html';

export const renderSummary = (index) => {

    document.querySelector('progress').value = 0;

    const { score, layouts, collection, config, layout, history } = store.getState();

    if(index + 1 !== layouts.length) return;

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;

    actions.boundUpdateHistory(score);
            
    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    parent.innerHTML = '';

    let _history;

    if(!history) {
        _history = {
            correct: score.correct,
            total: score.total
        }
    } else {
        _history = history;
    }

    const clone = document.importNode(template.content, true);
    renderTemplate({ score, history: _history, collection }, template.content, parent, clone);
    
    const learnMoreBtn = document.querySelector('.js-learn-more-btn');   
    const nextLevelBtn = document.querySelector('.js-next-level-btn');
    const collectionsBtn = document.querySelector('.js-change-collection-btn');

    const handleBtnClickEvent = event => {
        
        const btn = event.target;
        
        let lessonName = layouts.lessonName;
        let levelName = layouts.levelName;
        let excludeRevision = true;        
        let index = 0;

        switch(btn) {
            case learnMoreBtn:
                config.excludeRevision = levelName === 'Level 1' ? false : true;
                if(collection.currentRound === collection.rounds) {
                    excludeRevision = true;
                    const level = lessonPlanner.nextLevel(lessonName, levelName);
                    lessonName = level.lessonName;
                    levelName = level.name;    
                }
                actions.boundNextRound(index);
                break;
            case nextLevelBtn:
                excludeRevision = true;
                const level = lessonPlanner.nextLevel(lessonName, levelName);
                lessonName = level.lessonName;
                levelName = level.name;                
                break;
        }

        config.moduleSize = collection.moduleSize;

        const nextLayouts = lessonPlanner.createLessonPlan(config);

        actions.boundNextLesson(nextLayouts);

        if(btn === nextLevelBtn) actions.boundNextLevel();

        event.stopPropagation();
    };

    learnMoreBtn.addEventListener('click', handleBtnClickEvent);

    // if(collection.currentRound < collection.rounds) collectionsBtn.style.display = 'none';
    // else collectionsBtn.style.display = 'block';

    nextLevelBtn.addEventListener('click', handleBtnClickEvent);

    const handleCollectionsClick = () => {
        renderCollections();
        renderSnapdragon();
    };

    collectionsBtn.addEventListener('click', handleCollectionsClick);
};

