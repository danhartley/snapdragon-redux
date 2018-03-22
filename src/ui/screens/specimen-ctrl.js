import { store } from 'redux/store';
import { renderSpecimens } from 'ui/screens/specimen';

let currItem = null;

export const renderSpecimen = () => {

    const { strategy, randomiser, item, items } = store.getState();

    if(item === currItem) return;

    currItem = item;

    renderSpecimens(strategy, randomiser, item, items);

};