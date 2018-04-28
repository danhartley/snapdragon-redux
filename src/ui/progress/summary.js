import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/helpers/response-formatting';
import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { renderCollections } from 'ui/screens/left/collections';

export const renderSummaryHeader = (score) => {
    DOM.headerTxt.innerHTML = 
        score.correct === 1 
            ? `You got ${score.correct} question right out of ${score.total}`
            : `You got ${score.correct} questions right out of ${score.total}`;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderSummary = (index) => {

    const { score, layouts, collection } = store.getState();

    if(index !== layouts.length) return;
    
    renderSummaryHeader(score);

    actions.boundUpdateHistory(score);

    const template = document.querySelector('.js-summary-template');

    const clone = document.importNode(template.content, true);
    DOM.rightBody.innerHTML = '';
    DOM.rightBody.appendChild(clone);

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
                excludeRevision = levelName === 'Level 1' ? false : true;
                actions.boundNextRound(index);
                break;
            case nextLevelBtn:
                excludeRevision = true;
                const level = lessonPlanner.nextLevel(lessonName, levelName);
                lessonName = level.lessonName;
                levelName = level.name;                
                break;
        }

        const nextLayouts = lessonPlanner.createLessonPlan(lessonName, levelName, collection.moduleSize, excludeRevision);

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
};