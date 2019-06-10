import { types } from 'redux/actions/action-types';

export const lessonPlans = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_LESSON_PLANS:
            return action.data;
        case types.RESTART_LESSON: {
            return action.data.lessonPlans;   
        }
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
        case types.PAUSE_LESSON: {
            return null;
        }
        case types.RESTART_LESSON: {
            return action.data.lessonPlan;   
        }
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            return action.data;
        case types.PAUSE_LESSON: {
            return null;
        }
        case types.RESTART_LESSON: {
            return action.data.layout;
        }
        default: 
            return state;
    }
};
