import { store } from 'redux/store';
import { renderSpecimens } from 'ui/screens/specimen';
import { renderSpecimensHeader } from './specimen';

let currItem = null;

export const renderSpecimen = () => {

    const { strategy, randomiser, item, items } = store.getState();

    if(item === currItem) return;

    currItem = item;

    renderSpecimensHeader(items.length);

    const screen = strategy.screens.filter(el => el.name === 'specimen')[0];
    
    renderSpecimens(screen, randomiser, item.images);

};