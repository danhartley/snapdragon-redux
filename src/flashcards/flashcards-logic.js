import { renderTemplate } from 'checklist/templating';

import { Card } from 'flashcards/flashcard-card';
import { sets } from 'flashcards/flashcards-api';

import flashcardTemplate from 'flashcards/flashcards-template.html';

export const flashcardsLogic = () => {

  const template = document.createElement('template');
        template.innerHTML = flashcardTemplate;

  const parent = document.querySelector('body');

  let set = sets.find(set => set.title === 'Climate change');
  let currentDeck = [ ...set.cards ];
  
  let cardIndex = 0;

  renderTemplate({ title: set.title, sets }, template.content, parent);

  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  const front = document.getElementById("front");
  const back = document.getElementById("back");
  const flip = document.getElementById("flip");
  const shuffle = document.getElementById("shuffle");
  const newDef = document.getElementById("newDef");
  const newTerm = document.getElementById("newTerm");
  const cardForm = document.getElementById("cardForm");

  const submit = document.getElementById("submit");
  const clearDeck = document.getElementById("clearDeck");

  let newCard;

  const nextCard = () => {
    cardIndex = (cardIndex + 1) % currentDeck.length;
    front.innerHTML = currentDeck[cardIndex].term;
    back.innerHTML = currentDeck[cardIndex].definition;
  };

  const prevCard = () => {
    if (cardIndex > 0)
      cardIndex = (cardIndex - 1);
    else if (cardIndex == 0) cardIndex = currentDeck.length-1;
    front.innerHTML = currentDeck[cardIndex].term;
    back.innerHTML = currentDeck[cardIndex].definition;
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
      front.innerHTML = currentDeck[cardIndex].term;
      back.innerHTML = currentDeck[cardIndex].definition;
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

  const emptyDeck = () => {
    var confirmation = confirm("Are you sure you want to delete this entire deck?");
    if (confirmation) {
    currentDeck.splice(0, currentDeck.length);
    cardIndex = 0;
    front.innerHTML = "&nbsp;";
    back.innerHTML = "&nbsp;";
    }
    document.getElementById("newTerm").focus();
  };

  const flash = force => {

    if(force) {
      front.style.visibility = "visible";
      back.style.visibility = "hidden";
      return;
    }

    if (front.style.visibility != "hidden") {
      front.style.visibility = "hidden";
      back.style.visibility = "visible";
    } else {
      front.style.visibility = "visible";
      back.style.visibility = "hidden";
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

  prev.addEventListener('click', prevCard);
  next.addEventListener('click', nextCard);
  flip.addEventListener('click', flash);
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
    front.innerHTML = currentDeck[0].term;
    back.innerHTML = currentDeck[0].definition;
    back.style.visibility = "hidden";
  };

  openDeck();

  document.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode == 37 ) {
          prevCard();
          flash(true);
      }
      if (event.keyCode == 39 ) {
          nextCard();
          flash(true);
      }
      if (event.keyCode == 38 || event.keyCode == 40) {
        flash();
      }
      if (event.keyCode == 46) {
        emptyDeck();
      }
  });

  const optionSet = document.querySelector('#sets');
        optionSet.addEventListener('change', e => {
          const title = e.target.value;
          const newDeck = sets.find(set => set.title === title);
          currentDeck = shuffleDeck(newDeck.cards);
          openDeck();
          optionSet.blur();
        });
  
};