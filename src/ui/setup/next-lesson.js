import { store } from 'redux/store';
import { stats } from 'ui/helpers/stats';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { speciesState } from 'redux/reducers/initial-state/initial-species-state';
import { lessonPlans } from 'snapdragon/lesson-plans';

export const nextLesson = (config) => {

    if(config.collection.id === 0) return;

    const { lessonPlan, collection, score, history, collections } = store.getState();

    const isLessonPlanRequired = score.total === 0 || collection.currentRound === collection.rounds; //this is the problem, not reliable...

    let lesson;

    let defaultLessonPlan = lessonPlan || lessonPlans.find(lessonPlan => lessonPlan.id === 1 && lessonPlan.portrait === config.isPortraitMode);
    
    if(isLessonPlanRequired) {

        let _collection = { ...collection };

        switch(config.mode) {
            case 'review':
                _collection.items = stats.getItemsForRevision(collection, history, 1);
                break;
            case 'learn':
                _collection.items = _collection.items || speciesState.initCollection(collections.find(c => c.id === _collection.id)).items;
                break;
            default:
                break;
        }

        _collection.moduleSize = config.moduleSize;
        _collection.rounds = Math.ceil(_collection.items.length / _collection.moduleSize);
        _collection.itemIndex = 0;        

        lesson = { ...defaultLessonPlan, ...lessonPlanner.createLessonPlan(defaultLessonPlan, config, _collection) }

        lesson.collection = _collection;
    }     

    actions.boundNextLessonPlan(lesson);
};