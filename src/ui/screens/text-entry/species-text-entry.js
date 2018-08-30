import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderInput } from 'ui/screens/text-entry/text-entry';

export const renderTextEntry = (collection) => {

    const { layout, config } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'text-entry')[0];
    const item = collection.nextItem;
    
    if(!screen) return;

    item.vernacular = itemProperties.vernacularName(item, config);

    const question = { binomial: item.name, species: item.species, genus: item.genus, taxon: screen.taxon, question: item[screen.taxon], common: item.vernacular };

    const hints = [
        { selector: 'span.js-genus', value: question.genus },
        { selector: 'span.js-species', value: question.species },
        { selector: 'span.js-common', value: question.binomial },
        { selector: 'span.js-latin', value: question.common }
    ];

    renderInput(screen, question, hints);
};