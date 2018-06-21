
import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

export const collections = (state = initialState.collections, action) => {
    switch(action.type) {
        case types.SELECT_COLLECTION:
            const cols = [ ...state ];
            cols.forEach(col => {
                if(col.id === action.data) {
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

export const collection = (state = null, action) => {

    let itemIndex = 0;
    let currentRound = 0;
    let layoutIndex = 0;
    
    switch(action.type) {
        case types.CHANGE_COLLECTION:
            const config = action.data;
            const collection = initialState.collections.filter(collection => collection.id === config.collection.id)[0];
            return initialState.initCollection(collection);
        case types.NEXT_ITEM:
            layoutIndex = action.data;
            const isNewRound = layoutIndex % state.moduleSize === 0;
            itemIndex = isNewRound
                    ? (state.moduleSize * (state.currentRound -1))
                    : (state.moduleSize * (state.currentRound -1)) + layoutIndex;
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