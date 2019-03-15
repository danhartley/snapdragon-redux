export const switchHandler = (idSwitch, startingPosition, callback) => {
    
    const state = { position: startingPosition === 'left' ? 'right' : 'left' };

    let button = idSwitch.querySelector('div');

    const switcher = () => {
        
        switch(state.position) { 
            case 'left':
                button.parentElement.classList.add('right');
                button.parentElement.classList.remove('left');                
                state.position = 'right';
                break;
            case 'right':
                button.parentElement.classList.add('left');
                button.parentElement.classList.remove('right');
                state.position = 'left';
                break;
        }
        callback(state.position);
    }

    switcher();

    idSwitch.addEventListener('click', event => {
        switcher();        
    });
};