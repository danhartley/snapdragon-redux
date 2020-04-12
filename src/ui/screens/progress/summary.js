import { subscription } from 'redux/subscriptions';
import { store } from 'redux/store';
import { renderScoreSummary } from 'ui/screens/progress/score-summary';

export const renderSummary = history => {

    subscription.remove(subscription.getByName('renderSummary'));

    const { collection } = store.getState();

    renderScoreSummary(collection.id);

    return;
};

