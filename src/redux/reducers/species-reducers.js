import * as R from 'ramda';

import { types } from 'redux/actions/action-types';
import { speciesState } from 'redux/reducers/initial-state/initial-species-state';

export const collections = (state = speciesState.collections, action) => {
    switch(action.type) {
        case types.SELECT_COLLECTION:
            const cols = [ ...state ];
            cols.forEach(col => {
                if(col.id === action.data.id) {
                    col.selected = true;
                } else {
                    col.selected = false;
                }
            });
            return cols;
        default:
            return state;
    }
};

export const collection = (state = { id: 0, descriptions: null, isLessonPlanRequired: true, currentRound: 0, rounds: 0 }, action) => {

    const getNextItem = (action) => {
        let itemIndex = action.data;
        let nextItem = state.items[itemIndex];
        let layoutCounter = layoutCounter ? layoutCount + 1 : 1;
        let isRoundComplete = layoutCounter === collection.layoutCount;
        return { itemIndex, nextItem, isRoundComplete };
    };

    const getNextRound = state => {
        let noLessonSelected = state.rounds === 0;
        let currentRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;
        let isLevelComplete = noLessonSelected ? false : currentRound === state.rounds;
        let itemIndex = state.moduleSize * (currentRound -1);
        let nextItem = state.items[itemIndex];
        if(isLevelComplete) {
            itemIndex = 0;
            currentRound = 1;
            nextItem = state.items[itemIndex];        
        }
        let isLessonPlanRequired = noLessonSelected ? true : isLevelComplete;
        return { currentRound, isLevelComplete, itemIndex, nextItem, isLessonPlanRequired };
    };

    const getNewCollection = action => {
        let config = action.data.config;
        let items = action.data.items;
        let selectedCollection = speciesState.collections.find(collection => collection.id === config.collection.id);
        selectedCollection.items = items;
        let collection = speciesState.initCollection(selectedCollection)
        let nextItem = collection.items[collection.itemIndex];
        return { collection, nextItem };
    };
    
    switch(action.type) {
        case types.SELECT_COLLECTION: {
            return action.data;
        }
        case types.CHANGE_COLLECTION_ITEMS: {
            const _collection = R.clone(state);
            _collection.items = action.data;
            return _collection;
        }
        case types.CHANGE_COLLECTION: {
            const { collection, nextItem } = getNewCollection(action);
            return { ...state, ...collection, nextItem };
        }
        case types.NEXT_ITEM: {
            const { itemIndex, nextItem, isRoundComplete } = getNextItem(action);
            return { ...state, itemIndex, nextItem, isRoundComplete };
        }
        case types.NEXT_ROUND: {
            const { itemIndex, currentRound, nextItem, isLevelComplete, isLessonPlanRequired } = getNextRound(state);
            return { ...state, itemIndex, currentRound, nextItem, isLevelComplete, isLessonPlanRequired };
        }
        case types.NEXT_LESSON: {
            const lessonPlan = action.data;
            const isLessonPlanRequired = false;
            const isRevision = (lessonPlan && lessonPlan.collection);
            const layoutCount = lessonPlan.layoutCount;
            return isRevision ? { ...lessonPlan.collection, isLessonPlanRequired } : { ...state, layoutCount, isLessonPlanRequired };
        }
        default: {
            return state; 
        }
    }
};