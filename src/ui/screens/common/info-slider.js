import { renderTemplate } from 'ui/helpers/templating';
import infoSliderTemplate from 'ui/screens/common/info-slider-template.html'

export const infoSlider = (info, parent) => {

    const slider = document.createElement('template');

    slider.innerHTML = infoSliderTemplate;

    parent.innerHTML = '';

    info.traits.forEach(trait => {
        if(!trait.value && trait.values) {
            trait.value = trait.values.join(', ');
        }
    });
    
    renderTemplate({ info }, slider.content, parent);
    
    document.querySelector('#traitSlider .carousel-item:nth-child(1)').classList.add('active');

    const traitCount = info.traits.length;

    if(traitCount === 1) {
        document.querySelectorAll('.carousel.slide a').forEach(control => {
            control.setAttribute('disabled', 'disabled');
            control.classList.add('inactive-icon');
        });
    }
}
