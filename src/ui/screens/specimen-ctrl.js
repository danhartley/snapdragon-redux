import { store } from 'redux/store';
import { renderSpecimens } from 'ui/screens/specimen';
import { renderSpecimensHeader } from './specimen';

export const renderSpecimen = (item) => {

    const { strategy, randomiser, items } = store.getState();

    renderSpecimensHeader(items.length);

    const screen = strategy.screens.filter(el => el.name === 'specimen')[0];
    
    renderSpecimens(screen, randomiser, item.images);

};