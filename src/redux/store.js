import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { utils } from 'utils/utils';

import { index, score, item, items, revision, history } from 'redux/reducers/species-reducers';
import { layouts, layout } from 'redux/reducers/layout-reducers';

const reducer = combineReducers({
    index,
    layouts,
    layout,
    score,
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