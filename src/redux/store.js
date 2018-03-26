import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { utils } from 'utils/utils';

import { score, item, strategy, items, randomiser, strategies } from 'redux/reducers/learn-reducers';
import { subscriber } from 'redux/middleware/subscriber';

const reducer = combineReducers({
    strategies,
    strategy,
    items,
    item,
    score,
    randomiser
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(
        timeoutScheduler,
        // subscriber
        // logger
    ))
);