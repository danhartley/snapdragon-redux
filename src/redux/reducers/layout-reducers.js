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
        case types.NEW_COLLECTION:
            return { ...state, ...action.data.lesson.lessonPlan };
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            if(state) {
                if(action.data.screens.length > 1) {
                    const prevItemIndex = state.screens[0].name === action.data.screens[0].name ? state.itemIndex : null;                
                    return { ...action.data, prevItemIndex }
                } else {
                    return action.data;
                }
            } else {
                return action.data;
            }
        default: 
            return state;
    }
};
