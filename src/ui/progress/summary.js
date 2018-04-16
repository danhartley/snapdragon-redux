import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/helpers/helpers-for-screens';
import { actions } from 'redux/actions/action-creators';
import { revisionModule, nextModule, repeatModule } from 'ui/helpers/helpers-for-screens';
import { lessonPlanner } from 'syllabus/lesson-planner';

export const renderSummaryHeader = (score) => {
    DOM.headerTxt.innerHTML = 
        score.correct === 1 
            ? `You got ${score.correct} question right out of ${score.total}`
            : `You got ${score.correct} questions right out of ${score.total}`;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderSummary = (index) => {

    const { score, items, layouts, collection } = store.getState();

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
    const nextLessonBtn = document.querySelector('.js-next-lesson-btn');

    const handleBtnClickEvent = event => {
        
        const btn = event.target;
        const data = { items, excludeRevision: true };
        
        let lessonName = layouts.lessonName;
        let levelName = layouts.levelName;
        
        switch(btn) {
            case startOverBtn:
                data.items = repeatModule(items, collection);
                break;
            case tryAgainBtn:
                data.items = revisionModule(items, score);
                break;
            case learnMoreBtn:
                data.items = nextModule(items, collection);
                data.excludeRevision = false;
                break;
            case nextLevelBtn:
                const level = lessonPlanner.nextLevel(lessonName, levelName);
                lessonName = level.lessonName;
                levelName = level.name;
                data.items = repeatModule(items, collection);                
                break;
        }

        data.layouts = lessonPlanner.createLessonPlan(lessonName, levelName, data.items.length, data.excludeRevision);

        actions.boundReset(data);

        // send boundConfigUpdate and move config logic to config reducer
        // and layout will handle new lesson plan

        event.stopPropagation();
    };

    startOverBtn.addEventListener('click', handleBtnClickEvent);

    if(score.fails.length > 0) tryAgainBtn.addEventListener('click', handleBtnClickEvent);
    else tryAgainBtn.setAttribute('disabled', 'disabled');

    if(items.collectionIndex + items.moduleSize <= items.collectionCount) learnMoreBtn.addEventListener('click', handleBtnClickEvent);
    else learnMoreBtn.setAttribute('disabled', 'disabled');

    nextLevelBtn.addEventListener('click', handleBtnClickEvent);
};