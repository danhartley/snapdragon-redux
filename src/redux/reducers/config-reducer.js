import { types } from 'redux/actions/action-types';
import { config as initialConfig } from 'snapdragon-config/lesson-config';

export const config = (state = initialConfig, action) => {
    switch(action.type) {
        case types.UPDATE_COLLECTION:        
            return { ...action.data.config, ...{ coordinates: state.coordinates }, ...{ place: state.place } };    
        case types.UPDATE_CONFIG:
            return { ...state, ...action.data };
        case types.UPDATE_LANGUAGE:
            return { ...state, ...{ language: action.data.lang } };
        case types.PAUSE_LESSON:
            return { ...state, collection: { id: 0} };
        case types.RESTART_LESSON: {
            return action.data.config;   
        }
        default: 
            return state;
    }
};

export const enums = (state = {}, action) => {
    switch(action.type) {
        case types.UPDATE_ENUMS:
            return action.data;
        case types.RESTART_LESSON: {
            return action.data.enums;   
        }
        default:
            return state;
    }
}