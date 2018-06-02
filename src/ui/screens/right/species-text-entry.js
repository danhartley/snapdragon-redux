import { store } from 'redux/store';
import { renderInput } from 'ui/screens/common/text-entry';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const renderTextEntry = (collection) => {

    const item = collection.items[collection.itemIndex];

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    
    if(!screen) return;

    const question = { binomial: item.name, species: item.species, genus: item.genus, taxon: screen.taxon, question: item[screen.taxon] };

    const hints = [
        { selector: 'span.js-genus', value: question.genus },
        { selector: 'span.js-species', value: question.species }
    ];

    renderInput(config, screen, question, config.callbackTime, item, renderAnswerHeader, hints);
};