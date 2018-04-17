
import { types } from 'redux/actions/action-types';
import { initialState } from 'redux/reducers/initial-state-for-reducers';

export const collections = (state = initialState.collections, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export const collection = (state = initialState.collection, action) => {
    switch(action.type) {
        case types.CHANGE_COLLECTION:
            const collection = initialState.collections.filter(collection => collection.id === action.data)[0].collection;
            return initialState.initCollection(collection);
        default:
            return state;
    }
}

export const items = (state = initialState.items, action) => {
    switch(action.type) {
        case types.CHANGE_ITEMS:
            return action.data;
        case types.CHANGE_COLLECTION:
            const collection = initialState.collections.filter(collection => collection.id === action.data)[0].collection;
            return initialState.initItems(initialState.initCollection(collection), 2);
        default:
            return state;
    }
};

export const item = (state = initialState.item, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return {...state, ...action.data};
        case types.CHANGE_ITEMS:
            return action.data[0];
        case types.CHANGE_COLLECTION:
            const collection = initialState.collections.filter(collection => collection.id === action.data)[0].collection;
            const _item = initialState.initItems(initialState.initCollection(collection), 2)[0];
            return _item;
        default:
            return state;
    }
};