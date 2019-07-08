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

export const infoSlider = (item, family, parent, mode) => {

    if(item.traits.length === 0) return;

    const exclude = [ 'song', 'UK Rank' ];

    // const speciesTraits = item.traits;

    // const speciesTraits = item.traits.filter(trait => !R.contains(trait.name, exclude));

    // if(speciesTraits.length === 0) return;

    const familyTraits = (family && family.traits) ? family.traits : [];
    // const species = { traits: speciesTraits.concat(familyTraits) };

    // if(!species.traits) return;

    // species.traits.forEach(trait => {
    //     if(!trait.value && trait.values) {
    //         trait.value = trait.values.join(', ');
    //     }
    // });

    const traits = [];

    for (let [key, value] of Object.entries(item.traits)) {
        traits.push({ name: key, value: value.value });
    }
    
    const id = mode === 'MODAL' ? 1 : 0;

    renderInfoSlider(traits, parent, id);
    // renderInfoSlider(species.traits, parent, id);
}
