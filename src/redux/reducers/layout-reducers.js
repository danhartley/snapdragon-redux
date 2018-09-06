import { types } from 'redux/actions/action-types';
import { lessonPlans as defaultLessonPlans } from 'snapdragon/lesson-plans';

const flag = (msg, data) => {
    // console.log(`Layout(s) update triggered by: ${msg}`);
    // console.log(`Action was: ${data}`)
};

// export const lessonPlans = (state = defaultLessonPlans, action) => {
//     switch(action.type) {
//         case types.CHANGE_LESSON_PLAN:
//         const index = state.levels.map((level, index) => { 
//             if(level.id === action.data.id) { return index; }
//         });
//             return [ ...state, ...{ levels[index].layouts, ...action.data.layouts } ] || state;
//         default:
//             return state;
//     }
// }

export const lessonPlan = (state = null, action) => {
    switch(action.type) {
        case types.CHANGE_LESSON_PLAN:
            flag(types.CHANGE_LESSON_PLAN, action.data.levelName);
            return action.data || state;
        case types.NEXT_LESSON:
            flag(types.NEXT_LESSON, action.data.levelName);
            return action.data || state;
        default:
            return state;
    }
};

export const layout = (state = null, action) => { 
    switch(action.type) {
        case types.NEXT_LESSON:
            flag(types.NEXT_LESSON, action.data.levelName);
            return action.data.layouts[0];
        case types.NEXT_LAYOUT:
            flag(types.NEXT_LAYOUT, `layoutIndex: ${action.data.layoutIndex}, itemIndex: ${action.data.itemIndex} `);
            return action.data;
        default: 
            return state;
    }
};
