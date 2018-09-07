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

export const collection = (state = { name: '---', id: 0, descriptions: null }, action) => {

    let itemIndex = 0;
    let nextItem = {};
    let currentRound = 0;
    let layoutIndex = 0;
    
    switch(action.type) {
        case types.SELECT_COLLECTION:
            return action.data;
        case types.CHANGE_COLLECTION_ITEMS:
            const _collection = R.clone(state);
            _collection.items = action.data;
            return _collection;
        case types.CHANGE_COLLECTION:
            const config = action.data.config;
            const items = action.data.items;
            const selectedCollection = speciesState.collections.find(collection => collection.id === config.collection.id);
            selectedCollection.items = items;
            const collection = speciesState.initCollection(selectedCollection)
            nextItem = collection.items[collection.itemIndex];
            return { ...state, ...collection, nextItem };
        case types.NEXT_LESSON: 
            return (action.data && action.data.collection) ? action.data.collection : state;
        case types.NEXT_ITEM:
            itemIndex = action.data;
            nextItem = state.items[itemIndex];
            return { ...state, itemIndex, nextItem };
        case types.NEXT_ROUND:
            layoutIndex = action.data;
            currentRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;
            itemIndex = state.moduleSize * (currentRound -1);
            nextItem = state.items[itemIndex];
            const isLevelComplete = currentRound === state.rounds;
            return { ...state, itemIndex, currentRound, nextItem, isLevelComplete };
        case types.NEXT_LEVEL:
            itemIndex = 0;
            currentRound = 1;
            nextItem = state.items[itemIndex];
            return { ...state, itemIndex, currentRound, nextItem };        
        
        default:
            return state;
    }
};