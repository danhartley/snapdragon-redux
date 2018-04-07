import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderStrips } from 'ui/screens/common/strips';

export const renderSpeciesNamesStrips = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-vernacular-strips')[0];

    if(!screen) return;

    renderStrips(screen, item);
};
