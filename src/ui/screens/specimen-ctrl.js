import { store } from 'redux/store';
import { renderSpecimens } from 'ui/screens/specimen';
import { renderSpecimensHeader } from './specimen';

export const renderSpecimen = (lesson) => {

    const { layout, randomiser, items } = store.getState();

    renderSpecimensHeader(items.length);

    const screen = layout.screens.filter(el => el.name === 'specimen')[0];
    
    renderSpecimens(screen, randomiser, lesson.images);

};