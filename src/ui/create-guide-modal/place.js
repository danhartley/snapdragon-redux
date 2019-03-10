// import { utils } from 'utils/utils';
// import { actions } from 'redux/actions/action-creators';
// import { renderTemplate } from 'ui/helpers/templating';
// import placeTemplate from 'ui/create-guide-modal/place-list-template.html';
// import { rbEventHandler } from 'ui/create-guide-modal/common/rb-event-handler';
// import { inatAutocomplete } from 'ui/helpers/inat-autocomplete';

// export const renderPlace = (modal, config, collections, createGuide) => {

//     const guideTxt = modal.querySelector('.guide-text');
//     const chosen = modal.querySelector('.js-chosen span:nth-child(2)');
//     const saveYourChangesBtn = createGuide.save(config, chosen, 'PLACE');

//     const location = config.guide.locationType === 'auto' 
//             ? config.guide.autoLocation 
//             : config.guide.locationPlace;
    
//     let places = [];

//     if(config.guide.iconicTaxa && config.guide.iconicTaxa.length !== 0) {
//         collections.forEach(collection => {
//             collection.iconicTaxa.forEach(iconicTaxon => {
//                 config.guide.iconicTaxa.forEach(taxon => {
//                     if(taxon === iconicTaxon) {
//                         if(!places.includes(collection)) {
//                             places.push(collection);
//                         }                        
//                     }
//                 })
//             })
//         })
//     } else {
//         places = utils.sortBy(collections.filter(c => c.type === 'species'), 'id', 'asc');
//     }

//     if(config.guide.place) {
//         setTimeout(() => {
//             const preSelectedCollection = modal.querySelector(`#id-${config.guide.place.id}`).querySelectorAll('span')[1];
//             if(preSelectedCollection) {
//                 preSelectedCollection.click();                
//             }
//         });
//         chosen.innerHTML = config.guide.place.name;
//     } 

//     let place;

//     if(location) {
//         place = places.find(place => place.id === 1);
//         place.name = `${location}`;
//         places = places.filter(place => place.id !== 1);
//         guideTxt.innerHTML = 'Demarcate location by place or observer';
//     }

//     const template = document.createElement('template');
//     template.innerHTML = placeTemplate;
//     let parent = modal.querySelector('.js-actions');
    
//     renderTemplate({ place, places }, template.content, parent);
    
//     modal.querySelectorAll('.btn.btn-secondary div').forEach(type => type.addEventListener('click', event => {
//         const target = rbEventHandler(modal, event);
//         const placeId = parseInt(target.id.slice(3));
//         if(placeId !== (config.guide.place && config.guide.place.id)) {
//             saveYourChangesBtn.disabled = false;
//         }
//         config.guide.place = { id: placeId, name: target.innerText };
//         config.collection.id = placeId;
//         toggleSpeciesRange(placeId);
//     }));


//     const toggleSpeciesRange = placeId => {
//         const rangeSlider = modal.querySelector('.range-slider');
//         const isRangeSensitive = collections.find(collection => collection.id === placeId).rangeSensitive;
//         isRangeSensitive 
//             ? rangeSlider.classList.remove('disabled') 
//             : rangeSlider.classList.add('disabled');
//     };

//     toggleSpeciesRange(place.id);

//     const txt = modal.querySelector('.js-range');
//     const txtSaved = modal.querySelector('.js-range-saved');
//     let range = config.guide.speciesRange;

//     txt.innerHTML = `Include species within ${range}km range`;

//     modal.querySelector('.js-set-range-input').value = range;

//     const slider = modal.querySelector('.js-set-range-input');
    
//     const updateSlider  = event => {
//         range = event.target.value;
//         config.guide.speciesRange = range;
//         actions.boundUpdateConfig(config);        
//         txt.innerHTML = `Include species within ${range}km`;
//         txtSaved.innerHTML = `Updated to ${range}km`;
//         setTimeout(() => {
//             txtSaved.innerHTML = '';
//         }, 1500);
//     };
    
//     slider.addEventListener('change', updateSlider);

//     const inatPlace = modal.querySelector('#inat-place');

//     inatPlace.addEventListener('keyup', event => {
//         inatAutocomplete(inatPlace, 'places', 'inat-place-autocomplete', 'id-3');
//     });

//     modal.querySelector('#id-3').addEventListener('click', event => {
//         config.guide.place = { name: inatPlace.value, id: inatPlace.name, type: 'places' };
//     });

//     const inatUserId = modal.querySelector('#inat-place-id');

//     inatUserId.addEventListener('keyup', event => {        
//         inatAutocomplete(inatUserId, 'users', 'inat-place-id-autocomplete', 'id-4');
//     });

//     modal.querySelector('#id-4').addEventListener('click', event => {
//         config.guide.place = { name: inatUserId.value, id: inatUserId.name, type: 'users' };
//     });
// };