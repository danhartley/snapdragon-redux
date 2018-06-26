import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { modalBackgroundImagesHandler } from 'ui/helpers/handlers';
import landscapeTemplates from 'ui/screens/common/text-entry-templates.html';
import portraitTemplates from 'ui/screens/common/text-entry-portrait-templates.html';

export const renderInput = (config, screen, question, callbackTime, item, renderAnswerHeader, hints) => {

    const sendQandA = (answer, event) => {
        const btn = event.target;
        const response = { ...question, answer };
        
        const { colour, correct } = renderAnswerHeader(response);

        const questionText = document.querySelector('.js-txt-question');

        const correctResponse = config.isPortraitMode ? 'Correct!' : `That's the correct answer!`;
        const incorrectResponse = config.isPortraitMode ? 'Incorrect!' : `That's the wrong answer!`;

        questionText.innerHTML = correct 
            ? `<div>
                <span class="icon"><i class="fas fa-check-circle"></i></span>                        
                <span>${ correctResponse }</span>
               </div>
               <div>
                <span>It is</span> <span class="capitalise">${response.question}</span>
               </div>`
            : `<div>
                <span class="icon"><i class="fas fa-times-circle"></i></span>
                <span>${ incorrectResponse }</span>
                </div> 
               <div>It's <span class="capitalise">${response.question}</span></div>`;

        btn.style.background = colour;
        btn.style.borderColor = colour;
        btn.style.color = 'white';
        btn.innerText = correct ? 'Correct' : 'Incorrect';
        btn.disabled = true;

        response.success = correct;

        setTimeout(()=>{
            actions.boundUpdateScore(response);
        }, callbackTime);
    };

    const templates = document.createElement('div');
    templates.innerHTML = config.isPortraitMode ? portraitTemplates : landscapeTemplates;

    const template = templates.querySelector(`.${screen.template}`);

    hints.forEach(hint => {
        const el = template.content.querySelector(hint.selector);
        if(el)
            template.content.querySelector(hint.selector).innerHTML = hint.value;  
    });

    const clone = document.importNode(template.content, true);
    
    clone.querySelector('button').addEventListener('click', event => {
        sendQandA(document.querySelector('.js-txt-input').value, event);
        event.target.disabled = true;
    });

    const parent = config.isPortraitMode ? DOM.leftBody : DOM.rightBody;
    parent.innerHTML = '';
    parent.appendChild(clone);

    if(config.isPortraitMode) renderPortrait(item);

    document.querySelector('.js-txt-input').focus();
};

const renderPortrait = (item) => {
    const images = utils.shuffleArray(item.images).slice(0,4);

    const backgroundImages = images.map(image => {
            return `                
                <div style='background-image: url(${image}); background-size: cover;' data-toggle="modal" data-target="#imageModal">                                      
                </div>
            `;
        }).join('');

    document.querySelector('.js-species-card-images').innerHTML = backgroundImages;

    modalBackgroundImagesHandler(document.querySelectorAll('.js-species-card-images div'), item);
};

