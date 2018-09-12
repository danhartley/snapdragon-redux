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

export const collection = (state = { id: 0, descriptions: null, currentRound: 0, rounds: 0, isNextRound: true }, action) => {

    const getNextItem = (action, state) => {
        let itemIndex = action.data;
        let nextItem = state.items[itemIndex];
        let layoutCounter = state.layoutCounter ? state.layoutCounter + 1 : 1;
        let isNextRound = layoutCounter === state.layoutCount;
        let noLessonSelected = state.rounds === 0;
        let isLevelComplete = noLessonSelected ? false : state.currentRound === state.rounds;
        return { itemIndex, nextItem, layoutCounter, isNextRound, isLevelComplete };
    };

    const getNextRound = state => {        
        let nextRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;
        let itemIndex = state.moduleSize * (nextRound -1);
        let nextItem = state.items[itemIndex];
        if(state.isLevelComplete) {
            itemIndex = 0;
            nextRound = 1;
            nextItem = state.items[itemIndex];
        }
        let layoutCounter = 0;
        return { nextRound, itemIndex, nextItem, layoutCounter };
    };

    const changeCollection = (action, state) => {
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
        let isNextRound = state.layoutCounter === state.layoutCount;
        return { lessonPlan, isRevision, isNextRound };
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
            const { collection, nextItem } = changeCollection(action, speciesState);
            return { ...state, ...collection, nextItem };
        }
        case types.NEXT_ITEM: {
            const { itemIndex, nextItem, layoutCounter, isNextRound, isLevelComplete } = getNextItem(action, state);
            return { ...state, itemIndex, nextItem, layoutCounter, isNextRound, isLevelComplete };
        }
        case types.NEXT_ROUND: {
            const { itemIndex, nextRound, nextItem, layoutCounter } = getNextRound(state);
            return { ...state, itemIndex, currentRound: nextRound, nextItem, layoutCounter };
        }
        case types.NEXT_LESSON: {
            const { lessonPlan, isRevision, isNextRound } = getNextLesson(action, state);
            const collection = isRevision ? lessonPlan.collection : state;
            return { ...collection, isNextRound: false, layoutCount: action.data.layoutCount, isNextRound };
        }
        default: {
            return state; 
        }
    }
};