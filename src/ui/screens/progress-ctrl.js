import { store } from 'redux/store';
import { renderProgressHeader, renderProgressScreen } from 'ui/screens/progress';
import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/learn';

export const renderProgress = (index) => {

    const { score, items } = store.getState();

    if(score.total === items.length) {
        renderProgressHeader(score);
        renderProgressScreen(score);
    }

    actions.boundRecordScore(score);

    const { history } = store.getState();
    console.log(history);
};