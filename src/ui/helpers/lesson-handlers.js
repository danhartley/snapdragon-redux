import { actions } from 'redux/actions/action-creators';
import { lessonPlanner } from 'syllabus/lesson-planner';

const getMode = (mode, isLevelComplete, itemsToReview) => {    
    const _mode = (mode === 'learn' && isLevelComplete && itemsToReview.length > 0)
            ? 'review'
            : 'learn';
    return _mode;
}

const callEndOfRoundActions = (mode, config, collections, collection, score, itemsToReview, isLevelComplete = false) => {

    config.mode = mode;

    switch(mode) {

        case 'learn':             
            
            if(isLevelComplete) {
                
                const level = lessonPlanner.getNextLevel(config.lesson.name, config.lesson.level.name, config.isPortraitMode);
                config.lesson.level = level;
                
                collection.moduleSize = collections.find(c => c.id === collection.id).moduleSize;
                actions.boundNextLevel({ index: 0 });
                setTimeout(() => {
                    config.moduleSize = collection.moduleSize;
                    actions.boundUpdateConfig(config);
                    actions.boundNextLevel({ index: 0 });
                });
            } else {
                if(score) {
                    actions.boundNextRound({ index: 0 });
                    setTimeout(() => {
                        config.moduleSize = collection.moduleSize;
                        actions.boundUpdateConfig(config);    
                    });
                } else {
                    actions.boundChangeCollection(config);
                }
            };
            break;

        case 'review':
        
            collection.moduleSize = config.moduleSize = (config.moduleSize > itemsToReview.length) ? itemsToReview.length : config.moduleSize;
            actions.boundNextRound({ index: 0 });
            setTimeout(() => {
                config.moduleSize = collection.moduleSize;
                actions.boundUpdateConfig(config);    
            });
            break;
    }
}


export const endOfRoundHandler = {
    getMode,
    callEndOfRoundActions
}
