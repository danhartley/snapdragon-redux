import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';
import { addListenerToAddedSpecies } from 'ui/create-guide-modal/species-editor';
import { editCollectionHandler } from 'admin/screens/collection/edit-collection-handler';

import editCollectionTemplate from 'admin/screens/collection/edit-collection-template.html';

export const editCollectionVideo = () => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = editCollectionTemplate;
    
        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        const inputCollection = document.querySelector('#input-collection');
              
        setTimeout(() => {
            inputCollection.focus();
        }, 200);

        let collection = window.snapdragon.collection;

        if(collection) {
            editCollectionHandler.collectionPickedHandler(collection, 'VIDEO');
            setTimeout(() => {
                inputCollection.value = collection.name;
            }, 250);
        }

        collectionPicker(inputCollection, async selectedCollection => {
            collection = selectedCollection;
            editCollectionHandler.collectionPickedHandler(selectedCollection, 'VIDEO');
            window.snapdragon.collection = selectedCollection;
            console.log(window.snapdragon.collection);            
        });

        const addSpeciesHandler = async speciesName => {
            editCollectionHandler.renderAddSpeciesToCollection(collection, speciesName, 'VIDEO');
        };

        addListenerToAddedSpecies(addSpeciesHandler);        
    };

    init();
};