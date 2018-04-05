import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderCards } from 'ui/screens/common/cards';

export const renderSpeciesNamesCards = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-names-cards')[0];

    if(!screen) return;

    
    item.content = R.take(6, item.multipleNames.map(item => {
        const vernacularNames = item.names
            .filter(name => name.language === 'en')
            .map(name => name.vernacularName);

           return { id: item.id, name: item.name, vernacularName: vernacularNames[0] };
   }));

   const callback = contentItem => {

    return `<div class="rectangle">
                    <div class="answer">
                    <button class="capitalised" id="${contentItem.id}" name="${contentItem.name}">${contentItem.vernacularName}</button>
                    </div>
                </div>`;
   };

    renderCards(screen, item, callback);
};