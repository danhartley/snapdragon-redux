import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderSettings } from 'ui/fixtures/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import {renderSnapdragon } from 'ui/screens/home/snapdragon';
import { renderCollections } from 'ui/screens/home/collections';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import { endOfRoundHandler } from 'ui/helpers/lesson-handlers';
import navigationTemplate from 'ui/fixtures/navigation-template.html';

export const renderNavigation = (page) => {

    const { collections, collection, config, counter, history } = store.getState();

    const template = document.createElement('template');

    template.innerHTML = navigationTemplate;

    const parent = config.isPortraitMode ? document.querySelector('.js-right-footer .js-nav-icons') : document.querySelector('.js-left-footer .js-nav-icons');
    parent.innerHTML = '';

    renderTemplate({ }, template.content, parent);

    const activateIcon = id => {
        const icon = document.querySelector(`.${id}`);
        if(icon) {
            icon.classList.add('active-icon');
            const svgId = `${id} svg`; 
            const svg = document.querySelector(svgId);
            if(svg) {
                svg.classList.remove('active-icon');
            }
        }
    };

    setTimeout(() => {
        switch(page.name) {
            case 'home':
                activateIcon('js-home');
                break;
            case 'list':
                activateIcon('js-list');
                break;
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

    navIcons.forEach(icon => {

        icon.addEventListener('click', event => {       
            let name;         
                handleBodyClick = false;
                const target = event.target.parentElement;
                const targetId = target.id === '' ? target.parentElement.id : target.id;
                target.classList.add('active-icon');
                switch(targetId) {                    
                    case 'home':
                        name = 'home';
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));        
                        endOfRoundHandler.changeCollection('pauseLesson', collections, collection, config, history); 
                        const { counter } = store.getState();
                        renderCollections(counter);
                        break;
                    case 'settings':
                        renderSettings();
                        break;
                    case 'list':
                        name = 'list';
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));                                   
                        endOfRoundHandler.changeCollection('pauseLesson', collections, collection, config, history); 
                        renderSpeciesCollectionList(collection, null, true);                   
                        break;
                    case 'test':
                        break;
                }
                actions.boundNewPage({ name: name});
            }
        )}
    );
};