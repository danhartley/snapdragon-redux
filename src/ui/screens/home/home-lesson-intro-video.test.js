
import { matchSpeciesTime } from 'ui/screens/home/home-lesson-intro-video';

test('should verify if time matches species time', () => {
  const timeToMatch = 10;
  const collection = {
    species: [
      {
        name: 'matching species',
        time: [10]
      }
    ]
  };
  expect(matchSpeciesTime(timeToMatch, collection)).toEqual(collection.species[0]); 
});