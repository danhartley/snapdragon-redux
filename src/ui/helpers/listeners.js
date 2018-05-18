import { DOM } from 'ui/dom';
import { actions } from 'redux/actions/action-creators';
import { renderAnswerHeader } from 'ui/helpers/response-formatting';

export const addListeners = (strips, item, callbackTime, isSmallDevice) => {
    
    strips.forEach(selected => {

        selected.addEventListener('click', event => {
            
            const target = event.target;
            const answer = target.innerText;
            const vernacular = target.dataset.vernacular;

            const score = { taxon: 'name', binomial: item.name, vernacular: vernacular, question: item.name, answer: answer };
            const { text, colour, correct } = renderAnswerHeader(score, isSmallDevice);
            score.success = correct;

            DOM.headerTxt.innerHTML = text;
            DOM.rightHeader.style.backgroundColor = colour;

            target.style.color = colour;

            strips.forEach(strip => {   
                const matchesScientificName = strip.innerText === item.name;
                const matchesVernacularName = vernacular 
                                                ? strip.innerText.toLowerCase() ===  vernacular.toLowerCase() 
                                                : false;
                if(matchesScientificName || matchesVernacularName) {
                    strip.style.color = 'rgb(44, 141, 86)';
                }
            });

            setTimeout(()=>{
                actions.boundUpdateScore(score);
            }, callbackTime);
            
            event.stopPropagation();
        });
    });
};