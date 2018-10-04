import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler } from 'ui/helpers/image-handlers';
import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

const selectActiveImage = (image, parent) => {
    if(image) {
        parent.querySelectorAll('.carousel-item').forEach(i => {        
            const elemSrc = i.lastElementChild.dataset.src || i.lastElementChild.src;
            if(elemSrc === image.dataset.src) {
                i.classList.add('active');        
            }
        });
    } else {
        parent.querySelector('.carousel-item').classList.add('active');
    }
};

const disableModalPopups = (disableModal, parent) => {
    if(disableModal) {
        document.querySelectorAll('.carousel-item div').forEach(img => {
            img.removeAttribute('data-toggle');
            img.removeAttribute('data-target');
        });
    } else {
        modalImagesHandler(parent.querySelectorAll('.carousel-item'), null, null);
    }
};

export const imageSlider = (images, parent, disableModal = false, image) => {

    const slider = document.createElement('template');

    slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    renderTemplate({ images, index: '' }, slider.content, parent);
    selectActiveImage(image, parent);    
    disableModalPopups(disableModal, parent);
};

export const imageSideBySlider = (slides, parent, disableModal = false) => {

    const sideBySlider = document.createElement('template');

    sideBySlider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    parent.classList.add('slideBySliderContainer');

    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(3)`).innerHTML = '';
    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(4)`).innerHTML = '';

    slides.forEach((slide, index) => {
        const header = document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(${index + 1})`);
        header.innerHTML = slide.images[0].itemName;
        renderTemplate({ images: slide.images, index: index + 1 }, sideBySlider.content, parent);
        document.querySelector(`#imageSlider${index + 1} .carousel-item`).classList.add('active');
        disableModalPopups(disableModal);
    });    

};