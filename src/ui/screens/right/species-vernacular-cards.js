import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderCards } from 'ui/screens/common/cards';

export const renderSpeciesNamesCards = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-vernacular-cards')[0];

    if(!screen) return;

    item.content = R.take(6, item.multipleNames.map(cardItem => {
        const vernacularNames = cardItem.names
            .filter(name => name.language === 'en')
            .map(name => name.vernacularName);

            const vernacularQuestion = item.names.filter(name => name.language === 'en')[0].vernacularName;

        return { id: item.id, binomial: item.name, vernacularQuestion: vernacularQuestion, vernacularAnswer: vernacularNames[0] };
   }));

   const callback = contentItem => {

    return `<div class="rectangle">
                    <div class="answer">
                        <button class="capitalised" id="${contentItem.id}" data-vernacular="${contentItem.vernacularQuestion}">${contentItem.vernacularAnswer}</button>
                    </div>
                </div>`;
   };

    renderCards(screen, item, callback);
};