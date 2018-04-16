import { lessonPlans } from 'syllabus/lesson-plans';
import { createLesson } from 'syllabus/lesson-helpers';
import { screens } from 'ui/layouts/species-layouts';

const { summary, history } = screens;

const createLessonPlan = (lessonName, levelName, moduleSize, excludeRevision = false) => {
    return createLesson(
        lessonName, 
        levelName, 
        moduleSize, 
        currentLayouts(lessonName, levelName), 
        [ summary, history ], 
        excludeRevision);        
};

const currentLayouts = (lessonName, levelName) => {
    return currentLevel(currentLesson(lessonName), levelName).layouts;
};

const currentLesson = lessonName => {
    const lessons = lessonPlans.filter(lesson => lesson.name === lessonName);
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