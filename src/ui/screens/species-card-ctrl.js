import { store } from 'redux/store';
import { renderSpeciesCardHeader, renderSpeciesCard } from 'ui/screens/species-card';

export const renderLesson = (index) => {

    const { item } = store.getState();

    const template = 'js-species-card-template';

    renderSpeciesCardHeader();
    renderSpeciesCard(template, item, true);
};