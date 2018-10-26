import * as R from 'ramda';

import { types } from 'redux/actions/action-types';
import { speciesStateHelper } from 'redux/reducers/initial-state/initial-species-state';

export const collections = (state = speciesStateHelper.collections, action) => {
    switch(action.type) {
        case types.SELECT_COLLECTION:
            const cols = [ ...state ];
            cols.forEach(col => {
                if(col.id === action.data.id) {
                    col.selected = true;
                } else {
                    col.selected = false;
                }
            });
            return cols;
        default:
            return state;
    }
};

let isComingFromLocalStorage = false;

export const collection = (state = { id: 0, descriptions: null, currentRound: 1, rounds: 0, isNextRound: true }, action) => {

    const getNextItem = (action, state) => {
        let itemIndex = action.data;
        let nextItem = state.items[itemIndex];
        let layoutCounter, isNextRound;
        if(isComingFromLocalStorage) {
            layoutCounter = state.layoutCounter === 0 ? 1 : state.layoutCounter;
            isNextRound = itemIndex === 0 ? false : state.isNextRound;
            isComingFromLocalStorage = false;
        } else {
            layoutCounter = state.layoutCounter ? state.layoutCounter + 1 : 1;            
            isNextRound = layoutCounter === state.layoutCount;
        }
        let noLessonSelected = state.rounds === 0;
        let isLevelComplete = noLessonSelected ? false : state.currentRound === state.rounds;

        let isLessonComplete = false;
        if(state.lesson.level.id) {
            isLessonComplete = isLevelComplete && state.lesson.level.id === state.activeLevelCount;
        }

        return { itemIndex, nextItem, layoutCounter, isNextRound, isLevelComplete, isLessonComplete };
    };

    const getNextRound = state => {        
        let currentRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;
        let itemIndex = state.moduleSize * (currentRound -1);
        let nextItem = state.items[itemIndex];
        let layoutCounter = state.layoutCounter;
        let lesson = state.lesson;
        if(state.isLevelComplete) {
            itemIndex = 0;
            nextItem = state.items[itemIndex];
            layoutCounter = 0;
            let levelId = state.lesson.level.id + 1;
            lesson.level = state.levels.find(level => level.id === levelId);
            currentRound = 1;
        }        
        return { itemIndex, nextItem, layoutCounter, lesson, currentRound };
    };

    const changeCollection = (state, action, speciesStateHelper) => {
        
        const initialCollection = { ...state, items: [...action.data.items] };

        let collection = speciesStateHelper.extendCollection(R.clone(initialCollection));
        let nextItem = collection.items[collection.itemIndex];
        
        if(action.data.config.mode === 'review') {
            collection.allItems = collection.items;
        }
        if(action.data.config.mode === 'learn') {
            if(collection.allItems) initialCollection.items = collection.allItems;
        }
        if(action.data.config.mode === 'learn-again') {
            collection.currentRound = collection.rounds;
            collection.isNextRound = true;
            collection.isLevelComplete = true;
            collection.itemIndex = 0;
            collection.nextItem = collection.items[collection.itemIndex];
            collection.currentRound = 1;
        }

        return { collection, nextItem };
    };

    const getNextLesson = (action, state) => {
        let collection = { ...state, ...action.data.collection };
        let isNextRound = collection.layoutCounter === collection.layoutCount;
        let layoutCounter = 0;
        let itemGroup = collection.itemGroups[collection.currentRound - 1];
        let layoutCount = action.data.lessonPlan.layoutCount;
        return { collection, isNextRound, layoutCounter, itemGroup, layoutCount };
    };
    
    switch(action.type) {

        case 'persist/REHYDRATE':
            isComingFromLocalStorage = true;
            return state;

        case types.SELECT_COLLECTION: {
            return action.data;
        }
        case types.CHANGE_COLLECTION_ITEMS: {
            const _collection = R.clone(state);
            _collection.items = action.data;
            _collection.userSelection = true;
            return _collection;
        }
        case types.CHANGE_COLLECTION: {
            const { collection, nextItem } = changeCollection(state, action, speciesStateHelper);
            return { ...state, ...collection, nextItem };
        }
        case types.NEXT_ITEM: {
            const { itemIndex, nextItem, layoutCounter, isNextRound, isLevelComplete, isLessonComplete } = getNextItem(action, state);
            return { ...state, itemIndex, nextItem, layoutCounter, isNextRound, isLevelComplete, userSelection: false, isLessonComplete };
        }
        case types.NEXT_ROUND: {
            const { itemIndex, nextItem, layoutCounter, lesson, currentRound } = getNextRound(state);
            return { ...state, itemIndex, currentRound, nextItem, layoutCounter, lesson };
        }
        case types.NEXT_LESSON: {
            const { collection, isNextRound, layoutCounter, itemGroup, layoutCount } = getNextLesson(action, state);
            return { ...collection, layoutCount: action.data.layoutCount, isNextRound, layoutCounter, itemGroup, layoutCount };            
        }
        case types.NEXT_LEVEL: {
            return { ...state, currentRound: 1 };
        }
        default: {
            return state; 
        }
    }
};