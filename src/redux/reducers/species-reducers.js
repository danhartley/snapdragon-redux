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
        case types.UPDATE_COLLECTIONS: {
            return [ ...state, action.data ];
        }
        case types.PAUSE_LESSON: {
            return state;
        }
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
            collection.itemIndex = 0;
            collection.nextItem = collection.items[collection.itemIndex];            
        }

        return { collection, nextItem };
    };
    
    switch(action.type) {

        case 'persist/REHYDRATE': {
            return state;
        }

        case types.SELECT_COLLECTION: {
            return action.data;
        }
        case types.UPDATE_COLLECTION_ITEMS: {
            const collection = R.clone(state);
            collection.items = action.data.filter(item => !item.isDeselected);
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
            const layout = action.data;
            return layout.bonus ? state : state;
            // return layout.bonus ? state : { ...state, layoutName: layout.name };
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
            return { ...state, ...collection };
        }

        case types.NEXT_LEVEL: {
            return state;
        }

        case types.PAUSE_LESSON: {
            return { id: 0 };
        }

        case types.RESTART_LESSON: {
            return action.data.collection;   
        }

        default: {
            return state; 
        }
    }
};

export const bonusLayout = (state = null, action) => {

    switch(action.type) {

        case 'persist/REHYDRATE': {
            return state;
        }

        case types.NEXT_LAYOUT: {
            const layout = action.data;

            if(layout.bonus) {
                state = layout;
            }
            return state;
        }

        case types.PAUSE_LESSON: {
            return null;
        }

        case types.RESTART_LESSON: {
            return action.data.bonusLayout;   
        }

        default: {
            return state; 
        }
    }
};