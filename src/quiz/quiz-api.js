const decks = [
  {
    name: 'Plants',
    species: [
      {
        vernacularName: 'Rock rosemary',
        name: 'Phagnalon saxatile',
        src: 'https://static.inaturalist.org/photos/71465098/medium.jpeg'
      },
      {
        vernacularName: 'Scarlet Pimpernel',
        name: 'Lysimachia arvensis',
        src: 'https://static.inaturalist.org/photos/71480419/medium.jpeg'
      },
      {
        vernacularName: 'Hare\'s Tail Grass',
        name: 'Lagurus ovatus',
        src: 'https://content.eol.org/data/media/58/29/e8/509.24331002.98x68.jpg  '
      },
      {
        vernacularName: 'Bear\'s Breeches',
        name: 'Acanthus mollis',
        src: 'https://content.eol.org/data/media/56/61/ed/509.15808252.98x68.jpg'
      },
      {
        vernacularName: 'Garland Daisy',
        name: 'Glebionis coronaria',
        src: 'https://static.inaturalist.org/photos/72450517/small.jpeg'
      },
      {
        vernacularName: 'Small-Flowered Catchfly',
        name: 'Silene gallica',
        src: 'https://content.eol.org/data/media/60/5e/33/509.40475711.98x68.jpg'
      },
    ],
  },
  {
    name: 'Birds',
    species: [ 
      {
        vernacularName: 'Common sparrow',
        name: 'Passer domescticus',
      },
      {
        vernacularName: 'Carrion crow',
        name: 'Corvus corone',
      },            
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