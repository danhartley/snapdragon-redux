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

test('getItemScoreStats should return total passes and fails from history (all rounds)', () => {
    const localHistory = {
        scores: [
          {
            passesTotals: {
             '582958': 1,
             '597765': 1,
             '1114101': 1,
             '1115777': 1
            },
            failsTotals: {
             '582958': 0,
             '597765': 0,
             '1114101': 0,
             '1115777': 0
            }
          },
          {
            passesTotals: {
             "468373": 1,
             "580997": 1,
             "584088": 1,
             "588530": 1
            },
            failsTotals: {
             "468373": 0,
             "580997": 0,
             "584088": 0,
             "588530": 0
            }
          }
        ]
    };
    const localItems = [
        {
            id: 582958
        },
        {
            id: 597765
        },
        {
            id: 468373
        },
    ];

    let itemsWithStats = stats.getItemScoreStats({items: localItems}, localHistory);
    let i582958 = itemsWithStats.find(i => i.id === 582958);
    expect(i582958.passes).toEqual(1);
    expect(i582958.fails).toEqual(0);
    let i597765 = itemsWithStats.find(i => i.id === 597765);
    expect(i597765.passes).toEqual(1);
    expect(i597765.fails).toEqual(0);
    let i468373 = itemsWithStats.find(i => i.id === 468373);
    expect(i468373.passes).toEqual(1);
    expect(i468373.fails).toEqual(0);
});