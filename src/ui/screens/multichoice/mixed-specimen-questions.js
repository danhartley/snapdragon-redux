import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-questions-template.html';
import questionTemple from 'ui/screens/common/question-template.html';
import { renderItemSpecimenTiles } from 'ui/screens/landscape/specimen-tiles';
import { scoreHandler } from 'ui/helpers/handlers';
import { imageSlider } from 'ui/screens/common/image-slider';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import { iconicTaxa, matchTaxon, matchTaxonKey } from 'api/snapdragon/iconic-taxa';

export const renderMixedSpecimenQuestions = ui => {

    const { collection, config, lessonPlan, layout, score } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;

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

    const question1 = `Can you find a specimen of ${item.vernacularName}?`;
    const question2 = `When you've found a match click on the image. (There's more than one.)`;
    const question3 = `${item.name}`;

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ images, question1, question2, question3 }, template.content, parent);

    template.innerHTML = questionTemple;

    parent = document.querySelector('.right-body .snapdragon-container');

    const context = { question: 'Find the species' };

    renderTemplate( context, template.content, parent);

    const callback = (score, scoreUpdateTimer) => {
        const answer = document.querySelector('.js-answer');
        answer.innerHTML = 'Continue lesson';
        answer.style.display = 'block';
        answer.style.cursor = 'pointer';    
        answer.addEventListener('click', () => {
            window.clearTimeout(scoreUpdateTimer);
            actions.boundUpdateScore(score);
        });
        document.querySelector('.js-question').style.display = 'none';
    }

    const internalScoreHandler = (score, question, answer, config) => {
        const test = { ...score, itemId: item.id, question, answer, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
        scoreHandler('image-match', test, callback, config);
    };

    parent = document.querySelector('.js-species-card-images');

    imageSlider(config, utils.shuffleArray(images), parent, true);

    document.querySelectorAll('.carousel-item .layer').forEach(img => {
        img.addEventListener('click', event => {
            const layer = event.target;
            const selectedName = layer.dataset.itemName;
            const question = item.name;
            const answer = selectedName;
            const isCorrect = answer === question;
            const className = isCorrect ? 'snap-success' : 'snap-alert';
            layer.classList.add(className);       
            const icon = document.createElement('span');
            icon.innerHTML = isCorrect 
                    ? '<span class="icon"><i class="fas fa-check-circle"></i></span>'
                    : '<span class="icon"><i class="fas fa-times-circle"></i></span>';

            layer.appendChild(icon);
            document.querySelector('.attribution-layer').style.display = 'none';
            internalScoreHandler(score, question, answer, config);
        });
    });

    const tiles = document.querySelectorAll('.js-tiles');

    if(tiles) {
        const name = document.querySelector('.carousel-item.active > div').dataset.title; 
        const item = collection.items.find(i => i.name === name);
        renderItemSpecimenTiles(item);
    }

};
