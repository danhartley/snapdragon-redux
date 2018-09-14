import { lessonPlans } from 'snapdragon/lesson-plans';
import { createLesson } from 'syllabus/lesson-builder';
import { screens } from 'snapdragon/screen-layouts';
import { getWildcardLayouts } from 'redux/reducers/initial-state/species-state/species-wildcards';

const { summary, history } = screens;

const createLessonPlan = (lessonPlan, config, collection) => {

    if(collection.isLevelComplete) {
        collection.lesson.level = getNextLevel(collection.lesson.name, collection.lesson.level.name, config.isPortraitMode);
        collection.currentRound = 1;
    }
    const moduleSize = collection.moduleSize || config.moduleSize;
    let { lesson: { name: lessonName, level: { name: levelName }}, excludeRevision, isPortraitMode } = collection;
    const wildcards = config.mode === 'learn' ? getLayouts(lessonPlan, collection, config, 'wildcard') : [];
    let wildcardLayouts = wildcards.length > 0 ? getWildcardLayouts(wildcards, collection, moduleSize) : [];
    let layouts = getLayouts(lessonPlan, collection, config, config.mode);

    // if none selected in planner

    if(layouts.length === 0 && wildcardLayouts.length === 0) {
        const level = getNextLevel(collection.lesson.name, collection.lesson.level.name, config.isPortraitMode);
        collection.lesson.level = level;
        lessonName = collection.lesson.name;
        levelName = collection.lesson.level.name;
        layouts = getLayouts(null, collection, config, config.mode);
    }

    return createLesson(
        lessonName,
        levelName, 
        moduleSize, 
        excludeRevision,
        isPortraitMode, 
        layouts, 
        [ summary, history ],
        collection,
        wildcardLayouts
    );        
};

const getLayouts = (lessonPlan, collection, config, mode) => {
    const { lesson: { level: { name: levelName }} } = collection;
    const currentLesson = lessonPlan || getCurrentLesson(lessonPlans, collection.lesson.name, config.isPortraitMode);
    const currentLevel = getCurrentLevel(currentLesson, levelName);
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

const getCurrentLesson = (lessonPlans, lessonName, isPortraitMode = false) => {
    const lessons = lessonPlans.find(lesson => lesson.name === lessonName && lesson.portrait === isPortraitMode);
    return lessons;
};

const getCurrentLevel = (lesson, levelName) => { 
    const level = lesson.levels.find(level => level.name === levelName);
    return level;
};

const getNextLevelId = (lesson, level, direction) => {
    const id = (direction === 'forwward') ? level.id + 1 : level.id - 1;
    if(id > lesson.levels.length || id === 0)
    return level.id;
    return id;
};

const changeLevel = (currentLessonName, currentLevelName, direction, isPortraitMode = false) => {
    const lesson = getCurrentLesson(lessonPlans, currentLessonName, isPortraitMode);
    const level = getCurrentLevel(lesson, currentLevelName);
    const levelId = getNextLevelId(lesson, level, direction);
    const nextLevel = lesson.levels.find(level => level.id === levelId);
    return { ...nextLevel, lessonName: lesson.name };
};

const getNextLevel = (currentLessonName, currentLevelName, isPortraitMode = false) => {
    return changeLevel(currentLessonName, currentLevelName, 'forwward', isPortraitMode);
};

const getPreviousLevel = (currentLessonName, currentLevelName, isPortraitMode = false) => {
    return changeLevel(currentLessonName, currentLevelName, 'backward', isPortraitMode);
};

export const lessonPlanner = {
    createLessonPlan,
    getNextLevel,
    getPreviousLevel
}