import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { lessonHandler } from 'ui/helpers/lesson-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { enums } from 'ui/helpers/enum-helper';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';

import summaryTemplate from 'ui/screens/progress/summary-template.html';

export const renderSummary = history => {

    subscription.removeSubs();

    subscription.getByRole('screen').forEach(sub => console.log('renderSummary subscriptions:', sub.name));

    const { score, collection, config, lesson } = store.getState();

    lessonHandler.changeState(enums.lessonState.NEXT_ROUND, collection, config, history);

    if(!lesson.isLessonComplete) {
        renderScoreSummary(collection.id, true);
        return;
    }

    return;

    const renderScreen = () => {
        
        console.log('\x1b[32m', 'renderSummary');

        const template = document.createElement('template');
              template.innerHTML = summaryTemplate;
                
        const parent = DOM.rightBody;
              parent.innerHTML = '';
    
        let header, summary, warning = ''; 
    
        renderTemplate({ score, history, collection, config, header, summary, warning }, template.content, parent);
        
        let actionLink = document.querySelector('.js-continue-link');
    
        if(lesson.isLessonComplete) actionLink.innerHTML = 'Choose new';
    
        const handleBtnClickEvent = event => {
    
            subscription.remove(subscription.getByName('renderSummary'));
            subscription.remove(subscription.getByName('renderHistory'));
    
            if(lesson.isLessonComplete) {
                lessonHandler.purgeLesson();
            }
            else lessonHandler.changeState(enums.lessonState.NEXT_ROUND, collection, config, history);
        };
    
        actionLink.removeEventListener('click', handleBtnClickEvent);
        actionLink.addEventListener('click', handleBtnClickEvent);
    
        const progress = document.querySelector('.js-progress');
    
        if(!progress) return;
    
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

    setTimeout(() => {
        renderScreen();
    });
};

