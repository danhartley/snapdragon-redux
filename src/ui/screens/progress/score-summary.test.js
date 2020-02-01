import { scoreSummaryHandler } from 'ui/screens/progress/score-summary-handler';

test('if not next round, return saved score state', () => {

    let history, lesson, score, savedScore;

    history = null;
    lesson = { isNextRound: false };
    score = null;
    savedScore = { score: { passes: [] } }, { score: { fails: [] } };

    expect(scoreSummaryHandler.getLessonScores(history, lesson, score, savedScore)).toEqual([savedScore]);
    
});
