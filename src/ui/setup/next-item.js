import { actions } from 'redux/actions/action-creators';

export const nextItem = (layout) => {

    console.log('^^ nextItem ran');

    actions.boundNextItem(layout.itemIndex);
};