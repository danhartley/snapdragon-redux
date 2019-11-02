import * as R from 'ramda';

import { types } from 'redux/actions/action-types';

const initialState = { currentRound: 1, rounds: 0, isNextRound: true };

export const lesson = (state = initialState, action) => {

    switch(action.type) {

        case 'persist/REHYDRATE':
            return state;
        
        case types.UPDATE_LESSON: {
            return { ...state, ...action.data };
        }

        case types.NEXT_LAYOUT: {
            return { ...state, layoutName: action.data.name };
        }

        case types.NEXT_ITEM: {

            let layoutCounter, isNextRound, isLevelComplete, isLessonComplete = false;;

            layoutCounter = state.layoutCounter ? state.layoutCounter + 1 : 1; 
            
            layoutCounter = layoutCounter > state.layoutCount ? state.layoutCount : layoutCounter;
            isNextRound = layoutCounter === state.layoutCount;
            
            if(state.layoutName && state.layoutName === 'summary') {
                isNextRound = true;
            }
            let noLessonSelected = state.rounds === 0;
            isLevelComplete = noLessonSelected ? false : state.currentRound === state.rounds;
    
            if(state.level && state.level.id && state.levels) {
                isLessonComplete = isLevelComplete && (state.levels[state.levels.length -1].id === state.level.id);
            }

            return { ...state, layoutCounter, isNextRound, isLevelComplete, isLessonComplete };
        }

        case types.NEXT_ROUND: {

            let currentRound = (state.currentRound === state.rounds) ? 1 : state.currentRound + 1;

            let layoutCounter = state.layoutCounter;

            let level = state.level;

            return { ...state, currentRound, layoutCounter, level };
        }

        case types.NEXT_LESSON: {

            let isNextRound = state.layoutCount ? state.layoutCounter === state.layoutCount : false;
            let layoutCounter = 0;
            let layoutCount = action.data.lesson.layoutCount;
            
            return { ...state, ...action.data.lesson, isNextRound, layoutCounter, layoutCount };
        }

        case types.NEXT_LEVEL: {
         
            return { ...state, currentRound: 1 };
        }

        case types.UPDATE_COLLECTION: {

            if(action.data.config.mode === 'learn-again') {
                const isNextRound = true;
                const isLevelComplete = true;
                const currentRound = 1;

                return { ...state, currentRound, isNextRound, isLevelComplete, currentRound };

            } else {
                return state;
            }
        }

        // case types.PAUSE_LESSON: {            
        //     return initialState;
        // }

        // case types.RESTART_LESSON: {
        //     return action.data.lesson;   
        // }

        default: {
            return state; 
        }
    }
};

export const lessons = (state = [], action) => {

    // if alreay exists, overwrite
    // can be saved to cloud as this is a conscious act i.e. user saves or selects another lesson
    // saving current lesson is somehing different

    switch(action.type) {
        case types.SAVE_LESSON:
            const savedLessonNames = state.map(lesson => lesson.name);
            if(R.contains(action.data.collection.name, savedLessonNames)) {
                const lessons = state.filter(lesson => lesson.name !== action.data.collection.name);
                      lessons.push(action.data);
                return lessons;
            } else {
                return [ ...state, action.data ];
            }
            case types.REMOVE_LESSON: {
                return state.filter(lesson => lesson.name !== action.data.name); 
            }
        // case types.RESTART_LESSON: {
        //     return state.filter(lesson => lesson.name !== action.data.collection.name);            
        // }    
        default:
            return state;
    }
};