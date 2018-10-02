import * as R from 'ramda';

import { utils } from "utils/utils";

export const capitaliseAll = str => {
    if(!str) return str;
    return utils.capitaliseAll(str);
};

export const checkQuestion = score => {
    return capitaliseAll(score.vernacular) || score.question;
};

export const isAnswerCorrect = score => {
    const validAnswer = score.answer.length > 2;
    const isCorrect = validAnswer && score.answer.toUpperCase() === score.question.toUpperCase();
        // (score.question.toUpperCase().indexOf(score.answer.toUpperCase()) !== -1 ||
        // score.answer.toUpperCase().indexOf(score.question.toUpperCase()) !== -1);
    return isCorrect;
};

export const markTest = test => {

    const score = R.clone(test);

    score.answer = score.answer.trim();
    score.success = isAnswerCorrect(score);
    score.colour  = score.success ? 'snap-success' : 'snap-alert';
    
    return score;
};