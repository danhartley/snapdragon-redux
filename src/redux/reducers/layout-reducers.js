import { types } from 'redux/actions/action-types';
import { config as lessonConfig } from 'syllabus/lesson-config';
import { collections } from 'syllabus/lesson-collections';
 
export const config = (state = lessonConfig, action) => {
    switch(action.type) {
        case types.CHANGE_COLLECTION:
            const collection = collections.filter(collection => collection.id === action.data)[0];
            return { ...state, currentCollectionName: collection.eol_name };
        default: 
            return state;
    }
};

export const lesson = (state = 1, action) => {
    return state;
};

export const layouts = (state = null, action) => {
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data;
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data[0];
        case types.NEXT_LAYOUT:
            return action.data;
        default: 
            return state;
    }
};
