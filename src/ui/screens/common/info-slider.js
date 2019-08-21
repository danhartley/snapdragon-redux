import { hasTraitPropeties, getTraitsToExclude, convertTraitsToNameValuePairsArray } from 'ui/helpers/traits-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { firestore } from 'api/firebase/firestore';
import { renderInfoDetails } from 'ui/screens/common/info-detail-slider';

import infoSliderTemplate from 'ui/screens/common/info-slider-template.html';

const renderInfoSlider = (traits, parent, id) => {

    const slider = document.createElement('template');
          slider.innerHTML = infoSliderTemplate;

    parent.innerHTML = '';

    traits.forEach(trait => {
        trait.unit = trait.unit || '';
        trait.value = trait.value.join(', ');
    });
    
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
            activeTraitValue = activeTrait.querySelector('div:nth-child(2)').innerHTML;
            console.log(activeTraitKey);
            console.log(activeTraitValue);
            const detail = firestore.getDefinition(activeTraitValue);
            console.log(detail);
            renderInfoDetails(detail);
        }, 1000);
    };

    changeTraitHandler();

    parent.querySelector(`#traitSlider${id} .carousel-control-prev`).addEventListener('click', changeTraitHandler);
    parent.querySelector(`#traitSlider${id} .carousel-control-next`).addEventListener('click', changeTraitHandler);
}

export const taxonInfoSlider = (traits, parent, mode) => {

    const id = mode === 'MODAL' ? 'taxon_1' : 'taxon_0';

    const convertedTraits = convertTraitsToNameValuePairsArray(traits, getTraitsToExclude());

    if(convertedTraits.length > 0) {
        renderInfoSlider(convertedTraits, parent, id);
    }    
};

export const infoSlider = (item, family, parent, mode) => {
    
    if(!hasTraitPropeties(item.traits)) return;

    const traits = convertTraitsToNameValuePairsArray(item.traits, getTraitsToExclude());
    
    if(traits.length === 0) return;
    // const speciesTraits = item.traits;

    // const speciesTraits = item.traits.filter(trait => !R.contains(trait.name, traitsToExclude));getTraitsToExclude();

    // if(speciesTraits.length === 0) return;

    const familyTraits = (family && family.traits) ? family.traits : [];
    // const species = { traits: speciesTraits.concat(familyTraits) };

    // if(!species.traits) return;

    // species.traits.forEach(trait => {
    //     if(!trait.value && trait.value) {
    //         trait.value = trait.value.join(', ');
    //     }
    // });

    // const traits = [];

    // for (let [key, obj] of Object.entries(item.traits)) {
    //     if(key !== 'name') {
    //         obj.value
    //             ? traits.push({ name: key, value: obj.value })
    //             : traits.push({ name: key, value: obj.value })
    //     }
    // }
    
    const id = mode === 'MODAL' ? 1 : 0;

    renderInfoSlider(traits, parent, id);
}
