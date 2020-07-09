import { contains } from 'ramda';

import { lessonStateHelper } from 'ui/screens/lists/lesson-state-helper';
import { store } from 'redux/store';
import { observeStore } from 'redux/observe-store';
import { funcByName } from 'ui/helpers/function-lookups';

let subscriptions = [];

const add = (subscription, domain, role, layout) => {

    const select = store => store[domain];
    const onChange = subscription;    

    const sub = observeStore(store, select, onChange, domain, layout);

    const existingSub = getByName(sub.name);

    if(existingSub) return;

    subscriptions.push({ ...sub, role});
    return sub;
};

const remove = subscription => {

    if(subscription) {

        subscription.unsubscribe();
        subscriptions = subscriptions.filter(sub => sub.name !== subscription.name);
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

    screens.forEach(sub => {
      subscription.remove(sub)
    });
};

const checkRequired = (state, layout) => {

    const { userAction, config } = state;

    let isRequired = true, isReviewingLesson = true;

    isReviewingLesson = lessonStateHelper.getIsReviewingLesson(userAction, config, isReviewingLesson); 
        
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

    isRequired = isReviewingLesson ? true : !contains(layout.name, reviewLayouts);

    return isRequired;
};

const addSubs = (layout, config) => {

    if(!layout) return;
    
    layout.screens.forEach( (screen, index) => {

        const func = funcByName(screen.name);

        const isSubscriptionRequired = checkRequired(store.getState(), layout);

        if(func && isSubscriptionRequired) {
            if(config.isPortraitMode) {
                if(index === 1 || screen.name === 'summary') subscription.add(func, screen.domain, 'screen', layout ? layout.name : '');
            } else {
                subscription.add(func, screen.domain, 'screen', layout ? layout.name : '');
            }                           
        } else {
            subscription.remove(subscription.getByName('nextItem'));
            subscription.remove(subscription.getByName('traitValuesHandler'));
        }
    });
};

const printAllSubs = () => {
  getAll().forEach(sub => {
    snapLog('sub', sub);
  });
};

export const subscription = {
    add,
    remove,
    removeByName,
    getByName,
    getByRole,
    getAll,
    removeSubs,
    addSubs,
    printAllSubs
};

