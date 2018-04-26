import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = () => {

    const { config } = store.getState();

    const excluedRevision = config.lesson.level.id !== 1;

    const layouts = lessonPlanner.createLessonPlan(config.lesson.name, config.lesson.level.name, config.moduleSize, excluedRevision);

    actions.boundNextLesson(layouts);
};