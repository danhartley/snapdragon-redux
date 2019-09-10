import { funcByName } from 'ui/helpers/function-lookups';
import { subscription } from 'redux/subscriptions';

const removeSubs = () => {

    const screens = subscription.getByRole('screen');

    screens.forEach(s => console.log(`%c${s.name}`, "color:green"));

    screens.forEach(sub => subscription.remove(sub));

};

const addSubs = (layout, config) => {

    layout.screens.forEach( (screen, index) => {

        const func = funcByName(screen.name);

        if(func) {
            if(config.isPortraitMode) {
                if(index === 1 || screen.name === 'summary') subscription.add(func, screen.domain, 'screen', layout.name);
            } else {
                subscription.add(func, screen.domain, 'screen', layout.name);
            }                           
        }
    });
};

// export const subsHandler = {
//     addSubs,
//     removeSubs,
// }