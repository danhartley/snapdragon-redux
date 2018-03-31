import { store } from 'redux/store';
import { renderSpeciesCards } from 'ui/screens/species-cards';

export const renderSpecies = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-cards')[0];

    if(!screen) return;
    
    renderSpeciesCards(screen.template, item);
};