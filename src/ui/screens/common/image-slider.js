import { renderTemplate } from 'ui/helpers/templating';
import { scaleImage, imageMatch, imageUseCases, prepImagesForCarousel } from 'ui/helpers/image-handler';
import { handleRightsAttribution } from 'ui/screens/common/rights-attribution';

import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

const selectActiveImage = (image, parent, config) => {
    parent.querySelectorAll('.carousel-item').forEach(i => {
        const elemSrc = i.querySelector('img').dataset;
        if(imageMatch(elemSrc, image.dataset || image)) {
            i.classList.add('active');
            return;
        }
    });    
    
    const activeNode = parent.querySelector('.imageSlider.carousel .carousel-item.active img'); 
    
    const indicators = document.querySelectorAll('.carousel-indicators li');
          indicators.forEach(i => {
              if(i.dataset && activeNode.dataset && i.dataset.slideTo === activeNode.dataset.index) {
                  i.classList.add('active');
              }
          });

    let img = image.dataset || image;
    img.title = img.title || img.itemName;
    img = scaleImage(img);
    handleRightsAttribution(img);

    return img;
};

const carouselControlHandler = (event, parentScreen = document) => {

    setTimeout(() => {

        const activeNode = parentScreen.querySelector(`${event.target.dataset.slider} .carousel-item.active img`);
        const image = activeNode.dataset;   
        
        handleRightsAttribution(image);    

    }, 750);
};

export const imageSlider = sliderArgs => {

    const { config, images, parent, image, parentScreen = document, identifier = '' } = sliderArgs;

    const slider = document.createElement('template');
          slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    images.forEach((img, i) => {
        img.index = i;
        img.rightsHolder = img.rightsHolder || 'Public domain';
        img.provider = img.provider || 'eol';
        img = scaleImage(img);
    });

    snapLog('imageSlider, image medium values:', images.map(i => i.medium));

    renderTemplate({ images, identifier }, slider.content, parent);

    let next = document.querySelector(`#imageSlider_${identifier} .carousel-control-next-icon`);
    let prev = document.querySelector(`#imageSlider_${identifier} .carousel-control-prev-icon`);

    if(config.isPortraitMode) {        
        next.classList.add('concealed');
        prev.classList.add('concealed');
    }

    setTimeout(() => {
        selectActiveImage(image || images[0], parent, config);        
    },250);

    setTimeout(() => {
      // next.focus();
    }, 1000);

    parentScreen.querySelector(`#imageSlider_${identifier} .carousel-control-prev`).addEventListener('click', e => carouselControlHandler(e,parentScreen, config));
    parentScreen.querySelector(`#imageSlider_${identifier} .carousel-control-next`).addEventListener('click', e => carouselControlHandler(e,parentScreen, config));

    document.addEventListener('swiped-left', function(e) {
        next.click();
    });

    document.addEventListener('swiped-right', function(e) {
        prev.click();
    });
};

export const imageSideBySlider = (slides, parent, config) => {

    const sideBySlider = document.createElement('template');
          sideBySlider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';
    parent.classList.add('slideBySliderContainer');

    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(3)`).innerHTML = '';
    document.querySelector(`#imageComparisonModal .js-modal-image-title span:nth-child(4)`).innerHTML = '';

    slides.forEach((slide, index) => {

        const identifier = slide.id.replace(' ', '_') || index + 1;

        const header = document.querySelectorAll(`#imageComparisonModal .js-modal-image-title > span`)[index];
              header.innerHTML = `<span class="common-name">${slide.images[0].itemCommon}</span><span class="latin-name">${slide.images[0].itemName}</span>`;
        const item = { name: slide.images[0].itemName, itemCommon: slide.images[0].itemCommon, images: slide.images };
        const images = prepImagesForCarousel(item, config, imageUseCases.CAROUSEL);
        
        snapLog('imageSideBySlider, image medium values:', images.map(i => i.medium));

        renderTemplate({ images, identifier }, sideBySlider.content, parent);
        
        const activeNode = document.querySelector(`#imageSlider_${identifier} .carousel-item`);
              activeNode.classList.add('active');
        handleRightsAttribution(images[0]);

        const originalImageLink = document.querySelector(`#imageSlider_${identifier} .js-expand`);
        if(originalImageLink) originalImageLink.classList.add('hide-important');
    });
};