import { types } from 'redux/actions/action-types';
 
export const layouts = (state = null, action) => {
    switch(action.type) {
        case types.NEXT_LESSON:
            return action.data;
        case types.RESET:
            return action.data.layouts;
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
        case types.RESET:
            return action.data.layouts[0]
        default: 
            return state;
    }
};
