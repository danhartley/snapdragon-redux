import { store } from 'redux/store';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';
import { collectionHandler  } from 'ui/helpers/collection-handler';
import { renderSpeciesPicker } from 'ui/create-guide-modal/species-picker';
import { renderQuestionTabs } from 'admin/screens/questions/questions-tabs';

import editCollectionTemplate from 'admin/screens/collection/edit-collection-template.html';
import speciesCollectionTemplate from 'admin/screens/collection/species-collection-template.html';

export const editCollection = () => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = editCollectionTemplate;
    
        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        const inputCollection = document.querySelector('#input-collection');
              inputCollection.focus();

        collectionPicker(inputCollection, async collection => {
            
            template.innerHTML = speciesCollectionTemplate;

            parent = document.querySelector('.js-collection-species');
            parent.innerHTML = '';

            collection.isPrivate = collection.isPrivate || false;

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

            const instances = M.Tooltip.init(document.querySelectorAll('ul > li'), options);

            if(collection.isActive) {
                const chkBoxes = document.querySelectorAll('ul > li > input.custom-control-input');
                      chkBoxes.forEach(chkBox => chkBox.setAttribute('disabled', 'disabled'));
            }

            const speciesLinks = document.querySelectorAll('.js-species-link');
                  speciesLinks.forEach(link => link.addEventListener('click', async e => {
                    const species = await firestore.getSpeciesByName(e.target.id);
                    console.log(species);
                    renderQuestionTabs(species, document.querySelector('#js-question-tabs'));
                    window.snapdragon.species = species;
                    const activeSpecies = document.querySelector('.js-active-species');
                    activeSpecies.querySelector('span:nth-child(2)').innerHTML = species.name;
                  }));

            const addSpecies = document.querySelector('.js-add-species');
                  addSpecies.addEventListener('click', e => {
                    renderSpeciesPicker({
                        config: store.getState().config,
                        modal: document
                    });
                  });
        });

    };

    init();
};