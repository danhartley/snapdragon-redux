import { renderTemplate } from 'ui/helpers/templating';
import { collectionPicker } from 'admin/screens/collection/collection-picker';
import { addListenerToAddedSpecies } from 'ui/create-guide-modal/species-editor';
import { editCollectionHandler } from 'admin/screens/collection/edit-collection-handler';

import editCollectionTemplate from 'admin/screens/collection/edit-collection-template.html';
import editPropsTemplate from 'admin/screens/collection/edit-collection-props-template.html';

export const editCollection = () => {

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

        const renderProps = collection => {

          const propsContainer = document.querySelector('#js-collection-options');
                propsContainer.innerHTML = '';

          template.innerHTML = editPropsTemplate;

          renderTemplate({}, template.content, propsContainer);

          const id = document.querySelector('#input-collection-id');
          const title = document.querySelector('#input-collection-title');
          const owner = document.querySelector('#input-collection-owner');
          const intro = document.querySelector('#textarea-intro');
          const location = document.querySelector('#input-collection-location');
          const presenter = document.querySelector('#input-collection-presenter');
          const src = document.querySelector('#input-collection-src');


            if(collection.video) {                
                id.value = collection.video.id;    
                title.value = collection.video.title;                
                owner.value = collection.video.owner;                
                intro.value = collection.video.intro;                
                location.value = collection.video.location;                
                presenter.value = collection.video.presenter;                
                src.value = collection.video.src;
            }

            const btnUpdateCollection = document.querySelector('.btnUpdateCollection');
                  btnUpdateCollection.addEventListener('click', e => {
                        const video = collection.video || {};
                        const response = editCollectionHandler.updateCollection({
                                name: collection.name, 
                                video: {
                                    ...video
                                    , id: id.value
                                    , title: title.value
                                    , owner: owner.value
                                    , intro: intro.value
                                    , location: location.value
                                    , presenter: presenter.value
                                    , src: src.value
                                }
                            });
                        console.log(response);
                  });
        };

        let collection = window.snapdragon.collection;

        if(collection) {
            editCollectionHandler.collectionPickedHandler(collection, 'SPECIES');
            renderProps(collection);
            setTimeout(() => {
                inputCollection.value = collection.name;
            }, 250);
        }

        collectionPicker(inputCollection, async selectedCollection => {
            collection = selectedCollection;
            editCollectionHandler.collectionPickedHandler(selectedCollection, 'SPECIES');
            window.snapdragon.collection = selectedCollection;
            console.log(window.snapdragon.collection);
            renderProps(collection);
            template.innerHTML = editCollectionTemplate;
        });

        const addSpeciesHandler = async speciesName => {
            editCollectionHandler.renderAddSpeciesToCollection(collection, speciesName, 'SPECIES');
        };

        addListenerToAddedSpecies(addSpeciesHandler); 
    };

    init();
};