import { store } from 'redux/store';
import { subscription } from 'redux/subscriptions';
import { DOM } from 'ui/dom';
import { stats } from 'ui/helpers/stats';
import { endOfRoundHandler } from 'ui/helpers/lesson-handlers';
import { renderTemplate } from 'ui/helpers/templating';
import summaryTemplate from 'ui/screens/progress/summary-template.html';

export const renderSummary = (history) => {

    const { score, collection, config: currentConfig, collections } = store.getState();

    const config = { ...currentConfig };

    const template = document.createElement('template');

    template.innerHTML = summaryTemplate;
            
    const parent = DOM.rightBody;
    parent.innerHTML = '';

    const lastLevel = collection.lesson.levels.length;
    const collectionComplete = collection.lesson.level.id === lastLevel;
    const speciesCount = collection.items.length;
    const speciesTestedCount = collection.currentRound * collection.moduleSize;
    const speciesUntestedCount = speciesCount - speciesTestedCount;

    const itemsToReview = stats.getItemsForRevision(collection, history, 1);
    const mode = endOfRoundHandler.getMode(config.mode, collection.isLevelComplete, itemsToReview);

    let summary; 

    if(mode === 'learn') {

        if(!collection.isLevelComplete) {
            summary = `There are ${speciesUntestedCount} more species to learn in this lesson.`;
        }
        if(collection.isLevelComplete) {
            summary = 'Continue to the next level...';
        }
        if(collection.isLevelComplete && !collectionComplete) {
            summary = `Congratulations! You have completed level ${collection.lesson.level.id}. 
                Continue with the lesson to learn more species from ${collection.name}.` 
        }
        if(collection.isLevelComplete && collectionComplete) {
            summary = `You have completed the collection. Well done! 
                Begin a new collection, review questions you got wrong, or consolidate what you have just learnt.`
        }
    }

    if(mode === 'review') {
        summary = 'Before going to the next level, there are a few questions to review...';
    }

    score.correct = score.correct;
    score.incorrect = score.total - score.correct;
    history.incorrect = history.total - history.correct;

    renderTemplate({ score, history, collection, config, summary }, template.content, parent);
    
    const learnMoreBtn = document.querySelector('.js-summmary-btn-action');

    const handleBtnClickEvent = event => {
        
        subscription.getByName('renderSummary').forEach(sub => subscription.remove(sub));
        subscription.getByName('renderHistory').forEach(sub => subscription.remove(sub));

        endOfRoundHandler.changeCollection('nextRound', collections, collection, config, history);
    };

    learnMoreBtn.removeEventListener('click', handleBtnClickEvent);
    learnMoreBtn.addEventListener('click', handleBtnClickEvent);
};

