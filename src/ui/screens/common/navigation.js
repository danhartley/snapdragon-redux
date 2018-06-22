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