import { enums } from 'ui/helpers/enum-helper';
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
        case types.SAVE_USER_PROGRESS:
            return { ...state, ...action.data.lesson.config };
        default: 
            return state;
    }
};

export const units = (state = {}, action) => {
    switch(action.type) {
        case types.UPDATE_UNITS:
            return action.data;
        default:
            return state;
    }
};

export const user = (state = null, action) => {
    switch(action.type) {
        case types.UPDATE_USER:
            return action.data;
        default:
            return state;
    }
};

export const userAction = (state = enums.userEvent.GO_TO_DASHBOARD, action) => {
    switch(action.type) {
        case types.CLICK_EVENT:
            return action.data;
        default:
            return state;
    }
};