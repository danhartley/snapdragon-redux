import { utils } from 'utils/utils';
import { types } from 'redux/actions/species-action-types';
import { api } from 'api/species';
import { speciesLayouts, progressScreen, historyScreen } from 'ui/layouts/species-layouts';
import { lesson1Layouts } from 'syllabus/lesson-planner';

const initLayoutState = (layouts, number) => {
    const initLayouts =
        utils.randomiseSelection(layouts, number)
            .map(layout => {
                layout.active = true;
                return layout;
            });

    initLayouts[initLayouts.length-1].screens.push(progressScreen);
    initLayouts[initLayouts.length-1].screens.push(historyScreen);

    return initLayouts;
};

const intialLayoutState = initLayoutState(speciesLayouts, api.species.length);
let newLayoutsState;

// export const layouts = (state = intialLayoutState, action) => {
export const layouts = (state = lesson1Layouts, action) => {
    switch(action.type) {
        case types.RESET:
            // newLayoutsState = initLayoutState(speciesLayouts, action.data.length);
            newLayoutsState = lesson1Layouts;
            return newLayoutsState;
        default:
            return state;
    }
};

// export const layout = (state = intialLayoutState[0], action) => { 
export const layout = (state = lesson1Layouts[0], action) => { 
    switch(action.type) {
        case types.NEXT_LAYOUT:
            return action.data;
        case types.RESET:
            return newLayoutsState[0];
        default: 
            return state;
    }
};
