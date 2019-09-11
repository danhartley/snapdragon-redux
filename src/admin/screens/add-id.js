import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/taxa-pickers';

import idTemplate from 'admin/screens/add-id-template.html';
import idTextTemplate from 'admin/screens/add-id-text-template.html';

export const addId = () => {

    const init = async () => {

        let item = window.snapdragon.species;

        const template = document.createElement('template');
              template.innerHTML = idTemplate;
    
        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';
    
        renderTemplate({}, template.content, parent);

        M.updateTextFields();

        const listenForSpeciesSelection = async species => {

            item = species;

            const text = document.querySelector('.js-id-text');
            parent = text;
            parent.innerHTML = '';
            template.innerHTML = idTextTemplate;

            const itemTraits = await firestore.getTraitsBySpeciesName(item.name);
            const description = itemTraits['description'] ? itemTraits['description'].value[0] : '';

            renderTemplate({ name: item.name, description }, template.content, parent);

            const textArea = document.querySelector('#textarea-id');
                  textArea.focus();

            const btnUpdateId = document.querySelector('.btnUpdateId');
            
            btnUpdateId.addEventListener('click', async e => {
                const trait = {
                    description: {
                        value: [ textArea.value ]   
                    }
                };
                const log = await firestore.addSpeciesTraits(item.name, trait);
                
                if(log) {
                    const message = document.querySelector('.js-message');
                          message.innerHTML = 'Quick ID updated.';
                }
            });
        };

        const inputSpecies = document.querySelector('#input-species-for-traits');
              inputSpecies.focus();

        if(item) {
            inputSpecies.value = item.name;
            listenForSpeciesSelection(item);
        }

        speciesPicker(inputSpecies, listenForSpeciesSelection);

    };

    init();
};