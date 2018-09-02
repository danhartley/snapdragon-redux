import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { persistor } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import settingsTemplate from 'ui/fixtures/settings-template.html';

export const renderSettings = () => {
    
    DOM.modalText.innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = settingsTemplate;
    
    DOM.modalTextTitle.innerHTML = 'Snapdragon settings';

    const { config } = store.getState();

    const delay = config.callbackTime/1000;

    renderTemplate({ delay }, template.content, DOM.modalText);
    
    const clearCacheBtn = document.querySelector('.js-clear-cache-btn');
    const setDelayBtn = document.querySelector('.js-set-delay-btn');
    const setDelayInput = document.querySelector('.js-set-delay-input');
    const delayTxt = document.querySelector('.js-delay-text');

    delayTxt.innerHTML = delay === 1
    ? `The current delay is ${delay} second`
    : `The current delay is ${delay} seconds`;

    clearCacheBtn.addEventListener('click', () => { 
        clearCacheBtn.innerText = 'Clearing cache...';
        setTimeout(() => {
            persistor.purge();
            clearCacheBtn.innerText = 'Cache cleared';
            setTimeout(() => {                                
                setTimeout(() => {
                    window.location.reload(true);               
                }, 500);
            }, 500);
        }, 1000);
    });

    setDelayBtn.addEventListener('click', () => {
        setDelayBtn.innerHTML = 'Setting delay...';
        setTimeout(() => {
            const delay = setDelayInput.value;
            config.callbackTime = delay * 1000;
            actions.boundUpdateConfig(config);
            setDelayBtn.innerHTML = 'Set delay';
            delayTxt.innerHTML = delay === '1'
                ? `Delay updated to ${delay} second`
                : `Delay updated to ${delay} seconds`;
        }, 500);        
    });
};