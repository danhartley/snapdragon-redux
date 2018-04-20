import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

let subscriptions = [];

export const nextLayout = (index) => {

    const { layouts } = store.getState();

    const layout = layouts[index];

    subscriptions.forEach(unsubscribe => unsubscribe());
    subscriptions = [];

    if(!layout) return;

    layout.screens.forEach(screen => {

        const select = store => store[screen.domain];
        const onChange = screen.render
        const domain = screen.domain;

        subscriptions.push(observeStore(store, select, onChange, domain));
    });

    actions.boundNextLayout(layout);
};