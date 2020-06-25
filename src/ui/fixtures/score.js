import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';

export const renderScore = score => {
    
    const { history, collection, config, layout, lesson, lessonPlan } = store.getState();

    score.mode = config.mode;

    if(!layout) return;

    if(score.total === layout.roundScoreCount) {
        actions.boundUpdateHistory(score);
    }
};