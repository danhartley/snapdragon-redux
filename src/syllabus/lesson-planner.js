import { createLesson } from 'syllabus/lesson-builder';
import { screens } from 'snapdragon/screen-layouts';
import { getWildcardLayouts } from 'redux/reducers/initial-state/species-state/species-wildcards';

const { summary, history } = screens;

const createLessonPlan = (lessonPlan, config, collection) => {

    collection.itemGroups = getItemGroups(collection);

    collection.activeLevelCount = lessonPlan.levels.filter(level => level.layouts.length > 0).length;

    const goToNextLevelWithLayouts = (collection) => {

        let layouts = [], wildcardLayouts = [];
        let wildcards = [], lessonName = '', levelName = '';        
        
        const iterateOverLevels = (intialValue) => {
            
            let increment = intialValue;

            if(layouts.length > 0 || wildcardLayouts.length > 0) return;

            const levelId = collection.lesson.level.id + increment;
            const level = lessonPlan.levels.find(level => level.id === levelId);
            collection.lesson.level = level;
            lessonName = collection.lesson.name;
            levelName = collection.lesson.level.name;
            layouts = getLayouts(lessonPlan, collection, config, config.mode);
            wildcards = config.mode === 'learn' ? getLayouts(lessonPlan, collection, config, 'wildcard') : [];
            wildcardLayouts = wildcards.length > 0 ? getWildcardLayouts(wildcards, collection, collection.moduleSize) : [];

            increment++;

            iterateOverLevels(increment);
        }     

        iterateOverLevels(0);

        return { lessonName, levelName, layouts, wildcardLayouts };
    }

    if(collection.isLevelComplete) {
        const levelId = collection.lesson.level.id + 1;
        collection.lesson.level = lessonPlan.levels.find(level => level.id === levelId);
    }
    const { lessonName, levelName, layouts, wildcardLayouts } = goToNextLevelWithLayouts(collection);

    return createLesson(
        lessonName,
        levelName, 
        collection.moduleSize,
        config.isPortraitMode, 
        layouts, 
        [ summary, history ],
        collection,
        wildcardLayouts
    );        
};

const getLayouts = (lessonPlan, collection, config, mode) => {
    const { lesson: { level: { name: levelName, id: levelId }} } = collection;
    const currentLevel = lessonPlan.levels.find(level => level.id === levelId);
    switch(mode) {
        case 'learn':
            return currentLevel.layouts;
        case 'wildcard':
            return currentLevel.wildcardLayouts || [];
        case 'review':
            return currentLevel.reviewLayouts || [];
        default:
            return currentLevel.layouts;
    }
};

const getItemGroups = collection => {

    // e.g. [0,1,2,3,4,5,6], [7,8,9,10,11,12]

    let itemGroups = [];
    let group = [];
    [ ...collection.items].forEach((item, index) => {
        group.push(index);
        if((index + 1) % collection.moduleSize === 0) {
            itemGroups.push(group);
            group = [];
        }
        if((index + 1) % collection.moduleSize !== 0 && (index + 1) === collection.items.length) {
            itemGroups.push(group);
            group = [];
        }
    });
    return itemGroups;
};

export const lessonPlanner = {
    createLessonPlan
}