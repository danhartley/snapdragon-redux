import { utils } from 'utils/utils';
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

const disableModalPopups = (disableModal, parent, config) => {
    if(disableModal) {
        document.querySelectorAll('.carousel-item div').forEach(img => {
            img.removeAttribute('data-toggle');
            img.removeAttribute('data-target');
        });
    } else {
        modalImagesHandler(parent.querySelectorAll('.carousel-item'), null, config, null);
    }
};

export const imageSlider = (config, images, parent, disableModal = false, image) => {

    const slider = document.createElement('template');

    slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    renderTemplate({ images: utils.shuffleArray(images), index: '' }, slider.content, parent);
    selectActiveImage(image, parent);    
    disableModalPopups(disableModal, parent, config);
};

export const imageSideBySlider = (slides, parent, disableModal = false, config) => {

    const sideBySlider = document.createElement('template');

    sideBySlider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    parent.classList.add('slideBySliderContainer');

    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(3)`).innerHTML = '';
    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(4)`).innerHTML = '';

    slides.forEach((slide, index) => {
        const header = document.querySelector(`#imageComparisonModal .js-modal-image-title > span:nth-child(${index + 1})`);
        header.innerHTML = `<span class="common-name">${slide.images[0].itemCommon}</span><br><span class="latin-name">(${slide.images[0].itemName})</span>`;
        renderTemplate({ images: slide.images, index: index + 1 }, sideBySlider.content, parent);
        document.querySelector(`#imageSlider${index + 1} .carousel-item`).classList.add('active');
        disableModalPopups(disableModal, config);
    });

    setTimeout(() => {
        if(document.querySelector('.js-comparison-description div').innerHTML !== '') {
            document.querySelectorAll('.imageSlider .carousel-item').forEach(item => item.style.height = '50vh');
            document.querySelector('.js-comparison-description').style.height = '20vh';
        }   
    });
};