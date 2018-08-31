import { types } from 'redux/actions/action-types';

const flag = (msg, data) => {
    // console.log(`Layout(s) update triggered by: ${msg}`);
    // console.log(`Action was: ${data}`)
};

export const lessonPlan = (state = null, action) => {
    switch(action.type) {
        case types.NEXT_LESSON:
            flag(types.NEXT_LESSON, action.data.levelName);
            return action.data;
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
