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
    
        const setNumberOfRows = config.isLandscapeMode ? 10 : 4;

        const taxaTraits = getLinkedTaxaTraits(item.traits);

        const getLinkedTaxaDisplayProperties = async () => {
            return Promise.all(taxaTraits.map(trait => {
                return Promise.all(trait.value.map(async taxonName => {
                    return await {
                        as: trait.name,
                        type: trait.type || '---',
                        symbiont: await addVernacularName(taxonName)
                    };
                }));
            }));
        };

        let linkedTaxa = await getLinkedTaxaDisplayProperties();

        linkedTaxa = R.flatten(linkedTaxa.map(taxon => taxon)).filter(props => props !== undefined).filter(taxon => taxon.symbiont.name !== ''); 

        const addDisplayRules = async () => {
            for(const trait of linkedTaxa) {
                try {
                    if(trait.symbiont.isSpecies && mode !== 'MODAL') {
                        trait.className = 'underline-link';
                        trait.modal = 'modal';
                    } else {
                        trait.className = '';
                        trait.modal = '';
                    }
                } catch(error) {
                    console.error(error);
                    console.error('Failing geting species details for: ', trait);
                }
            };

            return await linkedTaxa;
        };

        linkedTaxa = await addDisplayRules();

        // add lines to the grid (better than showing nothing)

        while (linkedTaxa.length < setNumberOfRows) {
            linkedTaxa.push({
                modal: '',
                className: '',
                symbiont: { name: '', display: '' },
                as: '',
                type: ''
            });
        }

        const template = document.createElement('template');
        template.innerHTML = linkedTaxaTemplate;
        renderTemplate({ linkedTaxa }, template.content, parent);
        addLinksToSpeciesCards(mode);
    }; 

    getLinkedTaxa();
};