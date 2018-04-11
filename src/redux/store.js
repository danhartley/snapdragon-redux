import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { lesson, index, score, pool, items, item, revision, history } from 'redux/reducers/species-reducers';
import { layouts, layout } from 'redux/reducers/layout-reducers';

const reducer = combineReducers({
    lesson,
    index,
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