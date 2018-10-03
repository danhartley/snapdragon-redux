import * as R from 'ramda';

import { utils } from "utils/utils";

export const capitaliseAll = str => {
    if(!str) return str;
    return utils.capitaliseAll(str);
};

export const isAnswerCorrect = score => {
    let isCorrect = score.answer.toUpperCase() === score.question.toUpperCase();
    switch(score.taxon) {
        case 'vernacular':
            if(score.names) {
                const alsoCorrect = R.contains(utils.capitaliseAll(score.answer), score.names);                
                if(!isCorrect && alsoCorrect) score.alternativeAccepted = true;
                isCorrect = alsoCorrect;
            }
        break;
    }
    return isCorrect;
};

export const markTest = test => {

    const score = R.clone(test);

    score.answer = score.answer.trim();
    score.success = isAnswerCorrect(score);
    score.colour  = score.success ? 'snap-success' : 'snap-alert';
    
    return score;
};