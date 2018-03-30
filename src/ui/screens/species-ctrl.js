import { store } from 'redux/store';
import { renderSpeciesCards } from 'ui/screens/species';

export const renderSpecies = (lesson) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species')[0];

    if(!screen) return;
    
    renderSpeciesCards(screen.template, lesson);
};