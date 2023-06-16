import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { persistor } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import { cookieHandler } from 'ui/helpers/cookie-handler';
import { languagePicker } from 'ui/screens/common/language-selection';

import settingsTemplate from 'ui/fixtures/settings-template.html';

export const settingsHandler = () => {
    
  document.querySelector('#basicModal .js-modal-text').innerHTML = '';

    const template = document.createElement('template');
    
    template.innerHTML = settingsTemplate;
    
    const title = document.querySelector('#basicModal .js-modal-text-title');

    title.innerHTML = '<header>Snapdragon settings</header>';

    const { config } = store.getState();

    const delay = config.callbackTime/1000;

    const languages = config.languages;

    renderTemplate({ delay, languages }, template.content, document.querySelector('#basicModal .js-modal-text'));
    
    const clearCacheBtn = document.querySelector('.js-clear-cache-btn');
    const setDelayBtn = document.querySelector('.js-set-delay-btn');
    const setDelayInput = document.querySelector('.js-set-delay-input');
    const delayTxt = document.querySelector('.js-delay-text');

    document.querySelector('#basicModal .modal-body').classList.remove('bird-song-bg');

    delayTxt.innerHTML = delay === 1
    ? `The current delay is ${delay} second.`
    : `The current delay is ${delay} seconds.`;

    clearCacheBtn.addEventListener('click', () => { 
        clearCacheBtn.innerText = 'Clearing cache…';
        setTimeout(() => {
            persistor.purge();
            clearCacheBtn.innerText = 'Cache cleared';
            cookieHandler.removeFirstTimeVisitorCookie();
            setTimeout(() => {                                
                setTimeout(() => {                    
                    window.location.reload(true);
                }, 500);
            }, 500);
        }, 1000);
    });

    setDelayBtn.addEventListener('click', () => {
        setDelayBtn.innerHTML = 'Setting delay…';
        setTimeout(() => {
            const delay = setDelayInput.value;
            config.callbackTime = delay * 1000;
            actions.boundUpdateConfig(config);
            setDelayBtn.innerHTML = 'Set delay';
            delayTxt.innerHTML = delay === '1'
                ? `Delay updated to ${delay} second.`
                : `Delay updated to ${delay} seconds.`;
        }, 500);
    });

    languagePicker(config, document.querySelector('.js-language-selection-container'), (config) => {
        actions.boundUpdateConfig(config);
    });
};