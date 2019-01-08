import { renderTemplate } from 'ui/helpers/templating';
import infoSliderTemplate from 'ui/screens/common/info-slider-template.html';

export const infoSlider = (item, traits, family, parent) => {

    const speciesTraits = traits.find(c => c.name === item.name) || { traits: [] };
    const familyTraits = (family && family.traits) ? family.traits : [];
    if(speciesTraits.traits.length === 0 && familyTraits.length ===0) return;
    const species = { traits: speciesTraits.traits.concat(familyTraits) };

    if(!species.traits) return;

    const slider = document.createElement('template');

    slider.innerHTML = infoSliderTemplate;

    parent.innerHTML = '';

    species.traits.forEach(trait => {
        if(!trait.value && trait.values) {
            trait.value = trait.values.join(', ');
        }
    });
    
    renderTemplate({ species }, slider.content, parent);
    
    document.querySelector('#traitSlider .carousel-item:nth-child(1)').classList.add('active');

    const traitCount = species.traits.length;

    if(traitCount === 1) {
        document.querySelectorAll('.carousel.slide a').forEach(control => {
            control.setAttribute('disabled', 'disabled');
            control.classList.add('inactive-icon');
        });
    }
}
