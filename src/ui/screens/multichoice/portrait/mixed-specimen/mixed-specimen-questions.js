import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { renderIcon } from 'ui/helpers/icon-handler';
import { renderTemplate } from 'ui/helpers/templating';
import testCardTemplate from 'ui/screens/common/test-card-template.html';
import mixedSpecimenTemplate from 'ui/screens/multichoice/portrait/mixed-specimen/mixed-specimen-questions-template.html';
import { scoreHandler } from 'ui/helpers/handlers';
import { imageSlider } from 'ui/screens/common/image-slider';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';

export const renderMixedSpecimenQuestions = collection => {

    const { config, lessonPlan, layout, score } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = testCardTemplate;

    const getPortraitImages = images => {
        if(!images) return;
        const multiImages = utils.flatten(images.map(image => { 
            const item = { name: image.itemName, images: R.take(1, image.srcs) };
            return prepImagesForCarousel(item, config, imageUseCases.MIXED_SPECIMENS);
        }));
        return multiImages;
    }

    const rank = matchTaxon(collection.nextItem.taxonomy, iconicTaxa).toLowerCase();
    const itemPool = collection.allItems || collection.items;
    const clonedItems = R.clone(itemPool.filter(item => matchTaxonKey(item.taxonomy,[rank])));
    const items = R.take(5, utils.shuffleArray(clonedItems.filter(ci => ci.name !== collection.nextItem.name)));
    const nextItem = clonedItems.find(i => i.name === collection.nextItem.name);
    if(nextItem) items.push(nextItem);

    let images = items.map((item, index) => { 
        return { index: index + 1, srcs: item.images, itemName: item.name };
    });

    if(!images) return;

    images.forEach(image => {
        image.url = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config);
    });

    images = getPortraitImages(images);

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ vernacularName: item.vernacularName, binomial: item.binomial, question: 'Find the species', help: '' }, template.content, parent);

    const icon = renderIcon(item, document);
 
    template.innerHTML = mixedSpecimenTemplate;

    parent = document.querySelector('.js-test-card');

    renderTemplate({}, template.content, parent);

    parent = document.querySelector('.js-species-card-images');

    imageSlider(config, utils.shuffleArray(images), parent, true);

    document.querySelectorAll('.carousel-item .layer').forEach(img => {
        img.addEventListener('click', event => {

            const layer = event.target;
            const selectedName = layer.dataset.itemName;
            const question = item.name;
            const answer = selectedName || 'wrong answer!';
            const isCorrect = answer === question;
            const className = isCorrect ? 'snap-success' : 'snap-alert';
            layer.classList.add(className);       
            const icon = document.createElement('span');
            icon.innerHTML = isCorrect 
                    ? '<span class="icon"><i class="fas fa-check-circle"></i></span>'
                    : '<span class="icon"><i class="fas fa-times-circle"></i></span>';

            layer.appendChild(icon);
            document.querySelector('.attribution-layer').style.display = 'none';
            
            const test = { ...score, itemId: item.id, question, answer, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
            scoreHandler('image-match', test, null, config);
        });
    });
};