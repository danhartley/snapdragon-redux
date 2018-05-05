import { types } from 'redux/actions/action-types';
import { config as lessonConfig } from 'syllabus/lesson-config';
import { collections } from 'snapdragon/species-collections';

export const config = (state = lessonConfig, action) => {
    switch(action.type) {
        case types.CHANGE_COLLECTION:
            return { ...state, ...{ ...action.data } };
        case types.UPDATE_CONFIG:
            return { ...state, ...action.data };
        default: 
            return state;
    }
};
