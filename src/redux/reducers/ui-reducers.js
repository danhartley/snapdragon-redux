import { types } from 'redux/actions/action-types';

export const ui = (state = {}, action) => {
    switch(action.type) {
        case types.UPDATE_UI:        
            return action.data || state;
        default: 
            return state;
    }
};
