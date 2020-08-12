import { quizLogicHandler } from 'quiz/quiz-logic-handler';

test('check response is marked correctly', () => {
  let response = {
    question: {
      vernacularName: 'Rock rosemary',
      name: 'Phagnalon saxatile',
    },    
    answer: {
      vernacularName: 'Rock rosemary',
      name: 'Phagnalon saxatile',
    },
  };
  let score = quizLogicHandler.getScore(response, false);
  expect(score.success).toBe(true);
  
  response = {
    question: {
      vernacularName: 'Rock rosemary',
      name: 'Phagnalon saxatile',
    },    
    answer: {
      vernacularName: 'Scarlet Pimpernel',
      name: 'Lysimachia arvensis',
    },
  };
  score = quizLogicHandler.getScore(response, false);
  expect(score.success).toBe(false);
});