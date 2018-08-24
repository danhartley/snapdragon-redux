import { utils } from 'utils/utils';
import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler } from 'ui/helpers/handlers';
import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

export const imageSlider = (item, parent, disableModal = false, image) => {

    const images = utils.shuffleArray(item.images);

    const slider = document.createElement('template');

    slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    renderTemplate({ images }, slider.content, parent);

    if(image) {
        parent.querySelectorAll('.carousel-item').forEach(item => {        
            if(item.lastElementChild.src === image.dataset.src) {
                item.classList.add('active');        
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
        modalImagesHandler(parent.querySelectorAll('.carousel-item'), item);
    }
};