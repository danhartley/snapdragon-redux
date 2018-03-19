import { utils } from 'utils/utils';
import { actions } from 'redux/actions/learn';
import { store } from 'redux/store';
import { renderPasses } from 'ui/screens/passes';
import { renderFails } from 'ui/screens/fails';
import { DOM } from 'ui/dom';

const screens = [ renderPasses, renderFails ];

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

    DOM.rightBody.innerHTML = '';

    const strategy = randomiser.strategiesCollection.strategies[randomiser.strategiesCollection.index];

    if(!strategy) {
        screens[0]();
        return;
    }

    strategy.elements.forEach(element => {
        element.render();
    });

    strategy.elements.forEach(element => { 
        element.render();
        subscriptions.push(store.subscribe(element.render));
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
strategy.elements.forEach(element => { 
    element.render();
    subscriptions.push(store.subscribe(element.render));
});

const newScreen = { 
    item: utils.nextItem(items, 0),
    strategy: strategy,
    randomiser: { index: randomiser.strategiesCollection.index + 1 }
};

actions.boundNewScreen(newScreen);