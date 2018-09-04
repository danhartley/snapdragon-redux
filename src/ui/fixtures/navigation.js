import { store } from 'redux/store';
import { actions } from 'redux/actions/action-creators';
import { renderSettings } from 'ui/fixtures/settings';
import { renderTemplate } from 'ui/helpers/templating';
import { subscription } from 'redux/subscriptions';
import {renderSnapdragon } from 'ui/screens/home/snapdragon';
import { renderCollections } from 'ui/screens/home/collections';
import { renderSpeciesCollectionList } from 'ui/screens/lists/species-list';
import navigationTemplate from 'ui/fixtures/navigation-template.html';

export const renderNavigation = (page) => {

    const { collection, config } = store.getState();

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

    const getLatestCounter = () => store.getState().counter;

    const pauseLesson = () => {
        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));        
        subscription.getByName('renderSpeciesCollectionList').forEach(sub => subscription.remove(sub));   
        subscription.add(renderCollections, 'counter', 'screen');
        subscription.add(renderSnapdragon, 'counter', 'screen');
        setTimeout(() => {
            const { index } = getLatestCounter();
            actions.boundToggleLesson({ index: 0, log: { index: index, collection: collection.id  } });
        });
    };

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
                        pauseLesson();
                        break;
                    case 'settings':
                        renderSettings();
                        break;
                    case 'list':
                        name = 'list';
                        subscription.getByRole('screen').forEach(sub => subscription.remove(sub));                                   
                        const { index } = getLatestCounter();
                        collection.itemIndex = index;
                        actions.boundToggleLesson({ index: 0, log: { index: index, collection: collection.id  } });
                        renderSpeciesCollectionList(collection);                                                                    
                        break;
                    case 'test':
                        break;
                }
                actions.boundNewPage({ name: name});
            }
        )}
    );
};