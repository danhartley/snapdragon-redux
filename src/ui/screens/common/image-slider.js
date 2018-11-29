import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler } from 'ui/helpers/image-handlers';
import { handleRightsAttribution } from 'ui/screens/common/rights-attribution';
import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

const selectActiveNodeImage = (image, parent) => {
    parent.querySelectorAll('.carousel-item').forEach(i => {        
        const elemSrc = i.lastElementChild.dataset.src || i.lastElementChild.src;
        const src = image.dataset ? image.dataset.src : `https://content.eol.org/data/media/${image.url}`;
        if(elemSrc === src) {
            i.classList.add('active');        
            return;
        }
    });    
    const activeNode = parent.querySelector('.imageSlider.carousel .carousel-item.active > div'); 
    handleRightsAttribution({ name: image.dataset.title || image.dataset.itemname, image: image.dataset}, activeNode);
};

const disableModalPopups = (disableModal, parent, config) => {
    if(disableModal) {
        document.querySelectorAll('.carousel-item div').forEach(img => {
            img.removeAttribute('data-toggle');
            img.removeAttribute('data-target');
        });
    } else {
        modalImagesHandler(parent.querySelectorAll('.carousel-item > div'), null, config, null);
    }
};

const prepImageData = (src) => {
    return {
        name: src.title,
        image: { ...src, ...{ photographer : { full_name: src.photographersName }}}
    };
};

const carouselControlHandler = event => {
    setTimeout(() => {
        const activeNode = document.querySelector(`${event.target.dataset.slider} .carousel-item.active > div`);
        const src = activeNode.dataset;
        const selectedItem = prepImageData(src);
        handleRightsAttribution(selectedItem, activeNode);
    },1000);
};

export const imageSlider = (config, images, parent, disableModal, image) => {

    const slider = document.createElement('template');

    slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    renderTemplate({ images, index: '' }, slider.content, parent);
    selectActiveNodeImage(image || images[0], parent);    
    disableModalPopups(disableModal, parent, config);

    document.querySelector('#imageSlider .carousel-control-prev').addEventListener('click', carouselControlHandler);
    document.querySelector('#imageSlider .carousel-control-next').addEventListener('click', carouselControlHandler);

    // setTimeout(() => {
    //     const activeNode = parent.querySelector('.imageSlider .carousel-item.active > div');        
    //     const src = activeNode.dataset;
    //     const selectedItem = prepImageData(src);
    //     handleRightsAttribution(selectedItem, activeNode); 
    // }, 1000);
};

export const imageSideBySlider = (slides, parent, disableModal = false, config) => {

    const sideBySlider = document.createElement('template');

    sideBySlider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    parent.classList.add('slideBySliderContainer');

    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(3)`).innerHTML = '';
    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(4)`).innerHTML = '';

    slides.forEach((slide, index) => {
        const header = document.querySelectorAll(`#imageComparisonModal .js-modal-image-title > span`)[index];
        header.innerHTML = `<span class="common-name">${slide.images[0].itemCommon}</span><br><span class="latin-name">(${slide.images[0].itemName})</span>`;
        const images = slide.images.map(image => {
            return {
                index: image.index,
                itemName: image.itemName,
                itemCommon: image.itemCommon,
                ...image.src,
                photographersName : { full_name: image.src.photographer ? image.src.photographer.full_name : '' }
            }
        });
        renderTemplate({ images, index: index + 1 }, sideBySlider.content, parent);
        const activeNode = document.querySelector(`#imageSlider${index + 1} .carousel-item`);
        activeNode.classList.add('active');
        disableModalPopups(disableModal, config);
        handleRightsAttribution({ image: images[0], name: images[0].itemName }, activeNode.querySelector('div'));

        document.querySelector(`#imageSlider${index + 1} .carousel-control-prev`).addEventListener('click', carouselControlHandler);
        document.querySelector(`#imageSlider${index + 1} .carousel-control-next`).addEventListener('click', carouselControlHandler);
    });

    setTimeout(() => {
        if(document.querySelector('.js-comparison-description div').innerHTML !== '') {
            document.querySelectorAll('.imageSlider .carousel-item').forEach(item => item.style.height = '50vh');
            document.querySelector('.js-comparison-description').style.height = '20vh';
        }   
    });
};