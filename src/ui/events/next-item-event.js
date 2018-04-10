import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';

export const renderNextItem = (layout) => {

    const { items } = store.getState();

    const nextItem = items[layout.itemIndex];
    
    actions.boundNextItem(nextItem);
};