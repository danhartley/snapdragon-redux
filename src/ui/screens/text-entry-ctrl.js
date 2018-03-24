import { store } from 'redux/store';
import { renderInput } from 'ui/screens/text-entry';

let currItem = null;

export const renderTextEntry = () => {

    const { strategy, item } = store.getState();

    if(item === currItem) return;

    currItem = item;
    
    const screen = strategy.screens.filter(el => el.name === 'text-entry')[0];
    
    if(!screen) return;

    // console.log('text-entry-ctrl item: ', item);
    // console.log('text-entry-ctrl screen.question: ', screen.question);
    
    const question = item[screen.question];

    renderInput(screen, item, question);
};

