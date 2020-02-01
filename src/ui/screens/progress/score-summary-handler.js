import * as R from 'ramda';

import { utils } from 'utils/utils';

export const getLessonScores = (history, lesson, score, savedScore) => {

    return history
          ? lesson.isNextRound
                ? R.contains(score.binomial, history.scores.map(s => s.binomial))
                      ? history.scores
                      : score.total === 0
                            ? history.scores
                            : [...history.scores, score]
                : score.total === 0
                      ? [...history.scores, savedScore]
                      : [...history.scores, score]
          : [savedScore];
};

const getSummaryRows = (rows) => {
      rows = rows.map((r, i) => {
            const _r = {
                  ...r, id: `${i}${utils.toCamelCase(r.binomial)}`, question: r.question.term ? r.question.term : r.question, 
                        answers: r.answers.map(a => { return getAnswer(a, r); })
            };
            return _r;
      });
      return rows;
};

export const scoreSummaryHandler = {
    getLessonScores,
    getSummaryRows
}

function getAnswer(a, r) {
      
      const isObj = typeof a === 'object';

      const value = isObj ? a.value || a.term : a;
      const hasImage = isObj && !!a.url;
      const url = isObj ? a.url : '';
      const question = r.question.term || r.question;
      const isTrue = 
                  value !== "" && 
                          (utils.parseToLowerCase(value) === utils.parseToLowerCase(question))
                        // || R.contains(value, r.answer))

      const isWrongAnswer = !isTrue && utils.parseToLowerCase(value) === utils.parseToLowerCase(r.answer);
      const name = isObj ? a.name || '' : '';
      
      const answer = {
            value,
            url,
            hasImage,
            isTrue,
            isWrongAnswer,
            name
      };
      return answer;
}
