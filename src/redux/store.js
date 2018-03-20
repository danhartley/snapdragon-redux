import { combineReducers, createStore, applyMiddleware } from 'redux';

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { utils } from 'utils/utils';

import { score, item, strategy, items, randomiser, strategies } from 'redux/reducers/learn';

const reducer = combineReducers({
    strategies,
    strategy,
    items,
    item,
    score,
    randomiser
});


export const store = createStore(
    reducer, 
    applyMiddleware(
        timeoutScheduler,
        logger
    )
);

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const store = createStore(
//     reducer, 
//     composeEnhancers(applyMiddleware(
//         timeoutScheduler,
//         logger
//     ))
// );