import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { stats } from 'ui/helpers/stats';
import { endOfRoundHandler } from 'ui/helpers/lesson-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import { renderCollections } from 'ui/screens/home/collections';
import summaryTemplate from 'ui/screens/progress/summary-template.html';

export const renderSummary = (history) => {

    const { score, collection, config, collections } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const itemsToReview = stats.getItemsForRevision(collection, history, config, 1);
    const mode = endOfRoundHandler.getMode(config.mode, collection.isLevelComplete, itemsToReview);

    let header, summary; 

    if(mode === 'learn') {

        if(!collection.isLevelComplete) {
            header = `You have completed ${collection.currentRound} of ${collection.rounds} rounds in level ${collection.lesson.level.id}`;
            summary = `There are more species to learn in this lesson. Keep going!`;
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
        else summary = `Return to the home page and select a new lesson from the menu.`
    }

    renderTemplate({ score, history, collection, config, header, summary }, template.content, parent);
    
    const learnMoreBtn = document.querySelector('.js-summmary-btn-action');

    if(collection.isLessonComplete) learnMoreBtn.innerHTML = 'Pick a new lesson';

    const handleBtnClickEvent = event => {

        subscription.getByName('renderSummary').forEach(sub => subscription.remove(sub));
        subscription.getByName('renderHistory').forEach(sub => subscription.remove(sub));

        if(collection.isLessonComplete) {            
            renderCollections({index: null, isLessonPaused: false});
        }
        else endOfRoundHandler.changeCollection('nextRound', collections, collection, config, history);
    };

    learnMoreBtn.removeEventListener('click', handleBtnClickEvent);
    learnMoreBtn.addEventListener('click', handleBtnClickEvent);
};

