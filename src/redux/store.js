import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { config } from 'redux/reducers/config-reducer';
import { collections, collection } from 'redux/reducers/species-reducers';
import { index, score, history, revision } from 'redux/reducers/progress-reducers';
import { lesson, layouts, layout } from 'redux/reducers/layout-reducers';

const reducer = combineReducers({
    index,
    lesson,
    layouts,
    layout,
    config,
    score,
    collections,
    collection,
    // revision,
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