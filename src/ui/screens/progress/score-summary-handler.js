import{ contains } from 'ramda';

import { utils } from 'utils/utils';

export const getLessonScores = (history, lesson, stateScore, savedScore) => {

      if(!history) return [ stateScore ];

      const historyIsUpToDate = contains(stateScore.binomial, history.scores.map(s => s.binomial));

      let scores = [];

      if(lesson.isNextRound) {
            scores = historyIsUpToDate
                  ? history.scores
                  : stateScore.total === 0
                        ? history.scores
                        : [...history.scores, stateScore];
      } else {
            scores = historyIsUpToDate
                  ? history.scores
                  : [...history.scores, stateScore];
      }
      
      return scores;
};

const getSummaryRows = (rows) => {
      rows = rows.map((r, i) => {
            const _r = {
                  ...r, id: `${utils.toCamelCase(r.binomial)}_${i}`, question: r.question.term ? r.question.term : r.question, 
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
                        // || contains(value, r.answer))

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
