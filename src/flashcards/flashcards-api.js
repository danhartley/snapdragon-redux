import { waterCards } from 'flashcards/flashcards-api-water';
import { landCards } from 'flashcards/flashcards-api-land';
import { scienceCards } from 'flashcards/flashcards-api-science';
import { basicsCards } from 'flashcards/flashcards-api-basics';
import { policyCards } from 'flashcards/flashcards-api-policy'; 
import { lifeCards } from 'flashcards/flashcards-api-life'; 
import { dataCards } from 'flashcards/flashcards-api-data'; 
// import { termsCards } from 'flashcards/flashcards-api-terms';
// import { acronymsCards } from 'flashcards/flashcards-api-acronyms';

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
  {
    title: 'Life',
    cards: lifeCards,
    count: lifeCards.length
  },
  {
    title: 'Data',
    cards: dataCards,
    count: dataCards.length
  },
  // {
  //   title: 'Acronyms',
  //   cards: acronymsCards,
  //   count: acronymsCards.length
  // },
];