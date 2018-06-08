import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = (config) => {

    if(config.collection.id === '') return;

    config.excludeRevision = config.lesson.level.id !== 1;

    const layouts = lessonPlanner.createLessonPlan(config);

    actions.boundNextLesson(layouts);
};