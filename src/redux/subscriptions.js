import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';

let subscriptions = [];

const add = (subscription, domain, role, layout) => {
    
    const select = store => store[domain];
    const onChange = subscription;

    const sub = observeStore(store, select, onChange, domain, layout);

    subscriptions.push({ ...sub, role});
    // console.log(`%cmy subs: ${subscriptions.map(s=>s.name).join(', ')}`, "color: blue;");
    return sub;
};

const remove = subscription => {
    console.log(`*** Calling unsubscribe on name: ${subscription.name}, role: ${subscription.role}`)
    subscription.unsubscribe();
    subscriptions = subscriptions.filter(sub => sub.name !== subscription.name);
    // console.log(`%cmy subs: ${subscriptions.map(s=>s.name).join(', ')}`, "color: red;");
    return subscriptions;
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

export const subscription = {
    add,
    remove,
    getByName,
    getByRole,
    getAll
};

