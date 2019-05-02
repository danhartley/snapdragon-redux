import { createLesson } from 'snapdragon-engine/lesson-builder';
import { layouts } from 'snapdragon-config/screen-layouts';
import { familyProps } from 'redux/reducers/initial-state/species-state/species-taxa';

const { summary, history } = layouts;

const createLessonPlan = (lessonPlan, config, collection) => {

    collection.moduleSize = collection.moduleSize || config.moduleSize;
    const rounds = collection.items.length / collection.moduleSize;
    collection.rounds = collection.items.length % collection.moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1;

    collection.lesson = collection.lesson || { ...lessonPlan, level: { id: 1 } };

    collection.families = familyProps.getFamilyNames(collection.items);
    collection.familyStats = familyProps.getFamilyStats(collection.items);

    collection.activeLevelCount = lessonPlan.levels.filter(level => level.layouts.length > 0).length;

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

    return createLesson(
        lessonPlan,
        layouts, 
        [ summary, history ],
        collection
    );        
};

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

export const lessonPlanner = {
    createLessonPlan
}