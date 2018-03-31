import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesNameHeader, renderSpeciesNameScreen } from 'ui/screens/species-name';

export const renderSpeciesName = (item) => {

    const { layout } = store.getState();

    let screen = layout.screens.filter(el => el.name === 'species-name')[0];

    if(!screen) return;

    renderSpeciesNameHeader();
    renderSpeciesNameScreen(screen, item);
};