import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderSpeciesCardHeader, renderSpeciesCardScreen } from 'ui/screens/species-card';

export const renderSpeciesCard = (index) => {

    const { item, layout } = store.getState();

    screen = { template: 'js-genus-species-card-template', parent: DOM.rightBody };//js-species-card-template

    renderSpeciesCardHeader();
    renderSpeciesCardScreen(screen, item);
};