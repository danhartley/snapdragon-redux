import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { collection, items, item } from 'redux/reducers/species-reducers';
import { index, score, history, revision } from 'redux/reducers/progress-reducers';
import { config, lesson, layouts, layout } from 'redux/reducers/layout-reducers';

const reducer = combineReducers({
    lesson,
    index,
    config,
    layouts,
    layout,
    score,
    collection,
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