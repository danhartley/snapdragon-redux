import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';

export const renderHistory = history => {
            
    const { collection} = store.getState();

    console.error('renderHistory');

    renderSpeciesCollectionList(collection, true);
}    