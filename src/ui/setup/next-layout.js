import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';
import { funcByName } from 'ui/helpers/function-lookups';

let subscriptions = [];

export const nextLayout = (index) => {

    const { layouts } = store.getState();

    const layout = layouts[index];

    console.log('** Calling unsubscribe on screen listeners');
    subscriptions.forEach(func => {
        console.log(`unsubscribe name: ${func.name}`)
        func.unsubscribe();
    });
    subscriptions = [];

    if(!layout) return;

    layout.screens.forEach(screen => {

        const func = funcByName(screen.name);
        if(func) {

            // todo: handle command, runTask for letters...
        
            const select = store => store[screen.domain];
            const onChange = func;
            const domain = screen.domain;

            subscriptions.push(observeStore(store, select, onChange, domain));
        }
    });

    actions.boundNextLayout(layout);
};