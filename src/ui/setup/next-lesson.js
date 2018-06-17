import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = (config) => {

    if(config.collection.id === '') return;

    const { layouts } = store.getState();

    config.excludeRevision = config.lesson.level.id !== 1;

    const _layouts = layouts || lessonPlanner.createLessonPlan(config);

    actions.boundNextLesson(_layouts);
};