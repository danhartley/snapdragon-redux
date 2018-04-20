
import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

export const collections = (state = initialState.collections, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export const collection = (state = initialState.collection, action) => {

    let collection = {};
    let itemIndex = 0;
    let currentRound = 0;

    switch(action.type) {
        case types.NEXT_ITEM:
        const layoutIndex = action.data;        
            itemIndex = 
                layoutIndex % state.moduleSize === 0 
                    ? (state.moduleSize * state.currentRound) 
                    : (state.moduleSize * state.currentRound) + layoutIndex;
            return { ...state, itemIndex };
        case types.NEXT_ROUND:
            currentRound = state.currentRound + 1;
            itemIndex = action.data + (state.moduleSize * currentRound);
            return { ...state, itemIndex, currentRound };
        case types.CHANGE_COLLECTION:
            const collection = initialState.collections.filter(collection => collection.id === action.data)[0];
            return initialState.initCollection(collection);
        default:
            return state;
    }
};