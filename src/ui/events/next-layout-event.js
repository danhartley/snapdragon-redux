import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

let subscriptions = [];

export const renderNextLayout = (index) => {

    const { layouts } = store.getState();

    const layout = layouts[index];

    subscriptions.forEach(unsubscribe => unsubscribe());
    subscriptions = [];

    if(!layout) return;

    layout.screens.forEach(screen => {

        console.log('the layout id is: ', layout.id);

        console.log('the domain is: ', screen.domain.toUpperCase(), ' and the name is: ', screen.name.toUpperCase());

        const select = store => store[screen.domain];
        const onChange = screen.render
        const domain = screen.domain;

        subscriptions.push(observeStore(store, select, onChange, domain));

        if(screen.next) {

            const select = store => store[screen.next.domain];
            const onChange = screen.next.render
            const domain = screen.next.domain;
    
            subscriptions.push(observeStore(store, store => store[screen.next.domain], screen.next.render, screen.domain));
        }
    });

    actions.boundNextScreen(layout);
};