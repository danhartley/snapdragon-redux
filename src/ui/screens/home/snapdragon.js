// import * as R from 'ramda';

// import { utils } from 'utils/utils';
// import { DOM } from 'ui/dom';
// import { store } from 'redux/store';
// import { snapdragonCollections } from 'snapdragon/snapdragon-collections';
// import { renderTemplate } from 'ui/helpers/templating';
// import snapdragonTemplate from 'ui/screens/home/snapdragon-template.html';
// import { listenToTaxaFiltersUpdate } from 'ui/helpers/iconic-taxa-handler';
// import { listenToPlaceChange } from 'geo/geo';
// import { listenToCollectionOptionHoverEvent } from 'ui/screens/home/collections';

// const renderSnapdragonTemplate = (snapdragonTemplate, DOM, snapdragonCollections, renderTemplate, filters, location) => {

//     const template = document.createElement('template');

//     template.innerHTML = snapdragonTemplate;

//     const clone = document.importNode(template.content, true);

//     const parent = DOM.leftBody;
//     parent.innerHTML = '';

//     let collections = [];

//     if(filters && filters.length !== 0) {
//         snapdragonCollections.forEach(collection => {
//             collection.iconicTaxa.forEach(iconicTaxon => {
//                 filters.forEach(filter => {
//                     if(filter === iconicTaxon) {
//                         if(!collections.includes(collection))
//                         collections.push(collection);
//                     }
//                 })
//             })
//         })
//     } else {
//         collections = utils.sortBy(snapdragonCollections, 'id', 'asc');
//     }

//     const context = { collections };

//     renderTemplate(context, template.content, parent, clone);

//     document.querySelectorAll('.js-iNatWidget').forEach(widget => {
//         const id = parseInt(widget.getAttribute('name'));
//         if(id === 1 && location) {
//             document.querySelector('.lesson-item-details > div > span').innerHTML = `Species from ${location.country.place_name}`;
//         }
//         snapdragonCollections.forEach(c=> {
//             if(c.id === id) {
//                 if(c.iNatWidget) {
//                     widget.innerHTML = `<span data-toggle="modal" data-target="#iNatWidgetModal" class="underline-link">iNaturalist species</span`;
//                     widget.addEventListener('click', event => {
//                         if(id === 1 && location) {
//                             c.iNatWidget = location.country.place_name.replace(' ', '-').toLowerCase(); 
//                             c.name = location.summary;
//                         }
//                         document.querySelector('#iNatWidgetModal .modal-header').innerHTML = 
//                             filters.length > 0
//                                 ? `iNaturalist species observed in ${c.name} filtered by <span class="toUpperCase">${filters.join(', ')}</span>`
//                                 : `iNaturalist species observed in ${c.name}`;
//                         let params = c.iNatWidget;
//                         if(filters.length > 0) {
//                             params += `?taxon=${filters.join(',')}`;
//                         }
//                         const widget = `<iframe width="100%" height="500" scrolling="auto" src="https://www.inaturalist.org/places/guide_widget/${params}"></iframe>`
//                         document.querySelector('#iNatWidgetModal .modal-body').innerHTML = widget;
//                     });
//                 }
//             }
//         })
//     });
// };

// export const renderSnapdragon = (counter) => {

//     if(counter.isLessonPaused) return;

//     const { config } = store.getState();

//     const filters = config.guide.iconicTaxa;

//     renderSnapdragonTemplate(snapdragonTemplate, DOM, snapdragonCollections, renderTemplate, filters);
// };

// listenToTaxaFiltersUpdate((filters, config) => {    
//     renderSnapdragonTemplate(snapdragonTemplate, DOM, snapdragonCollections, renderTemplate, filters);
// });  

// listenToPlaceChange(location => {    
//     renderSnapdragonTemplate(snapdragonTemplate, DOM, snapdragonCollections, renderTemplate, [], location);
// });

// // listenToCollectionOptionHoverEvent(optionId => {
// //     document.querySelectorAll('.lesson-item-details .collectionName').forEach(collection => {
// //         collection.classList.remove('hover-box');
// //         if(parseInt(collection.getAttribute('name')) === optionId) {
// //             collection.classList.add('hover-box');
// //         }
// //     });
// // });