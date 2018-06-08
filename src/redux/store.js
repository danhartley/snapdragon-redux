import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { config } from 'redux/reducers/config-reducer';
import { collections, collection } from 'redux/reducers/species-reducers';
import { index, score, history } from 'redux/reducers/progress-reducers';
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
    history
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['config']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer, 
    composeEnhancers(applyMiddleware(
        // logger
    ))
);

export const persistor = persistStore(store);