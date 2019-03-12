import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { stats } from 'ui/helpers/stats';
import { lessonLogicHandler } from 'ui/helpers/lesson-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/screens/progress/summary-template.html';

export const renderSummary = history => {

    const { score, collection, config, collections } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const itemsToReview = stats.getItemsForRevision(collection, history, 1);
    const mode = lessonLogicHandler.getMode(config.mode, collection.isLevelComplete, itemsToReview);

    let header, summary, warning = ''; 

    if(mode === 'learn') {

        if(!collection.isLevelComplete) {
            header = `You have completed ${collection.currentRound} of ${collection.rounds} rounds on Level ${collection.lesson.level.id}`;
            summary = `You will be tested on more species at this level. Keep going!`;
        }
        if(collection.isLevelComplete) {
            header = `You have completed level ${collection.lesson.level.id} of ${collection.activeLevelCount} levels.`;
            summary = 'Well done, you finished the level. Continue to the next level...';
        }
    }

    if(mode === 'review') {
        header = `You have completed level ${collection.lesson.level.id}.`;
        summary = 'But before going to the next level, there are a few questions to review...';
    }

    if(mode === 'learn-again' && !collection.isLessonComplete) {
        header = `You have completed the review of level ${collection.lesson.level.id}`;
        summary = `Well done! On to the next level...`;
    }

    if(collection.isLessonComplete) {
        header = 'You have completed the lesson. Well done!';
        const nextLesson = collections.find(c => c.courseId === collection.courseId && c.id === collection.id + 1);
        if(nextLesson) summary = `The next lesson in this course is ${nextLesson.name}. Return to the home page and select it from the lesson menu.`
        else summary = 'Return to the home page and select a new lesson from the menu.'
        warning = 'Warning! All record of this lesson, including your score, will now be erased. Future versions of Snapdragon will save a record of all your lessons.'
    }

    renderTemplate({ score, history, collection, config, header, summary, warning }, template.content, parent);
    
    let actionLink = document.querySelector('.js-create-guide-link');

    if(collection.isLessonComplete) actionLink.innerHTML = 'Choose a new lesson';

    const handleBtnClickEvent = event => {

        subscription.remove(subscription.getByName('renderSummary'));
        subscription.remove(subscription.getByName('renderHistory'));

        if(collection.isLessonComplete) {
            lessonLogicHandler.purgeLesson();
        }
        else lessonLogicHandler.changeCollection('next-round', collection, config, history);
    };

    actionLink.removeEventListener('click', handleBtnClickEvent);
    actionLink.addEventListener('click', handleBtnClickEvent);
};

