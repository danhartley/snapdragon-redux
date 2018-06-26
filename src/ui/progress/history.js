import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/common/species-list';

export const renderHistory = (history) => {
            
    const { collection } = store.getState();

    if(!history) return null;

    const lastRoundIndex = history.scores.length -1;
    const wrongAnswers = history.scores.map(round => round.fails)[lastRoundIndex].map(answer => answer.binomial);
    const uniqueSpecies = [ ...(new Set(wrongAnswers)) ];

    var speciesToRevise = collection.items.filter(function(item) {
        return uniqueSpecies.indexOf(item.name) !== -1;
    });

    const revision = { ...collection, ...{ items : speciesToRevise } };
    revision.header = 'Species requiring revision';

    renderSpeciesCollectionList(revision);
}    