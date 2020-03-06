import { types } from 'redux/actions/action-types';

export const quickFire = (state = null, action) => {
    switch(action.type) {
        case types.CREATE_QUICKFIRE:
            return { ...state, ...action.data };
        case types.UPDATE_QUICKFIRE:
            return { ...state, ...action.data };
        default:
            return state;
    }
}