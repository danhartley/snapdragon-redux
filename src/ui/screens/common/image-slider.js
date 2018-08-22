import { utils } from 'utils/utils';
import { renderTemplate } from 'ui/helpers/templating';
import { modalBackgroundImagesHandler } from 'ui/helpers/handlers';
import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

export const imageSlider = item => {

    const images = utils.shuffleArray(item.images);

    const slider = document.createElement('template');

    slider.innerHTML = imageSliderTemplate;

    const parent = document.querySelector('.js-species-card-images');
    
    parent.innerHTML = '';

    renderTemplate({ images }, slider.content, parent);    

    document.querySelector('.js-species-card-images .carousel-item').classList.add('active');

    modalBackgroundImagesHandler(document.querySelectorAll('.js-species-card-images .carousel-item'), item);
};