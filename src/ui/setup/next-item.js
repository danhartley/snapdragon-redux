import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';

export const nextItem = (layout) => {

    DOM.headerTxt.innerHTML = '';
    DOM.rightHeader.style.backgroundColor = 'rgb(128, 128, 128)';

    const { items } = store.getState();

    const nextItem = items[layout.itemIndex];
    
    actions.boundNextItem(nextItem);
};