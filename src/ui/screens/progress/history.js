import { store } from 'redux/store';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';

export const renderHistory = history => {
            
    const { collection} = store.getState();

    console.log('\x1b[32m', 'renderHistory');

    renderSpeciesCollectionList(collection, { readOnlyMode: true });
}    