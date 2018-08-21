import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderSettings } from 'ui/fixtures/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import { renderCollections } from 'ui/screens/home/collections';
import navigationTemplate from 'ui/fixtures/navigation-template.html';

export const renderNavigation = (config) => {

    const { counter, collection } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = config.isPortraitMode ? document.querySelector('.js-right-footer .js-nav-icons') : document.querySelector('.js-left-footer .js-nav-icons');
    parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

    setTimeout(() => {
        const isHomePage = document.querySelector('.js-collections');
        if(isHomePage) {
            document.querySelector('.js-home').classList.add('active-icon'); 
            const svg = document.querySelector('.js-home svg');
            if(svg) {
                svg.classList.remove('active-icon');
            }
        }
    }); 

    let handleBodyClick = true;

    document.body.addEventListener('click', () => {
        if(handleBodyClick) {
            document.querySelector('.js-settings').classList.remove('active-icon');
            const svg = document.querySelector('.js-settings svg');
            if(svg) {
                svg.classList.remove('active-icon');
            }
        } else {
            handleBodyClick = true;
        }
    });

    const navIcons =  document.querySelectorAll('.js-nav-icons .icon');

    const getLatestCounter = () => store.getState().counter;

    navIcons.forEach(icon => {

        icon.addEventListener('click', event => {                
                handleBodyClick = false;
                const target = event.target.parentElement;
                const targetId = target.id === '' ? target.parentElement.id : target.id;
                target.classList.add('active-icon');
                switch(targetId) {                    
                    case 'home':
                    subscription.getByRole('screen').forEach(sub => subscription.remove(sub));
                    
                    subscription.add(renderCollections, 'counter', 'screen');
                    setTimeout(() => {
                        const { index } = getLatestCounter();
                        actions.boundToggleLesson({ index: 0, lesson: 'inactive', log: { index: index, collection: collection.id  } });
                    });                    
                        break;
                    case 'settings':
                        renderSettings();
                        break;
                    case 'test':
                        break;
                }
            }
        )}
    );
};