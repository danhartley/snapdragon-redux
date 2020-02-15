import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';

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

        collectionPicker(inputCollection, collection => {
            
            template.innerHTML = speciesCollectionTemplate;

            parent = document.querySelector('.js-collection-species');
            parent.innerHTML = '';

            renderTemplate({ collection, items: collection.items }, template.content, parent);
        });

    };

    init();
};