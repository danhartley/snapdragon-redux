import { store } from 'redux/store';
import { renderInput } from 'ui/screens/common/text-entry';

export const renderTextEntry = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    
    if(!screen) return;

    const question = { binomial: item.name, species: item.species, genus: item.genus, taxon: screen.taxon, question: item[screen.taxon] };

    renderInput(screen, question, config.callbackTime);
};