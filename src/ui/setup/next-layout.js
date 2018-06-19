import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { funcByName } from 'ui/helpers/function-lookups';
import { subscription } from 'redux/subscriptions';

export const nextLayout = (counter) => {

    const { layouts } = store.getState();

    if(!layouts) return; // fix this by unsubscribing

    const layout = layouts[counter.index];

    subscription.getByRole('screen').forEach(sub => subscription.remove(sub));

    if(!layout) return;

    layout.screens.forEach(screen => {

        const func = funcByName(screen.name);
        if(func) {
            // todo: handle command, runTask for letters...
            subscription.add(func, screen.domain, 'screen');
        }
    });

    setTimeout(() => {
        actions.boundNextLayout(layout); 
    });    
};