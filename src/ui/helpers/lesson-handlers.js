import * as R from 'ramda';

import { store } from 'redux/store';
import { persistor } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { stats } from 'ui/helpers/stats';

const getMode = (mode, isLevelComplete, itemsToReview) => {    
    const _mode = (mode === 'learn' && isLevelComplete && itemsToReview.length > 0)
            ? 'review'
            : mode === 'review' ? 'learn-again' : 'learn';
    return _mode;
}

const getLatestCounter = () => { 
    const counter = store.getState().counter;
    const log = counter.log;
    const index = log ? log.index : counter.index;
    return { index };
};

const changeCollection = (lessonStateMode, collection, config, history, actionButton) => {

    switch(lessonStateMode) {
        case 'newLesson': {
            const notEnoughItemsSelected = collection.items.filter(item => !item.isDeselected).length < collection.moduleSize;
            if(notEnoughItemsSelected) {
                actionButton.innerHTML = `You must select at least ${collection.moduleSize} items`;
            }
            setTimeout(() => {
                actionButton.innerHTML = 'Begin lesson';
            }, 2000);
            if(notEnoughItemsSelected) return;
            actions.boundToggleLesson({ index: 0 });
            break;
        }
        case 'pauseLesson': {
            const { index } = getLatestCounter();
            actions.boundToggleLesson({ index: 0, log: { index: index, collection: collection.id  } });
            break;
        }
        case 'restartLesson': {
            actions.boundToggleLesson(getLatestCounter());
            break;
        }
        case 'nextRound': {
            const itemsToReview = stats.getItemsForRevision(collection, history, 1);
            const mode = getMode(config.mode, collection.isLevelComplete, itemsToReview);
            config.mode = mode;

            switch(mode) {  
                case 'learn': {
                    if(collection.isLevelComplete) {                            
                        actions.boundNextLevel({ index: 0 });
                    } else if(collection.isNextRound) {
                        actions.boundNextRound({ index: 0 });
                    };
                    break;
                }
                case 'review' : {
                    collection.isLevelComplete = false;
                    collection.moduleSize = (collection.moduleSize > itemsToReview.length) ? itemsToReview.length : collection.moduleSize;
                    collection.rounds = Math.ceil(itemsToReview.length / collection.moduleSize);
                    collection.itemIndex = 0;
                    collection.allItems = collection.items;
                    collection.items = itemsToReview;
                    actions.boundChangeCollection({ config: config, collection });
                    actions.boundNextRound({ index: 0 });
                    break;
                }
                case 'learn-again': {
                    collection.items = collection.allItems;
                    actions.boundChangeCollection({ config, collection });
                }
            }            
            break;      
        }
    }
};

const purgeLesson = () => {
    persistor.purge();
    window.location.reload(true);
};

const isSkippable = (collection, counter, config, layout, caller, readOnlyMode) => {

    console.log('SKIPPABLE');
    console.log('collection.items: ', collection.items ? collection.items.length : 'no items');
    console.log('counter.isLessonPaused: ', counter.isLessonPaused);
    console.log('counter.isLessonRehydrated: ', counter.isLessonRehydrated);
    console.log('collection.id: ', collection.id);
    console.log('config.collection.id: ', config.collection.id);

    if(!Array.isArray(collection.items)) return false;

    if(readOnlyMode) return false;

    if(counter.isLessonRehydrated && !layout) return false;

    if(collection.id === config.collection.id && counter.isLessonPaused) return false;

    if(collection.language !== config.language) {
        collection.language = config.language;
        return false;
    }
    
    return (collection.id === config.collection.id);
};

export const lessonLogicHandler = {
    getMode,
    changeCollection,
    purgeLesson,
    isSkippable
}