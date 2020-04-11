import { store } from 'redux/store';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';

export const renderSummary = history => {

    const { collection } = store.getState();

    renderScoreSummary(collection.id);

    return;
};

