import * as R from 'ramda';

import { utils } from 'utils/utils';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import * as traitTypes from 'api/traits/trait-types';
import { species } from 'api/species';
import { renderCard } from 'ui/screens/cards/card';
import featureTemplate from 'ui/screens/common/feature-template.html';
import symbiontTemplate from 'ui/screens/common/feature-symbiont-list-template.html';

const getFeature = (item, traits, config, type) => {

    let feature = itemProperties.itemContextProperty(traits, item, type);

    if(feature && feature !== '' && feature.length !== 0 && feature[0] !== '') {

        if(config.isPortraitMode) {
            feature = Array.isArray(feature) ? R.take(3, feature) : feature;
        }
        
        let label;
        switch(type) {
            case traitTypes.name.ECOLOGY: 
                label = 'Habitat: ';
                break;
            default:
                label = type ? `${utils.capitaliseAll(type)}: ` : '';
                break;
        }
        const featureValue = Array.isArray(feature) ? feature.join(', ') : feature;
        return {label, feature: featureValue};
    }
};

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

    if(!speciesTraits || !speciesTraits.symbionts) {
        document.querySelector('.js-feature-types').classList.remove('feature-types');
    }

    if(speciesTraits && speciesTraits.symbionts) {

        const symbionts = speciesTraits.symbionts.map(s => s.id);
        
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

        renderTemplate({ symbiontTraits }, template.content, parent);

        if(!isInCarousel) {
            const speciesCardLinks = document.querySelectorAll('.js-species-card-link span');
            speciesCardLinks.forEach(link => {
                link.addEventListener('click', event => {
                    const name = event.target.id || event.target.dataset.name;
                    const selectedItem = species.find(i => i.name === name);
                    selectedItem.species = itemProperties.getSpeciesName(item.name);
                    renderCard({ name: 'Local species', items: species }, 'MODAL', selectedItem, document.querySelector('#cardModal .js-modal-body'), false);
                });
            });
        }
        
    } else {
        // let features = types.map(ft => {
        //     return getFeature(item, traits, config, ft)
        // }).filter(ft => ft);
    
        // if(features.length === 0) return;

        // features = R.take(3, features);
    
        // const template = document.createElement('template');
        // template.innerHTML = featureTemplate;
    
        // renderTemplate({features}, template.content, parent);
    }     
};