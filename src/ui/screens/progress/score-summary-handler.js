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

export const scoreSummaryHandler = {
    getLessonScores
}