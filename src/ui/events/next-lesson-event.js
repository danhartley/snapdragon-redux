import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const prepareLesson = (lesson) => {

    const { config } = store.getState();

    // option to check db, local storage, etc. for user-specific lesson config settings
    // this only runs once, after that lessons, layouts and lesson items come from the reset action event

    // require:
    // collection
    // layout/lesson plan

    // const lessonName = config.lessons.filter(lesson => lesson.id === config.active.lesson)[0].name;
    // const levelName = config.levels.filter(level => level.id === config.active.level)[0].name;

    // const lesson = { lessonName, levelName, moduleSize: config.moduleSize}
    // then boundNextLesson(lesson)

    const nextLessonLayouts = lessonPlanner.createLessonPlan(config.lessonName, config.levelName, config.moduleSize);

    actions.boundNextLesson(nextLessonLayouts);
};