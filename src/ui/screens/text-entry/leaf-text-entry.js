import { store } from 'redux/store';
import { renderInput } from 'ui/screens/text-entry/text-entry';

export const renderNameEntry = (collection) => {

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'leaf-text')[0];
    
    if(!screen) return;

    const question = { question: item.term };

    const hints = [];

    renderInput(screen, question, hints);
};