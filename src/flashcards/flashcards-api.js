import { waterCards } from 'flashcards/flashcards-api-water';
import { landCards } from 'flashcards/flashcards-api-land';
import { scienceCards } from 'flashcards/flashcards-api-science';
import { basicsCards } from 'flashcards/flashcards-api-basics';
import { policyCards } from 'flashcards/flashcards-api-policy'; 
// import { termsCards } from 'flashcards/flashcards-api-terms';
// import { acronymsCards } from 'flashcards/flashcards-api-acronyms';

const numbersCards = [
  {
    term: 'The highest emitting sector in the UK is road transport, which accounts for what percentage in 2018?',
    definition: '24%. All transport accounted for 33%',
    source: 'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/790626/2018-provisional-emissions-statistics-report.pdf'
  },
  {
    term: 'What is the UK annual energy requirement?',
    definition: '2.25 TWh, or 2250 Gigawatts'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does the energy sector account for?',
    definition: '72%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does transport account for?',
    definition: '15%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does concrete account for?',
    definition: '7%',
    source: 'https://www.iea.org/news/cement-technology-roadmap-plots-path-to-cutting-co2-emissions-24-by-2050'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does flying account for?',
    definition: '2-2.5%'
  },
  {
    term: 'The full impact of flying including contrails and other pollutants e.g. NOx is what percentage of global emissions?',
    definition: '5%'
  },
  {
    term: 'How much land in the Northern Hemisphere is underlain by permafrost?',
    definition: '~25%'
  },
  {
    term: 'How much land in Canada, Siberia, Greenland and Alaska is underlain by permafrost?',
    definition: '~85%',
    source: 'https://en.wikipedia.org/wiki/Permafrost'
  },
  {
    term: 'What percentage of the world\'s population flies in any one year?',
    definition: '3%'
  },
  {
    term: '70% of UK flights were taken by what percentage of the population?',
    definition: '15%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
  {
    term: 'What percentage of global manmade greenhouse gas emissions does agriculture account for?',
    definition: '11%',
    source: 'https://www.c2es.org/content/international-emissions/'
  },
];

export const sets = [
  {
    title: 'Policy',
    cards: policyCards,
    count: policyCards.length
  },
  {
    title: 'Land',
    cards: landCards,
    count: landCards.length
  },
  {
    title: 'Water',
    cards: waterCards,
    count: waterCards.length
  },
  {
    title: 'Science',
    cards: scienceCards,
    count: scienceCards.length
  },
  {
    title: 'Basics',
    cards: basicsCards,
    count: basicsCards.length
  },
  // {
  //   title: 'Acronyms',
  //   cards: acronymsCards,
  //   count: acronymsCards.length
  // },
];