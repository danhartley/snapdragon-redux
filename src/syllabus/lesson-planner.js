import { lessonPlans } from 'snapdragon/lesson-plans';
import { createLesson } from 'syllabus/lesson-builder';
import { screens } from 'snapdragon/screen-layouts';

const { summary, history, specimen, multichoice } = screens;

const createLessonPlan = (config, collection) => {
    const { lesson: { name: lessonName, level: { name: levelName }}, moduleSize, excludeRevision, isPortraitMode } = config;
    return createLesson(
        lessonName, 
        levelName, 
        moduleSize, 
        excludeRevision,
        isPortraitMode, 
        currentLayouts(config), 
        [ summary, history ],
        createWildcardLayouts([ [specimen, multichoice] ], collection, moduleSize)
    );        
};

const createWildcardLayouts = (wildcards, collection, moduleSize) => {
    const epithets = collection.wildcards.find(wildcard => wildcard.name === 'epithets');    
    const layouts = [];
    epithets.items.forEach(item => {
        const screens = [ wildcards[0][0], wildcards[0][1] ];
        layouts.push({ name: 'test', score: 1, screens, itemIndex: item.index % moduleSize, epithet: item});
    });
    return layouts;
};

const currentLayouts = (config) => {
    const { lesson: { name: lessonName, level: { name: levelName }}, isPortraitMode } = config;
    const _currentLesson = currentLesson(lessonName, isPortraitMode);
    const _currentLevel = currentLevel(_currentLesson, levelName);
    return _currentLevel.layouts;
};

const currentLesson = (lessonName, isPortraitMode = false) => {
    const lessons = lessonPlans.filter(lesson => lesson.name === lessonName && lesson.portrait === isPortraitMode);
    return lessons[0];
};

const currentLevel = (lesson, levelName) => { 
    const levels = lesson.levels.filter(level => level.name === levelName);
    return levels[0];
};

const nextLevelId = (lesson, level, direction) => {
    const id = (direction === 'forwward') ? level.id + 1 : level.id - 1;
    if(id > lesson.levels.length || id === 0)
    return level.id;
    return id;
};

const changeLevel = (currentLessonName, currentLevelName, direction, isPortraitMode = false) => {
    const lesson = currentLesson(currentLessonName, isPortraitMode);
    const level = currentLevel(lesson, currentLevelName);
    const levelId = nextLevelId(lesson, level, direction);
    const levels = lesson.levels.filter(level => level.id === levelId);
    return { ...levels[0], lessonName: lesson.name };
};

const nextLevel = (currentLessonName, currentLevelName, isPortraitMode = false) => {
    return changeLevel(currentLessonName, currentLevelName, 'forwward', isPortraitMode);
};

const previousLevel = (currentLessonName, currentLevelName, isPortraitMode = false) => {
    return changeLevel(currentLessonName, currentLevelName, 'backward', isPortraitMode);
};

export const lessonPlanner = {
    createLessonPlan,
    nextLevel,
    previousLevel
}