import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { getLinkedTaxaTraits } from 'ui/helpers/traits-handler';
import { renderCard } from 'ui/screens/cards/card';
import { firestore } from 'api/firebase/firestore';

import linkedTaxaTemplate from 'ui/screens/common/linked-taxa-template.html';

export const linkedTaxa = (item, config, parent, mode, isInCarousel, collection) => {

    const addLinksToSpeciesCards = async mode => {        
        
        if(!isInCarousel) {            
            const speciesCardLinks = mode === 'MODAL'
                    ? document.querySelectorAll('#cardModal .js-test-card-container-link span')
                    : document.querySelectorAll('.js-test-card-container-link span');
            
            speciesCardLinks.forEach(async link => {
                link.addEventListener('click', async event => {
                    const name = event.target.id || event.target.dataset.name;
                    const selectedItem = await firestore.getSpeciesByName(name);
                    selectedItem.species = itemProperties.getSpeciesName(item.name);
                    renderCard({ name: 'Local species', items: [ selectedItem ] }, 'MODAL', selectedItem, document.querySelector('#cardModal .js-modal-body'), false);
                });
            });
        }
    };

    const getLinkedTaxa = async () => {

        const addVernacularName = async taxonName => {
            const item = await firestore.getSpeciesByName(taxonName);
            if(!item) return { name: taxonName, display: taxonName, isSpecies: false };
            const vernacularName = itemProperties.getVernacularName(item, config);
            return vernacularName ? { name: taxonName, display: taxonName, isSpecies: true } : { name: taxonName, display: taxonName, isSpecies: true };
        };
    
        const relationshipTraits = item.traits ? item.traits.relationships : null;

        if(!relationshipTraits) return;

        const convertTraitsForDisplay = async () => {
            return Promise.all(relationshipTraits.map(trait => {
                return  {
                    type: trait.value[0],
                    speciesA: trait.symbiont.name,
                    speciesARole: trait.symbiont.role,
                    speciesB: item.name,
                    speciesBRole: trait.type,
                    description: trait.description
                };
            }));
        };

        let relationships = await convertTraitsForDisplay();

        const addDisplayRules = relationships => {
            for(const relationship of relationships) {
                if(mode !== 'MODAL') {
                    relationship.className = 'underline-link';
                    relationship.modal = 'modal';
                } else {
                    relationship.className = '';
                    relationship.modal = '';
                }
            };

            return relationships;
        };

        relationships = addDisplayRules(relationships);

        const template = document.createElement('template');
        template.innerHTML = linkedTaxaTemplate;
        renderTemplate({ relationships }, template.content, parent);
        addLinksToSpeciesCards(mode);
    }; 

    getLinkedTaxa();
};