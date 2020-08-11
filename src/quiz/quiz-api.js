const decks = [
  {
    name: 'Common Weeds',
    count: 7,
    time: 3,
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
        src: 'https://content.eol.org/data/media/58/29/e8/509.24331002.260x190.jpg  '
      },
      {
        vernacularName: 'Bear\'s Breeches',
        name: 'Acanthus mollis',
        src: 'https://content.eol.org/data/media/56/61/ed/509.15808252.260x190.jpg'
      },
      {
        vernacularName: 'Garland Daisy',
        name: 'Glebionis coronaria',
        src: 'https://static.inaturalist.org/photos/72450517/small.jpeg'
      },
      {
        vernacularName: 'Small-Flowered Catchfly',
        name: 'Silene gallica',
        src: 'https://content.eol.org/data/media/60/5e/33/509.40475711.260x190.jpg'
      },
      {
        vernacularName: 'Small Bellflower',
        name: 'Campanula erinus',
        src: 'https://static.inaturalist.org/photos/72451058/small.jpeg'
      },
    ],
  },
  {
    name: 'Common birds',
    count: 2,
    time: 1,
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

const getDeckSummaries = () => {
  return new Promise(resolve => resolve(decks.map(deck => { return { name: deck.name, count: deck.count } })));
};

const getDecks = name => {
  return !!name 
    ? new Promise(resolve => resolve(decks.filter(deck => deck.name === name)))
    : new Promise(resolve => resolve(decks));
};

export const api = {
  getDeckSummaries,
  getDecks
};