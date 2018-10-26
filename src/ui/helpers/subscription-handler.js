import { funcByName } from 'ui/helpers/function-lookups';
import { subscription } from 'redux/subscriptions';

export const screensSubscriptionHandler = (layout, config) => {

    subscription.getByName('renderCollections').forEach(sub => subscription.remove(sub));
    
    subscription.getByRole('screen').forEach(sub => subscription.remove(sub));

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
                    if(index === 1 || screen.name === 'history') subscription.add(func, screen.domain, 'screen', layout.name);                    
                } else {
                    subscription.add(func, screen.domain, 'screen', layout.name);
                }                           
            }
        }
    });
};