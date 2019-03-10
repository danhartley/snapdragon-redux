// import { actions } from 'redux/actions/action-creators';

// export const renderRange = (config, modal) => {
//     const defaultRange = config.speciesRange;
//     const range = modal.querySelector('#range');

//     modal.querySelector('.js-set-range-input').value = defaultRange;
//     range.innerHTML = defaultRange;    

//     const slider = modal.querySelector('.js-set-range-input');

//     const updateSlider  = event => {
//         range.innerHTML = event.target.value;
//     };

//     slider.addEventListener('change', updateSlider);

//     const setRangeBtn = modal.querySelector('.js-set-range-btn');
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

// };