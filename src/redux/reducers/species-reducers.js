
import { types } from 'redux/actions/action-types';
import { config as lessonConfig } from 'syllabus/lesson-config';
import { InitialState } from 'redux/reducers/initial-state-for-reducers';

export const config = (state = lessonConfig, action) => {
    switch(action.type) {
        case types.RESET:
            return action.data.config;
        default: 
            return state;
    }
};

export const pool = (state = InitialState.pool, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export const items = (state = InitialState.items, action) => {
    switch(action.type) {
        case types.RESET:
            return action.data.items;
        case types.NEXT_SET:
            
        default:
            return state;
    }
};

export const item = (state = InitialState.item, action) => {
    switch(action.type) {
        case types.NEXT_ITEM:
            return {...state, ...action.data};
        case types.RESET:
            return action.data.items[0];
        default:
            return state;
    }
};