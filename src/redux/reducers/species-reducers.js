import * as R from 'ramda';

import { types } from 'redux/actions/action-types';
import { snapdragonCollections } from 'snapdragon-config/snapdragon-collections';

export const collections = (state = snapdragonCollections, action) => {
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

export const collection = (state = { id: 0 }, action) => {

    const getNextRound = (action, state) => {        

        let lesson = action.data.lesson;
        let currentRound = (lesson.currentRound === lesson.rounds) ? 1 : lesson.currentRound + 1;
        let itemIndex = (lesson.moduleSize * (currentRound - 1));
        let nextItem = state.items[itemIndex];
        
        if(lesson.isLevelComplete) {
            itemIndex = 0;
            nextItem = state.items[itemIndex];
        }        
        return { itemIndex, nextItem };
    };

    const updateCollection = (state, action) => {
        
        let collection = { ...state, ...action.data.collection };
        if(state.id && state.id === action.data.collection.id ) {
            collection.itemIndex = state.itemIndex;
        }
        let nextItem = collection.items[collection.itemIndex];
        
        if(action.data.config.mode === 'review') {
            collection.allItems = action.data.collection.allItems;
        }

        if(action.data.config.mode === 'learn-again') {
            collection.currentRound = collection.rounds;
            collection.isNextRound = true;
            collection.isLevelComplete = true;
            collection.itemIndex = 0;
            collection.nextItem = collection.items[collection.itemIndex];
            collection.currentRound = 1;
        }

        return { collection, nextItem };
    };
    
    switch(action.type) {

        case 'persist/REHYDRATE':
            return state;

        case types.SELECT_COLLECTION: {
            return action.data;
        }
        case types.UPDATE_COLLECTION_ITEMS: {
            const collection = R.clone(state);
            collection.excludedItems = action.data.filter(item => item.isDeselected);
            collection.items = action.data.filter(item => !item.isDeselected);
            collection.allItems = [ ...collection.items, ...collection.excludedItems ];
            return collection;
        }

        case types.NEW_COLLECTION: {
            return { ...state, ...action.data.collection };
        }

        case types.UPDATE_COLLECTION: {
            const { collection, nextItem } = updateCollection(state, action);
            return { ...state, ...collection, nextItem };
        }

        case types.NEXT_LAYOUT: {
            return { ...state, layoutName: action.data.name };
        }            

        case types.NEXT_ITEM: {
            let itemIndex = action.data;
            let nextItem = state.items[itemIndex];
            return { ...state, itemIndex, nextItem };
        }

        case types.NEXT_ROUND: {
            const { itemIndex, nextItem } = getNextRound(action, state);
            return { ...state, itemIndex, nextItem };
        }

        case types.NEXT_LESSON: {
            const collection = { ...state, ...action.data.collection };
            return { ...state, collection };
        }

        case types.NEXT_LEVEL: {
            return { ...state, currentRound: 1 };
        }

        default: {
            return state; 
        }
    }
};