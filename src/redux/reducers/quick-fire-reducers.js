import { types } from 'redux/actions/action-types';

export const quickFire = (state = {}, action) => {
    switch(action.type) {
        case types.CREATE_QUICKFIRE:
            return action.data;
        case types.UPDATE_QUICKFIRE:
            return { ...state, ...action.data };
        default:
            return state;
    }
}