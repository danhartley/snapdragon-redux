
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
    let currentRound = 0;
    let layoutIndex = 0;
    
    switch(action.type) {
        case types.SELECT_COLLECTION:
            return action.data;
        case types.CHANGE_COLLECTION:
            const config = action.data;
            const collection = speciesState.collections.find(collection => collection.id === config.collection.id);
            return { ...state, ...speciesState.initCollection(collection) };
        case types.NEXT_ITEM:
            itemIndex = action.data;
            return { ...state, itemIndex };
        case types.NEXT_ROUND:
            layoutIndex = action.data;
            currentRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;
            itemIndex = state.moduleSize * (currentRound -1);
            return { ...state, itemIndex, currentRound };
        case types.NEXT_LEVEL:
            itemIndex = 0;
            currentRound = 1;
            return { ...state, itemIndex, currentRound };        
        default:
            return state;
    }
};