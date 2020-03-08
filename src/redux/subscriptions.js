import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';
import { funcByName } from 'ui/helpers/function-lookups';

let subscriptions = [];

const add = (subscription, domain, role, layout) => {
    
    const select = store => store[domain];
    const onChange = subscription;    

    // console.log('name: ', subscription.name);

    const sub = observeStore(store, select, onChange, domain, layout);

    subscriptions.push({ ...sub, role});
    // console.log(`%cmy subs: ${subscriptions.map(s=>s.name).join(', ')}`, "color: blue;");
    return sub;
};

const remove = subscription => {

    if(subscription) {

        subscription.unsubscribe();
        // console.log(`*** Calling unsubscribe on name: ${subscription.name}, role: ${subscription.role}`);
        subscriptions = subscriptions.filter(sub => sub.name !== subscription.name);
        // console.log(`%cmy subs: ${subscriptions.map(s=>s.name).join(', ')}`, "color: red;");
    }
    return subscriptions;
};

const removeByName = name => {
    const subscription = getByName(name);
    if(subscription) {
        return remove(subscription);
    }
};

const getByName = name => {
    return subscriptions.find(sub => sub.name === name);
};

const getByRole = role => {
    return subscriptions.filter(sub => sub.role === role);
};

const getAll = () => {
    return subscriptions;
};

const removeSubs = () => {

    let screens = getByRole('screen');

    // screens.forEach(s => console.log(`%c${ 'Subs being removed: ' + s.name}`, "color:green"));

    screens.forEach(sub => subscription.remove(sub));

    screens = getByRole('screen');

    screens.forEach(s => console.log(`%c${ 'Subs still active: ' + s.name}`, "color:blue"));

};

const addSubs = (layout, config) => {

    if(!layout) return;
    
    layout.screens.forEach( (screen, index) => {

        const func = funcByName(screen.name);

        if(func) {
            if(config.isPortraitMode) {
                if(index === 1 || screen.name === 'summary') subscription.add(func, screen.domain, 'screen', layout ? layout.name : '');
            } else {
                subscription.add(func, screen.domain, 'screen', layout ? layout.name : '');
            }                           
        }
    });

    // layout.screens.forEach(s => console.log(`%c${ 'Subs active: ' + s.name}`, "color:blue"));
};

export const subscription = {
    add,
    remove,
    removeByName,
    getByName,
    getByRole,
    getAll,
    removeSubs,
    addSubs
};

