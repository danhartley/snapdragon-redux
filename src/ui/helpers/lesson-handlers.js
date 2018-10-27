import { store } from 'redux/store';
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

const changeCollection = (lessonStateMode, collections, collection, config, history, actionButton) => {

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
            const items = collection.items.filter(item => !item.isDeselected);      
            actions.boundChangeCollection({ config: config, items: items });      
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
                    actions.boundChangeCollection({ config: config, items: itemsToReview, allItems: collection.items });
                    break;
                }
                case 'learn-again': {
                    actions.boundChangeCollection({ config, items: collection.allItems });
                }
            }            
            break;      
        }
    }
};

export const endOfRoundHandler = {
    getMode,
    changeCollection
}
