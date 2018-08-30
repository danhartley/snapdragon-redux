
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
    
    const flag = (msg, data) => {
        // console.log(`Collection update triggered by: ${msg}`);
        // console.log(`Action was: ${data}`)
    };

    switch(action.type) {
        case types.SELECT_COLLECTION:
            flag(types.SELECT_COLLECTION, action.data.id);
            return action.data;
        case types.CHANGE_COLLECTION:
            flag(types.CHANGE_COLLECTION, action.data.id);
            const config = action.data;
            const selectedCollection = speciesState.collections.find(collection => collection.id === config.collection.id);
            const collection = speciesState.initCollection(selectedCollection)
            nextItem = collection.items[collection.itemIndex];
            return { ...state, ...collection, nextItem };
        case types.NEXT_LESSON: 
            flag(types.NEXT_LESSON, action.data.levelName);
            return action.data.collection || state;
        case types.NEXT_ITEM:
            flag(types.NEXT_ITEM, action.data);
            itemIndex = action.data;
            nextItem = state.items[itemIndex];
            return { ...state, itemIndex, nextItem };
        case types.NEXT_ROUND:
            flag(types.NEXT_ROUND, action.data.collection);
            layoutIndex = action.data;
            currentRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;
            itemIndex = state.moduleSize * (currentRound -1);
            nextItem = state.items[itemIndex];
            const isLevelComplete = currentRound === state.rounds;
            return { ...state, itemIndex, currentRound, nextItem, isLevelComplete };
        case types.NEXT_LEVEL:
            flag(types.NEXT_LEVEL, action.data ? action.data.index : '');
            itemIndex = 0;
            currentRound = 1;
            nextItem = state.items[itemIndex];
            return { ...state, itemIndex, currentRound, nextItem };        
        
        default:
            return state;
    }
};