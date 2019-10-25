import { store } from 'redux/store';
import { renderSpeciesList } from 'ui/screens/lists/species-list';

export const renderHistory = history => {
            
    const { collection} = store.getState();

    console.log('\x1b[32m', 'renderHistory');

    renderSpeciesList(collection, { readOnlyMode: true }); // missing callback; required?
}    