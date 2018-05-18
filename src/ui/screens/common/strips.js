import * as R from 'ramda';

import { DOM } from 'ui/dom';
import { addListeners } from 'ui/helpers/listeners';

export const renderStrips = (screen, item, callback, config) => {

    const template = document.querySelector(`.${screen.template}`);

    const rptrStrips = template.content.querySelector('.js-rptr-strips');

    setTimeout(()=>{
        DOM.rightHeader.style.backgroundColor = 'rgb(12, 44, 84)';
    },100);

    item.content = R.take(6, item.multipleNames.map(answer => {
        const vernacularNames = answer.names
            .filter(name => name.language === config.language)
            .map(name => name.vernacularName);

            const vernacularQuestions = item.names.filter(name => name.language === config.language);
            const vernacularQuestion = (vernacularQuestions && vernacularQuestions.length > 0) ? vernacularQuestions[0].vernacularName : item.genus;
            const vernacularName = (vernacularNames && vernacularNames.length > 0) ? vernacularNames[0] : answer.name.split(' ')[0];

        return {
                id: item.id, 
                binomial: item.name, 
                vernacularQuestion: vernacularQuestion, 
                vernacularAnswer: vernacularName,
                binomialAnswer: answer.name
        };
   }));
                    
    rptrStrips.innerHTML = item.content.map(callback).join('');

    const clone = document.importNode(template.content, true);
    const strips = clone.querySelectorAll('.js-rptr-strips .strip div');

    addListeners(strips, item, config.callbackTime, config.isSmallDevice);

    screen.parent.innerHTML = '';
    screen.parent.appendChild(clone);

};