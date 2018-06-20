import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { utils } from 'utils/utils';
import { renderTemplate } from 'ui/helpers/templating';
import { modalHandler } from 'ui/helpers/handlers';
import landscapeTemplates from 'ui/screens/common/text-entry-templates.html';
import portraitTemplates from 'ui/screens/common/text-entry-portrait-templates.html';

export const renderInput = (config, screen, question, callbackTime, item, renderAnswerHeader, hints) => {

    const sendQandA = (answer, event) => {
        const btn = event.target;
        const response = { ...question, answer };
        
        const { text, colour, correct } = renderAnswerHeader(response);

        if(config.isPortraitMode) {
            const questionText = document.querySelector('.js-txt-question');
            questionText.innerHTML = correct 
                ? `<span class="icon"><i class="fas fa-check-circle"></i></span> ${response.question} is correct!`
                : `<span class="icon"><i class="fas fa-times-circle"></i></span> The answer is ${response.question}`;
        }

        btn.style.background = colour;
        btn.style.borderColor = colour;
        btn.classList.add('disabled-button');
        btn.innerText = correct ? 'Correct' : 'Incorrect';

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

    config.isPortraitMode ? renderPortrait(item) : renderLandscape(item);

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

    modalHandler(document.querySelectorAll('.js-species-card-images div'), item);
};

const renderLandscape = (item) => {
    if(item.images) {
        const bgTop = document.querySelector('.letterbox div:nth-child(1)');
        bgTop.style.backgroundImage = `url(${item.images[0]})`;
        bgTop.style.opacity = '.1';
        
        const bgBottom = document.querySelector('.letterbox div:nth-child(3)');
        bgBottom.style.backgroundImage = `url(${item.images[1]})`;
        bgBottom.style.opacity = '.1';
    }
};

