import * as R from 'ramda';

import { enums } from 'ui/helpers/enum-helper';
import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';
import { funcByName } from 'ui/helpers/function-lookups';

let subscriptions = [];

const add = (subscription, domain, role, layout) => {
    
    // console.log('param layout:', layout);

    const select = store => store[domain];
    const onChange = subscription;    

    const sub = observeStore(store, select, onChange, domain, layout);

    const existingSub = getByName(sub.name);

    if(existingSub && existingSub.name === 'renderSummary') {
        console.log('renderSummary');
    }

    if(existingSub) return;

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

const checkRequired = (store, layout) => {

    let isRequired = true;

    const { userAction } = store.getState();

    const isNotReviewingLesson = 
        userAction && 
        (userAction.name === enums.userEvent.START_LESSON.name || userAction.name === enums.userEvent.TOGGLE_SPECIES_LIST.name);

    const reviewLayouts = [
        'screen-species-card',
        'screen-taxon-card',
        'screen-non-taxon-card',
        'species-vernaculars',
        'mixed-specimen-images',
        'mixed-specimen-question',
        'screen-common-to-latin',
        'screen-genus-completion',
        'screen-latin-to-common',
        'media-match'
    ];

    if(isNotReviewingLesson) {
        isRequired = !R.contains(layout.name, reviewLayouts);        
    }

    // console.log('isRequired sub: ', isRequired);

    return isRequired;
};

const addSubs = (layout, config) => {

    if(!layout) return;
    
    layout.screens.forEach( (screen, index) => {

        const func = funcByName(screen.name);

        const isSubscriptionRequired = checkRequired(store, layout);

        if(func && isSubscriptionRequired) {
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

