import { renderTemplate } from 'ui/helpers/templating';
import infoSliderTemplate from 'ui/screens/common/info-slider-template.html'

export const infoSlider = (info, parent) => {

    const slider = document.createElement('template');

    slider.innerHTML = infoSliderTemplate;

    parent.innerHTML = '';

    renderTemplate({ info }, slider.content, parent);

    document.querySelector('.carousel-item').classList.add('active');
}