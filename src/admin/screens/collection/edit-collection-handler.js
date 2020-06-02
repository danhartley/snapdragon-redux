import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { renderQuestionTabs } from 'admin/screens/questions/questions-tabs';
import { collectionHandler  } from 'ui/helpers/collection-handler';
import { renderSpeciesPicker } from 'ui/create-guide-modal/species-picker';
import { createVideoDescription } from 'admin/screens/video/create-video-description';

import speciesItemTemplate from 'admin/screens/collection/species-item-template.html';
import speciesCollectionTemplate from 'admin/screens/collection/species-collection-template.html';

const renderAddSpeciesToCollection = async (collection, speciesName, origin) => {

    const template = document.createElement('template');
          template.innerHTML = speciesItemTemplate;
            
    const parent = document.querySelector('.js-collection-items');
    
    const species = await firestore.getSpeciesByName(speciesName);

    collection.species.push(species);

    await firestore.updateCollection(collection);

    const hasOptions = origin === 'SPECIES' ? 'hide-important' : '';
    
    renderTemplate({ species, isActive: collection.isActive, hasOptions }, template.content, parent);
    
    const speciesLinks = document.querySelectorAll('ul > li.custom-control.custom-checkbox');
    const speciesLink = speciesLinks[speciesLinks.length - 1];

    addSpeciesClickHandler(speciesLink, collection, document.querySelector('#js-collection-options'), origin);    
};

const addSpeciesClickHandler = (link, collection, optionsParent, origin) => {

    return link.addEventListener('click', async (e) => {

        const speciesName = e.target.getAttribute('name');

        if(!speciesName) return;

        const species = await firestore.getSpeciesByName(speciesName);
        
        switch(origin) {
            case 'QUESTIONS':
                renderQuestionTabs(collection, species, optionsParent);
            break;
            case 'VIDEO':
                createVideoDescription(collection, species);
            default:
        }
                
        window.snapdragon.species = species;
    });
};

const collectionPickedHandler = async (collection, origin) => {

    const template = document.createElement('template');
          template.innerHTML = speciesCollectionTemplate;

    const parent = document.querySelector('.js-collection-species');
          parent.innerHTML = '';

    collection.isPrivate = collection ? collection.isPrivate || false : false;

    let items = (collection.items && collection.items.length > 0) ? collection.items : collection.species;

    if(items.length > 0) {

        if(!items[0].vernacularName) {
            items = await collectionHandler.getSnapdragonSpeciesData(items);
            items = items.filter(item => item.taxonomy);
            const collection = await collectionHandler.loadCollectionItemProperties({ items }, { language: 'en' });
            if(collection) items = collection.items;
        }

        items.forEach(item => {
            if(!item.hasOwnProperty('isActive')) {
                item.isActive = true; 
            }                
        });

    }

    const hasOptions = origin === 'SPECIES' ? 'hide-important' : '';

    renderTemplate({ collection, items, hasOptions }, template.content, parent);

    if(collection.isActive) document.querySelector('#isActiveChkBox').setAttribute('checked', 'checked');
    if(collection.isPrivate) document.querySelector('#isPrivateChkBox').setAttribute('checked', 'checked');

    const optionsParent = document.querySelector('#js-collection-options');

    // if(origin == 'SPECIES') optionsParent.classList.remove('hide');

    const chkBoxes = document.querySelectorAll('.custom-control-input');
          chkBoxes.forEach(chkBox => {
            if(chkBox.dataset.isActive === 'true') {
                chkBox.setAttribute('checked', 'checked');
            } else {
                chkBox.parentElement.classList.add('disabled');
            }
          });

          chkBoxes.forEach(chkBox => chkBox.addEventListener('click', e => {
              const species = e.target;
              collection.items.forEach(async item => {
                  if(item.name === species.id) {                              
                      item.isActive = species.checked;
                      species.checked ? chkBox.parentElement.classList.remove('disabled') : chkBox.parentElement.classList.add('disabled');;
                      await firestore.updateCollection(collection);
                  }
              });
          }));            

    const speciesLinks = document.querySelectorAll('i.fa-marker');
          speciesLinks.forEach(link => editCollectionHandler.addSpeciesClickHandler(link, collection, optionsParent, origin));

    const addSpecies = document.querySelector('.js-add-species');
          addSpecies.addEventListener('click', e => {
            renderSpeciesPicker({
                config: null,
                container: null,
                selectedSpecies: items.map(item => item.name)
            }, optionsParent);
          });
};

const updateCollection = async collection => {
    return await firestore.updateCollection(collection);
};

export const editCollectionHandler = {
    renderAddSpeciesToCollection,
    addSpeciesClickHandler,
    collectionPickedHandler,
    updateCollection
}