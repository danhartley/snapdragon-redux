import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';

export const nextItem = (layout) => {

    DOM.headerTxt.innerHTML = '';

    actions.boundNextItem(layout.itemIndex);
};