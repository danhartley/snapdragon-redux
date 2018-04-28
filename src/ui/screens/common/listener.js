import { DOM } from 'ui/dom';

import { renderSnapdragon } from 'ui/screens/right/snapdragon';
import { renderCollections } from 'ui/screens/left/collections';

export const listening = () => {

    const handleClick = event => {
        renderCollections();
        renderSnapdragon();
    };

    DOM.changeCollection.addEventListener('click', handleClick);
}