import { types } from 'redux/actions/action-types';

export const lesson = (state = { currentRound: 1, rounds: 0, isNextRound: true }, action) => {

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

            // if(state.isLevelComplete) {
            //     layoutCounter = 0;
            //     let levelId = state.level.id + 1;
            //     level = state.levels.find(level => level.id === levelId);
            //     currentRound = 1;
            // }

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

        default: {
            return state; 
        }
    }
};