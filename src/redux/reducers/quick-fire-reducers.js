import { types } from 'redux/actions/action-types';


const cleanAndReturnIncomingState = state => {
    const quickFire = state;
    delete quickFire.onClickFiltersLinkListeners;
    delete quickFire.onClickGlossaryLinkListeners;
    return quickFire;
};

export const quickFire = (state = null, action) => {
    switch(action.type) {
        case types.CREATE_QUICKFIRE:
            return cleanAndReturnIncomingState(action.data);
        case types.UPDATE_QUICKFIRE:
            return cleanAndReturnIncomingState(action.data);
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