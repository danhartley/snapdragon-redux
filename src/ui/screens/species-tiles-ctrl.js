import { store } from 'redux/store';
import { renderTiles } from 'ui/screens/species-tiles';

export const renderTile = (card) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-tiles')[0];

    if(!screen) return;

    renderTiles(screen.template, card);
};