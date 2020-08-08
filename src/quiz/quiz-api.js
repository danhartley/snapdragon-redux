const getDecks = number => {
  const decks = [
    {
      name: 'Plants',
      cards: [
        {
          answer: {
            vernacularName: 'Rock rosemary',
            name: 'Phagnalon saxatile',
            src: 'https://static.inaturalist.org/photos/71465098/medium.jpeg'
          },
          answers: [
            'Phagnalon saxatile',
            'Lysimachia arvensis',
            'Lagurus ovatus',
            'Acanthus mollis',
            'Glebionis coronaria',
            'Silene gallica'
          ]
        }
      ]
    },
    {
      name: 'Birds',
      cards: [
        {
          answer: {
            name: 'Passer domescticus',
            src: ''
          },
          answers: [ 
            'Passer domescticus',
            'Corvus corone'
          ]
        }
      ]
    },
  ];
  return new Promise(resolve => resolve(decks));
};

export const api = {
  getDecks
};