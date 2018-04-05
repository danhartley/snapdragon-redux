import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderScientificNameScreen } from 'ui/screens/species-scientific';

export const renderScientificName = (item) => {
    
    const { layout } = store.getState();

    let screen = layout.screens[0].next;

    if(!screen) return;

    renderScientificNameScreen(screen, item);
};