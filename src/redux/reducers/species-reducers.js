
import { types } from 'redux/actions/action-types';
import { InitialState } from 'redux/reducers/initial-state-for-reducers';

export const collections = (state = InitialState.collections, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export const collection = (state = InitialState.collection, action) => {
    switch(action.type) {
        case types.CHANGE_COLLECTION:
            return action.data;
        default:
            return state;
    }
}

export const items = (state = InitialState.items, action) => {
    switch(action.type) {
        case types.CHANGE_ITEMS:
            return action.data;
        case types.NEXT_SET:
            
        default:
            return state;
    }
};

export const item = (state = InitialState.item, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return {...state, ...action.data};
        case types.CHANGE_ITEMS:
            return action.data[0];
        default:
            return state;
    }
};