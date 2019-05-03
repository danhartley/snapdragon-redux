import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/screens/progress/summary-template.html';

export const renderSummary = history => {

    const { score, collection, config, collections } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    let header, summary, warning = ''; 

    renderTemplate({ score, history, collection, config, header, summary, warning }, template.content, parent);
    
    let actionLink = document.querySelector('.js-create-guide-link');

    if(collection.isLessonComplete) actionLink.innerHTML = 'Choose new';

    const handleBtnClickEvent = event => {

        subscription.remove(subscription.getByName('renderSummary'));
        subscription.remove(subscription.getByName('renderHistory'));

        if(collection.isLessonComplete) {
            lessonHandler.purgeLesson();
        }
        else lessonHandler.getLessonItems('next-round', collection, config, history);
    };

    actionLink.removeEventListener('click', handleBtnClickEvent);
    actionLink.addEventListener('click', handleBtnClickEvent);

    const progress = document.querySelector('.js-progress');

    const scoreAverage = (score.correct/score.total);
    const historyAverage = (history.correct/history.total);

    progress.innerHTML = scoreAverage === historyAverage
                ? 'Average' 
                : scoreAverage > historyAverage
                    ? 'Above average'
                    : 'Below average';

    scoreAverage === historyAverage
            ? ''
            : scoreAverage > historyAverage
                ? progress.classList.add('above')
                : progress.classList.add('below')
};

