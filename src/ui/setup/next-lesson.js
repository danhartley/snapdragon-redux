import { store } from 'redux/store';
import { stats } from 'ui/helpers/stats';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { speciesState } from 'redux/reducers/initial-state/initial-species-state';
import { lessonPlans } from 'snapdragon/lesson-plans';

export const nextLesson = (counter) => {

    console.log('^^ nextLesson ran');
    
    const { lessonPlan, history, collections, collection, config } = store.getState();

    if(config.collection.id === 0) return;
    
    let lesson;

    let defaultLessonPlan = lessonPlan || lessonPlans.find(lessonPlan => lessonPlan.id === 1 && lessonPlan.portrait === config.isPortraitMode);
    
    if(collection.isLessonPlanRequired) {

        switch(config.mode) {
            case 'review':
                collection.items = stats.getItemsForRevision(collection, history, 1);
                break;
            case 'learn':
                collection.items = collection.items || speciesState.initCollection(collections.find(c => c.id === collection.id)).items;
                break;
            default:
                break;
        }

        collection.rounds = Math.ceil(collection.items.length / collection.moduleSize);
        collection.itemIndex = 0;        

        lesson = { ...defaultLessonPlan, ...lessonPlanner.createLessonPlan(defaultLessonPlan, config, collection) }

        lesson.collection = collection;

        actions.boundNextLessonPlan(lesson);
    }         
};