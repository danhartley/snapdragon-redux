import { types } from 'redux/types/learn';

const subscriptions = [];

export const subscriber = store => next => action => {
    if(action.type === types.NEW_SCREEN){
        const { randomiser } = store.getState();
        const strategy = randomiser.strategiesCollection.strategies[randomiser.strategiesCollection.index];
        strategy.screens.forEach(screen => { 
            screen.render();
            subscriptions.push(store.subscribe(screen.render));
        });
    }
    if(action.type === types.MARK_ANSWER){
        subscriptions.forEach(unsubscribe => {
                unsubscribe();
            });
        subscriptions.length = 0;

        const strategy = randomiser.strategiesCollection.strategies[randomiser.strategiesCollection.index];

        if(!strategy) return;

        strategy.screens.forEach(screen => { 
            screen.render();
            subscriptions.push(store.subscribe(screen.render));
        });
    }
};