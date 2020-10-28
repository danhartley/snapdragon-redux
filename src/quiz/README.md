## Run feature in isolation

root: npm run quiz
root: npm run start:quiz

## Files only used in testing

quiz.js
quiz.html

## HTML

## JavaScript

Preprocessors:
Conventions: CSS classes used as selectors have js- suffix

## CSS

      Preprocessors: Sass, LESS, etc.
      Conventions & methodologies: BME, OOCSS, SMACSS, hybrid (loose BME), etc.
      Linters:

      ### Hybrid
          CSS class selectors
          js- prefix indicates JavaScript selector
          partially atomic i.e. .margin-left, and .standard-block have consistent values and may be used on any element

## External dependencies

## IDE dependencies

## Files interacting with main project

quiz-modal.js

## Test data

quiz-api-decks

## Active files (moving parts)

    quiz-config
    quiz-logic
    quiz-logic-handler

## Local interaction with the DOM

    quiz-decks: updating header text (back to default)

    quiz-deck: setting header text to selected deck name
    quiz-deck: sending question and answer to be scored
    quiz-deck: changing colour of answer depending on whether the answer was correct or incorrect

    quiz-settings: capture name (vernacular/latin) amd language settings

    quiz-state: initialising and calling clock
    quiz-state: updating score



