import { DOM } from 'ui/dom';
import { renderCollections } from 'ui/screens/left/collections';

export const listening = () => {

    const handleClick = event => renderCollections();

    DOM.changeCollection.addEventListener('click', handleClick);
}