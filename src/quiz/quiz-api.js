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
        src: 'https://content.eol.org/data/media/48/e0/ff/18.https___www_inaturalist_org_photos_6500927.260x190.jpg'
      },
      {
        vernacularName: 'Carrion crow',
        name: 'Corvus corone',
        src: 'https://content.eol.org/data/media/55/ea/32/509.13190079.260x190.jpg'
      },            
    ]
  },
  {
    name: 'Wild UK flowers',
    count: 25,
    time: 5,
    species: [      
        {
          name: "Trifolium repens",
          vernacularName: "White Clover",
          src: "https://content.eol.org/data/media/55/78/5c/509.1121376.260x190.jpg"
        },
        {
          name: "Daucus carota",
          vernacularName: "Wild Carrot",
          src: "https://content.eol.org/data/media/56/fa/ef/509.1856321.260x190.jpg"
        },
        {
          name: "Bellis perennis",
          vernacularName: "Daisy",
          src: "https://content.eol.org/data/media/55/9d/2c/509.118977.260x190.jpg"
        },
        {
          name: "Ailanthus altissima",
          vernacularName: "Tree Of Heaven",
          src: "https://content.eol.org/data/media/56/03/40/509.139593.260x190.jpg"
        },
        {
          name: "Lantana camara",
          vernacularName: "Lantana",
          src: "https://content.eol.org/data/media/56/85/9a/509.16412834.260x190.jpg"
        },
        {
          name: "Robinia pseudoacacia",
          vernacularName: "Black Locust",
          src: "https://content.eol.org/data/media/55/44/ce/509.10460273.260x190.jpg"
        },
        {
          name: "Convolvulus arvensis",
          vernacularName: "Field Bindweed",
          src: "https://content.eol.org/data/media/58/21/cf/509.24215278.260x190.jpg"
        },
        {
          name: "Lysimachia arvensis",
          vernacularName: "Scarlet Pimpernel",
          src: "https://static.inaturalist.org/photos/71480419/medium.jpeg"
        },
        {
          name: "Capsella bursa-pastoris",
          vernacularName: "Shepherd's Purse",
          src: "https://content.eol.org/data/media/55/71/0a/509.11106039.260x190.jpg"
        },
        {
          name: "Crataegus monogyna",
          vernacularName: "Hawthorn",
          src: "https://content.eol.org/data/media/57/b9/e1/509.2229981.260x190.jpg"
        },
        {
          name: "Nerium oleander",
          vernacularName: "Oleander",
          src: "https://content.eol.org/data/media/3b/61/33/18.https___www_inaturalist_org_photos_4237120.260x190.jpg"
        },
        {
          name: "Foeniculum vulgare",
          vernacularName: "Sweet Fennel",
          src: "https://content.eol.org/data/media/5a/33/4f/509.10128640.260x190.jpg"
        },
        {
          name: "Oxalis pes-caprae",
          vernacularName: "Bermuda Buttercup",
          src: "https://content.eol.org/data/media/57/84/6a/509.21113187.260x190.jpg"
        },
        {
          name: "Cymbalaria muralis",
          vernacularName: "Ivy-leaved Toadflax",
          src: "https://content.eol.org/data/media/5d/9b/8a/509.25948729.260x190.jpg"
        },
        {
          name: "Geranium molle",
          vernacularName: "Dovefoot Geranium",
          src: "https://content.eol.org/data/media/55/31/2a/509.10114186.260x190.jpg"
        },
        {
          name: "Populus alba",
          vernacularName: "White Poplar",
          src: "https://content.eol.org/data/media/59/d7/9d/509.32941495.260x190.jpg"
        },
        {
          name: "Borago officinalis",
          vernacularName: "Borage",
          src: "https://content.eol.org/data/media/5c/aa/cd/509.21958940.260x190.jpg"
        },
        {
          name: "Glebionis coronaria",
          vernacularName: "Garland Daisy",
          src: "https://static.inaturalist.org/photos/72450517/medium.jpeg"
        },
        {
          name: "Acanthus mollis",
          vernacularName: "Bear's Breeches",
          src: "https://content.eol.org/data/media/56/61/ed/509.15808252.260x190.jpg"
        },
        {
          name: "Parietaria judaica",
          vernacularName: "Pellitory Of The Wall",
          src: "https://static.inaturalist.org/photos/71791005/medium.jpeg"
        },
        {
          name: "Cistus salviifolius",
          vernacularName: "Salvia Cistus",
          src: "https://content.eol.org/data/media/62/f9/d5/509.4751070.260x190.jpg"
        },
        {
          name: "Pinus pinea",
          vernacularName: "Italian Stone Pine",
          src: "https://content.eol.org/data/media/63/13/3a/509.48087369.260x190.jpg"
        },
        {
          name: "Cercis siliquastrum",
          vernacularName: "Judas Tree",
          src: "https://content.eol.org/data/media/55/e1/f0/509.1291115.260x190.jpg"
        },
        {
          name: "Fraxinus angustifolia",
          vernacularName: "Narrow-leafed Ash",
          src: "https://content.eol.org/data/media/59/2b/e9/509.29063912.260x190.jpg"
        },
        {
          name: "Malva multiflora",
          vernacularName: "Small Tree Mallow",
          src: "https://static.inaturalist.org/photos/72324819/medium.jpeg"
        }

    ]
  }
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