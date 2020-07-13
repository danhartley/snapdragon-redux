import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

import { logger } from 'redux/middleware/logger';
import { timeoutScheduler } from 'redux/middleware/timeoutScheduler';

import { config, units, user, userAction } from 'redux/reducers/config-reducer';
import { collections, collection, bonusLayout } from 'redux/reducers/species-reducers';
import { counter, score, history, videoPlayer } from 'redux/reducers/progress-reducers';
import { lessonPlans, lessonPlan, layout } from 'redux/reducers/layout-reducers';
import { lesson, lessons } from 'redux/reducers/lesson-reducers';
import { quickFire, glossary } from 'redux/reducers/quick-fire-reducers';

import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const reducer = combineReducers({
    counter,
    lessonPlans,
    lessonPlan,
    layout,
    config,
    lessons,
    lesson,
    collection,
    score,
    collections,
    history, 
    videoPlayer,
    units,
    bonusLayout,
    user,
    quickFire,
    glossary,
    userAction
});

const persistConfig = {
  key: 'root',
  storage,
//   stateReconciler: hardSet
//   blacklist: ['config']
}

const persistedReducer = persistReducer(persistConfig, reducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    persistedReducer, 
    composeEnhancers(applyMiddleware(
        logger,
        thunk
    ))
);

export const persistor = persistStore(store);

export const rootReducer = (state, action) => {

    // For this use case we can use purge instead:

    // https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992

    if(action.type === 'INITIALISE_STATE') {
        state = undefined;
    }

    return reducer(state, action);
  }