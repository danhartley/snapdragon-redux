import { createLesson } from 'syllabus/lesson-builder';
import { layouts } from 'snapdragon/screen-layouts';
import { getCollectionLayouts } from 'redux/reducers/initial-state/species-state/collection-layouts';
import { familyProps } from 'redux/reducers/initial-state/species-state/species-taxa';

const { summary, history } = layouts;

const createLessonPlan = (lessonPlan, config, collection) => {

    collection.moduleSize = collection.moduleSize || config.moduleSize;
    const rounds = collection.items.length / collection.moduleSize;
    collection.rounds = collection.items.length % collection.moduleSize === 0 ? rounds : rounds === 1 ? 1 : Math.floor(rounds) + 1;

    collection.lesson = collection.lesson || { ...lessonPlan, level: { id: 1 } };

    collection.families = familyProps.getFamilyNames(collection.items);
    collection.familyStats = familyProps.getFamilyStats(collection.items);

    collection.itemGroups = getItemGroups(collection);
    collection.itemGroup = collection.itemGroups[collection.currentRound - 1];
    collection.itemGroupFamilies = collection.itemGroup.map(i => { return { index: i, family: collection.families[i] }; });
    collection.activeLevelCount = lessonPlan.levels.filter(level => level.layouts.length > 0).length;

    const goToNextLevelThatHasLayouts = (collection, lessonPlan, levelId) => {

        let layouts = [], wildcardLayouts = [];
        let wildcards = [], lessonName = '', levelName = '';        
        
        const iterateOverLevelsCheckingForAvailableLayouts = (intialValue, levelId) => {
            
            let increment = intialValue;

            if(layouts.length > 0 || wildcardLayouts.length > 0) return;

            const level = lessonPlan.levels.find(level => level.id === levelId + increment);
            collection.lesson.level = level;
            collection.lessonName = collection.lesson.name;
            collection.levelName = collection.lesson.level.name;
            layouts = getLayouts(getCurrentLevelFromLessonPlan(lessonPlan, levelId + increment), config.mode);
            wildcards = config.mode === 'learn' ? getLayouts(getCurrentLevelFromLessonPlan(lessonPlan, levelId + increment), 'wildcard') : [];
            wildcardLayouts = wildcards.length > 0 ? getCollectionLayouts(wildcards, collection) : [];

            increment++;

            iterateOverLevelsCheckingForAvailableLayouts(increment, levelId);
        }     
        
        iterateOverLevelsCheckingForAvailableLayouts(0, levelId);

        return { lessonName, levelName, layouts, wildcardLayouts };
    }

    let levelId = collection.lesson.level.id;

    if(collection.isLevelComplete) {
        levelId++;
        collection.lesson.level = lessonPlan.levels.find(level => level.id === levelId);
    }

    const { layouts, wildcardLayouts } = goToNextLevelThatHasLayouts(collection, lessonPlan, levelId);

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