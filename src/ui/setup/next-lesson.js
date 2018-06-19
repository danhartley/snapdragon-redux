import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const nextLesson = (config) => {

    if(config.collection.id === '') return;

    const { layouts } = store.getState();

    config.excludeRevision = config.lesson.level.id !== 1;

    const isLessonPlanRequired = layouts ? (layouts[0].lessonName !== config.lessonName || layouts[0].levelName !== config.levelName) : true;

    const _layouts = isLessonPlanRequired ? lessonPlanner.createLessonPlan(config) : layouts;

    actions.boundNextLesson(_layouts);
};