import * as R from 'ramda';

import { utils } from 'utils/utils';
import { DOM } from 'ui/dom';
import { store } from 'redux/store';
import { elem } from 'ui/helpers/class-behaviour';
import { actions } from 'redux/actions/action-creators';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import mixedSpecimenTemplate from 'ui/screens/multichoice/mixed-specimen-questions-template.html';
import questionTemple from 'ui/screens/common/question-template.html';
import { screenShare } from 'ui/screens/multichoice/mixed-specimen-shared';
import { simpleScoreHandler } from 'ui/helpers/handlers';
import { imageSlider } from 'ui/screens/common/image-slider';

export const renderMixedSpecimenQuestions = ui => {

    const { collection, config, lessonPlan, layout, score } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;

    const getPortraitImages = images => {
        if(!images) return;
        const multiImages = utils.flatten(images.map(image => { 
            const srcs = R.take(3, image.srcs);
            return srcs.map((src, index) => {
                return { src: src, itemName: image.itemName, index: index};
            });
        }));
        return multiImages;
    }

    let images = utils.shuffleArray(screenShare.getRandomImages(item, config));

    if(!images) return;

    if(config.isPortraitMode) images = getPortraitImages(images);
    
    let question1 = `Species identification: ${itemProperties.vernacularName(item, config)} (${item.name})`;
    let question2 = `Can you identify which of the 4 species on the left is ${item.name}? (Click on an image to view more examples.)`;
    let question3 = `When you've decided, click on the matching image below.`;

    if(config.isPortraitMode) {
        question1 = `Look through the images till you find one of ${itemProperties.vernacularName(item, config)} (${item.name}).`;
        question2 = `When you've found a match click on the image. (There's' more than one correct answer.)`;
        question3 = '';
    }

    let parent = DOM.rightBody;
    parent.innerHTML = '';

    renderTemplate({ images, question1, question2, question3 }, template.content, parent);

    template.innerHTML = questionTemple;

    parent = document.querySelector('.right-body .snapdragon-container');

    const context = { question: 'Find the species' };

    renderTemplate( context, template.content, parent);

    const renderAnswer = (score, scoreUpdateTimer) => {
        const answer = document.querySelector('.js-answer');
        answer.innerHTML = 'Continue';
        answer.style.display = 'block';
        answer.style.cursor = 'pointer';    
        answer.addEventListener('click', () => {
            window.clearTimeout(scoreUpdateTimer);
            actions.boundUpdateScore(score);
        });
        document.querySelector('.js-question').style.display = 'none';
    }

    const scoreHandler = (score, question, answer, config) => {
        const test = { ...score, itemId: item.id, question, answer, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
        simpleScoreHandler(test, config, renderAnswer);
    };

    if(config.isLandscapeMode) {

        const imageLayers = document.querySelectorAll('.question-images .layer');

        imageLayers.forEach((imageLayer) => {
            imageLayer.addEventListener('click', event => {

                if(elem.hasClass(imageLayer, 'disabled')) return;

                const selectedIndex = imageLayer.children[0].innerHTML;
                const selectedName = event.target.dataset.itemname || event.target.parentElement.dataset.itemname;
                const isCorrectAnswer = selectedName === item.name;
                imageLayer.children[0].innerHTML = selectedName;
                imageLayer.setAttribute('style', 'font-size: 1em;');
                if(isCorrectAnswer) {
                    elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-success' );
                } else {
                    elem.addClassToSelected(imageLayers, imageLayer, ['snap-success', 'snap-alert'], 'snap-alert' );
                }
                screenShare.selectImage(selectedIndex, selectedName, isCorrectAnswer);
                const question = item.name;
                const answer = selectedName;
                scoreHandler(score, question, answer, config);
                imageLayers.forEach(item => item.classList.add('disabled'));                
            });
        });
    }

    if(config.isPortraitMode) {
        
        imageSlider(utils.shuffleArray(images), document.querySelector('.js-species-card-images'), true), config;

        document.querySelectorAll('.carousel-item .layer').forEach(img => {
            img.addEventListener('click', event => {
                const layer = event.target;
                const selectedName = layer.dataset.itemname;
                const question = item.name;
                const answer = selectedName;
                const isCorrect = answer === question;
                const className = isCorrect ? 'snap-success' : 'snap-alert';
                layer.classList.add(className);
                document.querySelector('.question-container p:nth-child(2)').innerHTML = '';                
                const icon = document.createElement('span');
                icon.innerHTML = isCorrect 
                        ? '<span class="icon"><i class="fas fa-check-circle"></i></span>'
                        : '<span class="icon"><i class="fas fa-times-circle"></i></span>';

                layer.appendChild(icon);          
                scoreHandler(score, question, answer, config);
            });
        });
    }
};