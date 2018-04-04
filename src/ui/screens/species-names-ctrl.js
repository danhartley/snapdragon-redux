import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesNamesScreen } from 'ui/screens/species-names';

export const renderSpeciesNames = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-names')[0];

    if(!screen) return;

    renderSpeciesNamesScreen(screen, item);
};