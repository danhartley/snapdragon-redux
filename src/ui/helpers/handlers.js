import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const modalBackgroundImagesHandler = (images, item) => {
    images.forEach(image => {
        image.addEventListener('click', event => {            
            const img = event.target;
            const src = img.style.backgroundImage.slice(4, -1).replace(/"/g, "");
            if(src) {
                DOM.modalImageTitle.innerHTML = item.name;
                const style = `background-image: url(${src}); background-size: cover;`;
                DOM.modalImage.style = style;
            }
        })
    });
};

export const modalImageHandler = (image) => {
    image.addEventListener('click', event => {            
        const img = event.target;        
        DOM.modalImageTitle.innerHTML = img.id;
        const style = `background-image: url(${img.src}); background-size: cover;`;
        DOM.modalImage.style = style;            
    })
};

export const scoreHandler = (items, item, config, type, callback) => {
    
    switch(type) {
        case 'strip':
            stripHandler(items, item, config, callback);
            break;
        case 'image':
            imageHandler(items, item, config, callback);
            break;
    }
};

const stripHandler = (items, item, config, callback) => {    
    items.forEach(selected => {

        selected.addEventListener('click', event => {
            
            const target = event.target;
            const answer = target.innerText;
            const vernacular = target.dataset.vernacular;

            const score = { taxon: 'name', binomial: item.name, vernacular: vernacular, question: item.name, answer: answer };
            const { text, colour, correct } = renderAnswerHeader(score, config.isPortraitMode);

            if(callback) callback(text, colour, correct);
            
            score.success = correct;

            DOM.rightHeaderTxt.innerHTML = text;
            
            target.classList.add(colour);
            target.classList.add(colour);

            items.forEach(strip => {   
                const matchesScientificName = strip.innerText === item.name;
                const matchesVernacularName = vernacular 
                                                ? strip.innerText.toLowerCase() ===  vernacular.toLowerCase() 
                                                : false;
                if(matchesScientificName || matchesVernacularName) {
                    strip.classList.add('snap-success');
                    strip.classList.add('snap-success');
                }
            });            

            setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, config.callbackTime);
            
            event.stopPropagation();
        });
    });
};

const imageHandler = (tiles, item, config, callback) => {

    tiles.forEach(tile => {
        tile.addEventListener('click', event => {

            const img = event.target;
            const answer = img.dataset.answer;

            if(!answer) return;

            const score = { taxon: 'name', binomial: item.name, question: item.name, answer: answer };
            const { text, colour, correct } = renderAnswerHeader(score, config.isPortraitMode);

            if(callback) callback(text, colour, correct);

            score.success = correct;

            tile.style.filter = 'saturate(100%)';

            DOM.rightHeaderTxt.innerHTML = text;
            
            img.parentNode.style.filter = 'saturate(100%)';

            tiles.forEach(tile => {
                tile.style.filter = 'saturate(10%)';
                tile.style.opacity = .3;
                if(tile.dataset.answer === item.name) {
                    tile.style.filter = 'saturate(100%)';
                    tile.style.opacity = 1;
                }
            });

            setTimeout(() => {
                actions.boundUpdateScore(score);
            }, config.callbackTime);
                
            event.stopPropagation();
        });
    });
};

export const selectHandler = (selector, callback) => {
    document.querySelectorAll(selector).forEach(option => {
        option.addEventListener('click', event => {
            document.querySelectorAll(selector).forEach(option => option.classList.remove('active'));
            event.target.classList.add('active');
            const id = event.target.id;
            callback(id);
        });
    });
};