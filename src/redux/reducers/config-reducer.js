import { types } from 'redux/actions/action-types';
import { config as lessonConfig } from 'syllabus/lesson-config';

export const config = (state = lessonConfig, action) => {
    switch(action.type) {
        case types.CHANGE_COLLECTION:
        case types.UPDATE_CONFIG:
            return { ...state, ...action.data };
        case types.UPDATE_LANGUAGE:
            return { ...state, ...{ language: action.data } };
        default: 
            return state;
    }
};
