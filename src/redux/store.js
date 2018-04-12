import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { index, config, score, pool, items, item, revision, history } from 'redux/reducers/species-reducers';
import { layouts, layout } from 'redux/reducers/layout-reducers';

const reducer = combineReducers({
    index,
    config,
    layouts,
    layout,
    score,
    pool,
    items,
    item,
    revision,
    history
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(
        // timeoutScheduler,
        // logger
    ))
);