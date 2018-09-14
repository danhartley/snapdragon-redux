import { store } from 'redux/store';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { lessonPlans } from 'snapdragon/lesson-plans';

export const nextLesson = (counter) => {

    const { lessonPlan, collection, config } = store.getState();

    if(counter.isLessonPaused || config.collection.id === 0) return;
    
    let lesson;

    let planId = config.isPortraitMode ? 3 : 1;
    let defaultLessonPlan = lessonPlan || lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode);
    
    if(collection.isNextRound) {
        lesson = { ...defaultLessonPlan, ...lessonPlanner.createLessonPlan(defaultLessonPlan, config, collection) };        
        collection.layoutCount = lesson.layoutCount;
        actions.boundNextLessonPlan(lesson);
    }
};