import { store } from 'redux/store';
import { renderSpeciesCard } from 'ui/screens/species-card';

export const renderLesson = (index) => {

    const { item } = store.getState();

    const template = 'js-species-card-template';

    renderSpeciesCard(template, item, true);
};