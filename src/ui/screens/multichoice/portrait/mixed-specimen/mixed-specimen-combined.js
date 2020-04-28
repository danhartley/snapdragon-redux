import * as R from 'ramda';

import { lessonStateHandler } from 'ui/screens/lists/lesson-state-handler';
import { utils } from 'utils/utils';
import { store } from 'redux/store';
import { itemProperties } from 'ui/helpers/data-checking';
import { renderTemplate } from 'ui/helpers/templating';
import { renderTestCardTemplate } from 'ui/screens/cards/test-card';
import { scoreHandler, bindScore } from 'ui/helpers//score-handler';
import { imageSlider } from 'ui/screens/common/image-slider';
import { imageUseCases, prepImagesForCarousel, scaleImage } from 'ui/helpers/image-handler';
import { getPoolItems } from 'snapdragon-engine/pool-handler';

import mixedSpecimenTemplate from 'ui/screens/multichoice/portrait/mixed-specimen/mixed-specimen-combined-template.html';

export const renderMixedSpecimenImagesAndQuestion = collection => {

    const { config, lesson, layout, score, userAction } = store.getState();

    // if(lessonStateHandler.overrideLesson(userAction, config)) { return; }

    const item = R.clone(collection.nextItem);

    if(!item) return;

    const init = async () => {

        const getPortraitImages = images => {
            const multiImages = utils.flatten(images.map(image => { 
                const images = image.srcs.filter(i => i.starred).length === 0 ? R.take(1, utils.shuffleArray(image.srcs)) : image.srcs.filter(i => i.starred);
                const item = { name: image.itemName, images };
                return prepImagesForCarousel(item, config, imageUseCases.MIXED_SPECIMENS);
            }));
            return multiImages;
        }

        const items = await getPoolItems(collection);

        let images = items.map((item, index) => { 
            return { index: index + 1, srcs: item.images, itemName: item.name };
        });

        images = getPortraitImages(images);

        let parent = renderTestCardTemplate(collection, { vernacularName: item.vernacularName, binomial: item.name, question: 'Swipe and tap to ID', help: '(Click on the matching photo.)', term: '' });
            parent.innerHTML = '';
            
        const template = document.createElement('template');
              template.innerHTML = mixedSpecimenTemplate;
        
        renderTemplate({}, template.content, parent);

        parent = document.querySelector('.js-test-card-container-images');

        if(images.length === 0) {
            console.log(collection);
        }    

        imageSlider({ config, images: utils.shuffleArray(images), parent, identifier: 'mixed-specimens' });

        const continueLessonBtn = document.querySelector('.js-continue-lesson-btn');
        const boundScore = {};

        const answers = [];

        images.forEach(image => {
            answers.push({ value: image.itemName, url: scaleImage({ url:image.url }).small });
        });

        document.querySelectorAll('#imageSlider_mixed-specimens .carousel-item img').forEach(img => {
            
            img.addEventListener('click', event => {

                const layer = event.target;
                const selectedName = layer.dataset.itemName;
                const question = item.name;
                const answer = selectedName || 'incorrect';
                const isCorrect = answer === question;
                const answerIcon = document.createElement('span');
                      answerIcon.innerHTML = isCorrect 
                            ? '<span class="icon"><i class="fas fa-check-circle"></i></span>'
                            : '<span class="icon"><i class="fas fa-times-circle"></i></span>';

                const test = { ...score, itemId: item.id, 
                    question, answer, binomial: item.name, 
                    questionCount: lesson.questionCount, layoutCount: lesson.layoutCount, 
                    points: layout.points,
                    answers,
                    questionText: config.isPortraitMode ? 'Swipe and tap to ID' : 'Identify this species',
                    vernacularName: itemProperties.getVernacularName(item, config),
                };

                const callback = (score, scoreUpdateTimer) => {
                    boundScore.score = score;
                    boundScore.scoreUpdateTimer = scoreUpdateTimer;
                    continueLessonBtn.disabled = false;          
                    if(!score.success) {
                        const wrongItem = items.find(item => item.name === score.answer);
                        const vernacularName = itemProperties.getVernacularName(wrongItem, config);
                        const name = vernacularName || score.answer;
                    }
                };

                scoreHandler('image-match', test, callback, config);  
            });
        });

        continueLessonBtn.addEventListener('click', event => {

            if(!score.success) {            
                setTimeout(() => {
                    window.clearTimeout(boundScore.scoreUpdateTimer);
                    bindScore(boundScore.score);
                });
            } else {
                window.clearTimeout(boundScore.scoreUpdateTimer);
                bindScore(boundScore.score);
            }

        });
    };

    init();
};
