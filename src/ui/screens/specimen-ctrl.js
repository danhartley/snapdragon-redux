import { store } from 'redux/store';
import { renderSpecimens } from 'ui/screens/specimen';
import { renderSpecimensHeader } from './specimen';

export const renderSpecimen = (item) => {

    const { layout, items } = store.getState();

    renderSpecimensHeader(items.length);

    const screen = layout.screens.filter(el => el.name === 'specimen')[0];

    if(!screen) return;
    
    renderSpecimens(screen, item);

};