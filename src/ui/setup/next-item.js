import { actions } from 'redux/actions/action-creators';

export const nextItem = layout => {
    if(!layout.bonus) {
        actions.boundNextItem(layout.itemIndex);
    }
};