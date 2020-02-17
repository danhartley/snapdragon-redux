import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';
import { collectionHandler  } from 'ui/helpers/collection-handler';

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

            let items = collection.items || collection.species;

            if(!items[0].vernacularName) {
                items = await collectionHandler.getSnapdragonSpeciesData(items);
            }

            renderTemplate({ collection, items }, template.content, parent);
            
            const options = { margin: 5 }; 

            const instances = M.Tooltip.init(items, options);

            if(collection.isActive) {
                const chkBoxes = document.querySelectorAll('li > input.custom-control-input');
                      chkBoxes.forEach(chkBox => chkBox.setAttribute('disabled', 'disabled'));
            }
        });

    };

    init();
};