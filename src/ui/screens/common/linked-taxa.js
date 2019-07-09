import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
// import * as traitTypes from 'api/traits/trait-types';
import { renderCard } from 'ui/screens/cards/card';
import { firestore } from 'api/firebase/firestore';

import linkedTaxaTemplate from 'ui/screens/common/linked-taxa-template.html';

export const linkedTaxa = (item, config, parent, mode, isInCarousel, collection) => {

    const addLinksToSpeciesCards = async mode => {        
        
        if(!isInCarousel) {            
            const speciesCardLinks = mode === 'MODAL'
                    ? document.querySelectorAll('#cardModal .js-species-card-link span')
                    : document.querySelectorAll('.js-species-card-link span');
            
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
        
        // const types = [];

        // for (var property in traitTypes.enums) {
        //     types.push(traitTypes.enums[property]);
        // }
    
        const getVernacularName = async symbiont => {
            const item = await firestore.getSpeciesByName(symbiont);
            if(!item) return { name: symbiont, display: symbiont };
            const vernacularName = itemProperties.getVernacularName(item, config);
            return vernacularName ? { name: symbiont, display: vernacularName } : { name: symbiont, display: symbiont };
        };
    
        const setNumberOfRows = config.isLandscapeMode ? 10 : 4;

        const taxaTraits = [];

        for (let [key, value] of Object.entries(item.traits)) {
            if(value.type) {
                taxaTraits.push({ name: key, value: value.value, type: value.type });
            } else if(key === 'look-alikes') {
                taxaTraits.push({ name: key, value: value.values, type: 'lookalike' });
            } else if(key === 'symbionts') {
                taxaTraits.push({ name: key, value: value.values, type: 'symbionts' });
            }
        }

        const getSymbiosisData = async () => {
            return Promise.all(taxaTraits.map(trait => {
                return Promise.all(trait.value.map(async taxon => {
                    return await {
                        as: trait.name,
                        type: trait.type || '---',
                        symbiont: await getVernacularName(taxon)
                    };
                }));
            }));
        };

        let linkedTaxa = await getSymbiosisData();

        linkedTaxa = R.flatten(linkedTaxa.map(st => st)).filter(s=>s !== undefined).filter(taxon => taxon.symbiont.name !== ''); 

        const getSpeciesDetails = async () => {
            for(const trait of linkedTaxa) {
                try {
                    const linkedSpecies = await firestore.getSpeciesByName(trait.symbiont.name);
                    if(linkedSpecies && mode !== 'MODAL') {
                        trait.className = 'underline-link';
                        trait.modal = 'modal';
                    } else {
                        trait.className = '';
                        trait.modal = '';
                    }
                } catch(error) {
                    console.error(error);
                    console.log(trait);
                }
            };

            return await linkedTaxa;
        };

        linkedTaxa = await getSpeciesDetails();

        // add lines to the grid (better than showing nothing)

        while(linkedTaxa.length < setNumberOfRows) {
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