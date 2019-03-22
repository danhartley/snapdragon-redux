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
            if(action.data.screens && action.data.screens[1]) {
                console.clear();
                console.log('Layout name: ', action.data.name);
                console.log('Screen name: ', action.data.screens[1].name);
            }
            if(action.data.screens[1].taxon) {
                console.log('Taxon name: ', action.data.screens[1].taxon);
            }
            return action.data;
        default: 
            return state;
    }
};
