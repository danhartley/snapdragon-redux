import { scoreSummaryHandler } from 'ui/screens/progress/score-summary-handler';

test('if not next round, return saved score state', () => {

    let history, lesson, stateScore, savedScore;

    history = null;
    lesson = { isNextRound: false };
    savedScore = null;
    stateScore = { score: { passes: [] } };

    expect(scoreSummaryHandler.getLessonScores(history, lesson, stateScore, savedScore)).toEqual([stateScore]);
    
});
