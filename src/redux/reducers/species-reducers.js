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

export const collection = (state = { id: 0, descriptions: null, currentRound: 0, rounds: 0, isNewRound: true }, action) => {

    const getNextItem = (action, state) => {
        let itemIndex = action.data;
        let nextItem = state.items[itemIndex];
        let layoutCounter = state.layoutCounter ? state.layoutCounter + 1 : 1;
        let isNewRound = layoutCounter = state.layoutCount;
        return { itemIndex, nextItem, layoutCounter, isNewRound };
    };

    const getNextRound = state => {
        let noLessonSelected = state.rounds === 0;
        let nextRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;
        let isLevelComplete = noLessonSelected ? false : state.currentRound === state.rounds;
        let itemIndex = state.moduleSize * (nextRound -1);
        let nextItem = state.items[itemIndex];
        if(isLevelComplete) {
            itemIndex = 0;
            nextRound = 1;
            nextItem = state.items[itemIndex];        
        }
        let layoutCounter = 1;
        return { nextRound, isLevelComplete, itemIndex, nextItem, layoutCounter };
    };

    const getNewCollection = (action, state) => {
        let config = action.data.config;
        let items = action.data.items;
        let selectedCollection = state.collections.find(collection => collection.id === config.collection.id);
        selectedCollection.items = items;
        let collection = state.initCollection(selectedCollection)
        let nextItem = collection.items[collection.itemIndex];
        return { collection, nextItem };
    };

    const getNextLesson = (action, state) => {
        let lessonPlan = action.data;
        let isRevision = !!(lessonPlan && lessonPlan.collection);
        let isNewRound = state.layoutCounter = state.layoutCount;
        let layoutCounter = 1;
        return { lessonPlan, isRevision, layoutCounter, isNewRound };
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
            const { collection, nextItem } = getNewCollection(action, speciesState);
            return { ...state, ...collection, nextItem };
        }
        case types.NEXT_ITEM: {
            const { itemIndex, nextItem, layoutCounter } = getNextItem(action, state);
            return { ...state, itemIndex, nextItem, layoutCounter };
        }
        case types.NEXT_ROUND: {
            const { itemIndex, nextRound, nextItem, isLevelComplete, layoutCounter } = getNextRound(state);
            return { ...state, itemIndex, currentRound: nextRound, nextItem, isLevelComplete, layoutCounter };
        }
        case types.NEXT_LESSON: {
            const { lessonPlan, isRevision, layoutCounter, isNewRound } = getNextLesson(action, state);
            const collection = isRevision ? lessonPlan.collection : state;
            return { ...collection, isNewRound: false, layoutCounter, layoutCount: action.data.layoutCount, isNewRound };
        }
        default: {
            return state; 
        }
    }
};