import { types } from 'redux/actions/action-types';
import { config as lessonConfig } from 'syllabus/lesson-config';

export const config = (state = lessonConfig, action) => {
    switch(action.type) {
        case types.CHANGE_COLLECTION:        
            return { ...action.data.config, ...{ coordinates: state.coordinates }, ...{ place: state.place } };    
        case types.UPDATE_CONFIG:
            return { ...state, ...action.data };
        case types.UPDATE_LANGUAGE:
            return { ...state, ...{ language: action.data } };
        // case types.SELECT_STUDY_METHOD:
        //     return { ...state, ...{ studyMethod: action.data } };
        default: 
            return state;
    }
};

export const enums = (state = {}, action) => {
    switch(action.type) {
        case types.UPDATE_ENUMS:
            return action.data;
        default:
            return state;
    }
}