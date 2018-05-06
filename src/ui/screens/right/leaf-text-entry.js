import { store } from 'redux/store';
import { renderInput } from 'ui/screens/common/text-entry';
import { renderTermAnswerHeader } from 'ui/helpers/response-formatting';

export const renderNameEntry = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'leaf-text')[0];
    
    if(!screen) return;

    const question = { question: item.term };

    const hints = [];

    renderInput(screen, question, config.callbackTime, item, renderTermAnswerHeader, hints);
};