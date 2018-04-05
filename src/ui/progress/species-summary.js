import { store } from 'redux/store';
import { renderSummaryHeader, renderSummary } from 'ui/progress/summary';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';

export const renderSpeciesSummary = (index) => {

    const { score, items } = store.getState();

    if(score.total === items.length) {

        renderSummaryHeader(score.correct, items.length);
        renderSummary(score, items);    

        actions.boundRecordScore(score);
    }    
};