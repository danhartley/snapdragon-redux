import { store } from 'redux/store';
import { renderInput } from 'ui/screens/text-entry';

export const renderTextEntry = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    
    if(!screen) return;

    const question = item[screen.question];

    renderInput(screen, item, question);
};

