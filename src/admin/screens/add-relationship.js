import * as R from 'ramda';

import { helpers } from 'admin/helpers';
import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';
import { speciesPicker } from 'admin/screens/species-picker';
import { eol } from 'admin/api/eol';

import relationshipTemplate from 'admin/screens/add-relationship-template.html';

export const addRelationship = () => {

    let snapdragonSpecies, EOLSpecies, autocompleteRef, item;
    
    snapdragonSpecies = window.snapdragon.species ? window.snapdragon.species.name : '';
    
    const init = async () => {

        const template = document.createElement('template');
        template.innerHTML = relationshipTemplate;

        const parent = document.querySelector('#content-container');
        parent.innerHTML = '';

        renderTemplate({}, template.content, parent);

        let traitValues = await firestore.getTraitValues();

        // relationship type (symbiosis)

        const inputRelationship = document.querySelector('#input-relationship-type');
              inputRelationship.focus();

        let symbioses = traitValues.symbiosis;

        const options = {};
        for (let [key, obj] of Object.entries(symbioses)) {
            options[obj] = null;
        }

        M.Autocomplete.init(inputRelationship, {data: options});

        // species

        const inputSnapdragon = document.querySelector('#input-species-snapdragon');
              inputSnapdragon.value = snapdragonSpecies;
        
              if(snapdragonSpecies !== '') inputSnapdragon.focus();

        speciesPicker(inputSnapdragon, species => {
            item = species;            
            snapdragonSpecies = inputSnapdragon.value;            
        });

        const asyncProgress = document.querySelector('.async-progress');
        const inputEOL = document.querySelector('#input-species-eol');

        const searchEOLCallback = (species, ref) => {
            EOLSpecies = species;
            autocompleteRef = ref;
        };
    
        eol.searchEOL(inputEOL, asyncProgress, searchEOLCallback);

        // roles

        let roles = traitValues.role;

        const data = {};
        for (let [key, obj] of Object.entries(roles)) {
            data[obj] = null;
        }

        const inputRoleSpeciesA = document.querySelector('#input-role-value-a');
        M.Autocomplete.init(inputRoleSpeciesA, {data});

        const inputRoleSpeciesB = document.querySelector('#input-role-value-b');
        M.Autocomplete.init(inputRoleSpeciesB, {data});

        // add relationship

        const description = document.querySelector('#input-description');
        const btnAddRelationship = document.querySelector('.btnAddRelationship');

        btnAddRelationship.addEventListener('click', async e => {

            if(snapdragonSpecies && EOLSpecies) {

                const traits = [];

                // Species A

                const EOLSpeciesName = helpers.getBinomial(EOLSpecies);

                const traitA = { name: snapdragonSpecies };
                traitA.update = {
                    type: inputRoleSpeciesA.value,
                    value: [inputRelationship.value],
                    symbiont: {
                        name: EOLSpeciesName,
                        role: inputRoleSpeciesB.value
                    },
                    description: description.value
                };

                traits.push(traitA);

                // Species B

                const speciesNames = await firestore.getSpeciesNames();

                const isSpeciesBInSnapdragon = R.contains(EOLSpeciesName, speciesNames[0].value);

                if(isSpeciesBInSnapdragon) {

                    const traitB = { name: EOLSpeciesName };
                    traitB.update = {
                        type: inputRoleSpeciesB.value,
                        value: [inputRelationship.value],
                        symbiont: {
                            name: snapdragonSpecies,
                            role: inputRoleSpeciesA.value
                        },
                        description: description.value
                    };

                    traits.push(traitB);
                }

                const log = await firestore.addSpeciesRelationship('relationships', traits);
                
                const message = document.querySelector('.js-message');

                message.innerHTML = log;
            }
        });
    };

    init();
}