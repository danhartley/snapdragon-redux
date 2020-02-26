import { firestore } from 'api/firebase/firestore';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';
import { collectionHandler  } from 'ui/helpers/collection-handler';
import { renderSpeciesPicker } from 'ui/create-guide-modal/species-picker';
import { addListenerToAddedSpecies } from 'ui/create-guide-modal/species-editor';
import { renderQuestionTabs } from 'admin/screens/questions/questions-tabs';

import editCollectionTemplate from 'admin/screens/collection/edit-collection-template.html';
import speciesCollectionTemplate from 'admin/screens/collection/species-collection-template.html';
import speciesItemTemplate from 'admin/screens/collection/species-item-template.html';

export const editCollection = () => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = editCollectionTemplate;
    
        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        const inputCollection = document.querySelector('#input-collection');
              inputCollection.focus();

        let collection;

        collectionPicker(inputCollection, async selectedCollection => {

            collection = selectedCollection;
            
            template.innerHTML = speciesCollectionTemplate;

            parent = document.querySelector('.js-collection-species');
            parent.innerHTML = '';

            collection.isPrivate = collection ? collection.isPrivate || false : false;

            let items = (collection.items && collection.items.length > 0) ? collection.items : collection.species;

            console.log(items);

            if(!items[0].vernacularName) {
                items = await collectionHandler.getSnapdragonSpeciesData(items);
                items = items.filter(item => item.taxonomy);
                const collection = await collectionHandler.loadCollectionItemProperties({ items }, { language: 'en' });
                if(collection) items = collection.items;
            }

            renderTemplate({ collection, items }, template.content, parent);
            
            if(collection.isActive) document.querySelector('#isActiveChkBox').setAttribute('checked', 'checked');
            if(collection.isPrivate) document.querySelector('#isPrivateChkBox').setAttribute('checked', 'checked');

            const options = { margin: 5 };

            // const instances = M.Tooltip.init(document.querySelectorAll('ul > li'), options);

            if(collection.isActive) {
                const chkBoxes = document.querySelectorAll('ul > li > input.custom-control-input');
                      chkBoxes.forEach(chkBox => chkBox.setAttribute('disabled', 'disabled'));
            }

            const optionsParent = document.querySelector('#js-collection-options');

            const chkBoxes = document.querySelectorAll('.custom-control-input');
                  chkBoxes.forEach(chkBox => chkBox.addEventListener('click', e => {
                      console.log(e.target.checked);
                  }));

            const speciesLinks = document.querySelectorAll('i.fa-marker');
                  speciesLinks.forEach(link => addSpeciesClickHandler(link, optionsParent));

            const addSpecies = document.querySelector('.js-add-species');
                  addSpecies.addEventListener('click', e => {
                    renderSpeciesPicker({
                        config: null,
                        container: null,
                        selectedSpecies: items.map(item => item.name)
                    }, optionsParent);
                  });
        });

        const addSpeciesClickHandler = (link, optionsParent) => {
            return link.addEventListener('click', async (e) => {

                const speciesName = e.target.getAttribute('name');

                if(!speciesName) return;

                const species = await firestore.getSpeciesByName(speciesName);                
                
                renderQuestionTabs(collection, species, optionsParent);
                
                window.snapdragon.species = species;
                const activeSpecies = document.querySelector('.js-active-species');
                activeSpecies.querySelector('span:nth-child(2)').innerHTML = !!species.vernacularName
                    ? `${species.name} (${species.vernacularName})`
                    : `${species.name} (${itemProperties.getVernacularName(species, { language: 'en'})})`;            
            });
        }

        const addSpeciesHandler = async (speciesName) => {

            template.innerHTML = speciesItemTemplate;
            parent = document.querySelector('.js-colection-items');
            const species = await firestore.getSpeciesByName(speciesName);
            
            renderTemplate({ species, isActive: collection.isActive }, template.content, parent);
            
            const speciesLinks = document.querySelectorAll('ul > li.custom-control.custom-checkbox');
            const speciesLink = speciesLinks[speciesLinks.length - 1];

            addSpeciesClickHandler(speciesLink, document.querySelector('#js-collection-options'));
        };

        addListenerToAddedSpecies(addSpeciesHandler);

    };

    init();
};
