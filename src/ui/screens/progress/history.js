import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { stats } from 'ui/helpers/stats';

export const renderHistory = (history) => {
            
    const { collection, config } = store.getState();

    // if(!history) return null;

    collection.items = stats.getItemScoreStats(collection, history, config);

    renderSpeciesCollectionList(collection, true);
}    