import { utils } from 'utils/utils';
import { hasTraitPropeties, getTraitsToExclude, convertTraitsToNameValuePairsArray } from 'ui/helpers/traits-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { renderInfoDetails } from 'ui/screens/common/info-detail-slider';

import infoSliderTemplate from 'ui/screens/common/info-slider-template.html';

const renderInfoSlider = (item, traits, parent, id) => {

    const slider = document.createElement('template');
          slider.innerHTML = infoSliderTemplate;

    parent.innerHTML = '';

    traits = traits.filter(t => t.value);

    traits.forEach(trait => {        
        trait.name = trait.name ? trait.name === 'ph' ? 'pH' : utils.capitaliseFirst(trait.name) : '';
        if(trait.name.toLowerCase() === 'role') trait.name = trait.type || 'role';
        trait.unit = trait.unit ? trait.unit.toLowerCase() === 'colour' ? '' : trait.unit : '';
        trait.description = trait.value;
        trait.value = trait.name.toLowerCase() === 'description' ? 'Navigate < or > for traits' : trait.value.join(', ');
    });
    
    let description = traits.find(trait => trait.name.toLowerCase() === 'description');
        description = description ? description.description[0] : '';

    renderTemplate({ id, traits }, slider.content, parent);

    let activeTrait, activeTraitKey, activeTraitValue;
    
    activeTrait = parent.querySelector(`#traitSlider${id} .carousel-item:nth-child(1)`);
    activeTrait.classList.add('active');

    const traitCount = traits.length;

    if(traitCount === 1) {
        parent.querySelectorAll('.carousel.slide a').forEach(control => {
            control.setAttribute('disabled', 'disabled');
            control.classList.add('inactive-icon');
        });
    }

    const changeTraitHandler = event => {
        setTimeout(() => {
            activeTrait = parent.querySelector(`#traitSlider${id} .carousel-item.active`);
            activeTraitKey = activeTrait.querySelector('div:nth-child(1)').innerHTML;
            activeTraitValue = activeTrait.querySelector('div:nth-child(3)').innerHTML;
            renderInfoDetails(item, activeTraitKey, activeTraitValue, description);
        }, 1000);
    };

    changeTraitHandler();

    parent.querySelector(`#traitSlider${id} .carousel-control-prev`).addEventListener('click', changeTraitHandler);
    parent.querySelector(`#traitSlider${id} .carousel-control-next`).addEventListener('click', changeTraitHandler);
}

export const taxonInfoSlider = (item, traits, parent, mode) => {

    const id = mode === 'MODAL' ? 'taxon_1' : 'taxon_0';

    const convertedTraits = convertTraitsToNameValuePairsArray(traits, getTraitsToExclude());

    if(convertedTraits.length > 0) {
        renderInfoSlider(item, convertedTraits, parent, id);
    }    
};

export const infoSlider = (item, parent, mode) => {
    
    if(!hasTraitPropeties(item.traits)) return;

    let traits = convertTraitsToNameValuePairsArray(item.traits, getTraitsToExclude(), item);

    if(item.traits.description) {
        const description = {
            name: 'description',
            value: item.traits.description.value
        }
        traits = [ description, ...traits ];
    }
    
    if(traits.length === 0) return;
    
    const id = mode === 'MODAL' ? 1 : 0;

    renderInfoSlider(item, traits, parent, id);
};