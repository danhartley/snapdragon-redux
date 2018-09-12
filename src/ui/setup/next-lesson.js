import { store } from 'redux/store';
import { stats } from 'ui/helpers/stats';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { lessonPlans } from 'snapdragon/lesson-plans';

export const nextLesson = (counter) => {

    const { lessonPlan, history, collection, config } = store.getState();

    if(counter.isLessonPaused || config.collection.id === 0) return;
    
    let lesson;

    let planId = config.isPortraitMode ? 3 : 1;
    let defaultLessonPlan = lessonPlan || lessonPlans.find(plan => plan.id === planId && plan.portrait === config.isPortraitMode);
    
    if(collection.isNextRound) {

        switch(config.mode) {
            // todo: review review
            case 'review': 
                collection.itemsToReview = stats.getItemsForRevision(collection, history, 1);
                collection.rounds = Math.ceil(collection.items.length / collection.moduleSize);
                collection.itemIndex = 0;
                break;
            case 'learn':
                break;
            default:
                break;
        }

        lesson = { ...defaultLessonPlan, ...lessonPlanner.createLessonPlan(defaultLessonPlan, config, collection) };        
        
        if(config.mode === 'review') {
            lesson.collection = collection;
        }        
    } else {
        lesson = defaultLessonPlan;
    }

    collection.layoutCount = lesson.layoutCount;

    actions.boundNextLessonPlan(lesson);
};