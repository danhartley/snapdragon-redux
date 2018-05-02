import { types } from 'redux/actions/action-types';
 
export const lesson = (state = 1, action) => {
    switch(action.type) {
        default:
            return state;
    }
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
        // case 'persist/REHYDRATE':
        //     return action.payload ? action.payload.layout : null;
        case types.NEXT_LESSON:
            return action.data[0];
        case types.NEXT_LAYOUT:
            return action.data;
        default: 
            return state;
    }
};
