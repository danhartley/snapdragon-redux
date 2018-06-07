import { lessonPlans } from 'snapdragon/lesson-plans';
import { createLesson } from 'syllabus/lesson-builder';
import { screens } from 'snapdragon/screen-layouts';

const { summary, history } = screens;

const createLessonPlan = (config) => {
    const { lesson: { name: lessonName, level: { name: levelName }}, moduleSize, excludeRevision, isPortraitMode } = config;
    return createLesson(
        lessonName, 
        levelName, 
        moduleSize, 
        excludeRevision,
        isPortraitMode, 
        currentLayouts(config), 
        [ summary, history ]);        
};

const currentLayouts = (config) => {
    const { lesson: { name: lessonName, level: { name: levelName }}, isPortraitMode } = config;
    return currentLevel(currentLesson(lessonName, isPortraitMode), levelName).layouts;
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

const changeLevel = (currentLessonName, currentLevelName, direction) => {
    const lesson = currentLesson(currentLessonName);
    const level = currentLevel(lesson, currentLevelName);
    const levelId = nextLevelId(lesson, level, direction);
    const levels = lesson.levels.filter(level => level.id === levelId);
    return { ...levels[0], lessonName: lesson.name };
};

const nextLevel = (currentLessonName, currentLevelName) => {
    return changeLevel(currentLessonName, currentLevelName, 'forwward');
};

const previousLevel = (currentLessonName, currentLevelName) => {
    return changeLevel(currentLessonName, currentLevelName, 'backward');
};

export const lessonPlanner = {
    createLessonPlan,
    nextLevel,
    previousLevel
}