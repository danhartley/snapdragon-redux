import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderSettings } from 'ui/screens/common/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { renderSnapdragon } from 'ui/screens/left/snapdragon';
import { renderCollections } from 'ui/screens/right/collections';
import { subscription } from 'redux/subscriptions';
import navigationTemplate from 'ui/screens/common/navigation-template.html';

export const renderNavigation = () => {

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = document.querySelector('.js-nav-icons');

    renderTemplate({ }, template.content, parent);

    const { config } = store.getState();

    const returningUser = localStorage.getItem('returningUser') ? new Boolean(localStorage.getItem('returningUser')) : false;

    const renderHome = () => {
        if(config.isPortraitMode) {
            if(returningUser) renderCollections();
            else renderSnapdragon();
        } else {
            renderCollections();
            renderSnapdragon();
        }
    };

    renderHome();

    const navIcons = document.querySelectorAll('.js-nav-icons .icon');

    navIcons.forEach(icon => {

        // icon.id === 'home' ? icon.classList.add('active-icon') : icon.classList.remove('active-icon');

        icon.addEventListener('click', event => {
                const target = event.target.parentElement;
                const targetId = target.id === '' ? target.parentElement.id : target.id;
                target.parentElement.classList.add('active-icon');
                switch(targetId) {                    
                    case 'home':

                    subscription.getByRole('screen').forEach(sub => subscription.remove(sub));
                    setTimeout(() => {
                        actions.boundToggleLesson({ state: 'inactive' });
                        renderHome(); // no, dispatch action (pause above? require a domain... index?) 
                    });                    
                        break;
                    case 'settings':
                        renderSettings(); // no, dispatch action
                        break;
                    case 'test':
                        break;
                }
            }
        )}
    );
};