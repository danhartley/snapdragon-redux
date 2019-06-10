import { actions } from 'redux/actions/action-creators';

export const nextItem = layout => {
    if(layout && !layout.bonus) {
        actions.boundNextItem(layout.itemIndex);
    }
};