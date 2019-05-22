import * as R from 'ramda';

import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import * as traitTypes from 'api/traits/trait-types';
import { species } from 'api/species';
import { renderCard } from 'ui/screens/cards/card';
import featureLookalike from 'ui/screens/common/feature-look-alike.html';
import symbiontTemplate from 'ui/screens/common/feature-symbiont-list-template.html';

export const renderFeatures = (item, traits, config, parent, mode, isInCarousel) => {

    const types = [];

    for (var property in traitTypes.name) {
        types.push(traitTypes.name[property]);
    }

    let speciesTraits = traits.find(trait => trait.name === item.name);

    const getVernacularName = symbiont => {
        const item = species.find(s => s.name === symbiont);
        if(!item) return { id: symbiont, display: symbiont };
        const vernacularName = itemProperties.getVernacularName(item, config);
        return vernacularName ? { id: symbiont, display: vernacularName } : { id: symbiont, display: symbiont };
    };

    const addLinksToSpeciesCards = mode => {
        if(!isInCarousel) {
            const speciesCardLinks = mode === 'MODAL'
                    ? document.querySelectorAll('#cardModal .js-species-card-link span')
                    : document.querySelectorAll('.js-species-card-link span');
            speciesCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const name = event.target.id || event.target.dataset.name;
                    const selectedItem = species.find(i => i.name === name);
                    selectedItem.species = itemProperties.getSpeciesName(item.name);
                    renderCard({ name: 'Local species', items: species }, 'MODAL', selectedItem, document.querySelector('#cardModal .js-modal-body'), false);
                });
            });
        }
    };

    const setNumberOfRows = config.isLandscapeMode ? 10 : 4;

    if(speciesTraits && speciesTraits.symbionts) {

        let symbionts ;

        if(speciesTraits.symbionts[0].id) {
            symbionts = speciesTraits.symbionts.map(s => s.id);
        } else {
            symbionts = speciesTraits.symbionts;
        }

        let symbiontTraits = speciesTraits.traits.map(trait => {
            const values = trait.value.split(',').map(t => t.trim());
            const st = values.map(symbiont => {
                if(R.contains(symbiont, symbionts)) {
                    return {
                        as: trait.name,
                        type: trait.type || '---',
                        symbiont: getVernacularName(symbiont)
                    };
                }
            });
            return st;
        });

        symbiontTraits = R.flatten(symbiontTraits.map(st => st)).filter(s=>s !== undefined);

        const template = document.createElement('template');
        template.innerHTML = symbiontTemplate;

        symbiontTraits.forEach(trait => {            
            const linkedSpecies = species.find(s => {
                return s.name.toUpperCase() === trait.symbiont.id.toUpperCase();
            });
            if(linkedSpecies && mode !== 'MODAL') {
                trait.className = 'underline-link';
                trait.modal = 'modal';
            } else {
                trait.className = '';
                trait.modal = '';
            }
        });

        while(symbiontTraits.length < setNumberOfRows) {
            symbiontTraits.push({
                modal: '',
                className: '',
                symbiont: { id: '', display: '' },
                as: '',
                type: ''
            });
        }

        renderTemplate({ symbiontTraits }, template.content, parent);

        addLinksToSpeciesCards(mode);
        
    } else {

        let lookalikeNames = itemProperties.itemContextProperty(traits, item, 'look-alikes');

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
    
            lookalikes = lookalikeNames.map(name => {
                const lookalike = species.find(s => s.name === name);
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