import { store } from 'redux/store';
import { renderSummaryHeader, renderSummary } from 'ui/progress/summary';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';

export const renderSpeciesSummary = (index) => {

    const { layout, score, items } = store.getState();

    let screen = layout.screens[0].next;

    if(!screen) return;

    if(score.total === items.length) {

        renderSummaryHeader(score.correct, items.length);
        renderSummary(score, items);    

        actions.boundRecordScore(score);
    }    
};