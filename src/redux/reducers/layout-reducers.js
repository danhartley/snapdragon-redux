import { types } from 'redux/actions/action-types';

export const lessonPlans = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_LESSON_PLANS:
            return action.data;
        default:
            return state;
    }
};

export const lessonPlan = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_LESSON_PLAN:
            return action.data || state;
        case types.NEXT_LESSON:
            return action.data.lessonPlan || state;
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            return action.data;
        default: 
            return state;
    }
};
