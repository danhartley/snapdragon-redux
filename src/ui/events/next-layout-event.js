import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { observeStore } from 'redux/observeStore';

let subscriptions = [];

export const renderNextLayout = (index) => {

    const { layouts } = store.getState();

    const layout = layouts[index];

    subscriptions = [];

    if(!layout.screens) return;

    layout.screens.forEach(screen => {
        subscriptions.push(observeStore(store, store => store[screen.domain], screen.render));
        if(screen.next) {
            subscriptions.push(observeStore(store, store => store[screen.next.domain], screen.next.render));
        }
    });

    actions.boundNextScreen(layout);
};