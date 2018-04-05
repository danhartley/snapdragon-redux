import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderCardHeader, renderCard } from 'ui/screens/common/card';

export const renderSpeciesCardRight = (index) => {

    const { item, layout } = store.getState();

    screen = { template: 'js-card-template', parent: DOM.rightBody };

    renderCardHeader();
    renderCard(screen, item);
};