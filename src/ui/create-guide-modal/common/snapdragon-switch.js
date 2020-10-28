// export const switchHandler = (idSwitch, startingPosition, callback) => {
    
//     if(!idSwitch) return;
    
//     const state = { position: startingPosition === 'left' ? 'right' : 'left' };

//     let switchControl = idSwitch.querySelector('div');
//     let leftText = idSwitch.parentElement.querySelector('.txt-left');
//     let rightText = idSwitch.parentElement.querySelector('.txt-right');

//     const switcher = () => {
        
//         switch(state.position) { 
//             case 'left':
//                 switchControl.parentElement.classList.add('right');
//                 switchControl.parentElement.classList.remove('left');
//                 leftText.classList.remove('selected');
//                 rightText.classList.add('selected');
//                 state.position = 'right';
//                 break;
//             case 'right':
//                 switchControl.parentElement.classList.add('left');
//                 switchControl.parentElement.classList.remove('right');
//                 leftText.classList.add('selected');
//                 rightText.classList.remove('selected');
//                 state.position = 'left';
//                 break;
//         }
//         callback(state.position);
//     }

//     switcher();

//     idSwitch.addEventListener('click', event => {
//         switcher();        
//     });
// };