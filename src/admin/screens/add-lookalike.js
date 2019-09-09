import * as R from 'ramda';

import { helpers } from 'admin/helpers';
import { firestore } from 'api/firebase/firestore';
import { renderTemplate } from 'ui/helpers/templating';
import { speciesPicker } from 'admin/screens/taxa-pickers';
import { eol } from 'admin/api/eol';

import lookalikeTemplate from 'admin/screens/add-lookalike-template.html';
import lookalikesListTemplate from 'admin/screens/add-lookalikes-list-template.html';

export const addLookalike = () => {

    let snapdragonSpecies, snapdragonSpeciesB, eolSpecies, autocompleteRef, item, eolDescription, snapdragonDescription;

    snapdragonSpecies = window.snapdragon.species ? window.snapdragon.species.name : '';

    const init = async () => {

        let template = document.createElement('template');
            template.innerHTML = lookalikeTemplate;

        let parent = document.querySelector('#content-container');
            parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        const loadLookalikes = async item => {

            const itemTraits = await firestore.getTraitsBySpeciesName(item.name);
            const lookalikes = itemTraits['lookalikes'];

            const species = lookalikes ? [ ...lookalikes.map(lookalike => lookalike.lookalike), { name: item.name, description: lookalikes[0].description } ] : [];

            const parent = document.querySelector('.js-lookalikes');

            template.innerHTML = lookalikesListTemplate;

            renderTemplate({species}, template.content, parent);

            M.updateTextFields();

            const btnUpdateLookalikes = document.querySelectorAll('.btnUpdateLookalike').forEach(update => {
                update.addEventListener('click', async e => {
                    const name = e.target.id;
                    const log = await firestore.addSpeciesTraits(name, trait);
                    console.log('update lookalike feedback: ', log);
                });
            });
        };

        const inputSnapdragon = document.querySelector('#input-species-snapdragon');
              inputSnapdragon.focus();

        speciesPicker(inputSnapdragon, species => {
            item = species;
            snapdragonSpecies = inputSnapdragon.value;
            loadLookalikes(item);
        });

        const inputSnapdragonB = document.querySelector('#input-species-snapdragon-b');
            //   inputSnapdragonB.focus();

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