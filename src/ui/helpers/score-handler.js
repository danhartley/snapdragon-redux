import * as R from 'ramda';

const isAnswerCorrect = score => {

    let isCorrect;

    score.answer = score.answer ? score.answer.trim().toLowerCase() : score.answer;
    score.question = score.question ? score.question.trim().toLowerCase() : score.question;    
    score.clue = score.clue ? score.clue.trim().toLowerCase() : null;

    isCorrect = score.answer === score.question;
    isCorrect = score.clue ? score.answer.indexOf(score.clue) > -1 : isCorrect;

    switch(score.taxon) {
        case 'vernacular':
            score.names = score.names.map(name => name.toLowerCase());
            if(score.names && score.names.length > 0) {
                const alternativeIsCorrect = R.contains(score.answer, score.names);                
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