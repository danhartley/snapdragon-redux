import { capitaliseAll, markTest } from 'ui/helpers/score-handler';

test('capitaliseAll should return first letter capitalised', () => {
    expect(capitaliseAll('chives')).toBe('Chives');
    expect(capitaliseAll('wild chives')).toBe('Wild Chives');
});

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