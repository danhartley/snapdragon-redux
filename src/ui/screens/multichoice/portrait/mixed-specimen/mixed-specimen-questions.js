import * as R from 'ramda';

import { utils } from 'utils/utils';
import { actions } from 'redux/actions/action-creators';
import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { scoreHandler } from 'ui/helpers/handlers';
import { imageSlider } from 'ui/screens/common/image-slider';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handlers';
import { getPoolItems } from 'snapdragon-engine/pool-handler';

import mixedSpecimenTemplate from 'ui/screens/multichoice/portrait/mixed-specimen/mixed-specimen-questions-template.html';

export const renderMixedSpecimenQuestions = collection => {

    const { config, lesson, layout, score } = store.getState();

    const item = R.clone(collection.nextItem);

    if(!item) return;

    const init = async () => {

        const getPortraitImages = images => {
            const multiImages = utils.flatten(images.map(image => { 
                const item = { name: image.itemName, images: R.take(1, image.srcs) };
                return prepImagesForCarousel(item, config, imageUseCases.MIXED_SPECIMENS);
            }));
            return multiImages;
        }

        const items = await getPoolItems(collection);

        let images = items.map((item, index) => { 
            return { index: index + 1, srcs: item.images, itemName: item.name };
        });

        images.forEach(image => {
            image = scaleImage(image, imageUseCases.MIXED_SPECIMENS, config).medium;
        });

        images = getPortraitImages(images);

        let parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question: 'Find the species', help: '(Click on the matching photo.)', term: '' });
            
        const template = document.createElement('template');

        template.innerHTML = mixedSpecimenTemplate;
        
        renderTemplate({}, template.content, parent);

        parent = document.querySelector('.js-test-card-container-images');

        imageSlider({ config, images: utils.shuffleArray(images), parent, disableModal: true, identifier: 'mixed-specimens' });

        const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
        const boundScore = {};

        document.querySelectorAll('#imageSlider_true_mixed-specimens .carousel-item .layer').forEach(img => {
            
            img.addEventListener('click', event => {

                const layer = event.target;
                const selectedName = layer.dataset.itemName;
                const question = item.name;
                const answer = selectedName || 'wrong answer!';
                const isCorrect = answer === question;
                const answerIcon = document.createElement('span');
                answerIcon.innerHTML = isCorrect 
                        ? '<span class="icon"><i class="fas fa-check-circle"></i></span>'
                        : '<span class="icon"><i class="fas fa-times-circle"></i></span>';

                document.querySelector('.attribution-layer').style.display = 'none';
                
                const test = { ...score, itemId: item.id, question, answer, binomial: item.name, questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, points: layout.points};

                const callback = (score, scoreUpdateTimer) => {
                    boundScore.score = score;
                    boundScore.scoreUpdateTimer = scoreUpdateTimer;
                    // score.success ? icon.classList.add('answer-success') : icon.classList.add('answer-alert');
                    continueLessonBtn.disabled = false;          
                    if(!score.success) {
                        const wrongItem = items.find(item => item.name === score.answer);
                        const vernacularName = itemProperties.getVernacularName(wrongItem, config);
                        const name = vernacularName || score.answer;
                        // const wrongAnswerTxt = document.querySelector('.js-wrong-answer-txt');
                        //     wrongAnswerTxt.innerHTML = score.answer ? `${name} is not right.` : '';
                    }
                };

                scoreHandler('image-match', test, callback, config);  
            });
        });

        continueLessonBtn.addEventListener('click', event => {

            if(!score.success) {            
                setTimeout(() => {
                    window.clearTimeout(boundScore.scoreUpdateTimer);
                    actions.boundUpdateScore(boundScore.score);
                });
            } else {
                window.clearTimeout(boundScore.scoreUpdateTimer);
                actions.boundUpdateScore(boundScore.score);
            }

        });
    };

    init();
};
