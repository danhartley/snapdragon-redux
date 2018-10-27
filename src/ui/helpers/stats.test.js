import { stats } from 'ui/helpers/stats';
import { state1 as history } from 'test/redux-test-history/state-1';
import { state2 as items } from 'test/redux-test-history/state-1';

test('getItemsForRevision should parse all scores in history to determine items to review', () => {
    const collection = { items };
    let minimumScore = 1;
    let itemsToReview = stats.getItemsForRevision(collection, history, minimumScore);
    expect(itemsToReview.length).toBe(1);
    minimumScore = 2;
    itemsToReview = stats.getItemsForRevision(collection, history, minimumScore);
    expect(itemsToReview.length).toBe(0);
});