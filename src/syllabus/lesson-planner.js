import { lessonPlans } from 'snapdragon/lesson-plans';
import { createLesson } from 'syllabus/lesson-builder';
import { screens } from 'snapdragon/screen-layouts';
import { getWildcardLayouts } from 'redux/reducers/initial-state/species-state/species-wildcards';

const { summary, history, specimen, epithets, cultivarCard, cultivar, wildcardCard, wildcard, definitions } = screens;

const createLessonPlan = (config, collection) => {
    const moduleSize = collection.moduleSize || config.moduleSize;
    const { lesson: { name: lessonName, level: { name: levelName }}, excludeRevision, isPortraitMode } = config;
    const wildcardLayouts = getWildcardLayouts([ [specimen, epithets], [specimen, cultivarCard, cultivar], [specimen, wildcardCard, wildcard], [specimen, definitions] ], collection, moduleSize);
    const layouts = getLayouts(config);
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

const getLayouts = (config) => {
    const { lesson: { name: lessonName, level: { name: levelName }}, isPortraitMode } = config;
    const currentLesson = getCurrentLesson(lessonName, isPortraitMode);
    const currentLevel = getCurrentLevel(currentLesson, levelName);
    return currentLevel.layouts;
};

const getCurrentLesson = (lessonName, isPortraitMode = false) => {
    const lessons = lessonPlans.filter(lesson => lesson.name === lessonName && lesson.portrait === isPortraitMode);
    return lessons[0];
};

const getCurrentLevel = (lesson, levelName) => { 
    const levels = lesson.levels.filter(level => level.name === levelName);
    return levels[0];
};

const getNextLevelId = (lesson, level, direction) => {
    const id = (direction === 'forwward') ? level.id + 1 : level.id - 1;
    if(id > lesson.levels.length || id === 0)
    return level.id;
    return id;
};

const changeLevel = (currentLessonName, currentLevelName, direction, isPortraitMode = false) => {
    const lesson = getCurrentLesson(currentLessonName, isPortraitMode);
    const level = getCurrentLevel(lesson, currentLevelName);
    const levelId = getNextLevelId(lesson, level, direction);
    const levels = lesson.levels.filter(level => level.id === levelId);
    return { ...levels[0], lessonName: lesson.name };
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