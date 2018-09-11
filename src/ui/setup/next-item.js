import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { screensSubscriptionHandler } from 'ui/helpers/subscription-handler';

export const nextItem = (layout) => {
    
    actions.boundNextItem(layout.itemIndex);
    const { config } = store.getState();

    screensSubscriptionHandler(layout, config);
};