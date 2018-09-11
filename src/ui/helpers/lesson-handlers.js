import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';

const getMode = (mode, isLevelComplete, itemsToReview) => {    
    const _mode = (mode === 'learn' && isLevelComplete && itemsToReview.length > 0)
            ? 'review'
            : 'learn';
    return _mode;
}

const callEndOfRoundActions = (mode, config, collections, collection, score, itemsToReview) => {

    config.mode = mode;

    switch(mode) {
        case 'learn':
            if(collection.isLevelComplete) {            
                collection.lesson.level = lessonPlanner.getNextLevel(collection.lesson.name, collection.lesson.level.name, config.isPortraitMode);
                collection.moduleSize = collections.find(c => c.id === collection.id).moduleSize;                
                actions.boundNextLevel({ index: 0 });
            } else if (collection.isNewRound) {
                actions.boundNextRound({ index: 0 });
            };
            break;
        case 'review':        
            collection.moduleSize = (collection.moduleSize > itemsToReview.length) ? itemsToReview.length : collection.moduleSize;
            actions.boundNextRound({ index: 0 });
            break;
    }
}


export const endOfRoundHandler = {
    getMode,
    callEndOfRoundActions
}
