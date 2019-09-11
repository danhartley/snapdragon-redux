export const getNextActiveLayerLayouts = (lessonPlan, config, lesson) => {

    // All layouts are currently activated because the lesson edit function is not in use.

    lesson.activeLevelCount = lessonPlan.levels.filter(level => level.layouts.length > 0).length;

    const getCurrentLevelFromLessonPlan = (lessonPlan, levelId) => {
        return lessonPlan.levels.find(level => level.id === levelId);
    }
    
    const getLayouts = (currentLevel, mode) => {    
        switch(mode) {
            case 'learn':
                currentLevel.bonusLayouts = currentLevel.bonusLayouts || [];
                return [ ...currentLevel.layouts.filter(l => l), ...currentLevel.bonusLayouts ];
            case 'review':
                return currentLevel.reviewLayouts || [];
            default:
                return currentLevel.layouts;
        }
    };

    const goToNextLevelThatHasLayouts = (lessonPlan, levelId) => {

        let layouts = [], lessonName = '', levelName = '';        
        
        const iterateOverLevelsCheckingForAvailableLayouts = (intialValue, levelId) => {
            
            let increment = intialValue;

            if(layouts.length > 0) return;

            const level = lessonPlan.levels.find(level => level.id === levelId + increment);
            lesson.level = level;

            lesson.level = level;
            lessonName = lesson.name;
            levelName = lesson.level.name; // sometimes returns null (when at final level, looking for next?)
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

    const { layouts } = goToNextLevelThatHasLayouts(lessonPlan, levelId);

    return layouts;
};