import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { funcByName } from 'ui/helpers/function-lookups';
import { subscription } from 'redux/subscriptions';

export const nextLayout = (counter) => {

    if(counter && counter.lesson === 'inactive') return;

    const { lessonPlan, config } = store.getState();

    if(!lessonPlan.layouts) return;

    const layout = lessonPlan.layouts[counter.index];

    subscription.getByRole('screen').forEach(sub => subscription.remove(sub));

    if(!layout) return;

    layout.screens.forEach( (screen, index) => {

        if(screen.name === 'command') {
            const funcs = funcByName(screen.name);
            funcs.forEach(func => {
                subscription.add(func, screen.domain, 'screen');
            });
        } else {
            const func = funcByName(screen.name);
            if(func) {
                if(config.isPortraitMode) {
                    if(index === 1 || screen.name === 'summary') subscription.add(func, screen.domain, 'screen');                    
                } else {
                    subscription.add(func, screen.domain, 'screen');
                }                           
            }
        }
    });

    setTimeout(() => {
        actions.boundNextLayout(layout); 
    });    
};