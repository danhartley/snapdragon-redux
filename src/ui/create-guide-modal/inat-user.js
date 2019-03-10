// import { actions } from 'redux/actions/action-creators';

// export const renderInatUser = (config, modal) => {

//     const setiNatIdentityBtn = modal.querySelector('.js-set-inat-identity-btn');

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