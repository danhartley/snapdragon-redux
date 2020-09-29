import { renderTemplate } from 'checklist/templating';

import { Card } from 'flashcards/flashcard-card';
import { sets } from 'flashcards/flashcards-api';

import flashcardTemplate from 'flashcards/flashcards-template.html';
import flashcardSetsTemplate from 'flashcards/flashcards-set-selection-template.html';

export const flashcardsLogic = (config, parent = document.querySelector('body')) => {

  const title = document.querySelector('.js-modal-text-title header');
        title.innerHTML = 'Climate change flip cards';

  const template = document.createElement('template');
        template.innerHTML = flashcardTemplate;

  let currentDeckTitle = 'Basics';
  let set = sets.find(set => set.title === currentDeckTitle);
  let currentDeck = [ ...set.cards ];
  
  let cardIndex = 0;

  parent.innerHTML = '';

  renderTemplate({ title: set.title, sets, cardCount: currentDeck.length }, template.content, parent);

  template.innerHTML = flashcardSetsTemplate;
  parent = document.querySelector('.js-flashcard-set-selection-container');
  parent.innerHTML = '';

  renderTemplate({ sets }, template.content, parent);

  const btn = document.querySelector('.filter-sets-option-block button');
        btn.innerHTML = `Cards: ${currentDeckTitle}`;

  document.querySelectorAll('.dropdown-item').forEach(set => {
    set.addEventListener('click', e => {
      cardIndex = 0;
      const title = e.target.id;
      const newDeck = sets.find(set => set.title === title);
      currentDeck = shuffleDeck(newDeck.cards);
      document.querySelector('.js-card-count').innerHTML = `Card count: ${currentDeck.length}`;
      openDeck();
      btn.innerHTML = `Set: ${title}`;
    });    
});

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const card = document.querySelector('#card section');
  const flipper = document.getElementById("flip");
  const shuffle = document.getElementById("shuffle");
  const newDef = document.getElementById("newDef");
  const newTerm = document.getElementById("newTerm");
  const cardForm = document.getElementById("cardForm");

  const submit = document.getElementById("submit");
  const clearDeck = document.getElementById("clearDeck");

  let newCard;

  const updateSource = config => {    
    const source = config.isLandscapeMode ? document.querySelector('.js-card-source') : document.querySelector('.js-portrait-card-source');
    if(currentDeck[cardIndex].source) {
        source.innerHTML = config.isLandscapeMode
              ? `<div>For more information (opens in new tab): <a target="_blank" class="underline-link" href="${currentDeck[cardIndex].source}">click here</a></div>`
              : `<div class="margin-bottom"><a target="_blank" class="underline-link" href="${currentDeck[cardIndex].source}">Open source in a new tab</a></div>`;
    } else {
      source.innerHTML = ``;
    }
    if(currentDeck[cardIndex].author) {
      source.innerHTML += `<div class="small-text">Source: ${currentDeck[cardIndex].author}</div>`
    }
    forceFlipToFront();
  };

  const nextCard = () => {
    
    cardIndex = (cardIndex + 1) % currentDeck.length;
    flipToFront();    

    updateSource(config);
  };

  const prevCard = () => {
    
    if (cardIndex > 0)
      cardIndex = (cardIndex - 1);
    else if (cardIndex == 0) cardIndex = currentDeck.length-1;
    flipToFront();

    updateSource(config);
  };

  const cardAdd = (formFront, formBack) => {
  
    const clearForm = () => {
      newTerm.value = "";
      newDef.value = "";
      cardForm.reset();
    };

    const updatePlaceholder = () => {
      document.getElementById("newTerm").placeholder =
        "...another term?";
      document.getElementById("newDef").placeholder =
        "...and another definition?";
    };

    if (
      formFront.value !== formBack.value &&
      formFront.value != "" &&
      formBack.value != ""
    ) {
      var newCard = new Card();
      newCard.term = formFront.value;
      newCard.definition = formBack.value;
      currentDeck.push(newCard);
      cardIndex = currentDeck.length - 1;
      clearForm();
      updatePlaceholder();
      flipToFront();
    } else if (formFront.value == formBack.value) {
      alert('Both sides are the same, Dan!');
    } else if (
      (formFront.value == null || formFront.value == "", formBack.value == null ||
        formBack.value == "", formFront.value == null ||
        formBack.value == null ||
        formFront.value == "" ||
        formBack.value == "")
    ) {
      alert("Fill out both sides of the card please, Dan.");
    }
    document.getElementById("newTerm").focus();
  };

  let side = 'back';

  const flipToFront = () => {
    card.querySelector('.front').innerHTML = currentDeck[cardIndex].term;
    card.querySelector('.back').innerHTML = '';
  }

  const flipToBack = () => {
    card.querySelector('.back').innerHTML = currentDeck[cardIndex].definition;
    if(currentDeck[cardIndex].confidence) {
      card.querySelector('.back').innerHTML+= `<span class="small-text latin"> (IPCC: ${currentDeck[cardIndex].confidence})<span>`;
    }
    card.querySelector('.front').innerHTML = '';
  };

  const flip = (force = false) => {

    side = force
              ? 'front'
              : side === 'front'
                ? 'back'
                : 'front';

    switch(side) {
      case 'front':
        flipToFront();
        card.classList.remove('rotate');
        break;
      case 'back':
        flipToBack();
        card.classList.add('rotate');
        break;
    }
  };

  const shuffleDeck = array => {

    if(!array || array.length === 0) return;

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return [ ...array ];
  };

  const forceFlipToFront = () => {
    flip(true);
  };

  const forceFlip = () => {
    flip();
  };

  prev.addEventListener('click', prevCard);
  next.addEventListener('click', nextCard);
  card.addEventListener('click', forceFlipToFront);
  flipper.addEventListener('click', forceFlip);
  shuffle.addEventListener('click', e => {
    currentDeck = shuffleDeck(currentDeck);
    openDeck();
  });
  clearDeck.addEventListener('click', clearDeck);

  newDef.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
      cardAdd(newTerm, newDef);
    } 
  });

  submit.addEventListener('click', e => {
    cardAdd(newTerm, newDef);
  });

  const openDeck = () => {
    card.querySelector('.front').innerHTML = currentDeck[0].term;
    updateSource(config);
    forceFlipToFront();
  };

  openDeck();

  document.addEventListener("keyup", e => {
      e.preventDefault();      
      switch(e.key) {
        case 'ArrowLeft':
          prevCard();
          prev.focus();
          forceFlipToFront();          
          break;
        case 'ArrowRight':
          nextCard();
          next.focus();
          forceFlipToFront();
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          flip();
          flipper.focus();
          break;
      }
  });
};