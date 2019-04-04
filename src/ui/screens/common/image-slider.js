import { renderTemplate } from 'ui/helpers/templating';
import { modalImagesHandler, scaleImage, imageMatch, imageUseCases, prepImagesForCarousel } from 'ui/helpers/image-handlers';
import { handleRightsAttribution } from 'ui/screens/common/rights-attribution';
import imageSliderTemplate from 'ui/screens/common/image-slider-template.html';

const selectActiveNodeImage = (image, parent, config) => {
    parent.querySelectorAll('.carousel-item').forEach(i => {
        const elemSrc = i.lastElementChild.dataset.src || i.lastElementChild.src;
        const src = image.dataset ? image.dataset.src : `https://content.eol.org/data/media/${image.url}`;
        if(imageMatch(elemSrc, src)) {
            i.classList.add('active');
            return;
        }
    });    
    const activeNode = parent.querySelector('.imageSlider.carousel .carousel-item.active > div'); 
    document.querySelector('.carousel-indicators li').classList.add('active');
    const img = image.dataset || image;
    img.title = img.title || img.itemName;
    img.url = scaleImage(img, imageUseCases.CAROUSEL, config);
    handleRightsAttribution(img, activeNode);

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

const getActiveBackgroundImage = () => {
    const imageContainer = document.querySelector('.carousel-item.active > div');
    const backgroundImage = imageContainer.style.backgroundImage.slice(4, -1).replace(/"/g, "");
    return { imageContainer, backgroundImage };
};

const carouselControlHandler = event => {

    setTimeout(() => {        

        const activeNode = document.querySelector(`${event.target.dataset.slider} .carousel-item.active > div`);
        const image = activeNode.dataset;        
        handleRightsAttribution(image, activeNode);
    
        const originalImageLink = document.querySelector('.js-image-load-original > div');
        originalImageLink.style.display = 'none';
        
        const { backgroundImage } = getActiveBackgroundImage();
        if(backgroundImage.indexOf('260x190') !== -1) {
            originalImageLink.style.display = 'initial';
        }
    }, 750);
};

export const imageSlider = (config, images, parent, disableModal, image) => {

    const slider = document.createElement('template');

    slider.innerHTML = imageSliderTemplate;

    parent.innerHTML = '';

    images.forEach((img, i) => {
        img.index = i;
        img.rightsHolder = img.rightsHolder || 'Public domain';
    });

    renderTemplate({ images, index: '' }, slider.content, parent);
    selectActiveNodeImage(image || images[0], parent, config);    
    disableModalPopups(disableModal, parent, config);

    const originalImageLink = document.querySelector('.js-image-load-original > div');

    document.querySelector('#imageSlider .carousel-control-prev').addEventListener('click', carouselControlHandler);
    document.querySelector('#imageSlider .carousel-control-next').addEventListener('click', carouselControlHandler);

    originalImageLink.addEventListener('click', event => {
        const { imageContainer, backgroundImage } = getActiveBackgroundImage();
        const orginalUrl = scaleImage({ url: backgroundImage }, imageUseCases.ACTUAL_SIZE, config);
        imageContainer.style["background-image"] = `url(${orginalUrl})`;
        imageContainer.classList.add('contain-image');
        originalImageLink.style.display = 'none';
    });
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
        header.innerHTML = `<span class="common-name">${slide.images[0].itemCommon}</span><span class="latin-name">(${slide.images[0].itemName})</span>`;
        const item = { name: slide.images[0].itemName, itemCommon: slide.images[0].itemCommon, images: slide.images };
        const images = prepImagesForCarousel(item, config, imageUseCases.CAROUSEL);
        renderTemplate({ images, index: index + 1 }, sideBySlider.content, parent);
        const activeNode = document.querySelector(`#imageSlider${index + 1} .carousel-item`);
        activeNode.classList.add('active');        
        disableModalPopups(disableModal, config);
        handleRightsAttribution(images[0], activeNode.querySelector('div'));

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