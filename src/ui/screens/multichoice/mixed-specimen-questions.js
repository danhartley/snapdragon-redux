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
        const multiImages = utils.flatten(images.map(image => { 
            const srcs = R.take(3, image.srcs);
            return srcs.map((src, index) => {
                return { src: src, itemName: image.itemName, index: index};
            });
        }));
        return multiImages;
    }

    let images = screenShare.getRandomImages(item, config);

    if(config.isPortraitMode) images = getPortraitImages(images);
    
    if(!images) return;

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
        const _score = { ...score, itemId: item.id, question, answer, binomial: item.name, questionCount: lessonPlan.questionCount, layoutCount: lessonPlan.layoutCount, points: layout.points};
        simpleScoreHandler(_score, config, renderAnswer);
    };

    if(config.isLandscapeMode) {

        const imageLayers = document.querySelectorAll('.question-images .layer');

        imageLayers.forEach((imageLayer) => {
                imageLayer.addEventListener('click', event => {
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
                });
        });
    }

    if(config.isPortraitMode) {
        
        imageSlider(images, document.querySelector('.js-species-card-images'), true);

        document.querySelectorAll('.carousel-item img').forEach(img => {
            img.addEventListener('click', event => {
                const selectedName = event.target.dataset.itemname;
                const question = item.name;
                const answer = selectedName;
                const isCorrect = answer === question;                
                const questionText = document.querySelector('.question-container p:nth-child(2)');
                questionText.innerHTML = isCorrect
                    ? `<div>
                        <span class="icon"><i class="fas fa-check-circle"></i></span><span>Correct</span>
                        </div>`
                    : `<div>
                        <span class="icon"><i class="fas fa-times-circle"></i></span><span>${ answer }</span>
                        </div>`;                
                scoreHandler(score, question, answer, config);
            });
        });
    }
};
