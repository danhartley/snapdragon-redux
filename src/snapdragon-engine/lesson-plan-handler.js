export const getNextActiveLayerLayouts = (collection, lessonPlan, config) => {

    // This is not currently in use. 
    // It is only relevant if/when we allow users to remove levels from a lesson (in lesson editor which is currently not in the flow)

    collection.activeLevelCount = lessonPlan.levels.filter(level => level.layouts.length > 0).length;

    const getCurrentLevelFromLessonPlan = (lessonPlan, levelId) => {
        return lessonPlan.levels.find(level => level.id === levelId);
    }
    
    const getLayouts = (currentLevel, mode) => {    
        switch(mode) {
            case 'learn':
                return currentLevel.layouts;
            case 'review':
                return currentLevel.reviewLayouts || [];
            default:
                return currentLevel.layouts;
        }
    };

    const goToNextLevelThatHasLayouts = (collection, lessonPlan, levelId) => {

        let layouts = [], lessonName = '', levelName = '';        
        
        const iterateOverLevelsCheckingForAvailableLayouts = (intialValue, levelId) => {
            
            let increment = intialValue;

            if(layouts.length > 0) return;

            const level = lessonPlan.levels.find(level => level.id === levelId + increment);
            collection.lesson.level = level;
            collection.lessonName = collection.lesson.name;
            collection.levelName = collection.lesson.level.name;
            layouts = getLayouts(getCurrentLevelFromLessonPlan(lessonPlan, levelId + increment), config.mode);

            increment++;

            iterateOverLevelsCheckingForAvailableLayouts(increment, levelId);
        }     
        
        iterateOverLevelsCheckingForAvailableLayouts(0, levelId);

        return { lessonName, levelName, layouts };
    }

    let levelId = collection.lesson.level.id;

    if(collection.isLevelComplete) {
        levelId++;
        collection.lesson.level = lessonPlan.levels.find(level => level.id === levelId);
    }

    const { layouts } = goToNextLevelThatHasLayouts(collection, lessonPlan, levelId);

    return layouts;
};