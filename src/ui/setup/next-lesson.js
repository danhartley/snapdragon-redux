import * as R from 'ramda';

import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { stats } from 'ui/helpers/stats';
import { lessonPlanner } from 'syllabus/lesson-planner';
import { actions } from 'redux/actions/action-creators';
import { speciesState } from 'redux/reducers/initial-state/initial-species-state';

export const nextLesson = (config) => {

    if(config.collection.id === 0) return;

    const { lessonPlan, collection, score, history, collections } = store.getState();

    // config.excludeRevision = config.lesson.level.id !== 1;

    const isLessonPlanRequired = score.total === 0;

    let newLessonPlan = lessonPlan;
    
    if(isLessonPlanRequired) {

        let _collection = { ...collection };

        switch(config.mode) {
            case 'review':
                _collection.items = stats.getItemsForRevision(collection, history, 1);
                break;
            case 'learn':
                _collection.items = speciesState.initCollection(collections.find(c => c.id === _collection.id)).items;
                break;
            default:
                break;
        }

        _collection.moduleSize = config.moduleSize;
        _collection.rounds = Math.ceil(_collection.items.length / _collection.moduleSize);
        _collection.itemIndex = 0;        

        newLessonPlan = { ...newLessonPlan, ...lessonPlanner.createLessonPlan(config, _collection) }

        newLessonPlan.collection = _collection;
    }     

    actions.boundNextLessonPlan(newLessonPlan);
};