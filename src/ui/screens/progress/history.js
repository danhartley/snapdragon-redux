import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';

export const renderHistory = (history) => {
            
    const { collection, score, config } = store.getState();

    if(!history) return null;

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
    requiringRevision.header = 'Species requiring revision';
    learnt.header = 'Species correctly answered';

    const reducer = (acc, curr) => {
        return { ...acc,  ...curr };
    }

    const passesTotals = history.scores.map(score => score.passesTotals);
    const failsTotals = history.scores.map(score => score.failsTotals);

    const passes = passesTotals.reduce(reducer, {});
    const fails = failsTotals.reduce(reducer, {});
    const all = { ...passes, ...fails };

    const items = utils.sortBy(collection.items.filter(item => all[item.id]), 'snapIndex', 'desc');
    
    items.forEach(item => { 
        item.passes = passes[item.id] || 0;
        item.fails = fails[item.id] || 0;
    });

    const tested =  { ...collection, ...{ items: items }};

    renderSpeciesCollectionList(tested);
}    