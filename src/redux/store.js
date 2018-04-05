import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { utils } from 'utils/utils';

import { index, score, item, layout, items, layouts, card, progress } from 'redux/reducers/learn-reducers';

const reducer = combineReducers({
    index,
    layouts,
    layout,
    score,
    items,
    item,
    card,
    progress
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(
        // timeoutScheduler,
        // logger
    ))
);