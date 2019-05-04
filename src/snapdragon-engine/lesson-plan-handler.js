export const getNextActiveLayerLayouts = (collection, lessonPlan, config, lesson) => {

    // This is not currently in use. 
    // It is only relevant if/when we allow users to remove levels from a lesson (in lesson editor which is currently not in the flow)

    lesson.activeLevelCount = lessonPlan.levels.filter(level => level.layouts.length > 0).length;

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
            lesson.level = level;

            // actions.boundUpdateLesson(lesson);
            lesson.level = level;
            lessonName = lesson.name;
            levelName = lesson.level.name;
            layouts = getLayouts(getCurrentLevelFromLessonPlan(lessonPlan, levelId + increment), config.mode);

            increment++;

            iterateOverLevelsCheckingForAvailableLayouts(increment, levelId);
        }     
        
        iterateOverLevelsCheckingForAvailableLayouts(0, levelId);

        return { lessonName, levelName, layouts };
    }

    let levelId = lesson.level.id;

    if(lesson.isLevelComplete) {
        levelId++;
        lesson.level = lessonPlan.levels.find(level => level.id === levelId);
    }

    const { layouts } = goToNextLevelThatHasLayouts(collection, lessonPlan, levelId);

    return layouts;
};