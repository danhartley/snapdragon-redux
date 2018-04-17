import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = (lesson) => {

    const { config } = store.getState();

    // option to check db, local storage, etc. for user-specific lesson config settings
    // this only runs once, after that lessons, layouts and lesson items come from the reset action event

    const layouts = lessonPlanner.createLessonPlan(config.lessonName, config.levelName, config.moduleSize);

    actions.boundNextLesson(layouts);
};