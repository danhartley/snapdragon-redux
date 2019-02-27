// import * as R from 'ramda';

// import { elem } from 'ui/helpers/class-behaviour';
// import { actions } from 'redux/actions/action-creators';
// import { getPlace } from 'geo/geo';

// const filterListeners = [];
// const rangeListeners = [];
// const userlisteners = [];

// export const listenToTaxaFiltersUpdate = listener => { 
//     filterListeners.push(listener);
// };

// export const listenToRangeUpdate = listener => {
//     rangeListeners.push(listener);
// };

// export const listenToiNaturalistUserChange = listener => { 
//     userlisteners.push(listener);
// };

// export const handleIconicTaxaFilter = (config) => {
    
//     document.querySelector('#aves div:nth-child(2)').innerHTML = 'Birds';
//     document.querySelector('#amphibia div:nth-child(2)').innerHTML = 'Amphibians';
//     document.querySelector('#mammalia div:nth-child(2)').innerHTML = 'Mammals';
//     document.querySelector('#insecta div:nth-child(2)').innerHTML = 'Insects';
//     document.querySelector('#fungi div:nth-child(2)').innerHTML = 'Fungi & Lichens';
//     document.querySelector('#plantae div:nth-child(2)').innerHTML = 'Plants';
//     document.querySelector('#lepidoptera div:nth-child(2)').innerHTML = 'Butterflies & Moths';

//     const filterBtn = document.querySelector('.js-lesson-filters > button:nth-child(1)');
//     const setRangeBtn = document.querySelector('.js-set-range-btn');
//     const setLocationBtn = document.querySelector('.js-set-location-btn');
//     const setiNatIdentityBtn = document.querySelector('.js-set-inat-identity-btn');

//     const filterSelectedClass = 'iconic-taxa-selected';

//     const icons = document.querySelectorAll('.iconic-taxa-categories > div > div:nth-child(1)');

//     if(config.guide.iconicTaxa && config.guide.iconicTaxa.length > 0) {
//         icons.forEach(icon => {
//             const filterId = icon.parentElement.id;
//             if(R.contains(filterId, config.guide.iconicTaxa)) {
//                 icon.classList.add(filterSelectedClass);
//             }
//         });
//     }

//     const checkButtonState = (filters, haveFiltersChanged) => {
//         if(filters.length === 0 && !haveFiltersChanged) {
//             filterBtn.disabled = true;
//         } else {
//             filterBtn.disabled = false;
//         }
//     };

//     let filters = [ ...config.guide.iconicTaxa ] || [];
//     checkButtonState(filters, false);

//     const fungiIcon = document.querySelector('#fungi > div');
//     if(elem.hasClass(fungiIcon, 'iconic-taxa-selected')) {
//         fungiIcon.querySelector('g g').classList.add('svg-icon-selected');
//     }

//     icons.forEach(category => {
//         category.addEventListener('click', event => {
            
//             const filter = event.currentTarget;
//             const filterId = filter.parentElement.id;                       

//             if(filters.find(f => f === filterId)) {
//                 if(filterId === 'fungi') {
//                     filter.querySelector('g g').classList.remove('svg-icon-selected');                    
//                 }
//                 filter.classList.remove(filterSelectedClass);
//                 filters = filters.filter(f => f !== filterId);
//             } else {
//                 if(filterId === 'fungi') {
//                     filter.querySelector('g g').classList.add('svg-icon-selected');
//                 }
//                 filter.classList.add(filterSelectedClass);
//                 filters.push(filterId);
//             }    
//             checkButtonState(filters, true);
//         });
//     });

//     filterBtn.removeEventListener('click');
//     filterBtn.addEventListener('click', event => {
//         document.querySelector('#iconicTaxaFilters .close span').click();
//         config.guide.iconicTaxa = filters;
//         actions.boundUpdateConfig(config);
//         filterListeners.forEach(listener => listener(filters, config));
//     });

//     const defaultRange = config.speciesRange;
//     const range = document.getElementById('range');

//     document.querySelector('.js-set-range-input').value = defaultRange;
//     range.innerHTML = defaultRange;    
    
//     const slider = document.querySelector('.js-set-range-input');

//     const updateSlider  = event => {
//         range.innerHTML = event.target.value;
//     };

//     slider.addEventListener('change', updateSlider);

//     setRangeBtn.addEventListener('click', event => {
//         config.speciesRange = parseInt(range.innerHTML);
//         setRangeBtn.innerHTML = 'Updating range...';
//         actions.boundUpdateConfig(config);
//         rangeListeners.forEach(listener => listener(filters, config));
//         setTimeout(() => {                
//             setRangeBtn.innerHTML = 'Range updated';                
//             setTimeout(() => {
//                 setRangeBtn.innerHTML = 'Set new range';
//             }, 1500);
//         }, 1500);
//     });

//     let place;

//     async function handleSetLocation() {
//         setLocationBtn.innerHTML = 'Updating location...'
//         place = await getPlace(config);
//         config.place = place;
//         actions.boundUpdateConfig(config);
//         setLocationBtn.innerHTML = 'Location updated';
//         console.log(place);
//     }

//     setLocationBtn.addEventListener('click', handleSetLocation);

//     setiNatIdentityBtn.addEventListener('click', event => {
//         const id = document.querySelector('.js-inat-identity').value;
//         config.inatId = id;
//         actions.boundUpdateConfig(config);
//         const inatOption = document.querySelectorAll('.js-collection-options .btn.btn-secondary')[3];
//         inatOption.classList.remove('disabled');
//         inatOption.querySelector('.collectionName').innerHTML = `iNat observations for ${id}`;
//         userlisteners.forEach(listener => listener(id));
//         setTimeout(() => {                
//             setiNatIdentityBtn.innerHTML = 'Identity updated';                
//             setTimeout(() => {
//                 setiNatIdentityBtn.innerHTML = 'Change identity';
//             }, 1000);
//         }, 500);        
//     });
// };

// //const languagesHeader = document.querySelector('.btn-language');

// // const changeLanguageHandler = language => {
//     //     config.language = language;
//     //     languagesHeader.innerHTML = config.languages.find(l => l.lang === config.language).name;
//     //     actions.boundUpdateLanguage(language);
//     //     if(config.isLandscapeMode && collection.id) {
//     //         actions.boundSelectCollection(collection);
//     //         renderSpeciesCollectionList(collection, false);
//     //     }
//     // };

//     // selectHandler('.dropdown.js-languages .dropdown-item', language => {        
//     //     changeLanguageHandler(language);
//     // });