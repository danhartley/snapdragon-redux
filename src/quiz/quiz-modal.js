import { actions } from 'redux/actions/action-creators';
import { subscription } from 'redux/subscriptions';
import { logic } from 'quiz/quiz-logic';
import { quizDecks } from 'quiz/quiz-decks';
import { quizSettings } from 'quiz/quiz-settings';
import { quizSummary } from 'quiz/quiz-summary';

export const openQuiz = () => {

  const init = async () => {

    subscription.add(quizDecks, 'decks', 'modal');
    subscription.add(quizSettings, 'decks', 'modal');
    subscription.add(quizSummary, 'decks', 'modal');
    
    const decks = await logic.getDeckSummaries();
    actions.boundUpdateDecks([ ...decks.filter(deck => deck.count > 0), { name: `${new Date().getTime()}`, count: 0 } ]);
  };
  
  init();
};
