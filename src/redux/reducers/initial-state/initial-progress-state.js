const resetScore = ({
    total = 0,
    correct = 0,
    taxon = '',
    binomial = '',
    answer = '',
    success = false,
    incorrect = 0,
    question = '',
    fails = [],
    passes = [],
    answers = [],
    statement = '',
    mode = '',
    totalPassPoints = 0,
    totalPoints = 0
  } = {}) => ({
    total, correct, taxon, binomial, answer, success, incorrect, question, fails, passes, answers, statement, mode, totalPassPoints, totalPoints
  });

export const progressState = {
    score: resetScore(),
    resetScore
}