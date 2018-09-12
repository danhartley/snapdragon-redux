import { actions } from 'redux/actions/action-creators';

export const nextItem = (layout) => {    
    actions.boundNextItem(layout.itemIndex);
};