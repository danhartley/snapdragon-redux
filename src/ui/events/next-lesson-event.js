import { store } from 'redux/store';
import { prepareLessonPlan } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';

export const prepareNextLesson = (index) => {

    if(index > 0) return;

    const { lesson } = store.getState();

    // option to check db, local storage, etc. for user-specific lesson data

    if(lesson.length > 0) return;

    const nextLesson = prepareLessonPlan(lesson.active, lesson.moduleSize);

    actions.boundNextLesson(nextLesson);

};