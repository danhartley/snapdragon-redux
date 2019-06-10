import { store } from 'redux/store';
import { persistor } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { stats } from 'ui/helpers/stats';
import { enums } from 'ui/helpers/enum-helper';

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

const getLessonItems = (lessonState, collection, config, history) => {    

    const { lesson } = store.getState();

    switch(lessonState) {
        case enums.lessonState.BEGIN_LESSON: {
            actions.boundToggleLesson({ index: 0 });
            break;
        }
        case enums.lessonState.PAUSE_LESSON: {
            if(collection.items) {
                const { index } = getLatestCounter();
                actions.boundToggleLesson({ index: 0, log: { index: index, collection: collection.id  } });
            }
            break;
        }
        case enums.lessonState.RESUME_LESSON: {
            actions.boundToggleLesson(getLatestCounter());
            break;
        }
        case enums.lessonState.NEXT_ROUND: {
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
                    break;
                }
                case 'learn-again': {
                    collection.items = collection.allItems;
                    lesson.moduleSize = collection.moduleSize || config.moduleSize;
                    actions.boundUpdateLesson(lesson);
                    actions.boundUpdateCollection({ config, collection });
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