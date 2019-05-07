import * as R from 'ramda';

import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { renderIcon } from 'ui/helpers/icon-handler';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import mixedSpecimenTemplate from 'ui/screens/multichoice/portrait/mixed-specimen/mixed-specimen-questions-template.html';
import { scoreHandler } from 'ui/helpers/handlers';
import { imageSlider } from 'ui/screens/common/image-slider';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import { getPoolItems } from 'ui/screens/multichoice/missing-data-helper';

export const renderMixedSpecimenQuestions = collection => {

    const { config, lesson, layout, score } = store.getState();

    const item = collection.nextItem;

    if(!item) return;

    const getPortraitImages = images => {
        const multiImages = utils.flatten(images.map(image => { 
            const item = { name: image.itemName, images: R.take(1, image.srcs) };
            return prepImagesForCarousel(item, config, imageUseCases.MIXED_SPECIMENS);
        }));
        return multiImages;
    }

    const items = getPoolItems(collection);

    let images = items.map((item, index) => { 
        return { index: index + 1, srcs: item.images, itemName: item.name };
    });

    images.forEach(image => {
        image.url = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config);
    });

    images = getPortraitImages(images);

    let parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question: 'Find the species', help: '(Click on the matching photo.)', term: '' });
    
    const icon = renderIcon(item, document);
    
    const template = document.createElement('template');

    template.innerHTML = mixedSpecimenTemplate;
    
    renderTemplate({}, template.content, parent);

    parent = document.querySelector('.js-species-card-images');

    imageSlider({ config, images: utils.shuffleArray(images), parent, disableModal: true });

    const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
    const boundScore = {};

    document.querySelectorAll('.carousel-item .layer').forEach(img => {
        
        img.addEventListener('click', event => {

            const layer = event.target;
            const selectedName = layer.dataset.itemName;
            const question = item.name;
            const answer = selectedName || 'wrong answer!';
            const isCorrect = answer === question;
            const className = isCorrect ? 'snap-success' : 'snap-alert';
            layer.classList.add(className);       
            const answerIcon = document.createElement('span');
            answerIcon.innerHTML = isCorrect 
                    ? '<span class="icon"><i class="fas fa-check-circle"></i></span>'
                    : '<span class="icon"><i class="fas fa-times-circle"></i></span>';

            // layer.appendChild(answerIcon);
            document.querySelector('.attribution-layer').style.display = 'none';
            
            const test = { ...score, itemId: item.id, question, answer, binomial: item.name, questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, points: layout.points};

            const callback = (score, scoreUpdateTimer) => {
                boundScore.score = score;
                boundScore.scoreUpdateTimer = scoreUpdateTimer;
                score.success ? icon.classList.add('answer-success') : icon.classList.add('answer-alert');
                continueLessonBtn.disabled = false;                
            };

            scoreHandler('image-match', test, callback, config);
        });
    });

    continueLessonBtn.addEventListener('click', event => {


        

        if(!score.success) {
            // delay, show correct answer if wrong + its name
        }

        window.clearTimeout(boundScore.scoreUpdateTimer);
        actions.boundUpdateScore(boundScore.score);
    });
};
