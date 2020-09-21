## Run feature in isolation

root: npm run flashcards
root: npm run start:flashcards

## Files only used when standalone

flashcards.js
flashcards.html

uncomment the HtmlWebpackPlugin in webpack.common.js to view at ~/flashcards.html

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

## Active files (moving parts)

## Local interaction with the DOM