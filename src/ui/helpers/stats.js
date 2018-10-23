import { utils } from 'utils/utils';

const getItemScoreStats = (collection, history, config) => {

    const reducer = (acc, curr) => {
        return { ...acc,  ...curr };
    }

    if(!history) return [];

    const lastRound = history.scores[history.scores.length - 1];

    const passesTotals = [ lastRound.passesTotals ];
    const failsTotals = [ lastRound.failsTotals ];

    const passes = passesTotals.reduce(reducer, {});
    const fails = failsTotals.reduce(reducer, {});
    const all = { ...passes, ...fails };

    const items = utils.sortBy(collection.items.filter(item => all[item.id]), 'snapIndex', 'desc');
    
    items.forEach(item => { 
        item.passes = passes[item.id] || 0;
        item.fails = fails[item.id] || 0;
    });

    return items;
};

const getItemsForRevision = (collection, history, config, minimumScore) => {

    const items = getItemScoreStats(collection, history, config);

    return items.filter(item => item.fails > minimumScore);
};

export const stats = {
    getItemScoreStats,
    getItemsForRevision
};