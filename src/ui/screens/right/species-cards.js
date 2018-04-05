import * as R from 'ramda';

import { store } from 'redux/store';
import { renderCards } from 'ui/screens/common/cards';

export const renderSpeciesCards = (item) => {

    const { layout } = store.getState();

    const screen = layout.screens.filter(el => el.name === 'species-cards')[0];

    if(!screen) return;
    
    const languages = [ 'en', 'pt' ];

    item.content = R.take(6, item.multipleNames.map(item => {
         const vernacularNames = item.names
                .filter(name => R.contains(name.language, languages))
                .map(name => `<p>${name.vernacularName}</p>`)
                .slice(0,3)
                .join('');
            return { id: item.id, name: item.name, vernacularNames };
    }));

    const callback = contentItem => {
        return `<div class="rectangle">
                    <div class="answer">
                        <button id="${contentItem.id}" name="${contentItem.name}">${contentItem.name}</button>
                        <div class="vernacular-name">${contentItem.vernacularNames}</div>
                    </div>
                </div>`;

    };

    renderCards(screen, item, callback);
};