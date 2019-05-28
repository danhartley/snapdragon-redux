import * as R from 'ramda';

import { renderTemplate } from 'ui/helpers/templating';
import infoSliderTemplate from 'ui/screens/common/info-slider-template.html';

const renderInfoSlider = (traits, parent, id) => {

    const slider = document.createElement('template');

    slider.innerHTML = infoSliderTemplate;

    parent.innerHTML = '';
    
    renderTemplate({ id, traits }, slider.content, parent);
    
    parent.querySelector(`#traitSlider${id} .carousel-item:nth-child(1)`).classList.add('active');

    const traitCount = traits.length;

    if(traitCount === 1) {
        parent.querySelectorAll('.carousel.slide a').forEach(control => {
            control.setAttribute('disabled', 'disabled');
            control.classList.add('inactive-icon');
        });
    }
}

export const taxonInfoSlider = (traits, parent, mode) => {

    const id = mode === 'MODAL' ? 'taxon_1' : 'taxon_0';

    renderInfoSlider(traits, parent, id);
};

export const infoSlider = (item, traits, family, parent, mode) => {

    const speciesTraits = traits.find(c => c.name === item.name) || { traits: [] };

    const exclude = [ 'song', 'UK Rank' ];

    speciesTraits.traits = speciesTraits.traits.filter(trait => !R.contains(trait.name, exclude));

    const familyTraits = (family && family.traits) ? family.traits : [];
    if(speciesTraits.traits.length === 0 && familyTraits.length === 0) return;
    const species = { traits: speciesTraits.traits.concat(familyTraits) };

    if(!species.traits) return;

    species.traits.forEach(trait => {
        if(!trait.value && trait.values) {
            trait.value = trait.values.join(', ');
        }
    });
    
    const id = mode === 'MODAL' ? 1 : 0;

    renderInfoSlider(species.traits, parent, id);
}
