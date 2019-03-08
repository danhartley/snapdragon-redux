import { store } from 'redux/store';
import { renderInput } from 'ui/screens/text-entry/text-entry';

export const renderTextEntry = (collection) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    const item = collection.nextItem;
    
    if(!screen) return;

    item.vernacular = item.vernacularName;

    const question = { binomial: item.name, species: item.species, genus: item.genus, taxon: screen.taxon, question: item[screen.taxon], common: item.vernacularName };

    renderInput(screen, question);
};