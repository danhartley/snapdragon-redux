import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = (lesson) => {

    const { config } = store.getState();

    const layouts = lessonPlanner.createLessonPlan(config.lessonName, config.levelName, config.moduleSize);

    actions.boundNextLesson(layouts);
};