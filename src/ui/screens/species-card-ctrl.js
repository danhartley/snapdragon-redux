import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesCardHeader, renderSpeciesCardScreen } from 'ui/screens/species-card';

export const renderSpeciesCard = (index) => {

    const { item, layout } = store.getState();

    screen = { template: 'js-species-card-template', parent: DOM.rightBody };

    renderSpeciesCardHeader();
    renderSpeciesCardScreen(screen, item);
};