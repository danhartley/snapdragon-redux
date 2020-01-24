import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler, scaleImage, imageMatch, imageUseCases, prepImagesForCarousel } from 'ui/helpers/image-handler';
import { handleRightsAttribution } from 'ui/screens/common/rights-attribution';

import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

const selectActiveImage = (image, parent, config) => {
    parent.querySelectorAll('.carousel-item').forEach(i => {
        const elemSrc = i.lastElementChild.dataset || i.lastElementChild;
        if(imageMatch(elemSrc, image.dataset || image)) {
            i.classList.add('active');
            return;
        }
    });    
    
    const activeNode = parent.querySelector('.imageSlider.carousel .carousel-item.active > img'); 
    
    const indicators = document.querySelectorAll('.carousel-indicators li');
          indicators.forEach(i => {
              if(i.dataset.slideTo === activeNode.dataset.index) {
                  i.classList.add('active');
              }
          });

    let img = image.dataset || image;
    img.title = img.title || img.itemName;
    img = scaleImage(img, imageUseCases.CAROUSEL, config);
    handleRightsAttribution(img, false);

    return img;
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

const carouselControlHandler = (event, parentScreen = document, config) => {

    setTimeout(() => {

        const activeNode = parentScreen.querySelector(`${event.target.dataset.slider} .carousel-item.active > div`);
        const image = activeNode.dataset;   
        
        handleRightsAttribution(image);
    
        const originalImageLink = parentScreen.querySelector('.js-carousel-inner');
              originalImageLink.addEventListener('click', onEnlargeImageHandler(config, parentScreen));

    }, 750);
};

export const imageSlider = sliderArgs => {

    const { config, images, parent, disableModal, image, parentScreen = document, identifier = '' } = sliderArgs;

    const slider = document.createElement('template');
          slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    images.forEach((img, i) => {
        img.index = i;
        img.rightsHolder = img.rightsHolder || 'Public domain';
        img.provider = img.provider || 'eol';
    });

    renderTemplate({ images, identifier, disableModal }, slider.content, parent);
    selectActiveImage(image || images[0], parent, config);    
    disableModalPopups(disableModal, parent, config);

    parentScreen.querySelector(`#imageSlider_${ disableModal }_${identifier} .carousel-control-prev`).addEventListener('click', e => carouselControlHandler(e,parentScreen, config));
    parentScreen.querySelector(`#imageSlider_${ disableModal }_${identifier} .carousel-control-next`).addEventListener('click', e => carouselControlHandler(e,parentScreen, config));

    let next, prev;

    if(config.isPortraitMode) {
        next = document.querySelector(`#imageSlider_${ disableModal }_${identifier} .carousel-control-next-icon`);
        next.classList.add('concealed');

        prev = document.querySelector(`#imageSlider_${ disableModal }_${identifier} .carousel-control-prev-icon`);
        prev.classList.add('concealed');
    }
    
    document.addEventListener('swiped-left', function(e) {
        console.log('swiped-left!');
        next.click();
    });

    document.addEventListener('swiped-right', function(e) {
        console.log('swiped-right!');        
        prev.click();
    });

    const imageLink = `#imageSlider_${ disableModal }_${identifier} .js-expand`;
    const originalImageLink = parentScreen.querySelector(imageLink);
          originalImageLink.addEventListener('click', onEnlargeImageHandler(config, parentScreen));
};

export const imageSideBySlider = (slides, parent, disableModal = false, config) => {

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
        
        renderTemplate({ images, identifier, disableModal }, sideBySlider.content, parent);
        
        const activeNode = document.querySelector(`#imageSlider_${ disableModal }_${identifier} .carousel-item`);
              activeNode.classList.add('active');
        disableModalPopups(disableModal, config);
        handleRightsAttribution(images[0], disableModal);

        const originalImageLink = document.querySelector(`#imageSlider_${disableModal}_${identifier} .js-expand`);
        if(originalImageLink) originalImageLink.classList.add('hide-important');
    });
};

function onEnlargeImageHandler(config, parentScreen) {
    if(config.isPortraitMode) return;
    return () => {
        const image = parentScreen.querySelector('.carousel-item.active > img');
        const large = scaleImage( { url:image.src }, imageUseCases.ACTUAL_SIZE, config).large;
        image.src = large;
    };
}
