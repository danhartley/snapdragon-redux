import * as R from 'ramda';

import { utils } from "utils/utils";

const isAnswerCorrect = score => {
    let isCorrect = score.answer.toLowerCase() === score.question.toLowerCase();
    switch(score.taxon) {
        case 'vernacular':
            score.names = score.names.map(name => name.toLowerCase());
            if(score.names && score.names.length > 0) {
                const alternativeIsCorrect = R.contains(score.answer.toLowerCase(), score.names);                
                if(!isCorrect && alternativeIsCorrect) score.alternativeAccepted = true;
                isCorrect = isCorrect || alternativeIsCorrect;
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