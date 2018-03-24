import { utils } from 'utils/utils';
import { actions } from 'redux/actions/learn';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { observeStore } from 'redux/observeStore';

const subscriptions = [];

let { score: currScore } = store.getState();

export const renderNext = () => {

    const { randomiser, items, item, score } = store.getState();

    if(score === currScore) return;

    currScore = score;

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
    subscriptions.push(store.subscribe(renderNext));

    const newScreen = { 
        item: utils.nextItem(items, item.index + 1),
        strategy: strategy,
        randomiser: { index: randomiser.strategiesCollection.index + 1 }
    };

    actions.boundNewScreen(newScreen);   
};

const { randomiser, items, item } = store.getState();

const strategy = randomiser.strategiesCollection.strategies[randomiser.strategiesCollection.index];
subscriptions.push(store.subscribe(renderNext));
strategy.screens.forEach(screen => { 
    screen.render();
    subscriptions.push(observeStore(store, store => store, screen.render));

});

const newScreen = { 
    item: utils.nextItem(items, 0),
    // strategy: strategy,
    // randomiser: { index: randomiser.strategiesCollection.index + 1 }
};

actions.boundNewScreen(newScreen);