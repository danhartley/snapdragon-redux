import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesCardHeader, renderSpeciesCardScreen } from 'ui/screens/species-card';

export const renderSpeciesName = (item) => {

    const { layout } = store.getState();

    let screen = layout.screens[0].next;

    if(!screen) return;

    renderSpeciesCardHeader();
    renderSpeciesCardScreen(screen, item);
};