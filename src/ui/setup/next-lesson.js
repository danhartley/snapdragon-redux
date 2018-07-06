import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = (config) => {

    if(config.collection.id === '') return;

    const { layouts, collection } = store.getState();

    config.excludeRevision = config.lesson.level.id !== 1;

    // const isLessonPlanRequired = layouts ? (layouts[0].lessonName !== config.lesson.name || layouts[0].levelName !== config.lesson.level.name) : true;

    // const _layouts = isLessonPlanRequired ? lessonPlanner.createLessonPlan(config, collection) : layouts;

    const _layouts = lessonPlanner.createLessonPlan(config, collection);

    actions.boundNextLesson(_layouts);
};