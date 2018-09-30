import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler } from 'ui/helpers/handlers';
import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

export const imageSlider = (images, parent, disableModal = false, image) => {

    const slider = document.createElement('template');

    slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    renderTemplate({ images }, slider.content, parent);

    if(image) {
        parent.querySelectorAll('.carousel-item').forEach(i => {        
            if(i.lastElementChild.src === image.dataset.src || i.lastElementChild.dataset.src === image.dataset.src) {
                i.classList.add('active');        
            }
        });
    } else {
        parent.querySelector('.carousel-item').classList.add('active');
    }
    
    if(disableModal) {
        document.querySelectorAll('.carousel-item img').forEach(img => {
            img.removeAttribute('data-toggle');
            img.removeAttribute('data-target');
        });
    } else {
        modalImagesHandler(parent.querySelectorAll('.carousel-item'), null, null);
    }
};