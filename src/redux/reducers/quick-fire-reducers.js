import { types } from 'redux/actions/action-types';

export const quickFire = (state = null, action) => {
    switch(action.type) {
        case types.CREATE_QUICKFIRE:
            return action.data;
        case types.UPDATE_QUICKFIRE:
            return action.data;
        default:
            return state;
    }
}

export const glossary = (state = null, action) => {
    switch(action.type) {
        case types.CREATE_GLOSSARY:
            return action.data;
        default:
            return state;
    }
}