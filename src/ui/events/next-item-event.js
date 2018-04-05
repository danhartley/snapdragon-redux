import { utils } from 'utils/utils';
import { actions } from 'redux/actions/learn';
import { store } from 'redux/store';

export const renderNextItem = (index) => {

    const { items } = store.getState();

    const nextItem = utils.nextItem(items, index);
    
    actions.boundNextItem(nextItem);
};