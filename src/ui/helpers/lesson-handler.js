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

const getLessonItems = (lessonStateMode, collection, config, history) => {    

    const { lesson } = store.getState();

    switch(lessonStateMode) {
        case 'new-lesson': {
            actions.boundToggleLesson({ index: 0 });
            break;
        }
        case 'pause-lesson': {
            if(collection.items) {
                const { index } = getLatestCounter();
                actions.boundToggleLesson({ index: 0, log: { index: index, collection: collection.id  } });
            }
            break;
        }
        case 'restart-lesson': {
            actions.boundToggleLesson(getLatestCounter());
            break;
        }
        case 'next-round': {
            const itemsToReview = stats.getItemsForRevision(collection, history, 1);
            const mode = getMode(config.mode, lesson.isLevelComplete, itemsToReview);
            config.mode = mode;

            switch(mode) {  
                case 'learn': {
                    if(lesson.isLevelComplete) {
                        actions.boundNextLevel({ index: 0, lesson });
                    } else if(lesson.isNextRound) {
                        actions.boundNextRound({ index: 0, lesson });
                    };
                    break;
                }
                case 'review' : {
                    
                    lesson.isLevelComplete = false;
                    lesson.moduleSize = (lesson.moduleSize > itemsToReview.length) ? itemsToReview.length : lesson.moduleSize;
                    lesson.rounds = Math.ceil(itemsToReview.length / lesson.moduleSize);
                    
                    actions.boundUpdateLesson(lesson);

                    collection.itemIndex = 0;
                    collection.allItems = collection.items;
                    collection.items = itemsToReview;
                    
                    actions.boundUpdateCollection({ config, collection });

                    actions.boundNextRound({ index: 0, lesson });
                    // console.clear();
                    console.warn('lesson-handler, review: boundUpdateCollection');
                    break;
                }
                case 'learn-again': {
                    collection.items = collection.allItems; // handle in reducer?
                    // console.clear();
                    actions.boundUpdateCollection({ config, collection });
                    console.warn('lesson-handler, learn-again: boundUpdateCollection');
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

export const lessonHandler = {
    getMode,
    getLessonItems,    
    purgeLesson
}