import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { config } from 'redux/reducers/config-reducer';
import { collections, collection } from 'redux/reducers/species-reducers';
import { counter, score, history, page } from 'redux/reducers/progress-reducers';
import { lessonPlan, layout } from 'redux/reducers/layout-reducers';
import { ui } from 'redux/reducers/ui-reducers';

const reducer = combineReducers({
    counter,
    lessonPlan,
    layout,
    config,
    collection,
    score,
    collections,
    history, 
    page,
    ui 
});

const persistConfig = {
  key: 'root',
  storage,
//   blacklist: ['config']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer, 
    composeEnhancers(applyMiddleware(
        logger
    ))
);

export const persistor = persistStore(store);