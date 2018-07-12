import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/common/species-list';

export const renderHistory = (history) => {
            
    const { collection } = store.getState();

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

    
    renderSpeciesCollectionList(requiringRevision);
    renderSpeciesCollectionList(learnt, true);
}    