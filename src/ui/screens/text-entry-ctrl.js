import { store } from 'redux/store';
import { renderInput } from 'ui/screens/text-entry';

export const renderTextEntry = (lesson) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    
    if(!screen) return;

    const question = lesson[screen.question];

    renderInput(screen, lesson, question);
};

