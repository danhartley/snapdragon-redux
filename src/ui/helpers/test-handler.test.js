import { markTest, cleanText, isAnswerEqualToQuestion } from 'ui/helpers/test-handler';

test('should return correct  - true for success - for preferred common name', () => {
    const test = {
        "taxon": "vernacular",
        "question": "Cock's-foot",
        "answer": "Cock's-foot",
        "names": [
          "Cock's-foot",
          "Cocksfoot",
          "Orchard Grass"
        ]
      };
    expect(markTest(test).success).toBeTruthy();    
    expect(markTest(test).alternativeAccepted).toBeFalsy();    
});

test('should return correct  - true for success - for alternative common name answer', () => {
    const test = {
        "taxon": "vernacular",
        "question": "Cock's-foot",
        "answer": "Orchard grass",
        "names": [
          "Cock's-foot",
          "Cocksfoot",
          "Orchard Grass"
        ]
      };
    expect(markTest(test).success).toBeTruthy();
    expect(markTest(test).alternativeAccepted).toBeTruthy();    
});

test('should return incorrect - false for success - when there is no alternative common name answer', () => {
    const test = {
        "taxon": "vernacular",
        "question": "Cock's-foot",
        "answer": "Orchard grass",
        "names": [
          "Cock's-foot",
          "Cocksfoot",
        ]
      };
    expect(markTest(test).success).toBeFalsy();
});

test('should return cleaned text', () => {
  const textToClean = ' text';
  expect(cleanText(textToClean)).toEqual('text');
});

test('should return true for correct answer', () => {
  const question = 'Honeydew,Nectar';
  const answer = 'honeydew, nectar';
  expect(isAnswerEqualToQuestion(question, answer)).toBeTruthy();
});

test('should return true for correct answer, no matter the order', () => {
  const question = 'Nectar,Honeydew';
  const answer = 'honeydew, nectar';
  expect(isAnswerEqualToQuestion(question, answer)).toBeTruthy();
});

test('should return false for incorrect answer', () => {
  const question = 'Honeydew,Nuts';
  const answer = 'honeydew, nectar';
  expect(isAnswerEqualToQuestion(question, answer)).toBeFalsy();
});