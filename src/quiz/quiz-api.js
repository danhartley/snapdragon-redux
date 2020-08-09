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
          {
            vernacularName: 'Rock rosemary',
            name: 'Phagnalon saxatile',
          },
          {
            vernacularName: 'Scarlet Pimpernel',
            name: 'Lysimachia arvensis',
          },
          {
            vernacularName: 'Hare\'s Tail Grass',
            name: 'Lagurus ovatus',
          },
          {
            vernacularName: 'Bear\'s Breeches',
            name: 'Acanthus mollis',
          },
          {
            vernacularName: 'Garland Daisy',
            name: 'Glebionis coronaria',
          },
          {
            vernacularName: 'Small-Flowered Catchfly',
            name: 'Silene gallica'
          },
        ]
      },
      {
        answer: {
          vernacularName: 'Scarlet Pimpernel',
          name: 'Lysimachia arvensis',
          src: 'https://static.inaturalist.org/photos/71480419/medium.jpeg'
        },
        answers: [
          {
            vernacularName: 'Rock rosemary',
            name: 'Phagnalon saxatile',
          },
          {
            vernacularName: 'Scarlet Pimpernel',
            name: 'Lysimachia arvensis',
          },
          {
            vernacularName: 'Hare\'s Tail Grass',
            name: 'Lagurus ovatus',
          },
          {
            vernacularName: 'Bear\'s Breeches',
            name: 'Acanthus mollis',
          },
          {
            vernacularName: 'Garland Daisy',
            name: 'Glebionis coronaria',
          },
          {
            vernacularName: 'Small-Flowered Catchfly',
            name: 'Silene gallica'
          },
        ]
      },
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
          {
            vernacularName: 'Common sparrow',
            name: 'Passer domescticus',
          },
          {
            vernacularName: 'Carrion crow',
            name: 'Corvus corone',
          },            
        ]
      }
    ]
  },
];

const getDeckNames = () => {
  return new Promise(resolve => resolve(decks.map(deck => deck.name)));
};

const getDecks = name => {
  return !!name 
    ? new Promise(resolve => resolve(decks.filter(deck => deck.name === name)))
    : new Promise(resolve => resolve(decks));
};

export const api = {
  getDeckNames,
  getDecks
};