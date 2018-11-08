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
                    collection.moduleSize = (collection.moduleSize > collection.length) ? collection.length : collection.moduleSize;
                    collection.rounds = Math.ceil(collection.items.length / collection.moduleSize);
                    collection.itemIndex = 0;
                    collection.allItems = collection.items;
                    collection.items = itemsToReview;
                    actions.boundChangeCollection({ config: config, collection });
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

export const nextRoundHandler = {
    getMode,
    changeCollection,
    purgeLesson
}