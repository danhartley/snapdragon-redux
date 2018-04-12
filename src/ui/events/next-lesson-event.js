import { store } from 'redux/store';
import { createLessonPlan } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

let hasInitiatedLesson = false;

export const prepareNextLesson = (index) => {

    if(hasInitiatedLesson) return;

    hasInitiatedLesson = true;

    const { config } = store.getState();

    // option to check db, local storage, etc. for user-specific lesson config settings
    // this only runs once, after that lessons, layouts and lesson items come from the reset action event

    const lessonName = config.lessons.filter(lesson => lesson.id === config.active.lesson)[0].name;
    const levelName = config.levels.filter(level => level.id === config.active.level)[0].name;

    const nextLessonLayouts = createLessonPlan(lessonName, levelName, config.moduleSize);

    actions.boundNextLesson(nextLessonLayouts);
};