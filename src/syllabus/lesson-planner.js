import { createLesson } from 'syllabus/lesson-builder';
import { screens } from 'snapdragon/screen-layouts';
import { getCollectionLayouts } from 'redux/reducers/initial-state/species-state/collection-layouts';

const { summary, history } = screens;

const createLessonPlan = (lessonPlan, config, collection) => {

    collection.lesson = collection.lesson || { ...lessonPlan, level: { id: 1 } };

    collection.itemGroups = getItemGroups(collection);

    collection.activeLevelCount = lessonPlan.levels.filter(level => level.layouts.length > 0).length;

    const goToNextLevelThatHasLayouts = (collection, lessonPlan) => {

        let layouts = [], wildcardLayouts = [];
        let wildcards = [], lessonName = '', levelName = '';        
        
        const iterateOverLevelsCheckingForAvailableLayouts = (intialValue) => {
            
            let increment = intialValue;

            if(layouts.length > 0 || wildcardLayouts.length > 0) return;

            const levelId = collection.lesson.level ? collection.lesson.level.id + increment : increment + 1;
            const level = lessonPlan.levels.find(level => level.id === levelId);
            collection.lesson.level = level;
            collection.lessonName = collection.lesson.name;
            collection.levelName = collection.lesson.level.name;
            layouts = getLayouts(getCurrentLevelFromLessonPlan(lessonPlan, levelId), config.mode);
            wildcards = config.mode === 'learn' ? getLayouts(getCurrentLevelFromLessonPlan(lessonPlan, levelId), 'wildcard') : [];
            wildcardLayouts = wildcards.length > 0 ? getCollectionLayouts(wildcards, collection) : [];

            increment++;

            iterateOverLevelsCheckingForAvailableLayouts(increment);
        }     

        iterateOverLevelsCheckingForAvailableLayouts(0);

        return { lessonName, levelName, layouts, wildcardLayouts };
    }

    if(collection.isLevelComplete) {
        const levelId = collection.lesson.level.id + 1;
        collection.lesson.level = lessonPlan.levels.find(level => level.id === levelId);
    }

    const { layouts, wildcardLayouts } = goToNextLevelThatHasLayouts(collection, lessonPlan);

    return createLesson(
        lessonPlan,
        layouts, 
        [ summary, history ],
        collection,
        wildcardLayouts
    );        
};

const getCurrentLevelFromLessonPlan = (lessonPlan, levelId) => {
    return lessonPlan.levels.find(level => level.id === levelId);
}

const getLayouts = (currentLevel, mode) => {    
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