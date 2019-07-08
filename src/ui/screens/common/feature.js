import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import * as traitTypes from 'api/traits/trait-types';
import { renderCard } from 'ui/screens/cards/card';
import { firestore } from 'api/firebase/firestore';

import featureLookalike from 'ui/screens/common/feature-look-alike.html';
import symbiontTemplate from 'ui/screens/common/feature-symbiont-list-template.html';

export const renderFeatures = async (item, config, parent, mode, isInCarousel, collection) => {

    const types = [];

    for (var property in traitTypes.name) {
        types.push(traitTypes.name[property]);
    }

    const getVernacularName = async symbiont => {
        const item = await firestore.getSpeciesByName(symbiont);
        if(!item) return { id: symbiont, display: symbiont };
        const vernacularName = itemProperties.getVernacularName(item, config);
        return vernacularName ? { name: symbiont, display: vernacularName } : { name: symbiont, display: symbiont };
    };

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

    const setNumberOfRows = config.isLandscapeMode ? 10 : 4;

    if(item.traits) {

        const traitsWithSymbioticRelationship = [];

        for (let [key, value, type] of Object.entries(item.traits)) {
            if(value.type) {
                traitsWithSymbioticRelationship.push({ name: key, value: value.value, type: value.type });
            }
        }

        const getSymbiosisData = async () => {
            return Promise.all(traitsWithSymbioticRelationship.map(trait => {
                return Promise.all(trait.value.map(async taxon => {
                    return await {
                        as: trait.name,
                        type: trait.type || '---',
                        symbiont: await getVernacularName(taxon)
                    };
                }));
            }));
        };

        let symbioses = await getSymbiosisData();

        symbioses = R.flatten(symbioses.map(st => st)).filter(s=>s !== undefined);

        const template = document.createElement('template');
        template.innerHTML = symbiontTemplate;

        const getSpeciesDetails = async () => {
            symbioses.forEach(async trait => {            
                const linkedSpecies = await firestore.getSpeciesByName(trait.symbiont.name);
                if(linkedSpecies && mode !== 'MODAL') {
                    trait.className = 'underline-link';
                    trait.modal = 'modal';
                } else {
                    trait.className = '';
                    trait.modal = '';
                }
            });

            return await symbioses;
        };

        symbioses = await getSpeciesDetails();

        // add lines to the grid (better than showing nothing)

        while(symbioses.length < setNumberOfRows) {
            symbioses.push({
                modal: '',
                className: '',
                symbiont: { name: '', display: '' },
                as: '',
                type: ''
            });
        }

        renderTemplate({ symbioses }, template.content, parent);

        addLinksToSpeciesCards(mode);
        
    } else {

        let lookalikeTraits = item.traits.find(c => c.name === 'look-alikes');
        let lookalikeNames = lookalikeTraits ? lookalikeTraits.values : [];

        if(lookalikeNames.length > 0) {
            lookalikeNames = lookalikeNames.filter(name => name !== item.name);
        }

        let lookalikes = [];

        const template = document.createElement('template');
        template.innerHTML = featureLookalike;

        const modal = mode === 'MODAL' ? '' : 'modal';
        const className = mode === 'MODAL' ? '' : 'underline-link'
        const parent = mode === 'MODAL' ? document.querySelector('#cardModal .js-feature-types') : document.querySelector('.js-feature-types');

        if(lookalikeNames.length > 0) {
    
            lookalikes = lookalikeNames.map(async name => {
                const lookalike = await firestore.getSpeciesByName(name);
                if(!lookalike) return;
                return { 
                    name: lookalike.name, 
                    id: lookalike.id,
                    modal,
                    className
                };
            }).filter(lookalike => lookalike);

            lookalikes.forEach(l => l.type = 'Lookalike');
        }

        while(lookalikes.length < setNumberOfRows) {
            lookalikes.push({
                name: '',
                modal: '',
                className: '',
                type: ''
            });
        }
        
        renderTemplate({lookalikes}, template.content, parent);

        addLinksToSpeciesCards(mode);
    }     
};