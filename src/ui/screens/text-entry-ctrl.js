import { store } from 'redux/store';
import { renderInput } from 'ui/screens/text-entry';

export const renderTextEntry = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    
    if(!screen) return;

    const question = { name: item.name, species: item.species, genus: item.genus, taxon: screen.taxon, question: item[screen.taxon] };

    renderInput(screen, question);
};

