import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { renderAnswer } from 'ui/helpers/helpers-for-screens';
import { actions } from 'redux/actions/action-creators';
import { revisionModule, nextModule, repeatModule } from 'ui/helpers/helpers-for-screens';
import { createLessonPlan } from 'syllabus/lesson-planner';

export const renderSummaryHeader = (score) => {
    DOM.headerTxt.innerHTML = 
        score.correct === 1 
            ? `You got ${score.correct} question right out of ${score.total}`
            : `You got ${score.correct} questions right out of ${score.total}`;
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';
};

export const renderSummary = (index) => {

    const { score, items, layouts, pool, config } = store.getState();

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
        const data = { items, config, excludeRevision: true };
        
        switch(btn) {
            case startOverBtn:
                data.items = repeatModule(items, pool);
                break;
            case tryAgainBtn:
                data.items = revisionModule(items, score);
                break;
            case learnMoreBtn:
                data.items = nextModule(items, pool);
                data.excludeRevision = false;
                break;
            case nextLevelBtn:
                data.items = repeatModule(items, pool);
                data.config = config.nextLevel(layouts.levelName);
                break;
        }

        const lessonName = data.config.lessons.filter(lesson => lesson.id === data.config.active.lesson)[0].name;
        const levelName = data.config.levels.filter(level => level.id === data.config.active.level)[0].name;

        data.layouts = createLessonPlan(lessonName, levelName, data.items.length, data.excludeRevision);

        actions.boundReset(data);

        event.stopPropagation();
    };

    startOverBtn.addEventListener('click', handleBtnClickEvent);

    if(score.fails.length > 0) tryAgainBtn.addEventListener('click', handleBtnClickEvent);
    else tryAgainBtn.setAttribute('disabled', 'disabled');

    if(items.poolIndex + items.moduleSize <= items.poolCount) learnMoreBtn.addEventListener('click', handleBtnClickEvent);
    else learnMoreBtn.setAttribute('disabled', 'disabled');

    nextLevelBtn.addEventListener('click', handleBtnClickEvent);
};