import { utils } from 'utils/utils';
import { actions } from 'redux/actions/learn';
import { store } from 'redux/store';
import { DOM } from 'ui/dom';
import { observeStore } from 'redux/observeStore';

const subscriptions = [];

export const renderNext = (score) => {

    const { randomiser, items, item } = store.getState();

    subscriptions.length = 0;

    const strategy = randomiser.strategiesCollection.strategies[randomiser.strategiesCollection.index];

    if(!strategy) return;

    const index  = item === null ? 0 : ++item.index;
    const newScreen = { 
        item: utils.nextItem(items, index),
        strategy: strategy,
        randomiser: { index: index }
    };

    actions.boundNewScreen(newScreen);   
};