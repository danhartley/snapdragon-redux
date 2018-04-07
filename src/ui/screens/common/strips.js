import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { addListeners } from 'ui/helpers/helpers-for-screens';

export const renderStrips = (screen, item) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrStrips = template.content.querySelector('.js-rptr-strips');

    item.content = R.take(6, item.multipleNames.map(cardItem => {
        const vernacularNames = cardItem.names
            .filter(name => name.language === 'en')
            .map(name => name.vernacularName);

            const vernacularQuestion = item.names.filter(name => name.language === 'en')[0].vernacularName;

        return { id: item.id, binomial: item.name, vernacularQuestion: vernacularQuestion, vernacularAnswer: vernacularNames[0] };
   }));
                    
    rptrStrips.innerHTML = item.content.map(
        contentItem => {

            return `<div class="strip">
                        <div class="capitalised" id="${contentItem.id}" data-vernacular="${contentItem.vernacularQuestion}">${contentItem.vernacularAnswer}</div>
                    </div>`;
           }
    ).join('');

    const clone = document.importNode(template.content, true);
    const cards = clone.querySelectorAll('.js-rptr-strips .strip div');

    // listeners
    addListeners(cards, item);

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

};