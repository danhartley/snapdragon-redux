import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/helpers/response-formatting';
import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { renderCollections } from 'ui/screens/left/collections';
import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import summaryTemplate from 'ui/progress/summary-template.html';

export const renderSummary = (index) => {

    document.querySelector('progress').value = 0;

    const { score, layouts, collection, config, layout } = store.getState();

    if(index + 1 !== layouts.length) return;

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;

    if(!config.isPortraitMode)
        actions.boundUpdateHistory(score);
            
    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;

    const clone = document.importNode(template.content, true);
    parent.style.display = 'grid'; // no, put this in a child
    parent.innerHTML = '';
    parent.appendChild(clone);

    const startOverBtn = document.querySelector('.js-start-over-btn');
    const tryAgainBtn = document.querySelector('.js-try-again-btn');
    const learnMoreBtn = document.querySelector('.js-learn-more-btn');   
    const nextLevelBtn = document.querySelector('.js-next-level-btn');
    const changeCollectionBtn = document.querySelector('.js-change-collection-btn');

    const handleBtnClickEvent = event => {
        
        const btn = event.target;
        
        let lessonName = layouts.lessonName;
        let levelName = layouts.levelName;
        let excludeRevision = true;        
        let index = 0;

        switch(btn) {
            case startOverBtn:
            case tryAgainBtn:
                actions.boundNextRound(index);
                break;
            case learnMoreBtn:
                config.excludeRevision = levelName === 'Level 1' ? false : true;
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

    startOverBtn.addEventListener('click', handleBtnClickEvent);

    if(score.fails.length > 0) tryAgainBtn.addEventListener('click', handleBtnClickEvent);
    else tryAgainBtn.setAttribute('disabled', 'disabled');

    if(collection.currentRound < collection.rounds) learnMoreBtn.addEventListener('click', handleBtnClickEvent);
    else learnMoreBtn.setAttribute('disabled', 'disabled');

    nextLevelBtn.addEventListener('click', handleBtnClickEvent);

    changeCollectionBtn.addEventListener('click', renderCollections);
    changeCollectionBtn.addEventListener('click', renderSnapdragon);
};