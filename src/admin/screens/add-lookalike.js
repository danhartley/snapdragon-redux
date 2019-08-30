import * as R from 'ramda';

import { helpers } from 'admin/helpers';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/taxa-pickers';
import { eol } from 'admin/api/eol';

import lookalikeTemplate from 'admin/screens/add-lookalike-template.html';

export const addLookalike = () => {

    let snapdragonSpecies, snapdragonSpeciesB, eolSpecies, autocompleteRef, item, eolDescription, snapdragonDescription;

    snapdragonSpecies = window.snapdragon.species ? window.snapdragon.species.name : '';

    const init = async () => {

        const template = document.createElement('template');
        template.innerHTML = lookalikeTemplate;

        const parent = document.querySelector('#content-container');
        parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        const inputSnapdragon = document.querySelector('#input-species-snapdragon');
              inputSnapdragon.focus();

        speciesPicker(inputSnapdragon, species => {
            item = species;
            snapdragonSpecies = inputSnapdragon.value;
        });

        const inputSnapdragonB = document.querySelector('#input-species-snapdragon-b');
              inputSnapdragonB.focus();

        speciesPicker(inputSnapdragonB, species => {
            item = species;
            snapdragonSpeciesB = inputSnapdragonB.value;
        });

        const asyncProgress = document.querySelector('.async-progress');
        const inputEOL = document.querySelector('#input-species-eol');

        const searchEOLCallback = (species, ref) => {
            eolSpecies = species;
            autocompleteRef = ref;
        };
    
        eol.searchEOL(inputEOL, asyncProgress, searchEOLCallback);

        const btnAddLookalike = document.querySelector('.btnAddLookalike');

        btnAddLookalike.addEventListener('click', async e => {

            const snapdragonDescription = document.querySelector('#input-description-a');
            const eolDescription = document.querySelector('#input-description-b');

            if(snapdragonSpecies && (snapdragonSpeciesB || eolSpecies)) {

                const traits = [];

                const speciesBName = snapdragonSpeciesB || helpers.getBinomial(eolSpecies);
                
                // Species A

                const traitA = { name: snapdragonSpecies };
                traitA.update = {
                    lookalike: {
                        name: speciesBName,
                        description: eolDescription.value
                    },
                    description: snapdragonDescription.value
                };

                traits.push(traitA);

                // Speces B

                const speciesNames = await firestore.getSpeciesNames();

                const isSpeciesBInSnapdragon = R.contains(speciesBName, speciesNames[0].value);

                if(isSpeciesBInSnapdragon) {

                    const traitB = { name: speciesBName };
                        traitB.update = {
                            lookalike: {
                                name: snapdragonSpecies,
                                description: snapdragonDescription.value
                            },
                            description: eolDescription.value
                        };

                        traits.push(traitB);
                }

                const log = await firestore.addSpeciesRelationship('lookalikes', traits);
                
                const message = document.querySelector('.js-message');

                message.innerHTML = log;

                setTimeout(() => {
                    message.innerHTML = '';                    
                }, 5000);
            }
        });
    };

    init();
}