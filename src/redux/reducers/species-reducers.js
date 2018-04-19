
import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

export const collections = (state = initialState.collections, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export const collection = (state = initialState.collection, action) => {

    let newState = { ...state };
    let itemIndex = 0;

    switch(action.type) {        
        case types.NEXT_ITEM:        
            itemIndex = action.data;
            newState.itemIndex = 
                itemIndex % newState.moduleSize === 0 
                    ? newState.moduleSize * (newState.currentRound) 
                    : newState.moduleSize * (newState.currentRound) + itemIndex;
            return newState;
        case types.NEXT_ROUND:
            const currentRound = state.currentRound + 1;
            newState.currentRound = currentRound;
            itemIndex = action.data + (newState.moduleSize * newState.currentRound);
            newState.itemIndex = itemIndex;
            return newState;
        case types.CHANGE_COLLECTION:
            const collection = initialState.collections.filter(collection => collection.id === action.data)[0].collection;            
            return initialState.initCollection(collection);
        default:
            return state;
    }
};