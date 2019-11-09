import * as R from 'ramda';

export const cleanText = text => {
    return text ? text.toLowerCase().replace(/ /g,'') : '';
};

export const isAnswerEqualToQuestion = (question, answer) => {

    const eqValues = R.compose(R.isEmpty, R.symmetricDifference);

    return eqValues(cleanText(question), cleanText(answer));
};

const isAnswerCorrect = score => {

    score.answer = score.answer.trim();

    let isCorrect;

    isCorrect = isAnswerEqualToQuestion(score.question, score.answer);

    // score.clue = score.clue ? score.clue.toLowerCase().replace(/ /g,'') : null;

    // isCorrect = score.clue ? score.answer.indexOf(score.clue) > -1 : isCorrect;

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

const isTraitAnswerCorrect = score => {
    const doArraysHaveSameValues = R.compose(R.isEmpty, R.symmetricDifference);
    return doArraysHaveSameValues(score.answer, score.question);
};

export const markTest = test => {

    const score = R.clone(test);

    score.success = score.trait ? isTraitAnswerCorrect(score) : isAnswerCorrect(score);
    score.colour  = score.success ? 'snap-success' : 'snap-alert';
    
    return score;
};