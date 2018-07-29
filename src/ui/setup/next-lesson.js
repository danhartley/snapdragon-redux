import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = (config) => {

    if(config.collection.id === '') return;

    const { lessonPlan, collection, score } = store.getState();

    config.excludeRevision = config.lesson.level.id !== 1;

    const isLessonPlanRequired = score.total === 0;

    const _lessonPlan = isLessonPlanRequired ? lessonPlanner.createLessonPlan(config, collection) : lessonPlan;

    actions.boundNextLesson(_lessonPlan);
};