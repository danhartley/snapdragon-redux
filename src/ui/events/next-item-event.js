import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';

export const renderNextItem = (layout) => {

    DOM.headerTxt.innerHTML = '';
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';

    const { items } = store.getState();

    // option to check db, local storage, etc. for user-specific lesson data

    const nextItem = items[layout.itemIndex];
    
    actions.boundNextItem(nextItem);
};