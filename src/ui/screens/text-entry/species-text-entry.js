import { store } from 'redux/store';
import { renderInput } from 'ui/screens/text-entry/text-entry';

export const renderTextEntry = (collection) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    const item = collection.nextItem;
    
    if(!screen) return;

    item.vernacular = item.vernacularName;

    const q = screen.taxon === 'name' ? item.name : item.taxonomy[screen.taxon];

    const question = { binomial: item.name, species: item.taxonomy.species, genus: item.taxonomy.genus, taxon: screen.taxon, question: q, common: item.vernacularName };

    renderInput(screen, question);
};