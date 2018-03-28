import { store } from 'redux/store';
import { renderSpeciesCards } from 'ui/screens/species';

export const renderLesson = (index) => {

    const { layouts, item } = store.getState();

    const screen = { template: 'js-species-template'};

    if(!screen) return;
    
    renderSpeciesCards(screen, item, true);
};