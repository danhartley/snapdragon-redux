import { actions } from 'redux/actions/action-creators';
import { renderSettings } from 'ui/screens/common/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import navigationTemplate from 'ui/screens/common/navigation-template.html';

export const renderNavigation = () => {

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = document.querySelector('.js-nav-icons');

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

    const navIcons = document.querySelectorAll('.js-nav-icons .icon');

    navIcons.forEach(icon => {

        icon.addEventListener('click', event => {                
                handleBodyClick = false;
                const target = event.target.parentElement;
                const targetId = target.id === '' ? target.parentElement.id : target.id;
                target.classList.add('active-icon');
                switch(targetId) {                    
                    case 'home':
                    subscription.getByRole('screen').forEach(sub => subscription.remove(sub));
                    setTimeout(() => {
                        actions.boundToggleLesson({ lesson: 'inactive' });
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