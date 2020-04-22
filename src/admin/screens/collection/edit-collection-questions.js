import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';
import { addListenerToAddedSpecies } from 'ui/create-guide-modal/species-editor';
import { editCollectionHandler } from 'admin/screens/collection/edit-collection-handler';

import editCollectionQuestionsTemplate from 'admin/screens/collection/edit-collection-questions-template.html';

export const editCollectionQuestions = () => {

    const init = async () => {

        const template = document.createElement('template');
              template.innerHTML = editCollectionQuestionsTemplate;
    
        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        const inputCollection = document.querySelector('#input-collection');
              
        setTimeout(() => {
            inputCollection.focus();
        }, 200);

        let collection;

        collectionPicker(inputCollection, async selectedCollection => {
            collection = selectedCollection;
            editCollectionHandler.collectionPickedHandler(selectedCollection, 'QUESTIONS');
        });

        const addSpeciesHandler = async speciesName => {
            editCollectionHandler.renderAddSpeciesToCollection(collection, speciesName, 'QUESTIONS');
        };

        addListenerToAddedSpecies(addSpeciesHandler);
    };

    init();
};