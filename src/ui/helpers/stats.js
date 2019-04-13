import * as R from 'ramda';

const getItemScoreStats = (collection, history) => {

    const collectionItems  = R.clone(collection.items);

    const reducer = (acc, curr) => {        
        if (Object.keys(acc).length === 0 && acc.constructor === Object) return curr;

        for(var itemProp in curr) {
            if(!acc[itemProp]) {
                acc[itemProp] = 0;
            }
        }

        for (var itemProp in acc) {
            const itemValue = curr[itemProp] || 0;
            acc[itemProp] += itemValue;
          }

        return acc;  
    }

    if(!history) return [];

    const passesTotals = history.scores.map(score => score.passesTotals).filter(p=>p);
    const failsTotals = history.scores.map(score => score.failsTotals).filter(p=>p);

    const passes = R.clone(passesTotals).reduce(reducer, {});
    const fails = R.clone(failsTotals).reduce(reducer, {});

    if(!passes) return collectionItems;

    collectionItems.forEach(item => { 
        item.passes = passes[item.id] || 0;
        item.fails = fails[item.id] || 0;
    });

    return collectionItems;
};

export const getSpeciesRecords = history => {

    const lastRoundIndex = history.scores.length -1;
    const correctAnswers = history.scores.map(round => round.passes)[lastRoundIndex].map(answer => answer.binomial);
    const incorrectAnswers = history.scores.map(round => round.fails)[lastRoundIndex].map(answer => answer.binomial);
    const uniqueIncorrectAnswers = [ ...(new Set(incorrectAnswers)) ];
    const uniqueCorrectAnswers = [ ...(new Set(correctAnswers)) ];

    const speciesWithFails = collection.items.filter(function(item) {
        return uniqueIncorrectAnswers.indexOf(item.name) !== -1;
    });

    const speciesWithPasses = collection.items.filter(function(item) {
        return uniqueCorrectAnswers.indexOf(item.name) !== -1;
    });

    let speciesWithoutFails = new Set([...speciesWithPasses].filter(x => {
            !new Set(speciesWithFails).has(x);
        })
    );

    const requiringRevision = { ...collection, ...{ items : speciesWithFails } };
    const learnt = { ...collection, ...{ items : speciesWithoutFails } };
};

const getItemsForRevision = (collection, history, minimumScore) => {

    const items = getItemScoreStats(collection, history);

    const itemsToReview = items.filter(item => item.fails > minimumScore);

    return itemsToReview;
};

export const stats = {
    getItemScoreStats,
    getItemsForRevision
};