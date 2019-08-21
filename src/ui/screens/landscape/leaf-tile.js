// import { store } from 'redux/store';
// import { DOM } from 'ui/dom';
// import { renderTemplate } from 'ui/helpers/templating';
// import leafTileTemplate from 'ui/screens/landscape/leaf-tile-template.html';

// export const renderLeafTile = (collection) => {

//     const template = document.createElement('template');

//     template.innerHTML = leafTileTemplate;

//     const item = collection.nextItem;

//     const { layout } = store.getState();

//     DOM.leftBody.innerHTML = '';

//     renderTemplate(item, template.content, DOM.leftBody);
// };